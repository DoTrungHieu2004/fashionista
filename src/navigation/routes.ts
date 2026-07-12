/**
 * Route name constants
 */
export const ROUTES = {
  SPLASH: 'Splash',

  // Authentication
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',

  // Main app tabs root
  MAIN_TABS: 'MainTabs',
} as const;

export const TAB_ROUTES = {
  HOME: 'Home',
  MALL: 'Mall',
  WISHLIST: 'Wishlist',
  ORDERS: 'Orders',
  PROFILE: 'Profile',
} as const;

/**
 * Type definitions for Stack Parameters
 */
export type RootStackParamList = {
  [ROUTES.SPLASH]: undefined;
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
  [ROUTES.FORGOT_PASSWORD]: undefined;
  [ROUTES.RESET_PASSWORD]: { email?: string } | undefined;
  [ROUTES.MAIN_TABS]: undefined;
};

export type TabStackParamList = {
  [TAB_ROUTES.HOME]: undefined;
  [TAB_ROUTES.MALL]: undefined;
  [TAB_ROUTES.WISHLIST]: undefined;
  [TAB_ROUTES.ORDERS]: undefined;
  [TAB_ROUTES.PROFILE]: undefined;
};
