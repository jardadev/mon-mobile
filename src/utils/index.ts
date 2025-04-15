// src/utils/index.ts

/**
 * Format a timestamp as a readable date
 *
 * @param timestamp - Timestamp to format
 * @returns Formatted date string
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

/**
 * Format a timestamp as a readable time
 *
 * @param timestamp - Timestamp to format
 * @returns Formatted time string
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
};
