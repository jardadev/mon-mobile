// src/services/game/lifecycleService.ts

import { Mon, MonState, CareEventType, EvolutionStage } from '../../types/mon';

/**
 * Death causes
 * Reasons a mon might die
 */
export enum DeathCause {
  NEGLECT = 'NEGLECT',
  OLD_AGE = 'OLD_AGE',
  SICKNESS = 'SICKNESS',
  INJURY = 'INJURY',
}

/**
 * Life cycle service
 * Handles aging, death, and life stage transitions
 */
export const lifecycleService = {
  /**
   * Check if a mon should die based on its condition
   *
   * @param mon - The mon to check
   * @returns Object with isDead flag and cause, or null if mon shouldn't die
   */
  checkDeath: (mon: Mon): { isDead: boolean; cause: DeathCause } | null => {
    // Already dead
    if (mon.state === MonState.DEAD) {
      return { isDead: true, cause: DeathCause.NEGLECT };
    }

    // Check for death from neglect
    if (mon.stats.hunger === 0 && mon.stats.effort === 0) {
      const lastFed = mon.careHistory.findLast(event => event.type === CareEventType.FEED);

      // If never fed or not fed in 3 days
      if (!lastFed || Date.now() - lastFed.timestamp > 3 * 24 * 60 * 60 * 1000) {
        return { isDead: true, cause: DeathCause.NEGLECT };
      }
    }

    // Check for death from old age (only applies to adults and perfect)
    if (mon.stage >= EvolutionStage.ADULT) {
      // Perfect mons live longer
      const maxAge = mon.stage === EvolutionStage.PERFECT ? 50 : 30;

      if (mon.stats.age > maxAge) {
        return { isDead: true, cause: DeathCause.OLD_AGE };
      }
    }

    // Check for death from prolonged sickness
    if (mon.state === MonState.SICK) {
      const becameSick = mon.careHistory.findLast(
        event => event.type === CareEventType.CARE_MISTAKE && event.data?.reason === 'sickness',
      );

      // If sick for more than 5 days
      if (becameSick && Date.now() - becameSick.timestamp > 5 * 24 * 60 * 60 * 1000) {
        return { isDead: true, cause: DeathCause.SICKNESS };
      }
    }

    // Not dead
    return null;
  },

  /**
   * Process mon death
   * Updates mon state and records death event
   *
   * @param mon - The mon to process
   * @param cause - The cause of death
   * @returns Updated mon with death state
   */
  processDeath: (mon: Mon, cause: DeathCause): Mon => {
    // Create a deep copy to avoid direct state mutation
    const deadMon: Mon = JSON.parse(JSON.stringify(mon));

    // Update state to dead
    deadMon.state = MonState.DEAD;

    // Record death event
    deadMon.careHistory.push({
      timestamp: Date.now(),
      type: CareEventType.DEATH,
      data: { cause },
    });

    return deadMon;
  },

  /**
   * Update mon age
   * Calculates age in days from creation timestamp
   *
   * @param mon - The mon to update
   * @returns Updated mon with current age
   */
  updateAge: (mon: Mon): Mon => {
    // Create a deep copy to avoid direct state mutation
    const updatedMon: Mon = JSON.parse(JSON.stringify(mon));

    // Calculate age in days
    const ageInDays = Math.floor((Date.now() - mon.createdAt) / (24 * 60 * 60 * 1000));

    // Update age stat
    updatedMon.stats.age = ageInDays;

    return updatedMon;
  },
};
