// src/services/storage/storageService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage keys used across the application
 * Defines consistent key names to prevent conflicts
 * Each key is prefixed with the app name for namespacing
 */
export const STORAGE_KEYS = {
  MONS: 'virtual-pet-game:mons', // Key for storing all pet entities
  SETTINGS: 'virtual-pet-game:settings', // Key for storing user settings
  USER: 'virtual-pet-game:user',
};

/**
 * Storage service
 * Provides methods to interact with device storage
 * Handles serialization, deserialization, and error handling
 */
export const storageService = {
  /**
   * Saves data to device storage
   * Serializes data to JSON and stores with the given key
   *
   * @param key - Storage key to save under
   * @param data - Data to save (any serializable value)
   * @returns Promise that resolves when data is saved
   * @throws Error if saving fails
   */
  saveData: async <T>(key: string, data: T): Promise<void> => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
      throw error;
    }
  },

  /**
   * Loads data from device storage
   * Retrieves and deserializes JSON data for the given key
   *
   * @param key - Storage key to load from
   * @returns Promise that resolves with loaded data, or null if not found
   */
  loadData: async <T>(key: string): Promise<T | null> => {
    try {
      const jsonData = await AsyncStorage.getItem(key);
      if (!jsonData) return null;
      return JSON.parse(jsonData) as T;
    } catch (error) {
      console.error(`Error loading data for key ${key}:`, error);
      return null;
    }
  },

  /**
   * Removes data from device storage
   * Deletes the value associated with the given key
   *
   * @param key - Storage key to remove
   * @returns Promise that resolves when data is removed
   * @throws Error if removal fails
   */
  removeData: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data for key ${key}:`, error);
      throw error;
    }
  },

  /**
   * Clears all app data from storage
   * Removes all keys and values from AsyncStorage
   * Use with caution as this permanently deletes all stored data
   *
   * @returns Promise that resolves when all data is cleared
   * @throws Error if clearing fails
   */
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};
