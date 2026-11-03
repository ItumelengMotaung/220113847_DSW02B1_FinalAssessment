import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function LoadingView() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Loading basket prices…</Text>
    </View>
  );
}

export function ErrorView({ message, onRetry }) {
  return (
    <View style={[styles.center, styles.errorBox]}>
      <Text style={styles.errorTitle}>Couldn’t load prices</Text>
      <Text style={styles.text}>{message}</Text>
      <Text style={styles.text}>No saved data is available on this device yet.</Text>
      <Pressable style={styles.button} onPress={onRetry} accessibilityRole="button">
        <Text style={styles.buttonText}>Try again</Text>
      </Pressable>
    </View>
  );
}

export function EmptyView({ text }) {
  return <Text style={styles.empty}>{text}</Text>;
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  text: { color: colors.muted, textAlign: 'center', marginTop: 8, fontSize: 14 },
  errorBox: { backgroundColor: colors.errorBg, borderRadius: 14, margin: 16 },
  errorTitle: { color: colors.error, fontSize: 18, fontWeight: '800' },
  button: { marginTop: 16, backgroundColor: colors.primary, minHeight: 48, paddingHorizontal: 24, borderRadius: 12, justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 28, fontSize: 15 },
});
