import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useApp } from '../context/AppContext';
import UserBanner from '../components/UserBanner';
import { Button, ErrorBox } from '../components/ui';
import { friendlyError } from '../utils/authErrors';
import { colors } from '../theme';
import { ActivityIndicator } from 'react-native';

function BookingCard({ booking, onCancel }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.service}>{booking.serviceType}</Text>
        <Text style={styles.status}>{booking.status}</Text>
      </View>
      <Text style={styles.date}>📅 {booking.preferredDate}</Text>
      {!!booking.notes && <Text style={styles.notes}>{booking.notes}</Text>}
      <Button variant="outline" title="Cancel booking" onPress={() => onCancel(booking)} />
    </View>
  );
}

export default function BookingsScreen({ navigation }) {
  const { user, bookings, bookingsLoading, bookingsError } = useApp();
  const [actionError, setActionError] = useState(null);

  const cancel = (booking) =>
    Alert.alert('Cancel booking?', `${booking.serviceType} on ${booking.preferredDate}`, [
      { text: 'Keep it', style: 'cancel' },
      {
        text: 'Cancel booking',
        style: 'destructive',
        onPress: async () => {
          setActionError(null);
          try {
            await deleteDoc(doc(db, 'users', user.uid, 'bookings', booking.id));
          } catch (e) {
            setActionError(friendlyError(e));
          }
        },
      },
    ]);

  const header = (
    <View>
      <UserBanner />
      <Button title="+ New booking" onPress={() => navigation.navigate('NewBooking')} />
      <ErrorBox message={actionError || bookingsError} />
      <Text style={styles.section}>Your bookings</Text>
    </View>
  );

  const footer = <View style={{ marginTop: 20 }}><Button variant="outline" title="Log out" onPress={() => signOut(auth)} /></View>;

  let empty = null;
  if (bookingsLoading) empty = <ActivityIndicator style={{ marginTop: 24 }} color={colors.primary} />;
  else if (!bookingsError) empty = <Text style={styles.empty}>No bookings yet. Tap “New booking” to make one.</Text>;

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={bookings}
      keyExtractor={(b) => b.id} // Firestore document id = stable key
      ListHeaderComponent={header}
      ListEmptyComponent={empty}
      ListFooterComponent={footer}
      renderItem={({ item }) => <BookingCard booking={item} onCancel={cancel} />}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16 },
  section: { fontSize: 18, fontWeight: '800', color: colors.text, marginTop: 18, marginBottom: 10 },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 14, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  service: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1, paddingRight: 8 },
  status: { backgroundColor: colors.pendingBg, color: colors.pendingText, fontWeight: '700', fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, overflow: 'hidden' },
  date: { marginTop: 6, color: colors.muted },
  notes: { marginTop: 6, marginBottom: 10, color: colors.text },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 24 },
});
