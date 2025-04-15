// src/screens/SplashScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../components/ui/theme';

/**
 * Splash screen
 * Shown during app initialization and authentication check
 */
const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtual Pet Game</Text>
      <Text style={styles.subtitle}>Loading...</Text>
      <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
    </View>
  );
};

/**
 * Splash screen styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSizes.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  loader: {
    marginTop: theme.spacing.md,
  },
});

export default SplashScreen;
