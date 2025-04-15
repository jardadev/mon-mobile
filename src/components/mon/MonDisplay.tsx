// src/components/mon/MonDisplay.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Mon, MonState, EvolutionStage } from '../../types/mon';
import { colors, fontSizes, spacing, borderRadius } from '../ui/theme';

/**
 * Get state color based on mon state
 *
 * @param state - Mon state
 * @returns Color for the state
 */
const getStateColor = (state: MonState): string => {
  switch (state) {
    case MonState.SLEEPING:
      return colors.sleeping;
    case MonState.TIRED:
      return colors.sleeping;
    case MonState.HUNGRY:
      return colors.hungry;
    case MonState.SICK:
      return colors.sick;
    case MonState.INJURED:
      return colors.sick;
    case MonState.DEAD:
      return colors.danger;
    default:
      return colors.happy;
  }
};

/**
 * Get emoji representation based on evolution stage
 * This is temporary until we have proper assets
 *
 * @param stage - Evolution stage
 * @returns Emoji for the stage
 */
const getStageEmoji = (stage: EvolutionStage): string => {
  switch (stage) {
    case EvolutionStage.EGG:
      return '🥚';
    case EvolutionStage.BABY:
      return '🐣';
    case EvolutionStage.CHILD:
      return '🐥';
    case EvolutionStage.TEEN:
      return '🐤';
    case EvolutionStage.ADULT:
      return '🐓';
    case EvolutionStage.PERFECT:
      return '🦚';
    default:
      return '🥚';
  }
};

/**
 * Get state description based on mon state
 *
 * @param state - Mon state
 * @returns Description of the state
 */
const getStateDescription = (state: MonState): string => {
  switch (state) {
    case MonState.SLEEPING:
      return 'Sleeping';
    case MonState.TIRED:
      return 'Tired';
    case MonState.HUNGRY:
      return 'Hungry';
    case MonState.SICK:
      return 'Sick';
    case MonState.INJURED:
      return 'Injured';
    case MonState.TRAINING:
      return 'Training';
    case MonState.DEAD:
      return 'Deceased';
    default:
      return 'Normal';
  }
};

/**
 * MonDisplay props interface
 */
interface MonDisplayProps {
  /**
   * Mon to display
   */
  mon: Mon;

  /**
   * Optional size modifier
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * MonDisplay component
 * Displays a visual representation of a mon
 */
export const MonDisplay: React.FC<MonDisplayProps> = ({ mon, size = 'medium' }) => {
  // Determine size dimensions
  const sizeMap = {
    small: {
      container: 80,
      emoji: fontSizes.xxl,
    },
    medium: {
      container: 150,
      emoji: fontSizes.xxl * 2,
    },
    large: {
      container: 220,
      emoji: fontSizes.xxl * 3,
    },
  };

  const selectedSize = sizeMap[size];

  // Determine state color
  const stateColor = getStateColor(mon.state);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.monContainer,
          {
            width: selectedSize.container,
            height: selectedSize.container,
            borderColor: stateColor,
          },
        ]}
      >
        <Text style={[styles.emojiDisplay, { fontSize: selectedSize.emoji }]}>
          {getStageEmoji(mon.stage)}
        </Text>
      </View>

      <Text style={styles.name}>{mon.name}</Text>
      <Text style={[styles.state, { color: stateColor }]}>{getStateDescription(mon.state)}</Text>
    </View>
  );
};

/**
 * MonDisplay styles
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  monContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: borderRadius.round,
    borderWidth: 3,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  emojiDisplay: {
    textAlign: 'center',
  },
  name: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  state: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
  },
});
