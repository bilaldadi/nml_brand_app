/**
 * SearchBar Component
 * Search input overlay for finding stores and suppliers
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { SearchNormal1 } from 'iconsax-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.overlaySearchContainer}>
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
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    justifyContent: 'space-between',
  },
  searchInput: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
  },
});
