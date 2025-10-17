/**
 * Logo Component
 * Displays the NML brand logo with optional sizing
 */

import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const LOGO_SIZES = {
  small: { width: 93, height: 60 },  // Half size
  medium: { width: 186, height: 120 }, // Original size
  large: { width: 279, height: 180 },  // 1.5x size
};

export const Logo: React.FC<LogoProps> = ({ size = 'medium', style }) => {
  const dimensions = LOGO_SIZES[size];

  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={[styles.logo, dimensions]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // Dimensions will be set by the size prop
  },
});

