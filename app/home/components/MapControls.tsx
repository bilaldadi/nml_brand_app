/**
 * MapControls Component
 * Map control buttons (zoom, target) and menu button
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { Map, Menu, Target } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MapControlsProps {
  onMapPress?: () => void;
  onTargetPress?: () => void;
  onMenuPress?: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onMapPress,
  onTargetPress,
  onMenuPress,
}) => {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Map Control Buttons */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.mapButton} onPress={onMapPress}>
          <Map size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapButton} onPress={onTargetPress}>
          <Target size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Menu size={24} color={Colors.textPrimary} />
          <Text style={styles.menuText}>{t('common.menu')}</Text>
        </TouchableOpacity>
      </View>
      
    </>
  );
};

const styles = StyleSheet.create({
  mapControls: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.lg,
    gap: Spacing.sm,
    zIndex: 10,
  },
  mapButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuButton: {
    flexDirection: 'row',
    width: 109,
    height: 42,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  menuText: {
    fontSize: Typography.sizes.base,
    color: Colors.textPrimary,
    marginLeft: Spacing.md,
  },
});
