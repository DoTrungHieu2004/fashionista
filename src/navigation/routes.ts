export const ROUTES = {
  SPLASH: 'Splash',
  LOGIN: 'Login',
} as const;

export type RootStackParamList = {
  [ROUTES.SPLASH]: undefined;
  [ROUTES.LOGIN]: undefined;
};
