// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

// Import reducers
import timeReducer from './slices/timeSlice';
import monsReducer from './slices/monsSlice';
import settingsReducer from './slices/settingsSlice';

// Import middleware
import timeMiddleware from './middleware/timeMiddleware';

/**
 * Persistence configuration for Redux store
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['time'], // Don't persist time state
};

/**
 * Root reducer that combines all individual domain reducers
 */
const rootReducer = combineReducers({
  time: timeReducer,
  mons: monsReducer,
  settings: settingsReducer,
});

/**
 * Persisted reducer that wraps the root reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Redux store configuration
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(timeMiddleware),
});

/**
 * Persistor object that handles persistence operations
 */
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
