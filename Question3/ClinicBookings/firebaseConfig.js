import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: 'AIzaSyAhYuRrEvLBDSSQAx-pH4Kjg37LWjbak48',
  authDomain: 'gautengclinicnetworkapp.firebaseapp.com',
  projectId: 'gautengclinicnetworkapp',
  storageBucket: 'gautengclinicnetworkapp.firebasestorage.app',
  messagingSenderId: '511297543668',
  appId: '1:511297543668:web:a0d426c8fdd55e903e6da1',
};

const isNewApp = getApps().length === 0;
const app = isNewApp ? initializeApp(firebaseConfig) : getApp();


export const auth = isNewApp
  ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
  : getAuth(app);

export const db = getFirestore(app);
