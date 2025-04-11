// Core Type Definitions

// Evolution stages for the mon
export enum EvolutionStage {
  EGG = 0,
  BABY = 1,
  CHILD = 2,
  TEEN = 3,
  ADULT = 4,
  PERFECT = 5,
}

// Possible states for a mon
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

// Basic mon statistics interface
export interface MonStats {
  age: number; // Age in days
  hunger: number; // 0-3 hunger ticks
  effort: number; // 0-3 effort points
  hp: number; // 0-100 health points
  bp: number; // 0-999 battle power
}

// Placeholder for future implementation
console.log('TS config is working!');
