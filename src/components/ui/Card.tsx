// src/components/ui/Card.tsx

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, shadows } from './theme';

/**
 * Card component props
 */
interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;

  /**
   * Optional additional styling
   */
  style?: ViewStyle;

  /**
   * Whether to add shadow effect
   */
  elevated?: boolean;
}

/**
 * Card component
 * Container with consistent styling for content sections
 */
export const Card: React.FC<CardProps> = ({ children, style, elevated = true }) => {
  return <View style={[styles.card, elevated && styles.elevated, style]}>{children}</View>;
};

/**
 * Card styles
 */
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: 16,
  },
  elevated: {
    ...shadows.md,
  },
});
