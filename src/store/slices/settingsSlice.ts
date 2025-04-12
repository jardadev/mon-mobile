// src/store/slices/settingsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface representing user settings
 * Manages preferences for app behavior and appearance
 */
interface SettingsState {
  notifications: boolean; // Whether notifications are enabled
  soundEnabled: boolean; // Whether sound effects are enabled
  username: string; // User's display name
  theme: 'light' | 'dark' | 'system'; // Visual theme preference
}

/**
 * Initial state for settings
 * Sets default values for all user preferences
 */
const initialState: SettingsState = {
  notifications: true, // Notifications enabled by default
  soundEnabled: true, // Sound enabled by default
  username: '', // Empty username initially
  theme: 'system', // Use system theme by default
};

/**
 * Settings slice for Redux
 * Manages all user preference state and actions
 */
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    /**
     * Toggles notification setting on/off
     * Inverts the current notification preference
     */
    toggleNotifications: state => {
      state.notifications = !state.notifications;
    },

    /**
     * Toggles sound setting on/off
     * Inverts the current sound preference
     */
    toggleSound: state => {
      state.soundEnabled = !state.soundEnabled;
    },

    /**
     * Sets the username
     * Updates the user's display name
     * @param username - New username to set
     */
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },

    /**
     * Sets the theme preference
     * Updates the visual theme for the app
     * @param theme - Theme value to set (light, dark, or system)
     */
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
  },
});

// Export actions and reducer
export const { toggleNotifications, toggleSound, setUsername, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
