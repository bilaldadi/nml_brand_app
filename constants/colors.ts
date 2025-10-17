/**
 * Color constants for the NML brand app
 * Following the brand colors from the design
 */

export const Colors = {
  // Brand Colors
  primary: '#E84650', // NML Red
  primaryDark: '#C14444',
  primaryLight: '#E57676',
  
  // Neutral Colors
  background: '#F5F5F5',
  white: '#FFFFFF',
  black: '#2C2C2C',
  
  // Text Colors
  textPrimary: '#2C2C2C',
  textSecondary: '#8A8A8A',
  textLight: '#B8B8B8',
  
  // UI Colors
  border: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Status Colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
} as const;

export type ColorKey = keyof typeof Colors;

