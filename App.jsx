import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootStack from './Source/navigation/rootStack';
import { store, persistor } from './Source/redux/store';
import CustomFlashMessage from './Source/Components/flashMessage';
import { fetchCartItems, setGuestCart, loadGuestCart } from './Source/redux/slices/cartSlice';
import { fetchWishlistItems } from './Source/redux/slices/wishlistSlice';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@components/toastConfig';
import { setAuthInitialized } from './Source/redux/slices/authSlice';
import { setSelectedAddress } from './Source/redux/slices/selectedAddressSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initSocket, disconnectSocket,getSocket } from './Source/services/SocketService';

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
  const { token, user } = useSelector(state => state.auth);

    useEffect(() => {
    if (token) {
      initSocket(); // Connect only if user is authenticated
      
      // Optional: Basic connection logging
      const socket = getSocket();
      socket.on('connect', () => console.log('Socket connected'));
      socket.on('disconnect', () => console.log('Socket disconnected'));
    }

    return () => {
      if (token) {
        disconnectSocket(); // Cleanup on unmount
      }
    };
  }, [token]); // Reconnect if token changes


  const loadStoredAddress = async () => {
    try {
      const stored = await AsyncStorage.getItem('selectedAddress');
      if (stored) {
        dispatch(setSelectedAddress(JSON.parse(stored)));
      }
    } catch (err) {
      console.error('Error loading stored address:', err);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Promise.all([
          token ? dispatch(fetchCartItems()) : loadGuestCart().then(cart => dispatch(setGuestCart(cart))),
          token && user?.id ? dispatch(fetchWishlistItems(user.id)) : Promise.resolve()
        ]);

        // Load stored address AFTER cart and wishlist
        await loadStoredAddress();
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        dispatch(setAuthInitialized());
      }
    };

    initializeApp();
  }, [token, user?.id, dispatch]);

  return (
    <NavigationContainer>
      <RootStack />
      <CustomFlashMessage />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default AppWrapper;
