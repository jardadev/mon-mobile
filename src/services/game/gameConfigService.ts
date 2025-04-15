// src/services/game/gameConfigService.ts

/**
 * Interface for time configuration
 */
interface TimeConfig {
  HUNGER_DECAY_INTERVAL: number;
  WASTE_GENERATION_INTERVAL: number;
  EFFORT_DECAY_INTERVAL: number;
  BEDTIME_HOUR: number;
  WAKING_HOUR: number;
  HP_REGEN_INTERVAL: number;
  HP_REGEN_AMOUNT: number;
}

/**
 * Interface for stats configuration
 */
interface StatsConfig {
  MAX_HUNGER: number;
  MAX_EFFORT: number;
  MAX_HP: number;
  MAX_WASTE: number;
  BASE_WEIGHT_GAIN: number;
  TRAINING_COOLDOWN: number;
  HEALING_COOLDOWN: number;
}

/**
 * Game configuration interface
 */
interface GameConfig {
  TIME: TimeConfig;
  STATS: StatsConfig;
}

/**
 * Game configuration values
 */
const gameConfig: GameConfig = {
  TIME: {
    // How often hunger decreases (in hours)
    HUNGER_DECAY_INTERVAL: 5,

    // How often waste is generated (in hours)
    WASTE_GENERATION_INTERVAL: 2.5,

    // How often effort decays when hungry (in hours)
    EFFORT_DECAY_INTERVAL: 4,

    // Starting bedtime hour (24-hour format)
    BEDTIME_HOUR: 22,

    // Waking hour (24-hour format)
    WAKING_HOUR: 6,

    // HP regeneration interval (in hours)
    HP_REGEN_INTERVAL: 2,

    // HP regeneration amount
    HP_REGEN_AMOUNT: 5,
  },

  STATS: {
    // Max hunger ticks
    MAX_HUNGER: 3,

    // Max effort hearts
    MAX_EFFORT: 3,

    // Max HP
    MAX_HP: 100,

    // Max waste piles before sickness
    MAX_WASTE: 4,

    // Base weight gain when feeding
    BASE_WEIGHT_GAIN: 2,

    // Training cooldown (in minutes)
    TRAINING_COOLDOWN: 30,

    // Healing cooldown (in hours)
    HEALING_COOLDOWN: 2,
  },
};

/**
 * Game configuration service
 * Provides access to global game constants and settings
 */
export const gameConfigService = {
  /**
   * Get all time configuration
   */
  getTimeConfig(): TimeConfig {
    return gameConfig.TIME;
  },

  /**
   * Get all stats configuration
   */
  getStatsConfig(): StatsConfig {
    return gameConfig.STATS;
  },

  /**
   * Get a specific time config value
   *
   * @param key - Time config key
   * @returns Time config value
   */
  getTimeValue<K extends keyof TimeConfig>(key: K): TimeConfig[K] {
    return gameConfig.TIME[key];
  },

  /**
   * Get a specific stats config value
   *
   * @param key - Stats config key
   * @returns Stats config value
   */
  getStatsValue<K extends keyof StatsConfig>(key: K): StatsConfig[K] {
    return gameConfig.STATS[key];
  },
};
