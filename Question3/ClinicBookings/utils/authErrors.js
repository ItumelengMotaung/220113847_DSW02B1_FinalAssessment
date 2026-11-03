
const MESSAGES = {
  'auth/invalid-email': 'That email address is not valid.',
  'auth/missing-email': 'Please enter your email address.',
  'auth/missing-password': 'Please enter your password.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/invalid-login-credentials': 'Incorrect email or password.',
  'auth/email-already-in-use': 'An account with this email already exists. Try logging in.',
  'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed': 'Network error. Check your internet connection.',
  'auth/user-disabled': 'This account has been disabled.',
  'permission-denied': 'You do not have permission to do that.',
  unavailable: 'Service unavailable. Check your connection and try again.',
};

export function friendlyError(error) {
  const code = error?.code?.replace('firestore/', '');
  return MESSAGES[error?.code] || MESSAGES[code] || 'Something went wrong. Please try again.';
}
