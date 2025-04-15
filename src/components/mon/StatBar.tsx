// src/components/mon/StatBar.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSizes, borderRadius } from '../ui/theme';

/**
 * StatBar props interface
 */
interface StatBarProps {
  /**
   * Label for the stat
   */
  label: string;

  /**
   * Current value
   */
  value: number;

  /**
   * Maximum possible value
   */
  maxValue: number;

  /**
   * Color for the progress bar
   */
  color?: string;
}

/**
 * StatBar component
 * Displays a progress bar for a mon stat
 */
export const StatBar: React.FC<StatBarProps> = ({
  label,
  value,
  maxValue,
  color = colors.primary,
}) => {
  // Calculate percentage filled
  const percentage = Math.min(100, (value / maxValue) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {value}/{maxValue}
        </Text>
      </View>

      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

/**
 * StatBar styles
 */
const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  value: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
  barBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
});
