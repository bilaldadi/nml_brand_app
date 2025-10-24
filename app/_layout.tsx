/**
 * Root Layout
 * Configures navigation structure for the entire app
 */

import { Colors } from '@/constants';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../i18n'; // Initialize i18n
import { LanguageProvider } from '../i18n/LanguageContext';

export default function RootLayout() {
  // useEffect(() => {
  //   // RTL is controlled by LanguageProvider (based on user/device language)
  // }, []);

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: 'slide_from_left',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="account" />
          <Stack.Screen 
            name="auth/login" 
            options={{
              presentation: 'card',
            }}
          />
          <Stack.Screen 
            name="auth/otp" 
            options={{
              presentation: 'card',
            }}
          />
          <Stack.Screen 
            name="home"
            options={{
              gestureEnabled: false, // Prevent going back after login
            }}
          />
          <Stack.Screen name="products" />
          <Stack.Screen name="offers" />
          <Stack.Screen name="orders" />
          <Stack.Screen name="reports" />
        </Stack>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
