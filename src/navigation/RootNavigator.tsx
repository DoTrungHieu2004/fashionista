import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList, ROUTES } from './routes';
import { AuthScreens, SplashModule } from '../screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.SPLASH} screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name={ROUTES.SPLASH} component={SplashModule.SplashScreen} />
      <Stack.Screen name={ROUTES.LOGIN} component={AuthScreens.LoginScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
