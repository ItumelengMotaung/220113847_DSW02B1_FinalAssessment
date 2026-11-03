import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';


export default function RouteCard({ route, onPress }) {
  const delayed = route.status === 'Delayed';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${route.mode} from ${route.from} to ${route.to}, R${route.fare}, ${route.status}`}
      style={({ pressed }) => [
        styles.card,
        delayed && styles.cardDelayed, 
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.rowBetween}>
        <Text style={styles.mode}>{route.mode}</Text>
        <Text style={styles.fare}>R{route.fare}</Text>
      </View>

      <Text style={styles.path}>
        {route.from} → {route.to}
      </Text>

      <View style={[styles.badge, delayed ? styles.badgeDelayed : styles.badgeOk]}>
        <Text style={[styles.badgeText, delayed ? styles.badgeTextDelayed : styles.badgeTextOk]}>
          {delayed ? '⚠ ' : '● '}
          {route.status}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: colors.ok,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardDelayed: { borderLeftColor: colors.warn, backgroundColor: colors.warnBg },
  pressed: { opacity: 0.85 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mode: { fontSize: 18, fontWeight: '700', color: colors.text },
  fare: { fontSize: 18, fontWeight: '700', color: colors.primary },
  path: { fontSize: 15, color: colors.muted, marginVertical: 8 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeOk: { backgroundColor: colors.okBg },
  badgeDelayed: { backgroundColor: colors.warn },
  badgeText: { fontSize: 13, fontWeight: '600' },
  badgeTextOk: { color: colors.ok },
  badgeTextDelayed: { color: '#fff' },
});
