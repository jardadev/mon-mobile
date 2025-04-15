// src/screens/SettingsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleNotifications, toggleSound } from '../store/slices/settingsSlice';
import { signOut } from '../store/slices/authSlice';
import { Screen } from '../components/ui/Screen';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { theme } from '../components/ui/theme';

/**
 * Settings screen
 * Allows the user to configure app settings
 */
const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const user = useSelector((state: RootState) => state.auth.user);

  /**
   * Handle toggling notifications
   */
  const handleToggleNotifications = () => {
    dispatch(toggleNotifications());
  };

  /**
   * Handle toggling sound
   */
  const handleToggleSound = () => {
    dispatch(toggleSound());
  };

  /**
   * Handle sign out
   */
  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        {/* User section */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>User</Text>

          <Text style={styles.username}>{user?.username || 'Guest'}</Text>

          <Text style={styles.userInfo}>{user ? 'Signed in account' : 'Playing as guest'}</Text>
        </Card>

        {/* Preferences section */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Preferences</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={settings.notifications}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor="#f4f3f4"
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Sound Effects</Text>
            <Switch
              value={settings.soundEnabled}
              onValueChange={handleToggleSound}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
        </Card>

        {/* About section */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>

          <Text style={styles.appInfo}>Virtual Pet Game</Text>

          <Text style={styles.versionInfo}>Version 1.0.0</Text>
        </Card>

        {/* Sign out button */}
        <View style={styles.buttonContainer}>
          <Button label="Sign Out" onPress={handleSignOut} variant="danger" />
        </View>
      </View>
    </Screen>
  );
};

/**
 * Settings screen styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  card: {
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.textPrimary,
  },
  username: {
    fontSize: theme.fontSizes.lg,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  userInfo: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLabel: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textPrimary,
  },
  appInfo: {
    fontSize: theme.fontSizes.md,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  versionInfo: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  buttonContainer: {
    marginTop: theme.spacing.lg,
  },
});

export default SettingsScreen;
