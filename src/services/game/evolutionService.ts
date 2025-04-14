// src/services/game/evolutionService.ts

import { Mon, MonState, EvolutionStage, EvolutionEvent, MonSpecies } from '../../types/mon';

/**
 * Evolution requirement type
 * Defines what conditions must be met for evolution
 */
export enum RequirementType {
  MIN_AGE = 'MIN_AGE',
  MAX_AGE = 'MAX_AGE',
  MIN_EFFORT = 'MIN_EFFORT',
  MAX_CARE_MISTAKES = 'MAX_CARE_MISTAKES',
  MIN_BP = 'MIN_BP',
  SPECIAL_CONDITION = 'SPECIAL_CONDITION',
}

/**
 * Evolution requirement
 * A specific condition that must be met to evolve
 */
export interface EvolutionRequirement {
  type: RequirementType;
  value: number | string | boolean;
}

/**
 * Evolution path
 * Defines a possible evolution from one species to another
 */
export interface EvolutionPath {
  fromSpecies: MonSpecies;
  toSpecies: MonSpecies;
  requirements: EvolutionRequirement[];
  priority: number;
}

/**
 * Sample evolution paths
 * Defines the possible evolutions in the game
 */
const evolutionPaths: EvolutionPath[] = [
  // Egg to Baby
  {
    fromSpecies: 'BasicEgg',
    toSpecies: 'BasicBaby',
    requirements: [{ type: RequirementType.MIN_AGE, value: 1 }],
    priority: 1,
  },

  // Baby to Child
  {
    fromSpecies: 'BasicBaby',
    toSpecies: 'BasicChild',
    requirements: [
      { type: RequirementType.MIN_AGE, value: 3 },
      { type: RequirementType.MIN_EFFORT, value: 2 },
    ],
    priority: 1,
  },

  // Child to Teen (Good care path)
  {
    fromSpecies: 'BasicChild',
    toSpecies: 'GoodTeen',
    requirements: [
      { type: RequirementType.MIN_AGE, value: 5 },
      { type: RequirementType.MIN_EFFORT, value: 3 },
      { type: RequirementType.MAX_CARE_MISTAKES, value: 3 },
    ],
    priority: 2,
  },

  // Child to Teen (Poor care path)
  {
    fromSpecies: 'BasicChild',
    toSpecies: 'PoorTeen',
    requirements: [
      { type: RequirementType.MIN_AGE, value: 5 },
      { type: RequirementType.MIN_EFFORT, value: 1 },
    ],
    priority: 1,
  },

  // Teen to Adult (Good care path)
  {
    fromSpecies: 'GoodTeen',
    toSpecies: 'GoodAdult',
    requirements: [
      { type: RequirementType.MIN_AGE, value: 8 },
      { type: RequirementType.MIN_EFFORT, value: 3 },
      { type: RequirementType.MIN_BP, value: 30 },
    ],
    priority: 1,
  },

  // Teen to Adult (Poor care path)
  {
    fromSpecies: 'PoorTeen',
    toSpecies: 'PoorAdult',
    requirements: [{ type: RequirementType.MIN_AGE, value: 8 }],
    priority: 1,
  },

  // Adult to Perfect (Only from good path)
  {
    fromSpecies: 'GoodAdult',
    toSpecies: 'PerfectMon',
    requirements: [
      { type: RequirementType.MIN_AGE, value: 12 },
      { type: RequirementType.MIN_EFFORT, value: 3 },
      { type: RequirementType.MIN_BP, value: 100 },
      { type: RequirementType.MAX_CARE_MISTAKES, value: 5 },
    ],
    priority: 1,
  },
];

/**
 * Evolution service
 * Handles checking for and applying evolution to mons
 */
export const evolutionService = {
  /**
   * Get all evolution paths
   *
   * @returns Array of all possible evolution paths
   */
  getAllPaths: (): EvolutionPath[] => {
    return evolutionPaths;
  },

  /**
   * Check if a mon is eligible for evolution
   *
   * @param mon - The mon to check
   * @returns The eligible evolution path, or null if none found
   */
  checkEligibility: (mon: Mon): EvolutionPath | null => {
    // Skip if dead
    if (mon.state === MonState.DEAD) {
      return null;
    }

    // Get all possible evolution paths for current species
    const possiblePaths = evolutionPaths.filter(path => path.fromSpecies === mon.species);

    // Sort by priority (higher priority first)
    possiblePaths.sort((a, b) => b.priority - a.priority);

    // Check each path for eligibility
    for (const path of possiblePaths) {
      if (evolutionService.meetAllRequirements(mon, path.requirements)) {
        return path;
      }
    }

    return null; // No eligible evolution path
  },

  /**
   * Check if a mon meets all requirements for an evolution path
   *
   * @param mon - The mon to check
   * @param requirements - The evolution requirements to check against
   * @returns True if all requirements are met, false otherwise
   */
  meetAllRequirements: (mon: Mon, requirements: EvolutionRequirement[]): boolean => {
    return requirements.every(req => {
      switch (req.type) {
        case RequirementType.MIN_AGE:
          return mon.stats.age >= (req.value as number);
        case RequirementType.MAX_AGE:
          return mon.stats.age <= (req.value as number);
        case RequirementType.MIN_EFFORT:
          return mon.stats.effort >= (req.value as number);
        case RequirementType.MAX_CARE_MISTAKES:
          return mon.stats.careMistakes <= (req.value as number);
        case RequirementType.MIN_BP:
          return mon.stats.bp >= (req.value as number);
        case RequirementType.SPECIAL_CONDITION:
          // Handle special conditions
          return evolutionService.checkSpecialCondition(mon, req.value as string);
        default:
          return false;
      }
    });
  },

  /**
   * Check if a mon meets a special condition for evolution
   *
   * @param mon - The mon to check
   * @param conditionId - The ID of the special condition
   * @returns True if the condition is met, false otherwise
   */
  checkSpecialCondition: (mon: Mon, conditionId: string): boolean => {
    // Initialize variables outside the switch block
    let hour;

    switch (conditionId) {
      case 'PERFECT_CARE':
        return mon.stats.careMistakes === 0 && mon.stats.effort === 3;

      case 'NIGHT_EVOLUTION':
        // Move the variable declaration outside the case block
        hour = new Date().getHours();
        return hour >= 20 || hour < 6;

      default:
        return false;
    }
  },

  /**
   * Evolve a mon to the next stage
   * Updates species, stage, and records the evolution event
   *
   * @param mon - The mon to evolve
   * @param path - The evolution path to follow
   * @returns Evolved mon
   */
  evolveMon: (mon: Mon, path: EvolutionPath): Mon => {
    // Create a deep copy to avoid direct state mutation
    const evolvedMon: Mon = JSON.parse(JSON.stringify(mon));

    // Determine new evolution stage
    let newStage = mon.stage;
    if (mon.stage < EvolutionStage.PERFECT) {
      newStage++;
    }

    // Record evolution event
    const evolutionEvent: EvolutionEvent = {
      timestamp: Date.now(),
      fromSpecies: mon.species,
      toSpecies: path.toSpecies,
      stage: newStage,
    };

    // Update mon properties
    evolvedMon.species = path.toSpecies;
    evolvedMon.stage = newStage;
    evolvedMon.evolutionHistory.push(evolutionEvent);

    return evolvedMon;
  },
};
