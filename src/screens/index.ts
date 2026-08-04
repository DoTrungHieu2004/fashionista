import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import ForgotPasswordScreen from './auth/ForgotPasswordScreen';
import ResetPasswordScreen from './auth/ResetPasswordScreen';

export const AuthScreens = { LoginScreen, RegisterScreen, ForgotPasswordScreen, ResetPasswordScreen } as const;
