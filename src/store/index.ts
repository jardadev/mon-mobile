// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

import timeReducer from './slices/timeSlice';
import monsReducer from './slices/monsSlice';
import settingsReducer from './slices/settingsSlice';

// Create the persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['time'], // Don't persist time state
};

// Combine all reducers
const rootReducer = combineReducers({
  time: timeReducer,
  mons: monsReducer,
  settings: settingsReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
