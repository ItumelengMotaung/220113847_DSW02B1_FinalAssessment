import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme';

export function Chip({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: active }}
      style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

export default function Controls({ search, onSearch, categories, category, onCategory, maxPrice, onMaxPrice }) {
  return (
    <View>
      <TextInput style={styles.input} value={search} onChangeText={onSearch} placeholder="Search items (e.g. maize)"
        placeholderTextColor={colors.muted} autoCorrect={false} accessibilityLabel="Search items" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
        {categories.map((c) => <Chip key={c} label={c} active={c === category} onPress={() => onCategory(c)} />)}
      </ScrollView>
      <TextInput style={styles.input} value={maxPrice} onChangeText={(t) => onMaxPrice(t.replace(/[^0-9.]/g, ''))}
        placeholder="Maximum price (R)" placeholderTextColor={colors.muted} keyboardType="numeric" accessibilityLabel="Maximum price" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 14, minHeight: 48, fontSize: 16, color: colors.text },
  chip: { minHeight: 40, justifyContent: 'center', paddingHorizontal: 14, borderRadius: 20, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.card, marginRight: 8 },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontSize: 14 },
  chipTextActive: { color: '#fff', fontWeight: '700' },
});
