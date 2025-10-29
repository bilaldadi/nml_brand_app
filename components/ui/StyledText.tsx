/**
 * Styled Text Component
 * Automatically applies Noto Sans Arabic font to all text
 */

import { Typography } from '@/constants';
import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

interface StyledTextProps extends TextProps {
  weight?: keyof typeof Typography.weights;
}

export const StyledText: React.FC<StyledTextProps> = ({ 
  style, 
  weight = 'regular',
  ...props 
}) => {
  const getFontFamily = () => {
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

  const fontStyle: TextStyle = {
    fontFamily: getFontFamily(),
  };

  return <RNText style={[fontStyle, style]} {...props} />;
};

// Convenience exports for different weights
export const RegularText: React.FC<TextProps> = (props) => (
  <StyledText weight="regular" {...props} />
);

export const MediumText: React.FC<TextProps> = (props) => (
  <StyledText weight="medium" {...props} />
);

export const SemiBoldText: React.FC<TextProps> = (props) => (
  <StyledText weight="semibold" {...props} />
);

export const BoldText: React.FC<TextProps> = (props) => (
  <StyledText weight="bold" {...props} />
);

