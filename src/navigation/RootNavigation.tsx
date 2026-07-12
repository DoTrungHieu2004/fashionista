import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList, ROUTES } from './routes';
import { useTheme } from '../theme/provider/ThemeProvider';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { colors } = useTheme();
  const [isSplashActive, setIsSplashActive] = useState(true);

  useEffect(() => {
    // Simulate initial background asset loading, API token verification, etc.
    const timer = setTimeout(() => {
      setIsSplashActive(false);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: colors.background },
        }}>
        {isSplashActive ? (
          <Stack.Screen
            name={ROUTES.SPLASH}
            component={SplashScreen}
            options={{ animation: 'fade' }}
          />
        ) : (
          <>
            <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
            <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
            <Stack.Screen name={ROUTES.RESET_PASSWORD} component={ResetPasswordScreen} />
            <Stack.Screen
              name={ROUTES.MAIN_TABS}
              component={MainTabs}
              options={{ animation: 'fade' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
