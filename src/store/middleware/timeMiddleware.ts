// src/store/middleware/timeMiddleware.ts

import { Middleware } from '@reduxjs/toolkit';
import { timeUpdate } from '../slices/timeSlice';
import { updateMonsFromTimeEvents, updateLifecycle, checkEvolution } from '../slices/monsSlice';
import { timeEventProcessor } from '../../services/time/timeEventProcessor';
import { Mon } from '../../types/mon';

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

    // Process time events for all mons
    const mons = state.mons.entities;
    const updatedMons: Record<string, Mon> = {};

    // Process each mon's time-based events
    Object.keys(mons).forEach(monId => {
      updatedMons[monId] = timeEventProcessor.processTimeEvents(mons[monId], elapsedMs);
    });

    // Dispatch actions to update mons if there are any
    if (Object.keys(updatedMons).length > 0) {
      api.dispatch(updateMonsFromTimeEvents(updatedMons));
    }

    // Dispatch time update action
    api.dispatch(
      timeUpdate({
        elapsedMs,
        currentTime,
      }),
    );
    // Process lifecycle updates for all mons
    Object.keys(mons).forEach(monId => {
      // Update lifecycle (age, death check)
      api.dispatch(updateLifecycle(monId));

      // Check for evolution
      api.dispatch(checkEvolution(monId));
    });
  }

  return result;
};

export default timeMiddleware;
