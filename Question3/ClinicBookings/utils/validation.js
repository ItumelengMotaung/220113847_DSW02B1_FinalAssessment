export const SERVICES = ['General consultation', 'Chronic medicine collection', 'Immunisation enquiry'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCredentials(email, password, confirm) {
  const errors = {};
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address.';
  if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
  if (confirm !== undefined && confirm !== password) errors.confirm = 'Passwords do not match.';
  return errors;
}

export function validateBooking({ serviceType, preferredDate, notes }) {
  const errors = {};
  if (!SERVICES.includes(serviceType)) errors.serviceType = 'Please choose a service.';

  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(preferredDate.trim());
  if (!m) {
    errors.preferredDate = 'Use the format YYYY-MM-DD (e.g. 2026-12-01).';
  } else {
    const [, y, mo, d] = m.map(Number);
    const date = new Date(y, mo - 1, d);
    const real = date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (!real) errors.preferredDate = 'That date does not exist.';
    else if (date < today) errors.preferredDate = 'Choose today or a future date.';
  }
  if (notes.trim().length < 5) errors.notes = 'Please add a short note (at least 5 characters).';
  return errors;
}
