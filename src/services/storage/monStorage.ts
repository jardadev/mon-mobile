// src/services/storage/monStorage.ts

import { Mon } from '../../types';
import { storageService, STORAGE_KEYS } from './storageService';

/**
 * Mon storage service
 * Provides specialized methods for storing and retrieving mon entities
 * Builds on the generic storage service with type-safe operations
 */
export const monStorage = {
  /**
   * Saves all mon entities
   * Stores the complete mon dictionary to persistent storage
   *
   * @param mons - Dictionary of all mon entities by ID
   * @returns Promise resolving when mons are saved
   */
  saveMons: async (mons: Record<string, Mon>): Promise<void> => {
    return storageService.saveData(STORAGE_KEYS.MONS, mons);
  },

  /**
   * Loads all mon entities
   * Retrieves the complete mon dictionary from persistent storage
   *
   * @returns Promise resolving with loaded mons, or null if not found
   */
  loadMons: async (): Promise<Record<string, Mon> | null> => {
    return storageService.loadData<Record<string, Mon>>(STORAGE_KEYS.MONS);
  },

  /**
   * Saves a single mon entity
   * Updates or adds a mon in the dictionary and saves all mons
   *
   * @param mon - Mon entity to save
   * @returns Promise resolving when mon is saved
   */
  saveMon: async (mon: Mon): Promise<void> => {
    // Load existing mons or create empty dictionary
    const mons = (await monStorage.loadMons()) || {};

    // Update or add the mon
    mons[mon.id] = mon;

    // Save all mons
    return monStorage.saveMons(mons);
  },

  /**
   * Loads a single mon by ID
   * Retrieves just one mon entity from storage
   *
   * @param id - ID of the mon to load
   * @returns Promise resolving with the mon, or null if not found
   */
  loadMon: async (id: string): Promise<Mon | null> => {
    const mons = await monStorage.loadMons();
    if (!mons) return null;
    return mons[id] || null;
  },

  /**
   * Deletes a mon by ID
   * Removes a mon from the dictionary and saves the updated dictionary
   *
   * @param id - ID of the mon to delete
   * @returns Promise resolving when mon is deleted
   */
  deleteMon: async (id: string): Promise<void> => {
    const mons = await monStorage.loadMons();
    if (!mons) return;

    // Remove the mon from the dictionary
    delete mons[id];

    // Save the updated dictionary
    return monStorage.saveMons(mons);
  },
};
