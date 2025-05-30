// navigation/AuthStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from '../Screens/auth/signIn';
import welcomeScreen from '../Screens/auth/welcome';
import SignUpScreen from '../Screens/auth/signUp';
import ForgotPasswordScreen from '../Screens/auth/forgotPassword'
import ResetPasswordScreen from '../Screens/auth/resetPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={welcomeScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
