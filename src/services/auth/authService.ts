// src/services/auth/authService.ts

import { storageService, STORAGE_KEYS } from '../storage/storageService';

/**
 * User interface
 * Represents a user account in the system
 */
interface User {
  id: string;
  username: string;
  createdAt: number;
  lastLoginAt: number;
}

/**
 * Auth service
 * Provides methods for user authentication and management
 * Uses local storage for simplicity in this version
 */
export const authService = {
  /**
   * Current user
   * Cached user data to avoid frequent storage access
   */
  currentUser: null as User | null,

  /**
   * Sign in anonymously
   * Creates a temporary user account with a random ID
   *
   * @returns Promise resolving to the created user
   */
  signInAnonymously: async (): Promise<User> => {
    // Generate a random user ID
    const userId = 'user_' + Math.random().toString(36).substring(2, 15);

    // Create the user object
    const user: User = {
      id: userId,
      username: 'Guest',
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
    };

    // Save the user to storage
    await storageService.saveData(STORAGE_KEYS.USER, user);

    // Update cached user
    authService.currentUser = user;

    return user;
  },

  /**
   * Sign in with username
   * Simple authentication with just a username
   *
   * @param username - User's chosen display name
   * @returns Promise resolving to the user
   */
  signInWithUsername: async (username: string): Promise<User> => {
    // Validate username
    if (!username || username.trim().length < 2) {
      throw new Error('Username must be at least 2 characters');
    }

    // Generate a user ID based on username
    const userId = 'user_' + username.toLowerCase().replace(/[^a-z0-9]/g, '_');

    // Create or update the user
    const existingUser = await authService.getCurrentUser();

    const user: User = existingUser
      ? {
          ...existingUser,
          username,
          lastLoginAt: Date.now(),
        }
      : {
          id: userId,
          username,
          createdAt: Date.now(),
          lastLoginAt: Date.now(),
        };

    // Save the user to storage
    await storageService.saveData(STORAGE_KEYS.USER, user);

    // Update cached user
    authService.currentUser = user;

    return user;
  },

  /**
   * Get current user
   * Retrieves the current user from storage or cache
   *
   * @returns Promise resolving to the current user, or null if not signed in
   */
  getCurrentUser: async (): Promise<User | null> => {
    // Return cached user if available
    if (authService.currentUser) {
      return authService.currentUser;
    }

    // Attempt to load user from storage
    const user = await storageService.loadData<User>(STORAGE_KEYS.USER);

    // Update cached user
    authService.currentUser = user;

    return user;
  },

  /**
   * Sign out
   * Clears the current user session
   *
   * @returns Promise that resolves when sign out is complete
   */
  signOut: async (): Promise<void> => {
    // Clear cached user
    authService.currentUser = null;

    // Remove user data from storage
    await storageService.removeData(STORAGE_KEYS.USER);
  },
};
