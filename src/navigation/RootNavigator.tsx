import { useMemo } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WelcomeScreen } from '@/screens';
import { useTheme } from '@/theme/useTheme';

import { AuthNavigator } from './navigators/AuthNavigator';
import { MainTabs } from './MainTabs';
import { type RootStackParamList } from './types';
import { buildNavigationTheme } from './useNavigationTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * The app's root navigator. Must be rendered inside `<ThemeProvider>` —
 * it reads the current theme to style headers and screen backgrounds.
 *
 * @example
 * // Inside AppContent
 * <RootNavigator />
 */
export function RootNavigator() {
  const theme = useTheme();
  const navTheme = useMemo(() => buildNavigationTheme(theme), [theme]);

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
