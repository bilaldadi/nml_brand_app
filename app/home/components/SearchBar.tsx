/**
 * SearchBar Component
 * Search input overlay for finding stores and suppliers
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { SearchNormal1 } from 'iconsax-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  variant?: 'overlay' | 'normal';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
  variant = 'overlay',
}) => {
  const { t } = useTranslation();
  
  return (
    <View style={variant === 'overlay' ? styles.overlaySearchContainer : styles.normalSearchContainer}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder || t('home.searchPlaceholder')}
          placeholderTextColor={Colors.textLight}
          value={value}
          onChangeText={onChangeText}
        />
        <SearchNormal1 size={20} color={Colors.textLight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlaySearchContainer: {
    position: 'absolute',
    top: 140, // Adjust based on new header height
    left: Spacing.lg,
    right: Spacing.lg,
    zIndex: 10,
  },
  normalSearchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    // width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Platform.select({
      ios: Spacing.sm,
      android: Spacing.sm,
    }),
    gap: Spacing.sm,
    justifyContent: 'space-between',
    minHeight: 48,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    // flex: 1,
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    padding: 0,
  },
});
