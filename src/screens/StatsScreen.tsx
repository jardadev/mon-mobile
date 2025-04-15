// src/screens/StatsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Screen } from '../components/ui/Screen';
import { Card } from '../components/ui/Card';
import { MonDisplay } from '../components/mon/MonDisplay';
import { theme } from '../components/ui/theme';
import { formatDate, formatTime } from '../utils';

/**
 * Stats screen
 * Shows detailed statistics for the active mon
 */
const StatsScreen: React.FC = () => {
  const { entities, activeMon } = useSelector((state: RootState) => state.mons);

  // Get the active mon
  const currentMon = activeMon ? entities[activeMon] : null;

  // If no mon exists yet, show a placeholder
  if (!currentMon) {
    return (
      <Screen>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No pet selected</Text>
        </View>
      </Screen>
    );
  }

  /**
   * Format a date/time for display
   */
  const formatDateTime = (timestamp: number): string => {
    return `${formatDate(timestamp)} ${formatTime(timestamp)}`;
  };

  /**
   * Get stage name from evolution stage number
   */
  const getStageName = (stage: number): string => {
    const stageNames = ['Egg', 'Baby', 'Child', 'Teen', 'Adult', 'Perfect'];
    return stageNames[stage] || 'Unknown';
  };

  return (
    <Screen>
      <ScrollView>
        {/* Mon summary display */}
        <View style={styles.monDisplayContainer}>
          <MonDisplay mon={currentMon} size="medium" />
        </View>

        {/* Basic information card */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Basic Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{currentMon.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Species:</Text>
            <Text style={styles.infoValue}>{currentMon.species}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age:</Text>
            <Text style={styles.infoValue}>{currentMon.stats.age} days</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Stage:</Text>
            <Text style={styles.infoValue}>{getStageName(currentMon.stage)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Created:</Text>
            <Text style={styles.infoValue}>{formatDateTime(currentMon.createdAt)}</Text>
          </View>
        </Card>

        {/* Stats card */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Stats</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hunger:</Text>
            <Text style={styles.infoValue}>{currentMon.stats.hunger}/3</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Effort:</Text>
            <Text style={styles.infoValue}>{currentMon.stats.effort}/3</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>HP:</Text>
            <Text style={styles.infoValue}>{currentMon.stats.hp}/100</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>BP:</Text>
            <Text style={styles.infoValue}>{currentMon.stats.bp}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight:</Text>
            <Text style={styles.infoValue}>{currentMon.stats.weight}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Care Mistakes:</Text>
            <Text style={styles.infoValue}>{currentMon.stats.careMistakes}</Text>
          </View>
        </Card>

        {/* Event history card */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Recent Events</Text>

          {currentMon.careHistory.length === 0 ? (
            <Text style={styles.noEventsText}>No events yet</Text>
          ) : (
            currentMon.careHistory
              .slice(-5) // Show only the last 5 events
              .reverse() // Most recent first
              .map((event, index) => (
                <View key={index} style={styles.eventItem}>
                  <Text style={styles.eventType}>{event.type}</Text>
                  <Text style={styles.eventTime}>{formatDateTime(event.timestamp)}</Text>
                </View>
              ))
          )}
        </Card>
      </ScrollView>
    </Screen>
  );
};

/**
 * Stats screen styles
 */
const styles = StyleSheet.create({
  monDisplayContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.md,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textSecondary,
  },
  infoValue: {
    fontSize: theme.fontSizes.md,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: theme.fontSizes.lg,
    color: theme.colors.textSecondary,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  eventType: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textPrimary,
  },
  eventTime: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
  noEventsText: {
    textAlign: 'center',
    fontSize: theme.fontSizes.md,
    color: theme.colors.textSecondary,
    padding: theme.spacing.md,
  },
});

export default StatsScreen;
