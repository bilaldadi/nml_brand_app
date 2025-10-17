/**
 * Root Layout
 * Configures navigation structure for the entire app
 */

import { Colors } from '@/constants';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { I18nManager } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    // Enable RTL for Arabic
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    }
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'slide_from_left',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
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
    </Stack>
  );
}
