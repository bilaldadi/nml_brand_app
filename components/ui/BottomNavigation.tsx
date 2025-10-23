/**
 * Bottom Navigation Component
 * Main navigation bar for the app
 */

import { Colors, Spacing, Typography } from '@/constants';
import { BarChart3, Grid3X3, Home, Package, Percent } from 'lucide-react-native';
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
    size: 20,
    color: isActive ? Colors.primary : Colors.textSecondary,
  };

  switch (iconName) {
    case 'home':
      return <Home {...iconProps} />;
    case 'grid-3x3':
      return <Grid3X3 {...iconProps} />;
    case 'percent':
      return <Percent {...iconProps} />;
    case 'package':
      return <Package {...iconProps} />;
    case 'bar-chart-3':
      return <BarChart3 {...iconProps} />;
    default:
      return <Home {...iconProps} />;
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

