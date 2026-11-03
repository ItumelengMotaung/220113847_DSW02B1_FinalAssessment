import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useApp } from '../context/AppContext';
import UserBanner from '../components/UserBanner';
import { Button, ErrorBox, Field } from '../components/ui';
import { SERVICES, validateBooking } from '../utils/validation';
import { friendlyError } from '../utils/authErrors';
import { colors } from '../theme';

export default function NewBookingScreen({ navigation }) {
  const { user } = useApp();
  const [serviceType, setServiceType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (busy) return;
    const found = validateBooking({ serviceType, preferredDate, notes });
    setErrors(found);
    setFormError(null);
    if (Object.keys(found).length) return;

    setBusy(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'bookings'), {
        serviceType,
        preferredDate: preferredDate.trim(),
        notes: notes.trim(),
        status: 'Pending',
        createdAt: serverTimestamp(),
      });
      navigation.goBack(); // the real-time listener shows the new booking
    } catch (e) {
      setFormError(friendlyError(e));
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <UserBanner />
        <ErrorBox message={formError} />

        <Text style={styles.label}>Service</Text>
        <View style={styles.chips}>
          {SERVICES.map((s) => {
            const active = s === serviceType;
            return (
              <Pressable key={s} onPress={() => setServiceType(s)} accessibilityRole="button"
                accessibilityState={{ selected: active }} style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{s}</Text>
              </Pressable>
            );
          })}
        </View>
        {!!errors.serviceType && <Text style={styles.error}>{errors.serviceType}</Text>}

        <View style={{ height: 14 }} />
        <Field label="Preferred date" value={preferredDate} onChangeText={setPreferredDate} error={errors.preferredDate}
          placeholder="YYYY-MM-DD" keyboardType="numbers-and-punctuation" maxLength={10} />
        <Field label="Notes" value={notes} onChangeText={setNotes} error={errors.notes}
          placeholder="Anything the clinic should know" multiline autoCapitalize="sentences" />

        <Button title="Book appointment" onPress={submit} loading={busy} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 14, borderRadius: 22, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.card, marginRight: 8, marginBottom: 8 },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontSize: 14 },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  error: { color: colors.error, fontSize: 13 },
});
