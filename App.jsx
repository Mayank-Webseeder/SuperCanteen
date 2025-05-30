import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootStack from './Source/navigation/rootStack';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
export default App;
