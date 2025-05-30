import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountScreen from '../../Screens/Account';
import AddressListScreen from '../../Components/address/addressList';
import LoginSecurityScreen from '../../Screens/otherSettings/loginSecurity';
import EditFieldScreen from '../../Screens/otherSettings/loginSecurity/editFieldScreen';
import LanguageScreen from '../../Screens/otherSettings/languages';

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AccountMain" component={AccountScreen} />
    <Stack.Screen name="AddressListScreen" component={AddressListScreen} />
    <Stack.Screen name="LoginSecurity" component={LoginSecurityScreen} />
    <Stack.Screen name="EditField" component={EditFieldScreen} />
    <Stack.Screen name="Language" component={LanguageScreen} />
  </Stack.Navigator>
  )
}