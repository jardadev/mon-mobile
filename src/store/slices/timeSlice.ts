// src/store/slices/timeSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface representing the time-related state
 * Tracks time information for the game's time-based mechanics
 */
interface TimeState {
  lastActive: number; // Timestamp when the app was last active
  timescale: number; // Scale factor for game time (for future time manipulation)
  serverTimeDelta: number; // Difference between server and client time
}

/**
 * Initial state for the time slice
 * Sets default values for all time-related properties
 */
const initialState: TimeState = {
  lastActive: Date.now(), // Initialize with current timestamp
  timescale: 1, // Normal time progression (1x)
  serverTimeDelta: 0, // No time difference initially
};

/**
 * Time slice for Redux
 * Manages all time-related state and actions
 */
const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    /**
     * Updates the lastActive timestamp when app becomes active
     * Used to track when the user returns to the app
     */
    appActive: state => {
      state.lastActive = Date.now();
    },

    /**
     * Updates time state with elapsed time information
     * Called after calculating how much time has passed since last active
     * @param elapsedMs - Milliseconds elapsed since last active
     * @param currentTime - Current timestamp
     */
    timeUpdate: (state, action: PayloadAction<{ elapsedMs: number; currentTime: number }>) => {
      state.lastActive = action.payload.currentTime;
    },

    /**
     * Updates the server time delta
     * Used to synchronize client and server time
     * @param delta - Time difference in milliseconds
     */
    updateServerTimeDelta: (state, action: PayloadAction<number>) => {
      state.serverTimeDelta = action.payload;
    },
  },
});

// Export actions and reducer
export const { appActive, timeUpdate, updateServerTimeDelta } = timeSlice.actions;
export default timeSlice.reducer;
