// src/services/time/timeService.ts

/**
 * Time service
 * Provides utility functions for time-based game mechanics
 */
export const timeService = {
  /**
   * Calculates age in days from a creation timestamp
   *
   * @param createdAt - Timestamp when the entity was created
   * @returns Age in days (rounded down to whole days)
   */
  calculateAgeDays: (createdAt: number): number => {
    const now = Date.now();
    const diffMs = now - createdAt;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return Math.floor(diffDays);
  },

  /**
   * Determines if it's currently night time in the game
   * Used for time-of-day dependent mechanics like sleep
   *
   * @returns True if it's night time (10PM - 6AM), false otherwise
   */
  isNightTime: (): boolean => {
    const hour = new Date().getHours();
    return hour >= 21 || hour < 6;
  },

  /**
   * Formats a timestamp as a readable date
   *
   * @param timestamp - Timestamp to format
   * @returns Formatted date string
   */
  formatDate: (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString();
  },

  /**
   * Formats a timestamp as a readable time
   *
   * @param timestamp - Timestamp to format
   * @returns Formatted time string
   */
  formatTime: (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString();
  },
};
