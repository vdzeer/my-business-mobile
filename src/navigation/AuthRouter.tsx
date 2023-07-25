import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import {
  ForgotPassword,
  Introduction,
  ResetPassword,
  SignIn,
} from '../screens';

const AuthStack = createNativeStackNavigator();

export const AuthRouter: FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Introduction"
      screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={'Introduction'} component={Introduction} />
      <AuthStack.Screen name={'SignIn'} component={SignIn} />
      <AuthStack.Screen name={'ForgotPassword'} component={ForgotPassword} />
      <AuthStack.Screen name={'ResetPassword'} component={ResetPassword} />
    </AuthStack.Navigator>
  );
};
