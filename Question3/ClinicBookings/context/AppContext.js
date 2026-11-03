import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { friendlyError } from '../utils/authErrors';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); 
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState(null);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  
  useEffect(() => {
    if (!user) {
      setBookings([]);
      setBookingsError(null);
      setBookingsLoading(false);
      return undefined;
    }
    setBookingsLoading(true);
    setBookingsError(null);
    const q = query(collection(db, 'users', user.uid, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setBookings(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setBookingsLoading(false);
      },
      (error) => {
        setBookingsError(friendlyError(error));
        setBookingsLoading(false);
      }
    );
    return unsubscribe; // stop listening on logout / unmount
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      authLoading,
      bookings,
      bookingCount: bookings.length, // derived value
      bookingsLoading,
      bookingsError,
    }),
    [user, authLoading, bookings, bookingsLoading, bookingsError]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
