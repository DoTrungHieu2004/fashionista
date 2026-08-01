export const ROUTES = {
  // Stacks
  AUTH_STACK: 'AuthStack',
  MAIN_STACK: 'MainStack',

  // Authentication
  LOGIN: 'Login',
  REGISTER: 'Register',
} as const;

export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
};

export type RootStackParamList = {
  [ROUTES.AUTH_STACK]: undefined;
};
