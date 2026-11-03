import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ReportCard from './components/ReportCard';
import { initialReports } from './data';

export default function App() {
  const [reports, setReports] = useState(initialReports);

  function toggleResolved(id) {
    const updated = reports.map((r) =>
      r.id === id ? { ...r, resolved: !r.resolved } : r
    );
    setReports(updated);
  }

  const openCount = reports.filter((r) => !r.resolved).length;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>MuniFix SA</Text>
        <View style={styles.counter}>
          <Text style={styles.counterText}>Open Reports: {openCount}</Text>
        </View>
      </View>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ReportCard report={item} onToggle={toggleResolved} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F7F2' },
  header: { backgroundColor: '#0A2472', paddingHorizontal: 16, paddingTop: 48, paddingBottom: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  counter: { alignSelf: 'flex-start', marginTop: 10, backgroundColor: '#FFB612', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 6 },
  counterText: { color: '#14202B', fontWeight: '800', fontSize: 15 },
  list: { padding: 16 },
});
