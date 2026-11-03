import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Button, ErrorBox, Field } from '../components/ui';
import { friendlyError } from '../utils/authErrors';
import { validateCredentials } from '../utils/validation';
import { colors } from '../theme';


export default function AuthScreen({ navigation, mode }) {
  const isRegister = mode === 'register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (busy) return;
    const found = validateCredentials(email, password, isRegister ? confirm : undefined);
    setErrors(found);
    setFormError(null);
    if (Object.keys(found).length) return;

    setBusy(true); 
    try {
      if (isRegister) {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
  
        setDoc(doc(db, 'users', cred.user.uid), { email: cred.user.email, createdAt: serverTimestamp() }).catch(() => {});
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      
    } catch (e) {
      setFormError(friendlyError(e));
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Gauteng Clinic Network</Text>
        <Text style={styles.sub}>{isRegister ? 'Create your patient account' : 'Sign in to manage your bookings'}</Text>

        <ErrorBox message={formError} />
        <Field label="Email" value={email} onChangeText={setEmail} error={errors.email}
          keyboardType="email-address" autoComplete="email" placeholder="you@example.com" />
        <Field label="Password" value={password} onChangeText={setPassword} error={errors.password}
          secureTextEntry autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder="At least 6 characters" />
        {isRegister && (
          <Field label="Confirm password" value={confirm} onChangeText={setConfirm} error={errors.confirm}
            secureTextEntry placeholder="Repeat password" />
        )}

        <Button title={isRegister ? 'Create account' : 'Log in'} onPress={submit} loading={busy} />
        <Button variant="outline" disabled={busy}
          title={isRegister ? 'I already have an account' : 'Create a new account'}
          onPress={() => navigation.navigate(isRegister ? 'Login' : 'Register')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingTop: 40 },
  title: { fontSize: 26, fontWeight: '800', color: colors.navy },
  sub: { color: colors.muted, marginTop: 4, marginBottom: 22 },
});
