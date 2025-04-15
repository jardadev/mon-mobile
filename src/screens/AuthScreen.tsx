// src/screens/AuthScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import { useAppDispatch } from '@/store/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { signInWithUsername, signInAnonymously } from '../store/slices/authSlice';
import { Screen } from '../components/ui/Screen';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { theme } from '../components/ui/theme';

/**
 * Authentication screen
 * Handles user sign-in
 */
const AuthScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const { status, error } = useSelector((state: RootState) => state.auth);

  // Check if authentication is in progress
  const isAuthenticating = status === 'authenticating';

  /**
   * Handle username sign in
   */
  const handleUsernameSignIn = () => {
    if (username.trim().length < 2) {
      ToastAndroid.show('Username must be at least 2 characters', ToastAndroid.SHORT);
      return;
    }

    dispatch(signInWithUsername(username));
  };

  /**
   * Handle anonymous sign in
   */
  const handleAnonymousSignIn = () => {
    dispatch(signInAnonymously());
  };

  return (
    <Screen statusBarColor={theme.colors.primary}>
      <View style={styles.container}>
        <Text style={styles.title}>Virtual Pet Game</Text>
        <Text style={styles.subtitle}>Care for your digital companion</Text>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Sign In</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter a username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!isAuthenticating}
          />

          <Button
            label="Sign In with Username"
            onPress={handleUsernameSignIn}
            variant="primary"
            loading={isAuthenticating}
            style={styles.button}
          />

          <Button
            label="Continue as Guest"
            onPress={handleAnonymousSignIn}
            variant="outline"
            disabled={isAuthenticating}
            style={styles.button}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}
        </Card>

        <Text style={styles.infoText}>
          Create a username to save your progress or continue as a guest
        </Text>
      </View>
    </Screen>
  );
};

/**
 * Auth screen styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSizes.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: '#fff',
    fontSize: theme.fontSizes.md,
  },
  button: {
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.fontSizes.md,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  infoText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default AuthScreen;
