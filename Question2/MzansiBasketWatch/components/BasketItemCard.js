import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { formatRand } from '../utils/format';

export default function BasketItemCard({ item, watched, onToggleWatch }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.meta}>{item.store} · {item.area}, {item.province}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>{formatRand(item.price)}</Text>
        <Pressable
          onPress={() => onToggleWatch(item.id)}
          accessibilityRole="button"
          accessibilityLabel={watched ? `Remove ${item.name} from watchlist` : `Add ${item.name} to watchlist`}
          style={[styles.btn, watched && styles.btnActive]}
        >
          <Text style={[styles.btnText, watched && styles.btnTextActive]}>{watched ? '★ Watching' : '☆ Watch'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 14, padding: 14, marginBottom: 10, elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  info: { flex: 1, paddingRight: 8 },
  name: { fontSize: 17, fontWeight: '700', color: colors.text },
  category: { fontSize: 13, color: colors.primary, fontWeight: '600', marginTop: 2 },
  meta: { fontSize: 13, color: colors.muted, marginTop: 4 },
  right: { alignItems: 'flex-end', justifyContent: 'space-between' },
  price: { fontSize: 18, fontWeight: '800', color: colors.text },
  btn: { minHeight: 40, paddingHorizontal: 12, justifyContent: 'center', borderRadius: 20, borderWidth: 1.5, borderColor: colors.primary },
  btnActive: { backgroundColor: colors.primary },
  btnText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  btnTextActive: { color: '#fff' },
});
