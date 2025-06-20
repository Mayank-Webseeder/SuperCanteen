import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootStack from './Source/navigation/rootStack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, persistor } from './Source/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import CustomFlashMessage from './Source/Components/flashMessage';
import { loadGuestCart, fetchCartItems } from './Source/redux/slices/cartSlice'; 
import { fetchWishlistItems } from './Source/redux/slices/wishlistSlice';

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
  const { initialized } = useSelector(state => state.cart);

  // Initialize cart on app start
  useEffect(() => {
    const initializeCart = () => {
      if (token) {
        dispatch(fetchCartItems());
      } else {
        dispatch(loadGuestCart());
      }
    };
    if (!initialized) {
      initializeCart();
    }
  }, [token, dispatch, initialized]);

  // Initialize wishlist on login
  useEffect(() => {
    if (token && user?.id) {
      dispatch(fetchWishlistItems(user.id));
    }
  }, [token, user?.id, dispatch]);

  return (
    <NavigationContainer>
      <RootStack />
      <CustomFlashMessage />
    </NavigationContainer>
  );
};

export default AppWrapper;
