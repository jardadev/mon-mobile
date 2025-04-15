// src/components/ui/Button.tsx

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, fontSizes, borderRadius } from './theme';

/**
 * Button variant types
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

/**
 * Button size types
 */
type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Button props interface
 */
interface ButtonProps {
  /**
   * Button label text
   */
  label: string;

  /**
   * Button press handler
   */
  onPress: () => void;

  /**
   * Button visual variant
   */
  variant?: ButtonVariant;

  /**
   * Button size
   */
  size?: ButtonSize;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Loading state (shows spinner)
   */
  loading?: boolean;

  /**
   * Additional button styles
   */
  style?: ViewStyle;

  /**
   * Additional label styles
   */
  labelStyle?: TextStyle;
}

/**
 * Button component
 * Reusable button with different variants and states
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  labelStyle,
}) => {
  /**
   * Get button styles based on variant
   */
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: colors.primary,
        };
      case 'danger':
        return {
          backgroundColor: colors.danger,
          borderColor: colors.danger,
        };
      default:
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        };
    }
  };

  /**
   * Get text styles based on variant
   */
  const getTextStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          color: colors.primary,
        };
      default:
        return {
          color: '#fff',
        };
    }
  };

  /**
   * Get size-based styles
   */
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.md,
          fontSize: fontSizes.sm,
        };
      case 'large':
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
          fontSize: fontSizes.lg,
        };
      default:
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.lg,
          fontSize: fontSizes.md,
        };
    }
  };

  // Combined styles
  const buttonStyles = {
    ...styles.button,
    ...getButtonStyles(),
    ...(disabled && styles.disabled),
    ...getSizeStyles(),
    ...style,
  };

  const textStyles = {
    ...styles.text,
    ...getTextStyles(),
    fontSize: getSizeStyles().fontSize,
    ...(disabled && styles.disabledText),
    ...labelStyle,
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'outline' ? colors.primary : '#fff'} />
      ) : (
        <Text style={textStyles}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

/**
 * Button styles
 */
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});
