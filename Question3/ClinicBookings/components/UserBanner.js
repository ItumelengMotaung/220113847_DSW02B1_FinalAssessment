import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';


export default function UserBanner() {
  const { user, bookingCount } = useApp();
  return (
    <View style={styles.box}>
      <Text style={styles.email} numberOfLines={1}>{user?.email}</Text>
      <Text style={styles.count}>{bookingCount} booking{bookingCount === 1 ? '' : 's'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.navy, borderRadius: 12, padding: 12, marginBottom: 14 },
  email: { color: '#fff', fontWeight: '600', flex: 1, marginRight: 10 },
  count: { color: colors.gold, fontWeight: '800' },
});
