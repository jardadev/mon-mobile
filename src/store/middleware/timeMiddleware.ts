// src/store/middleware/timeMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import { timeUpdate } from '../slices/timeSlice';

/**
 * Time management middleware for Redux
 * Handles time-based events and calculations when the app becomes active
 */
const timeMiddleware: Middleware = api => next => (action: any) => {
  // Process the action first
  const result = next(action);

  // Check if this is the appActive action
  if (action.type === 'time/appActive') {
    const state = api.getState();
    const currentTime = Date.now();
    const lastActiveTime = state.time.lastActive;

    // Calculate elapsed time in milliseconds
    const elapsedMs = currentTime - lastActiveTime;

    // Skip if elapsed time is very small
    if (elapsedMs < 1000) {
      return result;
    }

    // Dispatch time update action
    api.dispatch(
      timeUpdate({
        elapsedMs,
        currentTime,
      }),
    );
  }

  return result;
};

export default timeMiddleware;
