// src/services/game/trainingService.ts

import { Mon, CareEventType } from '../../types/mon';

/**
 * Game difficulty levels
 */
export enum GameDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

/**
 * Function type for battle power rewards
 */
export type BPRewardFunction = (score: number) => number;

/**
 * Training game interface
 */
export interface TrainingGame {
  id: string;
  name: string;
  difficulty: GameDifficulty;
  bpReward: number | BPRewardFunction;
  durationSeconds: number;
  config: Record<string, any>;
}

/**
 * Training result interface
 */
export interface TrainingResult {
  gameId: string;
  score: number;
  bpEarned: number;
  timestamp: number;
}

/**
 * Sample mini-games
 */
const trainingGames: TrainingGame[] = [
  // Rhythm tap game
  {
    id: 'rhythm_tap',
    name: 'Rhythm Tap',
    difficulty: GameDifficulty.EASY,
    bpReward: (score: number) => Math.floor(score * 0.5), // 50% of score
    durationSeconds: 30,
    config: {
      tempoRange: [80, 120], // BPM
      totalBeats: 20,
    },
  },

  // Quick reflex game
  {
    id: 'quick_reflex',
    name: 'Quick Reflex',
    difficulty: GameDifficulty.MEDIUM,
    bpReward: (score: number) => Math.min(50, score), // Up to 50 BP
    durationSeconds: 45,
    config: {
      targetCount: 30,
      targetSizes: [30, 50, 70], // Pixel diameter
      targetSpeeds: [1000, 1500, 2000], // ms to tap
    },
  },

  // Pattern memory game
  {
    id: 'pattern_memory',
    name: 'Pattern Memory',
    difficulty: GameDifficulty.HARD,
    bpReward: (score: number) => score * 2, // Double the score
    durationSeconds: 60,
    config: {
      startLength: 3,
      maxLength: 10,
      showTimeMs: 1000,
      inputTimeMs: 5000,
    },
  },
];

/**
 * Training service
 * Handles mini-games and BP rewards
 */
export const trainingService = {
  /**
   * Get all available training games
   *
   * @returns List of all training games
   */
  getAllGames: (): TrainingGame[] => {
    return trainingGames;
  },

  /**
   * Get a specific training game by ID
   *
   * @param gameId - ID of the game to retrieve
   * @returns Training game or undefined if not found
   */
  getGameById: (gameId: string): TrainingGame | undefined => {
    return trainingGames.find(game => game.id === gameId);
  },

  /**
   * Calculate BP reward for a game result
   *
   * @param game - Training game played
   * @param score - Score achieved
   * @returns BP reward amount
   */
  calculateBPReward: (game: TrainingGame, score: number): number => {
    if (typeof game.bpReward === 'function') {
      return Math.floor(game.bpReward(score));
    } else {
      return game.bpReward;
    }
  },

  /**
   * Apply training result to a mon
   * Updates BP and records training event
   *
   * @param mon - Mon to update
   * @param gameId - ID of the training game
   * @param score - Score achieved
   * @returns Updated mon with training results
   */
  applyTrainingResult: (mon: Mon, gameId: string, score: number): Mon => {
    // Create a deep copy to avoid direct state mutation
    const updatedMon: Mon = JSON.parse(JSON.stringify(mon));

    // Find the game
    const game = trainingService.getGameById(gameId);
    if (!game) {
      return mon; // Game not found, return original mon
    }

    // Calculate BP reward
    const bpEarned = trainingService.calculateBPReward(game, score);

    // Update mon BP
    updatedMon.stats.bp += bpEarned;
    updatedMon.lastUpdated = Date.now();

    // Record training event
    updatedMon.careHistory.push({
      timestamp: Date.now(),
      type: CareEventType.TRAIN,
      data: {
        gameId,
        score,
        bpEarned,
      },
    });

    return updatedMon;
  },
};
