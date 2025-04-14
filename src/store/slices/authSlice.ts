// src/store/slices/authSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/auth/authService';

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
 * Authentication state interface
 * Tracks the current authentication status and user data
 */
interface AuthState {
  user: User | null;
  status: 'idle' | 'authenticating' | 'authenticated' | 'error';
  error: string | null;
}

/**
 * Initial authentication state
 * Default values for auth-related properties
 */
const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

/**
 * Async thunk for signing in anonymously
 * Creates a temporary user account with a random ID
 */
export const signInAnonymously = createAsyncThunk('auth/signInAnonymously', async () => {
  return await authService.signInAnonymously();
});

/**
 * Async thunk for signing in with username
 * Authentication with just a username
 */
export const signInWithUsername = createAsyncThunk(
  'auth/signInWithUsername',
  async (username: string) => {
    return await authService.signInWithUsername(username);
  },
);

/**
 * Async thunk for getting the current user
 * Retrieves the current user from storage or cache
 */
export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
  return await authService.getCurrentUser();
});

/**
 * Async thunk for signing out
 * Clears the current user session
 */
export const signOut = createAsyncThunk('auth/signOut', async () => {
  await authService.signOut();
});

/**
 * Auth slice for Redux
 * Manages authentication state and related actions
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Clears any authentication errors
     * Used to reset the error state after displaying an error
     */
    clearAuthError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Handle signInAnonymously
    builder
      .addCase(signInAnonymously.pending, state => {
        state.status = 'authenticating';
        state.error = null;
      })
      .addCase(signInAnonymously.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload;
      })
      .addCase(signInAnonymously.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to sign in anonymously';
      });

    // Handle signInWithUsername
    builder
      .addCase(signInWithUsername.pending, state => {
        state.status = 'authenticating';
        state.error = null;
      })
      .addCase(signInWithUsername.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload;
      })
      .addCase(signInWithUsername.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to sign in with username';
      });

    // Handle getCurrentUser
    builder
      .addCase(getCurrentUser.pending, state => {
        state.status = 'authenticating';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'authenticated';
          state.user = action.payload;
        } else {
          state.status = 'idle';
        }
      })
      .addCase(getCurrentUser.rejected, state => {
        state.status = 'idle';
      });

    // Handle signOut
    builder.addCase(signOut.fulfilled, state => {
      state.status = 'idle';
      state.user = null;
    });
  },
});

// Export actions
export const { clearAuthError } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
