import SplashScreen from './splash/SplashScreen';

import LoginScreen from './auth/LoginScreen';

export const SplashModule = { SplashScreen } as const;

export const AuthScreens = { LoginScreen } as const;
