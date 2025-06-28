import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootStack from './Source/navigation/rootStack';
import { store, persistor } from './Source/redux/store';
import CustomFlashMessage from './Source/Components/flashMessage';
import { fetchCartItems, setGuestCart } from './Source/redux/slices/cartSlice';
import { fetchWishlistItems } from './Source/redux/slices/wishlistSlice';
import { loadGuestCart } from './Source/redux/slices/cartSlice';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@components/toastConfig';
import { setAuthInitialized } from './Source/redux/slices/authSlice';

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
    const initializeApp = async () => {
      try {
        // Run cart and wishlist initialization in parallel
        await Promise.all([
          // Initialize cart
          token ? dispatch(fetchCartItems()) : 
            loadGuestCart().then(cart => dispatch(setGuestCart(cart))),
          
          // Initialize wishlist if logged in
          token && user?.id ? dispatch(fetchWishlistItems(user.id)) : Promise.resolve()
        ]);
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