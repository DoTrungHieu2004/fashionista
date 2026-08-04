import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList, ROUTES } from '../routes';
import { AuthScreens } from '../../screens';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name={ROUTES.LOGIN} component={AuthScreens.LoginScreen} />
      <Stack.Screen name={ROUTES.REGISTER} component={AuthScreens.RegisterScreen} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={AuthScreens.ForgotPasswordScreen} />
      <Stack.Screen name={ROUTES.RESET_PASSWORD} component={AuthScreens.ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
