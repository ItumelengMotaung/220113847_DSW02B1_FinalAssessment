import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import RouteCard from '../components/RouteCard';
import FilterChips from '../components/FilterChips';
import { routes, FILTERS, categoryOf } from '../data/routes';
import { colors } from '../theme';

export default function HomeScreen({ navigation }) {
  const [mode, setMode] = useState('All');
  const [maxFareText, setMaxFareText] = useState('');

  
  const visibleRoutes = useMemo(() => {
    const max = parseFloat(maxFareText);
    const hasMax = maxFareText.trim() !== '' && !Number.isNaN(max);
    return routes.filter((r) => {
      const modeOk = mode === 'All' || categoryOf(r.mode) === mode;
      const fareOk = !hasMax || r.fare <= max;
      return modeOk && fareOk; 
    });
  }, [mode, maxFareText]);

  const header = (
    <View>
      <Text style={styles.title}>Gauteng Commuter</Text>
      <Text style={styles.subtitle}>Tap a route for details or to report a problem</Text>

      <FilterChips options={FILTERS} selected={mode} onSelect={setMode} />

      <Text style={styles.label}>Maximum fare (R)</Text>
      <TextInput
        style={styles.input}
        value={maxFareText}
        onChangeText={(t) => setMaxFareText(t.replace(/[^0-9.]/g, ''))}
        placeholder="e.g. 25"
        placeholderTextColor={colors.muted}
        keyboardType="numeric"
        accessibilityLabel="Maximum fare"
      />
      <Text style={styles.count}>
        {visibleRoutes.length} route{visibleRoutes.length === 1 ? '' : 's'} found
      </Text>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={visibleRoutes}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={header}
      ListEmptyComponent={<Text style={styles.empty}>No routes match your filters.</Text>}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        
        <RouteCard route={item} onPress={() => navigation.navigate('RouteDetails', { route: item })} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16 },
  title: { fontSize: 26, fontWeight: '800', color: colors.navy },
  subtitle: { fontSize: 14, color: colors.muted, marginBottom: 16, marginTop: 2 },
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
  count: { marginVertical: 12, color: colors.muted, fontSize: 13 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 24, fontSize: 15 },
});
