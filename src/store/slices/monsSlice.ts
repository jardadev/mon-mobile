// src/store/slices/monsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Mon, EvolutionStage, MonState, CareEventType } from '../../types/mon';

/**
 * Interface representing the mons state
 * Manages all virtual pet entities and their state
 */
interface MonsState {
  entities: Record<string, Mon>; // Dictionary of mons by ID
  activeMon: string | null; // ID of the currently active mon
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Loading state
  error: string | null; // Error message if any
}

/**
 * Initial state for the mons slice
 * Sets default values for all mon-related properties
 */
const initialState: MonsState = {
  entities: {}, // Start with no mons
  activeMon: null, // No active mon initially
  status: 'idle', // Initial loading status
  error: null, // No errors initially
};

/**
 * Mons slice for Redux
 * Manages all virtual pet entities and related actions
 */
const monsSlice = createSlice({
  name: 'mons',
  initialState,
  reducers: {
    /**
     * Creates a new virtual pet with initial state
     * Sets up default values for a newly hatched egg
     * @param id - Unique identifier for the mon
     * @param name - User-given name for the mon
     * @param species - Species identifier for the mon
     */
    createMon: (state, action: PayloadAction<{ id: string; name: string; species: string }>) => {
      const { id, name, species } = action.payload;

      // Create new mon with default values
      state.entities[id] = {
        id,
        name,
        species,
        stage: EvolutionStage.EGG, // Start as an egg
        createdAt: Date.now(), // Track creation time
        stats: {
          age: 0, // New pet starts at age 0
          hunger: 3, // Start with full hunger (3/3)
          effort: 3, // Start with full effort hearts (3/3)
          hp: 100, // Start with full health (100/100)
          bp: 0, // Start with no battle power
          weight: 10, // Starting weight
          careMistakes: 0, // No care mistakes initially
          poopCount: 0, // No waste initially
        },
        careHistory: [], // No care events initially
        evolutionHistory: [], // No evolution events initially
        state: MonState.NORMAL, // Start in normal state
        lastUpdated: Date.now(), // Track last update time
      };

      // Set as active mon if there's no active mon
      if (!state.activeMon) {
        state.activeMon = id;
      }
    },

    /**
     * Sets the currently active mon
     * Used when switching between multiple pets
     * @param id - ID of the mon to set as active
     */
    setActiveMon: (state, action: PayloadAction<string>) => {
      state.activeMon = action.payload;
    },

    /**
     * Updates a mon's state (sleeping, hungry, etc.)
     * Records the timestamp of the update
     * @param id - ID of the mon to update
     * @param monState - New state to set
     */
    updateMonState: (state, action: PayloadAction<{ id: string; monState: MonState }>) => {
      const { id, monState } = action.payload;
      if (state.entities[id]) {
        state.entities[id].state = monState;
        state.entities[id].lastUpdated = Date.now();
      }
    },

    /**
     * Feeds a mon to increase hunger and weight
     * Records the feeding event in care history
     * @param id - ID of the mon to feed
     */
    feedMon: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.entities[id]) {
        const mon = state.entities[id];
        // Increase hunger level (max 3)
        mon.stats.hunger = Math.min(3, mon.stats.hunger + 1);
        // Increase weight
        mon.stats.weight += 2;
        // Update timestamp
        mon.lastUpdated = Date.now();

        // Record care event
        mon.careHistory.push({
          timestamp: Date.now(),
          type: CareEventType.FEED,
        });
      }
    },

    /**
     * Cleans a mon's waste
     * Records the cleaning event in care history
     * @param id - ID of the mon to clean
     */
    cleanMon: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.entities[id]) {
        const mon = state.entities[id];
        // Reset poop count
        mon.stats.poopCount = 0;
        // Update timestamp
        mon.lastUpdated = Date.now();

        // Record care event
        mon.careHistory.push({
          timestamp: Date.now(),
          type: CareEventType.CLEAN,
        });
      }
    },

    /**
     * Updates multiple mons after time-based event processing
     * Applies changes from the time event processor
     * @param updatedMons - Dictionary of updated mons
     */
    updateMonsFromTimeEvents: (state, action: PayloadAction<Record<string, Mon>>) => {
      const updatedMons = action.payload;

      // Apply updates to each mon
      Object.keys(updatedMons).forEach(monId => {
        if (state.entities[monId]) {
          state.entities[monId] = updatedMons[monId];
        }
      });
    },
  },
});

// Export actions and reducer
export const {
  createMon,
  setActiveMon,
  updateMonState,
  feedMon,
  cleanMon,
  updateMonsFromTimeEvents,
} = monsSlice.actions;
export default monsSlice.reducer;
