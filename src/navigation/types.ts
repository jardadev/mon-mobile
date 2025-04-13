/**
 * Root stack navigation parameter list
 * Defines the screens in the root navigation stack
 */
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

/**
 * Main tab navigation parameter list
 * Defines the tabs in the main app interface
 */
export type MainTabParamList = {
  Home: undefined;
  Train: undefined;
  Stats: undefined;
  Settings: undefined;
};

/**
 * Auth stack navigation parameter list
 * Defines the screens in the authentication flow
 */
export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  CreateUsername: undefined;
};

/**
 * Home stack navigation parameter list
 * Defines the screens in the home tab
 */
export type HomeStackParamList = {
  MonHome: undefined;
  Care: undefined;
  Evolution: undefined;
};
