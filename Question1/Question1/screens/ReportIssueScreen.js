import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../theme';

const CATEGORIES = ['Delay', 'Safety', 'Cleanliness', 'Overcharging', 'Other'];
const EMPTY = { name: '', cellphone: '', category: '', description: '' };


export function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Commuter name is required.';
  if (!/^0\d{9}$/.test(values.cellphone)) {
    errors.cellphone = 'Cellphone must be exactly 10 digits and start with 0.';
  }
  if (!values.category) errors.category = 'Please select an issue category.';
  if (values.description.trim().length < 20) {
    errors.description = `Description must be at least 20 characters (${values.description.trim().length}/20).`;
  }
  return errors;
}

export default function ReportIssueScreen({ route: nav }) {
  const { route } = nav.params;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);

  const setField = (field) => (text) => {
    setValues((v) => ({ ...v, [field]: text }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = () => {
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const report = {
      routeId: route.id,
      ...values,
      name: values.name.trim(),
      description: values.description.trim(),
      submittedAt: new Date().toLocaleString('en-ZA'), 
    };
    setConfirmation(report);
    setValues(EMPTY); 
    setErrors({});
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>
          Reporting: {route.mode} ({route.from} → {route.to})
        </Text>

        {confirmation && (
          <View style={styles.confirm} accessibilityLiveRegion="polite">
            <Text style={styles.confirmTitle}>✔ Report submitted</Text>
            <Text style={styles.confirmLine}>Route: {confirmation.routeId}</Text>
            <Text style={styles.confirmLine}>Name: {confirmation.name}</Text>
            <Text style={styles.confirmLine}>Cellphone: {confirmation.cellphone}</Text>
            <Text style={styles.confirmLine}>Category: {confirmation.category}</Text>
            <Text style={styles.confirmLine}>Description: {confirmation.description}</Text>
            <Text style={styles.confirmLine}>Submitted: {confirmation.submittedAt}</Text>
          </View>
        )}

        <Field label="Commuter name" error={errors.name}>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={values.name}
            onChangeText={setField('name')}
            placeholder="Full name"
            placeholderTextColor={colors.muted}
          />
        </Field>

        <Field label="Cellphone number" error={errors.cellphone}>
          <TextInput
            style={[styles.input, errors.cellphone && styles.inputError]}
            value={values.cellphone}
            onChangeText={(t) => setField('cellphone')(t.replace(/\D/g, '').slice(0, 10))}
            placeholder="0821234567"
            placeholderTextColor={colors.muted}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </Field>

        <Field label="Issue category" error={errors.category}>
          <View style={styles.chipRow}>
            {CATEGORIES.map((c) => {
              const active = values.category === c;
              return (
                <Pressable
                  key={c}
                  onPress={() => setField('category')(c)}
                  style={[styles.chip, active && styles.chipActive]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
                </Pressable>
              );
            })}
          </View>
        </Field>

        <Field label="Description" error={errors.description}>
          <TextInput
            style={[styles.input, styles.multiline, errors.description && styles.inputError]}
            value={values.description}
            onChangeText={setField('description')}
            placeholder="Describe the problem (min. 20 characters)"
            placeholderTextColor={colors.muted}
            multiline
            textAlignVertical="top"
          />
        </Field>

        <Pressable style={styles.submit} onPress={handleSubmit} accessibilityRole="button">
          <Text style={styles.submitText}>Submit report</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, error, children }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 40 },
  heading: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 16 },
  field: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 6 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    minHeight: 48,
    fontSize: 16,
    color: colors.text,
  },
  multiline: { minHeight: 110, paddingTop: 12 },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, fontSize: 13, marginTop: 6 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontSize: 15 },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  submit: {
    backgroundColor: colors.primary,
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  confirm: {
    backgroundColor: colors.okBg,
    borderColor: colors.ok,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  confirmTitle: { color: colors.ok, fontWeight: '800', fontSize: 16, marginBottom: 6 },
  confirmLine: { color: colors.text, fontSize: 14, marginTop: 2 },
});
