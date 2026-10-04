/**
 * Barrel for all screens. Import from `@/screens` rather than reaching
 * into individual files — keeps the navigator's imports tidy and gives
 * one place to see every screen the app exposes.
 *
 * @example
 * import { LoginScreen, SplashScreen } from '@/screens';
 */

// Welcome
export { WelcomeScreen } from './welcome/WelcomeScreen';

// Auth
export { ForgotPasswordScreen } from './auth/ForgotPasswordScreen';
export { LoginScreen } from './auth/LoginScreen';
export { RegisterScreen } from './auth/RegisterScreen';
export { ResetPasswordScreen } from './auth/ResetPasswordScreen';
