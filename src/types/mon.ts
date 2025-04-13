// src/types/mon.ts

/**
 * Possible evolution stages for mons
 */
export enum EvolutionStage {
  EGG = 0,
  BABY = 1,
  CHILD = 2,
  TEEN = 3,
  ADULT = 4,
  PERFECT = 5,
}

/**
 * Possible states a mon can be in
 */
export enum MonState {
  NORMAL = 'NORMAL',
  SLEEPING = 'SLEEPING',
  TIRED = 'TIRED',
  HUNGRY = 'HUNGRY',
  SICK = 'SICK',
  INJURED = 'INJURED',
  TRAINING = 'TRAINING',
  DEAD = 'DEAD',
}

/**
 * Types of care events
 */
export enum CareEventType {
  FEED = 'FEED',
  CLEAN = 'CLEAN',
  SLEEP_START = 'SLEEP_START',
  SLEEP_END = 'SLEEP_END',
  TRAIN = 'TRAIN',
  HEAL = 'HEAL',
  CARE_MISTAKE = 'CARE_MISTAKE',
  EVOLUTION = 'EVOLUTION',
  DEATH = 'DEATH',
}

/**
 * Mon statistics interface
 * Contains all numeric stats for a mon
 */
export interface MonStats {
  age: number; // Age in days
  hunger: number; // 0-3 hunger ticks
  effort: number; // 0-3 effort points
  hp: number; // 0-100 health points
  bp: number; // 0-999 battle power
  weight: number; // Weight in arbitrary units
  careMistakes: number; // Count of care mistakes
  poopCount: number; // Current waste on screen (0-4)
}

/**
 * Care event interface
 * Records care actions performed on a mon
 */
export interface CareEvent {
  timestamp: number;
  type: CareEventType;
  data?: Record<string, any>; // Additional data specific to event type
}

/**
 * Evolution event interface
 * Records when a mon evolves
 */
export interface EvolutionEvent {
  timestamp: number;
  fromSpecies: MonSpecies;
  toSpecies: MonSpecies;
  stage: EvolutionStage;
}

/**
 * Mon species type
 * String identifier for different mon species
 */
export type MonSpecies = string;

/**
 * Mon interface
 * Complete representation of a virtual pet
 */
export interface Mon {
  id: string; // Unique identifier
  name: string; // User-given name
  species: MonSpecies; // Current species identifier
  stage: EvolutionStage; // Current evolution stage
  createdAt: number; // Timestamp of creation
  stats: MonStats; // Current statistics
  careHistory: CareEvent[]; // History of care events
  evolutionHistory: EvolutionEvent[]; // History of evolutions
  state: MonState; // Current state (normal, sleeping, sick, etc.)
  lastUpdated: number; // Timestamp of last state update
}
