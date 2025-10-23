/**
 * Language Switcher Component
 * Toggle between Arabic and English
 */

import { Colors, Spacing, Typography } from '@/constants';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../i18n/LanguageContext';

interface LanguageSwitcherProps {
  style?: any;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ style }) => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    changeLanguage(newLanguage);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={handleLanguageToggle}
      activeOpacity={0.7}
    >
      <View style={styles.languageContainer}>
        <Text style={styles.languageText}>
          {currentLanguage === 'ar' ? 'العربية' : 'English'}
        </Text>
        <Text style={styles.switchText}>
          {currentLanguage === 'ar' ? 'EN' : 'ع'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  languageText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
  },
  switchText: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
});
