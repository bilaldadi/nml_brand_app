/**
 * FilterTags Component
 * Horizontal scrollable filter tags for offer types
 */

import { BorderRadius, Colors, MarkerType, Spacing, Typography } from '@/constants';
import { Location } from 'iconsax-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface FilterOption {
  type: MarkerType | 'all' | 'no_offers' | 'suppliers' | 'outlets';
  label: string;
  color: string;
  showIcon?: boolean;
}

interface FilterTagsProps {
  filters: FilterOption[];
  activeFilter: MarkerType | 'all' | 'no_offers' | 'suppliers' | 'outlets';
  onFilterPress: (filterType: MarkerType | 'all' | 'no_offers' | 'suppliers' | 'outlets') => void;
}

export const FilterTags: React.FC<FilterTagsProps> = ({
  filters,
  activeFilter,
  onFilterPress,
}) => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.overlayFilterContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.type}
            style={[
              styles.filterTag,
              activeFilter === filter.type && styles.filterTagActive
            ]}
            onPress={() => onFilterPress(filter.type)}
          >
            {filter.showIcon !== false && (
              <Location 
                size={13} 
                color={filter.color}
                variant="Bold"
              />
            )}
            <Text 
              style={[
                styles.filterText,
                activeFilter === filter.type && styles.filterTextActive
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayFilterContainer: {
    position: 'absolute',
    top: 195, // Adjust based on search bar height
    left: 0,
    right: 0,
    zIndex: 10,
  },
  filterScroll: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  filterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
    marginRight: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTagActive: {
    backgroundColor: '#FCE7E8',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  filterText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.weights.medium,
  },
  filterTextActive: {
    color: Colors.primary,
  },
});
