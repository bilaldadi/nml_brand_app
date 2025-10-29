/**
 * Root Layout
 * Configures navigation structure for the entire app
 */

import { Colors } from '@/constants';
import {
  NotoSansArabic_400Regular,
  NotoSansArabic_500Medium,
  NotoSansArabic_600SemiBold,
  NotoSansArabic_700Bold,
  useFonts,
} from '@expo-google-fonts/noto-sans-arabic';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OfferProvider } from '../contexts/OfferContext';
import '../i18n'; // Initialize i18n
import { LanguageProvider } from '../i18n/LanguageContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    NotoSansArabic_400Regular,
    NotoSansArabic_500Medium,
    NotoSansArabic_600SemiBold,
    NotoSansArabic_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Set default font for all Text components globally
  useEffect(() => {
    if (fontsLoaded) {
      // Apply Noto Sans Arabic as default font for all Text components
      const { Text, TextInput } = require('react-native');
      
      const oldRender = Text.render;
      if (oldRender) {
        Text.render = function (...args: any[]) {
          const origin = oldRender.call(this, ...args);
          return {
            ...origin,
            props: {
              ...origin.props,
              style: [{ fontFamily: 'NotoSansArabic_400Regular' }, origin.props.style],
            },
          };
        };
      }

      const oldInputRender = TextInput.render;
      if (oldInputRender) {
        TextInput.render = function (...args: any[]) {
          const origin = oldInputRender.call(this, ...args);
          return {
            ...origin,
            props: {
              ...origin.props,
              style: [{ fontFamily: 'NotoSansArabic_400Regular' }, origin.props.style],
            },
          };
        };
      }
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <OfferProvider>
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
        </OfferProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
