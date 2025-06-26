import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountScreen from '@screens/Account';
import AddressListScreen from '../Components/address/addressList';
import LoginSecurityScreen from '@screens/otherSettings/loginSecurity';
import HelpSupport from '@screens/otherSettings/helpSupport';

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AccountMain" component={AccountScreen} />
    <Stack.Screen name="AddressListScreen" component={AddressListScreen} />
    <Stack.Screen name="LoginSecurity" component={LoginSecurityScreen} />
    <Stack.Screen name="HelpSupport" component={HelpSupport} />
  </Stack.Navigator>
  )
}