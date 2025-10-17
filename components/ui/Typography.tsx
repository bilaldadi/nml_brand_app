/**
 * Typography Components
 * Reusable text components with consistent styling
 */

import { Colors, Typography as TypographyConstants } from '@/constants';
import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface TypographyProps {
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'auto';
}

export const Heading1: React.FC<TypographyProps> = ({
  children,
  style,
  color = Colors.textPrimary,
  align = 'auto',
  ...props
}) => (
  <Text
    style={[
      styles.heading1,
      { color, textAlign: align },
      style,
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Heading2: React.FC<TypographyProps> = ({
  children,
  style,
  color = Colors.textPrimary,
  align = 'auto',
  ...props
}) => (
  <Text
    style={[
      styles.heading2,
      { color, textAlign: align },
      style,
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Heading3: React.FC<TypographyProps> = ({
  children,
  style,
  color = Colors.textPrimary,
  align = 'auto',
  ...props
}) => (
  <Text
    style={[
      styles.heading3,
      { color, textAlign: align },
      style,
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const BodyText: React.FC<TypographyProps> = ({
  children,
  style,
  color = Colors.textPrimary,
  align = 'auto',
  ...props
}) => (
  <Text
    style={[
      styles.body,
      { color, textAlign: align },
      style,
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Caption: React.FC<TypographyProps> = ({
  children,
  style,
  color = Colors.textSecondary,
  align = 'auto',
  ...props
}) => (
  <Text
    style={[
      styles.caption,
      { color, textAlign: align },
      style,
    ]}
    {...props}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  heading1: {
    fontSize: TypographyConstants.sizes['3xl'],
    fontWeight: TypographyConstants.weights.bold,
    lineHeight: TypographyConstants.sizes['3xl'] * TypographyConstants.lineHeights.tight,
  },
  heading2: {
    fontSize: TypographyConstants.sizes['2xl'],
    fontWeight: TypographyConstants.weights.bold,
    lineHeight: TypographyConstants.sizes['2xl'] * TypographyConstants.lineHeights.tight,
  },
  heading3: {
    fontSize: TypographyConstants.sizes.xl,
    fontWeight: TypographyConstants.weights.semibold,
    lineHeight: TypographyConstants.sizes.xl * TypographyConstants.lineHeights.normal,
  },
  body: {
    fontSize: TypographyConstants.sizes.base,
    fontWeight: TypographyConstants.weights.regular,
    lineHeight: TypographyConstants.sizes.base * TypographyConstants.lineHeights.normal,
  },
  caption: {
    fontSize: TypographyConstants.sizes.sm,
    fontWeight: TypographyConstants.weights.regular,
    lineHeight: TypographyConstants.sizes.sm * TypographyConstants.lineHeights.normal,
  },
});

