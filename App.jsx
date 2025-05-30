import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootStack from './Source/navigation/rootStack';
import { Provider } from 'react-redux';
import { store, persistor } from './Source/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import CustomFlashMessage from './Source/Components/flashMessage';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <RootStack />
             <CustomFlashMessage/>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
