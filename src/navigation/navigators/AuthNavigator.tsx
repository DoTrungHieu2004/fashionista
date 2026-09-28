import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '@/screens';

import { type AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * The auth module. Mounted by the root stack as a single route (`Auth`).
 * Default entry is `Login`; the root can override it via
 * `navigate('Auth', { screen: 'Register' })`.
 */
export function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
