/**
 * Global Text Configuration
 * Sets default font for all Text components in React Native
 */

import { Typography } from '@/constants';
import React from 'react';
import { Text, TextInput } from 'react-native';

/**
 * Apply default font to all Text components
 * Call this once in your root layout
 */
export const configureGlobalFonts = () => {
  // Override default Text component props
  const oldTextRender = (Text as any).render;
  const oldTextInputRender = (TextInput as any).render;

  if (oldTextRender) {
    (Text as any).render = function (...args: any[]) {
      const origin = oldTextRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [{ fontFamily: Typography.fonts.regular }, origin.props.style],
      });
    };
  }

  if (oldTextInputRender) {
    (TextInput as any).render = function (...args: any[]) {
      const origin = oldTextInputRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [{ fontFamily: Typography.fonts.regular }, origin.props.style],
      });
    };
  }
};

