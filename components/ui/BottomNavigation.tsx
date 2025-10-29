/**
 * Bottom Navigation Component
 * Main navigation bar for the app
 */

import { Colors, Spacing, Typography } from '@/constants';
import { Box, Category, Diagram, DiscountShape, Home2 } from 'iconsax-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface NavigationTab {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
  onPress: () => void;
}

interface BottomNavigationProps {
  tabs: NavigationTab[];
}

const getIcon = (iconName: string, isActive: boolean) => {
  const iconProps = {
    size: 22,
    color: isActive ? Colors.primary : Colors.textSecondary,
  };

  switch (iconName) {
    case 'home':
      return <Home2 {...iconProps} />;
    case 'grid-3x3':
      return <Category {...iconProps} />;
    case 'percent':
      return <DiscountShape {...iconProps} />;
    case 'package':
      return <Box {...iconProps} />;
    case 'bar-chart-3':
      return <Diagram {...iconProps} />;
    default:
      return <Home2 {...iconProps} />;
  }
};

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ tabs }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={tab.onPress}
          activeOpacity={0.7}
        >
          {getIcon(tab.icon, tab.active || false)}
          <Text style={[styles.label, tab.active && styles.labelActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  icon: {
    marginBottom: Spacing.xs,
  },
  label: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  labelActive: {
    color: Colors.primary,
  },
});

