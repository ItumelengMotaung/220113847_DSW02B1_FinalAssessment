import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme';

export function Field({ label, error, ...inputProps }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, inputProps.multiline && styles.multiline, error && styles.inputError]}
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        {...inputProps}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

export function Button({ title, onPress, loading, disabled, variant = 'primary' }) {
  const off = loading || disabled;
  return (
    <Pressable
      onPress={onPress}
      disabled={off}
      accessibilityRole="button"
      accessibilityState={{ disabled: off }}
      style={[styles.btn, variant === 'outline' && styles.btnOutline, off && styles.btnOff]}
    >
      {loading ? <ActivityIndicator color={variant === 'outline' ? colors.primary : '#fff'} /> :
        <Text style={[styles.btnText, variant === 'outline' && { color: colors.primary }]}>{title}</Text>}
    </Pressable>
  );
}

export function ErrorBox({ message }) {
  if (!message) return null;
  return <View style={styles.errorBox}><Text style={styles.errorBoxText}>{message}</Text></View>;
}

export function Splash() {
  return (
    <View style={styles.splash}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ color: colors.muted, marginTop: 10 }}>Checking your session…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 6 },
  input: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 14, minHeight: 48, fontSize: 16, color: colors.text },
  multiline: { minHeight: 100, paddingTop: 12, textAlignVertical: 'top' },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, fontSize: 13, marginTop: 5 },
  btn: { backgroundColor: colors.primary, minHeight: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 4, borderWidth: 1.5, borderColor: colors.primary },
  btnOutline: { backgroundColor: 'transparent' },
  btnOff: { opacity: 0.55 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  errorBox: { backgroundColor: colors.errorBg, borderRadius: 10, padding: 12, marginBottom: 14 },
  errorBoxText: { color: colors.error, fontWeight: '600' },
  splash: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
});
