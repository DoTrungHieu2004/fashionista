import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList, ROUTES } from './routes';
import { useTheme } from '../theme/provider/ThemeProvider';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';

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
          animation: 'fade',
          contentStyle: { backgroundColor: colors.background },
        }}>
        {isSplashActive ? (
          <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
        ) : (
          <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
