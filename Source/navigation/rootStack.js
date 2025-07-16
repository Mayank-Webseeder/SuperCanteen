import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './authStack';
import AppStack from './appStack';
import SplashScreen from '@screens/splash';
import BugReportScreen from '@screens/otherSettings/bugReport';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
   {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />        */}
    <Stack.Screen name="App" component={AppStack} /> 
      <Stack.Screen 
        name="Auth" 
        component={AuthStack} 
        options={{ 
          presentation: 'modal',
          gestureEnabled: true
        }} 
      />  
    </Stack.Navigator>
  );
}
