import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import useBasket from './hooks/useBasket';
import useWatchlist from './hooks/useWatchlist';
import BasketItemCard from './components/BasketItemCard';
import StatusBanner from './components/StatusBanner';
import Controls, { Chip } from './components/Controls';
import { LoadingView, ErrorView, EmptyView } from './components/Message';
import { applyFilters, average, formatRand } from './utils/format';
import { colors } from './theme';

export default function App() {
  const { status, items, error, savedAt, reload } = useBasket();
  const { ids: watchIds, toggle } = useWatchlist();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');
  const [view, setView] = useState('all'); 

  const categories = useMemo(() => ['All', ...Array.from(new Set(items.map((i) => i.category))).sort()], [items]);

  const visible = useMemo(() => {
    const base = view === 'watchlist' ? items.filter((i) => watchIds.includes(i.id)) : items;
    return applyFilters(base, { search, category, maxPrice });
  }, [items, view, watchIds, search, category, maxPrice]);

  const avg = average(visible);

  const header = (
    <View>
      <Text style={styles.title}>Mzansi Basket Watch</Text>
      <StatusBanner status={status} error={error} savedAt={savedAt} />
      <View style={styles.tabs}>
        <Chip label="All items" active={view === 'all'} onPress={() => setView('all')} />
        <Chip label={`Watchlist (${watchIds.length})`} active={view === 'watchlist'} onPress={() => setView('watchlist')} />
      </View>
      <Controls search={search} onSearch={setSearch} categories={categories} category={category}
        onCategory={setCategory} maxPrice={maxPrice} onMaxPrice={setMaxPrice} />
      <View style={styles.summary}>
        <Text style={styles.summaryText}>{visible.length} result{visible.length === 1 ? '' : 's'}</Text>
        <Text style={styles.summaryText}>Average: {visible.length ? formatRand(avg) : '–'}</Text>
      </View>
    </View>
  );

  let body;
  if (status === 'loading') body = <LoadingView />;
  else if (status === 'error') body = <ErrorView message={error} onRetry={reload} />;
  else {
    body = (
      <FlatList
        data={visible}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={header}
        keyboardShouldPersistTaps="handled"
        refreshing={false}
        onRefresh={reload}
        ListEmptyComponent={
          <EmptyView text={view === 'watchlist' && watchIds.length === 0
            ? 'Your watchlist is empty. Tap “Watch” on an item to add it.'
            : 'No items match your search and filters.'} />
        }
        renderItem={({ item }) => (
          <BasketItemCard item={item} watched={watchIds.includes(item.id)} onToggleWatch={toggle} />
        )}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="dark" />
        {body}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16 },
  title: { fontSize: 26, fontWeight: '800', color: colors.navy, marginBottom: 12, borderBottomWidth: 4, borderBottomColor: colors.gold, alignSelf: 'flex-start', paddingBottom: 4 },
  tabs: { flexDirection: 'row', marginBottom: 10 },
  summary: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
  summaryText: { fontSize: 14, fontWeight: '700', color: colors.primary },
});
