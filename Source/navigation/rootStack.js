import React from 'react'
import { useSelector } from 'react-redux';
import AuthStack from './authStack';
import AppStack from './appStack';

export default function RootStack() {
 const { token } = useSelector(state => state.auth);
if (!token) {
  return <AuthStack />;
}
return token ? <AppStack /> : <AuthStack />;
}