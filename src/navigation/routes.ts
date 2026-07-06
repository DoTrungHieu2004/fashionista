/**
 * Route name constants
 */
export const ROUTES = {
  SPLASH: 'Splash',
  LOGIN: 'Login',
} as const;

/**
 * Type definitions for Stack Parameters
 */
export type RootStackParamList = {
  [ROUTES.SPLASH]: undefined;
  [ROUTES.LOGIN]: undefined;
};
