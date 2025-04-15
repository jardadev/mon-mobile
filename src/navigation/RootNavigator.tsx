// src/navigation/RootNavigator.tsx

import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getCurrentUser } from '../store/slices/authSlice';
import { appActive } from '../store/slices/timeSlice';

// Import screens and navigators
import AuthScreen from '../screens/AuthScreen';
import SplashScreen from '../screens/SplashScreen';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from './types';
import { useAppDispatch } from '@/store/hooks';

/**
 * Root stack navigator
 * Handles the primary navigation structure of the app
 */
const Stack = createStackNavigator<RootStackParamList>();

/**
 * Root navigator component
 * Sets up the app navigation and handles app state changes
 */
const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useSelector((state: RootState) => state.auth);

  /**
   * Initialize app
   * Check for current user and set up app active handler
   */
  useEffect(() => {
    // Check for current user
    dispatch(getCurrentUser());

    // Trigger app active when app starts
    dispatch(appActive());
  }, [dispatch]);

  // Show splash screen while checking authentication
  if (status === 'authenticating') {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // User is signed in
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          // User is not signed in
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
