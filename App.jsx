import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootStack from './Source/navigation/rootStack';
import { Provider } from 'react-redux';
import { store, persistor } from './Source/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import CustomFlashMessage from './Source/Components/flashMessage';
import { useDispatch, useSelector } from 'react-redux';
import { loadGuestCart, fetchCartItems } from './Source/redux/slices/cartSlice'; // Add fetchCartItems

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
  const { initialized } = useSelector(state => state.cart); // Add cart initialized state

  // Initialize cart on app start and when token changes
  useEffect(() => {
    const initializeCart = async () => {
      if (token) {
        await dispatch(fetchCartItems()); // Load authenticated cart
      } else {
        await dispatch(loadGuestCart()); // Load guest cart
      }
    };
    
    // Only initialize if not already initialized
    if (!initialized) {
      initializeCart();
    }
  }, [token, dispatch, initialized]); // Add initialized dependency

  return (
    <NavigationContainer>
      <RootStack />
      <CustomFlashMessage/>
    </NavigationContainer>
  );
};

export default AppWrapper;