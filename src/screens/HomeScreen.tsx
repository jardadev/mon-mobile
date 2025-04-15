// src/screens/HomeScreen.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { feedMon, cleanMon, healMon, toggleSleepMon } from '../store/slices/monsSlice';
import { createMon } from '../store/slices/monsSlice';
import { Screen } from '../components/ui/Screen';
import { Card } from '../components/ui/Card';
import { MonDisplay } from '../components/mon/MonDisplay';
import { StatBar } from '../components/mon/StatBar';
import { CareActions } from '../components/mon/CareActions';
import { theme } from '../components/ui/theme';
import { MonState } from '../types/mon';
import { useAppDispatch } from '@/store/hooks';

/**
 * Home screen
 * Main screen for interacting with the active mon
 */
const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { entities, activeMon } = useSelector((state: RootState) => state.mons);
  const { user } = useSelector((state: RootState) => state.auth);

  /**
   * Create a default mon if none exists
   */
  useEffect(() => {
    // If there are no mons and user is logged in, create a default one
    if (Object.keys(entities).length === 0 && user) {
      dispatch(
        createMon({
          id: 'mon_' + Math.random().toString(36).substring(2, 9),
          name: 'Egg',
          species: 'BasicEgg',
        }),
      );
    }
  }, [dispatch, entities, user]);

  // Get the active mon
  const currentMon = activeMon ? entities[activeMon] : null;

  /**
   * Handle feeding the mon
   */
  const handleFeed = () => {
    if (activeMon) {
      dispatch(feedMon(activeMon));
      showToast('Mon has been fed!');
    }
  };

  /**
   * Handle cleaning the mon
   */
  const handleClean = () => {
    if (activeMon) {
      dispatch(cleanMon(activeMon));
      showToast('Mon has been cleaned!');
    }
  };

  /**
   * Handle healing the mon
   */
  const handleHeal = () => {
    if (activeMon) {
      dispatch(healMon(activeMon));
      showToast('Mon has been healed!');
    }
  };

  /**
   * Handle toggling sleep state
   */
  const handleToggleSleep = () => {
    if (activeMon) {
      dispatch(toggleSleepMon(activeMon));

      const isSleeping = currentMon?.state === MonState.SLEEPING;
      showToast(isSleeping ? 'Mon has awakened!' : 'Mon is now sleeping!');
    }
  };

  /**
   * Handle training action
   */
  const handleTrain = () => {
    // This will be implemented later
    showToast('Training not yet implemented!');
  };

  /**
   * Show a toast message
   */
  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  // If no mon exists yet, show a loading state
  if (!currentMon) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Creating your virtual pet...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        {/* Mon display section */}
        <View style={styles.monDisplayContainer}>
          <MonDisplay mon={currentMon} size="large" />
        </View>

        {/* Stats section */}
        <Card style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Stats</Text>

          <StatBar
            label="Hunger"
            value={currentMon.stats.hunger}
            maxValue={3}
            color={theme.colors.primary}
          />

          <StatBar
            label="Energy"
            value={currentMon.stats.effort}
            maxValue={3}
            color={theme.colors.secondary}
          />

          <StatBar
            label="Health"
            value={currentMon.stats.hp}
            maxValue={100}
            color={theme.colors.success}
          />

          <StatBar
            label="Battle Power"
            value={currentMon.stats.bp}
            maxValue={100}
            color={theme.colors.warning}
          />

          <Text style={styles.ageText}>Age: {currentMon.stats.age} days</Text>
        </Card>

        {/* Care actions section */}
        <Card style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Actions</Text>

          <CareActions
            monState={currentMon.state}
            onFeed={handleFeed}
            onClean={handleClean}
            onHeal={handleHeal}
            onToggleSleep={handleToggleSleep}
            onTrain={handleTrain}
          />
        </Card>
      </View>
    </Screen>
  );
};

/**
 * Home screen styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: theme.fontSizes.lg,
    color: theme.colors.textSecondary,
  },
  monDisplayContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  statsCard: {
    marginBottom: theme.spacing.md,
  },
  actionsCard: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.textPrimary,
  },
  ageText: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    textAlign: 'right',
  },
});

export default HomeScreen;
