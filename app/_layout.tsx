/**
 * Root Layout
 * Configures navigation structure for the entire app
 */

import { Colors } from '@/constants';
import { Stack } from 'expo-router';
import { I18nManager } from 'react-native';
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
            animation: I18nManager.isRTL ? 'slide_from_left' : 'slide_from_right',
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="welcome"/>
          <Stack.Screen name="(tabs)" />
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
        </Stack>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
