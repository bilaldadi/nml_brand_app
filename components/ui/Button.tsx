/**
 * Reusable Button Component
 * Supports different variants and sizes
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { ButtonProps } from '@/types';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BorderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md },
      medium: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg },
      large: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xl },
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      primary: { backgroundColor: Colors.primary },
      secondary: { backgroundColor: Colors.background },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.primary,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth && { width: '100%' }),
      ...(disabled && { opacity: 0.5 }),
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: Typography.weights.semibold,
    };

    const sizeStyles: Record<string, TextStyle> = {
      small: { fontSize: Typography.sizes.sm },
      medium: { fontSize: Typography.sizes.base },
      large: { fontSize: Typography.sizes.lg },
    };

    const variantStyles: Record<string, TextStyle> = {
      primary: { color: Colors.white },
      secondary: { color: Colors.primary },
      outline: { color: Colors.primary },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.white : Colors.primary}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

