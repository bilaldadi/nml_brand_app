/**
 * i18n Configuration
 * Internationalization setup for Arabic and English
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
// Import translation files
import arTranslation from '../locales/ar/translation.json';
import enTranslation from '../locales/en/translation.json';

// Get device language - check if RTL is already set
const getDeviceLanguage = (): string => {
  try {
    console.log('I18nManager.isRTL:', I18nManager.isRTL);
    
    // If RTL is already enabled, the device is likely set to Arabic
    if (I18nManager.isRTL) {
      console.log('Device is RTL - using Arabic');
      return 'ar';
    }
    
    console.log('Device is LTR - using English');
    return 'en';
  } catch (error) {
    console.error('Error getting device language:', error);
    return 'ar'; // Default to Arabic
  }
};

const deviceLanguage = getDeviceLanguage();

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    lng: deviceLanguage,
    fallbackLng: 'ar',
    debug: __DEV__,
    
    resources: {
      ar: {
        translation: arTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;
