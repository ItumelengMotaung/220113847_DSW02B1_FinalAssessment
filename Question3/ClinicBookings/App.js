import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './context/AppContext';
import AuthScreen from './screens/AuthScreen';
import BookingsScreen from './screens/BookingsScreen';
import NewBookingScreen from './screens/NewBookingScreen';
import { Splash } from './components/ui';
import { colors } from './theme';

const Stack = createNativeStackNavigator();
const header = { headerStyle: { backgroundColor: colors.navy }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: '700' } };

const LoginScreen = (props) => <AuthScreen {...props} mode="login" />;
const RegisterScreen = (props) => <AuthScreen {...props} mode="register" />;

function RootNavigator() {
  const { user, authLoading } = useApp();

  
  if (authLoading) return <Splash />;

  return (
    <Stack.Navigator screenOptions={header}>
      {user ? (
        
        <>
          <Stack.Screen name="Bookings" component={BookingsScreen} options={{ title: 'My Bookings' }} />
          <Stack.Screen name="NewBooking" component={NewBookingScreen} options={{ title: 'New Booking' }} />
        </>
      ) : (
        
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log in' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {/* it wraps the navigator so every screen can read the shared values */}
      <AppProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
