// src/services/game/careService.ts

import { Mon, MonState, CareEventType } from '../../types/mon';

/**
 * Care result interface
 * Represents the outcome of a care action
 */
interface CareResult {
  success: boolean;
  message: string;
  updatedMon: Mon;
}

/**
 * Care service
 * Handles care actions for mons
 */
export const careService = {
  /**
   * Feed a mon
   * Increases hunger level and weight
   *
   * @param mon - The mon to feed
   * @returns Care result with updated mon
   */
  feedMon: (mon: Mon): CareResult => {
    // Create a deep copy to avoid direct state mutation
    const updatedMon: Mon = JSON.parse(JSON.stringify(mon));

    // Check if mon can be fed
    if (mon.state === MonState.DEAD) {
      return {
        success: false,
        message: 'Cannot feed a deceased mon.',
        updatedMon: mon,
      };
    }

    if (mon.stats.hunger >= 3) {
      return {
        success: false,
        message: 'Mon is already full!',
        updatedMon: mon,
      };
    }

    // Apply feeding effects
    updatedMon.stats.hunger += 1;
    updatedMon.stats.weight += 2;
    updatedMon.lastUpdated = Date.now();

    // Record care event
    updatedMon.careHistory.push({
      timestamp: Date.now(),
      type: CareEventType.FEED,
    });

    // Return success result
    return {
      success: true,
      message: 'Mon has been fed!',
      updatedMon,
    };
  },

  /**
   * Clean a mon
   * Removes waste and reduces sickness chance
   *
   * @param mon - The mon to clean
   * @returns Care result with updated mon
   */
  cleanMon: (mon: Mon): CareResult => {
    // Create a deep copy to avoid direct state mutation
    const updatedMon: Mon = JSON.parse(JSON.stringify(mon));

    // Check if mon can be cleaned
    if (mon.state === MonState.DEAD) {
      return {
        success: false,
        message: 'Cannot clean a deceased mon.',
        updatedMon: mon,
      };
    }

    if (mon.stats.poopCount <= 0) {
      return {
        success: false,
        message: "There's nothing to clean!",
        updatedMon: mon,
      };
    }

    // Apply cleaning effects
    updatedMon.stats.poopCount = 0;
    updatedMon.lastUpdated = Date.now();

    // If mon was sick due to waste, return to normal state
    if (
      mon.state === MonState.SICK &&
      mon.careHistory.some(
        event => event.type === CareEventType.CARE_MISTAKE && event.data?.reason === 'waste',
      )
    ) {
      updatedMon.state = MonState.NORMAL;
    }

    // Record care event
    updatedMon.careHistory.push({
      timestamp: Date.now(),
      type: CareEventType.CLEAN,
    });

    // Return success result
    return {
      success: true,
      message: 'Mon has been cleaned!',
      updatedMon,
    };
  },

  /**
   * Heal a mon
   * Cures sickness or injury
   *
   * @param mon - The mon to heal
   * @returns Care result with updated mon
   */
  healMon: (mon: Mon): CareResult => {
    // Create a deep copy to avoid direct state mutation
    const updatedMon: Mon = JSON.parse(JSON.stringify(mon));

    // Check if mon can be healed
    if (mon.state === MonState.DEAD) {
      return {
        success: false,
        message: 'Cannot heal a deceased mon.',
        updatedMon: mon,
      };
    }

    if (mon.state !== MonState.SICK && mon.state !== MonState.INJURED) {
      return {
        success: false,
        message: "Mon doesn't need healing.",
        updatedMon: mon,
      };
    }

    // Apply healing effects
    updatedMon.state = MonState.NORMAL;
    updatedMon.lastUpdated = Date.now();

    // Record care event
    updatedMon.careHistory.push({
      timestamp: Date.now(),
      type: CareEventType.HEAL,
    });

    // Return success result
    return {
      success: true,
      message: 'Mon has been healed!',
      updatedMon,
    };
  },

  /**
   * Toggle a mon's sleep state
   * Puts to sleep or wakes up
   *
   * @param mon - The mon to toggle sleep for
   * @returns Care result with updated mon
   */
  toggleSleep: (mon: Mon): CareResult => {
    // Create a deep copy to avoid direct state mutation
    const updatedMon: Mon = JSON.parse(JSON.stringify(mon));

    // Check if mon can toggle sleep
    if (mon.state === MonState.DEAD) {
      return {
        success: false,
        message: 'Cannot change sleep state of a deceased mon.',
        updatedMon: mon,
      };
    }

    if (mon.state === MonState.SICK || mon.state === MonState.INJURED) {
      return {
        success: false,
        message: 'Cannot change sleep state while mon is sick or injured.',
        updatedMon: mon,
      };
    }

    // Apply sleep toggle effects
    if (mon.state === MonState.SLEEPING) {
      // Wake up
      updatedMon.state = MonState.NORMAL;
      updatedMon.lastUpdated = Date.now();

      // Record care event
      updatedMon.careHistory.push({
        timestamp: Date.now(),
        type: CareEventType.SLEEP_END,
      });

      return {
        success: true,
        message: 'Mon is now awake!',
        updatedMon,
      };
    } else {
      // Go to sleep
      updatedMon.state = MonState.SLEEPING;
      updatedMon.lastUpdated = Date.now();

      // Record care event
      updatedMon.careHistory.push({
        timestamp: Date.now(),
        type: CareEventType.SLEEP_START,
      });

      return {
        success: true,
        message: 'Mon is now sleeping!',
        updatedMon,
      };
    }
  },
};
