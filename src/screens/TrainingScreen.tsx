// src/screens/TrainingScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Screen } from '../components/ui/Screen';
import { Card } from '../components/ui/Card';
import { theme } from '../components/ui/theme';
import { trainingService, GameDifficulty } from '../services/game/trainingService';

/**
 * Training screen
 * Allows the user to train their mon through mini-games
 */
const TrainingScreen: React.FC = () => {
  const { entities, activeMon } = useSelector((state: RootState) => state.mons);

  // Get the active mon
  const currentMon = activeMon ? entities[activeMon] : null;

  // Get all available training games
  const trainingGames = trainingService.getAllGames();

  /**
   * Handle selecting a game
   */
  const handleSelectGame = (gameId: string) => {
    // This will be implemented later with navigation
    console.warn(`Selected game: ${gameId}`);
  };

  /**
   * Get color for difficulty label
   */
  const getDifficultyColor = (difficulty: GameDifficulty): string => {
    switch (difficulty) {
      case GameDifficulty.EASY:
        return theme.colors.success;
      case GameDifficulty.MEDIUM:
        return theme.colors.warning;
      case GameDifficulty.HARD:
        return theme.colors.danger;
      default:
        return theme.colors.textSecondary;
    }
  };

  // If no mon exists yet, show a placeholder
  if (!currentMon) {
    return (
      <Screen>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No pet selected for training</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Training Games</Text>
        <Text style={styles.subtitle}>Train your mon to increase Battle Power</Text>

        <FlatList
          data={trainingGames}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectGame(item.id)} activeOpacity={0.8}>
              <Card style={styles.gameCard}>
                <View style={styles.gameHeader}>
                  <Text style={styles.gameName}>{item.name}</Text>
                  <Text
                    style={[styles.gameDifficulty, { color: getDifficultyColor(item.difficulty) }]}
                  >
                    {item.difficulty}
                  </Text>
                </View>

                <Text style={styles.gameDuration}>Duration: {item.durationSeconds} seconds</Text>

                <Text style={styles.gameReward}>Reward: BP based on performance</Text>
              </Card>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.gamesList}
        />

        <Text style={styles.trainingNote}>
          Note: Training is only available when your mon is awake and healthy.
        </Text>
      </View>
    </Screen>
  );
};

/**
 * Training screen styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  gamesList: {
    paddingBottom: theme.spacing.lg,
  },
  gameCard: {
    marginBottom: theme.spacing.md,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  gameName: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  gameDifficulty: {
    fontSize: theme.fontSizes.md,
    fontWeight: '500',
  },
  gameDuration: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  gameReward: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textSecondary,
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
  trainingNote: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
});

export default TrainingScreen;
