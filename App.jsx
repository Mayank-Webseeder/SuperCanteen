import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootStack from './Source/navigation/rootStack';
import { Provider } from 'react-redux';
import { store, persistor } from './Source/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import CustomFlashMessage from './Source/Components/flashMessage';
import { useDispatch, useSelector } from 'react-redux';
import { initializeGuestCart } from './Source/redux/slices/cartSlice'; // Import the action instead

const AppWrapper = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    const initializeCart = async () => {
      if (!token) {
        await dispatch(initializeGuestCart()); // Use the proper action
      }
    };
    
    initializeCart();
  }, [token, dispatch]);

  return (
    <NavigationContainer>
      <RootStack />
      <CustomFlashMessage/>
    </NavigationContainer>
  );
};

export default AppWrapper;