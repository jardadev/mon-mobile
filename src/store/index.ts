// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

// Import reducers
import timeReducer from './slices/timeSlice';
import monsReducer from './slices/monsSlice';
import settingsReducer from './slices/settingsSlice';

/**
 * Persistence configuration for Redux store
 * Defines which parts of the state should be persisted to storage
 * and which storage engine to use
 */
const persistConfig = {
  key: 'root', // Root key for storage
  storage: AsyncStorage, // Storage engine (AsyncStorage for React Native)
  blacklist: ['time'], // States that should NOT be persisted
};

/**
 * Root reducer that combines all individual domain reducers
 * Each reducer handles a specific slice of the application state
 */
const rootReducer = combineReducers({
  time: timeReducer, // Manages time-related state
  mons: monsReducer, // Manages virtual pet entities
  settings: settingsReducer, // Manages user settings
});

/**
 * Persisted reducer that wraps the root reducer
 * Handles automatic loading and saving of Redux state to AsyncStorage
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Redux store configuration
 * Creates the central state container with middleware and persistence
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in specific actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

/**
 * Persistor object that handles persistence operations
 * Used with PersistGate to delay app rendering until state is hydrated
 */
export const persistor = persistStore(store);

// Type definitions for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
