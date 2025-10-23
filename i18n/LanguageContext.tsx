/**
 * Language Context
 * Manages language state using device language settings (iOS standard)
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DevSettings, I18nManager } from 'react-native';
import i18n from './index';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: 'ar' | 'en') => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Get device language - check if RTL is set
const getDeviceLanguage = (): string => {
  try {
    console.log('LanguageContext - I18nManager.isRTL:', I18nManager.isRTL);
    return I18nManager.isRTL ? 'ar' : 'en';
  } catch (error) {
    console.error('Error getting device language:', error);
    return 'ar';
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const deviceLang = getDeviceLanguage();
  const [currentLanguage, setCurrentLanguage] = useState<string>(deviceLang);
  const [isRTL, setIsRTL] = useState<boolean>(deviceLang === 'ar');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize with device language
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const language = getDeviceLanguage();
        
        await i18n.changeLanguage(language);
        setCurrentLanguage(language);
        setIsRTL(language === 'ar');
        
        // Set RTL/LTR based on device language
        I18nManager.forceRTL(language === 'ar');
        I18nManager.allowRTL(language === 'ar');
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing language:', error);
        setIsInitialized(true);
      }
    };

    initializeLanguage();
  }, []);

  const changeLanguage = async (language: 'ar' | 'en') => {
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      setIsRTL(language === 'ar');
      
      // Update RTL/LTR layout
      I18nManager.forceRTL(language === 'ar');
      I18nManager.allowRTL(language === 'ar');

      // Reload app to apply RTL/LTR layout changes across the app
      // Try expo-updates first (if compiled in dev client), fall back to DevSettings.reload
      try {
        const Updates = await import('expo-updates');
        if (Updates?.reloadAsync) {
          await Updates.reloadAsync();
          return;
        }
      } catch (_) {
        // ignore and fall back
      }
      if (DevSettings?.reload) {
        DevSettings.reload();
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
      setIsRTL(lng === 'ar');
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  // Don't render until language is initialized
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
