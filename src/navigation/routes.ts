export const ROUTES = {
  // Stacks
  AUTH_STACK: 'AuthStack',
  MAIN_STACK: 'MainStack',

  // Authentication
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',
} as const;

export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
  [ROUTES.FORGOT_PASSWORD]: undefined;
  [ROUTES.RESET_PASSWORD]: { email?: string };
};

export type RootStackParamList = {
  [ROUTES.AUTH_STACK]: undefined;
};
