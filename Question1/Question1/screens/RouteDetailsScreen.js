import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

function Row({ label, value, valueStyle }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );
}

export default function RouteDetailsScreen({ route: nav, navigation }) {
  const { route } = nav.params; 
  const delayed = route.status === 'Delayed';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{route.mode}</Text>
        <Row label="Route ID" value={route.id} />
        <Row label="From" value={route.from} />
        <Row label="To" value={route.to} />
        <Row label="Fare" value={`R${route.fare}`} />
        <Row
          label="Status"
          value={route.status}
          valueStyle={{ color: delayed ? colors.warn : colors.ok, fontWeight: '700' }}
        />
      </View>

      <Pressable
        style={styles.button}
        accessibilityRole="button"
        onPress={() => navigation.navigate('ReportIssue', { route })}
      >
        <Text style={styles.buttonText}>Report a problem on this route</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16 },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 18, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: { color: colors.muted, fontSize: 15 },
  value: { color: colors.text, fontSize: 15, fontWeight: '600' },
  button: {
    backgroundColor: colors.primary,
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
