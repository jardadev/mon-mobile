// src/components/mon/CareActions.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MonState } from '../../types/mon';
import { Button } from '../ui/Button';
import { spacing } from '../ui/theme';

/**
 * CareActions props interface
 */
interface CareActionsProps {
  /**
   * Current mon state
   */
  monState: MonState;

  /**
   * Handler for feeding action
   */
  onFeed: () => void;

  /**
   * Handler for cleaning action
   */
  onClean: () => void;

  /**
   * Handler for healing action
   */
  onHeal: () => void;

  /**
   * Handler for sleep toggle action
   */
  onToggleSleep: () => void;

  /**
   * Handler for training action
   */
  onTrain: () => void;
}

/**
 * CareActions component
 * Displays buttons for caring for a mon
 */
export const CareActions: React.FC<CareActionsProps> = ({
  monState,
  onFeed,
  onClean,
  onHeal,
  onToggleSleep,
  onTrain,
}) => {
  // Determine if actions should be disabled based on state
  const isDisabled = monState === MonState.DEAD;

  // Determine the sleep button label based on current state
  const sleepButtonLabel = monState === MonState.SLEEPING ? 'Wake Up' : 'Sleep';

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <Button label="Feed" onPress={onFeed} variant="primary" disabled={isDisabled} />
        </View>

        <View style={styles.buttonContainer}>
          <Button label="Clean" onPress={onClean} variant="primary" disabled={isDisabled} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <Button
            label="Heal"
            onPress={onHeal}
            variant="secondary"
            disabled={isDisabled || (monState !== MonState.SICK && monState !== MonState.INJURED)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={sleepButtonLabel}
            onPress={onToggleSleep}
            variant="secondary"
            disabled={isDisabled || monState === MonState.SICK || monState === MonState.INJURED}
          />
        </View>
      </View>

      <View style={styles.fullWidthButton}>
        <Button
          label="Train"
          onPress={onTrain}
          variant="outline"
          disabled={
            isDisabled ||
            monState === MonState.SLEEPING ||
            monState === MonState.SICK ||
            monState === MonState.INJURED
          }
        />
      </View>
    </View>
  );
};

/**
 * CareActions styles
 */
const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  fullWidthButton: {
    marginHorizontal: spacing.xs,
  },
});
