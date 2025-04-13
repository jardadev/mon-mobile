// src/services/time/timeEventProcessor.ts

import { Mon, MonState, CareEventType } from '../../types/mon';

/**
 * Game time constants
 * Defines durations for various time-based game mechanics
 */
export const TIME_CONSTANTS = {
  // How often hunger decreases (in hours)
  HUNGER_DECAY_INTERVAL: 5,

  // How often waste is generated (in hours)
  WASTE_GENERATION_INTERVAL: 2.5,

  // How often effort decays when hungry (in hours)
  EFFORT_DECAY_INTERVAL: 4,

  // How often HP regenerates (in hours)
  HP_REGEN_INTERVAL: 2,

  // Amount of HP regenerated per interval
  HP_REGEN_AMOUNT: 5,
};

/**
 * Time event processor
 * Processes time-based events for a mon
 * Calculates how a mon's state should change based on elapsed time
 */
export const timeEventProcessor = {
  /**
   * Process time-based events for a mon
   * Updates mon stats based on elapsed time
   *
   * @param mon - The mon to process events for
   * @param elapsedMs - Elapsed time in milliseconds since last update
   * @returns Updated mon with processed events
   */
  processTimeEvents: (mon: Mon, elapsedMs: number): Mon => {
    // Create a deep copy to avoid direct state mutation
    const updatedMon: Mon = JSON.parse(JSON.stringify(mon));

    // Convert to hours for easier calculation
    const elapsedHours = elapsedMs / (1000 * 60 * 60);

    // Process hunger
    const hungerDecayRate = 1 / TIME_CONSTANTS.HUNGER_DECAY_INTERVAL; // One tick per interval
    const hungerLost = Math.floor(elapsedHours * hungerDecayRate);
    updatedMon.stats.hunger = Math.max(0, updatedMon.stats.hunger - hungerLost);

    // Process waste generation (if not in EGG stage)
    if (updatedMon.stage > 0) {
      const wasteRate = 1 / TIME_CONSTANTS.WASTE_GENERATION_INTERVAL; // One pile per interval
      const newWaste = Math.floor(elapsedHours * wasteRate);
      updatedMon.stats.poopCount = Math.min(4, updatedMon.stats.poopCount + newWaste);
    }

    // Process tiredness based on time of day
    const isNightNow = timeEventProcessor.isNightTime();
    if (isNightNow && updatedMon.state !== MonState.SLEEPING) {
      updatedMon.state = MonState.TIRED;
    }

    // Process effort decay if hungry
    if (updatedMon.stats.hunger === 0) {
      const effortDecayRate = 1 / TIME_CONSTANTS.EFFORT_DECAY_INTERVAL; // One heart per interval
      const effortLost = Math.floor(elapsedHours * effortDecayRate);
      updatedMon.stats.effort = Math.max(0, updatedMon.stats.effort - effortLost);

      // Record a care mistake if effort was lost
      if (effortLost > 0) {
        updatedMon.stats.careMistakes += 1;
        updatedMon.careHistory.push({
          timestamp: Date.now(),
          type: CareEventType.CARE_MISTAKE,
          data: { reason: 'hunger' },
        });
      }
    }

    // Process HP regeneration (if not full)
    if (updatedMon.stats.hp < 100) {
      const hpRegenRate = TIME_CONSTANTS.HP_REGEN_AMOUNT / TIME_CONSTANTS.HP_REGEN_INTERVAL;
      const hpRegained = Math.floor(elapsedHours * hpRegenRate);
      updatedMon.stats.hp = Math.min(100, updatedMon.stats.hp + hpRegained);
    }

    // Process consequences of neglect
    if (updatedMon.stats.poopCount >= 4 && updatedMon.state !== MonState.SICK) {
      // Trigger sickness from waste
      updatedMon.state = MonState.SICK;
    }

    // Update the lastUpdated timestamp
    updatedMon.lastUpdated = Date.now();

    return updatedMon;
  },

  /**
   * Determines if it's currently night time in the game
   * Used for time-of-day dependent mechanics like sleep
   *
   * @returns True if it's night time (9PM - 6AM), false otherwise
   */
  isNightTime: (): boolean => {
    const hour = new Date().getHours();
    return hour >= 21 || hour < 6;
  },
};
