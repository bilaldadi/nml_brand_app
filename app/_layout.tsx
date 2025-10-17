/**
 * Root Layout
 * Configures navigation structure for the entire app
 */

import { Colors } from '@/constants';
import { Stack } from 'expo-router';

export default function RootLayout() {
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
        name="home"
        options={{
          gestureEnabled: false, // Prevent going back after login
        }}
      />
    </Stack>
  );
}
