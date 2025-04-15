// src/components/ui/Screen.tsx

import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar, ViewStyle } from 'react-native';
import { colors } from './theme';

/**
 * Screen props interface
 */
interface ScreenProps {
  /**
   * Screen content
   */
  children: React.ReactNode;

  /**
   * Whether content should be scrollable
   */
  scrollable?: boolean;

  /**
   * Additional container styles
   */
  style?: ViewStyle;

  /**
   * Status bar color
   */
  statusBarColor?: string;

  /**
   * Background color
   */
  backgroundColor?: string;
}

/**
 * Screen component
 * Base layout container for screens
 */
export const Screen: React.FC<ScreenProps> = ({
  children,
  scrollable = true,
  style,
  statusBarColor = colors.primary,
  backgroundColor = colors.background,
}) => {
  // Content container with optional scrolling
  const ContentContainer = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar backgroundColor={statusBarColor} barStyle="light-content" />

      <ContentContainer
        style={[styles.container, style]}
        contentContainerStyle={scrollable ? styles.scrollContent : undefined}
      >
        {children}
      </ContentContainer>
    </SafeAreaView>
  );
};

/**
 * Screen styles
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
});
