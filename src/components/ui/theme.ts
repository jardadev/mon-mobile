// src/components/ui/theme.ts

/**
 * App color palette
 * Defines consistent colors to use throughout the app
 */
export const colors = {
  // Primary color and variants
  primary: '#4A90E2',
  primaryLight: '#6AACFF',
  primaryDark: '#2A70C2',

  // Secondary color and variants
  secondary: '#50E3C2',
  secondaryLight: '#70FFE2',
  secondaryDark: '#30C3A2',

  // Background colors
  background: '#F8F8F8',
  card: '#FFFFFF',

  // Text colors
  textPrimary: '#333333',
  textSecondary: '#767676',

  // Status colors
  success: '#4CD964',
  warning: '#FFCC00',
  danger: '#FF5151',

  // State colors
  sleeping: '#6A7CFF',
  hungry: '#FFAE00',
  sick: '#FF6B6B',
  happy: '#4CD964',
};

/**
 * App spacing
 * Consistent spacing values for margin, padding, etc.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * App font sizes
 * Consistent text sizes
 */
export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

/**
 * App border radius values
 * Consistent corner rounding
 */
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  round: 999,
};

/**
 * Shadow styles
 * Consistent elevation effects
 */
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
};

/**
 * Theme object
 * Combines all theme elements for easy access
 */
export const theme = {
  colors,
  spacing,
  fontSizes,
  borderRadius,
  shadows,
};

/**
 * Theme type
 * TypeScript type for the theme object
 */
export type Theme = typeof theme;
