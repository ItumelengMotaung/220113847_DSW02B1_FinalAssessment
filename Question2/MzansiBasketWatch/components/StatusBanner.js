import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function StatusBanner({ status, error, savedAt }) {
  if (status === 'live') {
    return <View style={[styles.box, { backgroundColor: colors.liveBg }]}><Text style={[styles.text, { color: colors.primary }]}>● Live prices</Text></View>;
  }
  if (status === 'cached') {
    const when = savedAt ? new Date(savedAt).toLocaleString('en-ZA') : 'earlier';
    return (
      <View style={[styles.box, { backgroundColor: colors.offlineBg }]}>
        <Text style={[styles.text, { color: colors.offlineText }]}>
          ⚠ Offline – showing cached prices saved {when}. ({error})
        </Text>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  box: { padding: 10, borderRadius: 10, marginBottom: 12 },
  text: { fontSize: 13, fontWeight: '600' },
});
