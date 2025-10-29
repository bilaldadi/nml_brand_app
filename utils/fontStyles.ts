/**
 * Font Style Utilities
 * Helper functions to apply Noto Sans Arabic fonts
 */

import { Typography } from '@/constants';
import { TextStyle } from 'react-native';

/**
 * Get font family based on weight
 */
export const getFontFamily = (weight?: keyof typeof Typography.weights): string => {
  switch (weight) {
    case 'bold':
      return Typography.fonts.bold;
    case 'semibold':
      return Typography.fonts.semibold;
    case 'medium':
      return Typography.fonts.medium;
    case 'regular':
    default:
      return Typography.fonts.regular;
  }
};

/**
 * Create text style with font family
 */
export const createTextStyle = (
  fontSize?: number,
  fontWeight?: keyof typeof Typography.weights,
  additionalStyles?: TextStyle
): TextStyle => {
  return {
    fontFamily: getFontFamily(fontWeight),
    fontSize: fontSize || Typography.sizes.base,
    ...additionalStyles,
  };
};

/**
 * Apply font family to text styles
 * Use this in your StyleSheet definitions for Text components
 */
export const withFont = (
  styles: TextStyle,
  weight?: keyof typeof Typography.weights
): TextStyle => {
  return {
    ...styles,
    fontFamily: getFontFamily(weight),
  };
};

