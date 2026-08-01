import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList, ROUTES } from './routes';
import AuthNavigator from './stacks/AuthNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
