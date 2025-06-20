import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootStack from './Source/navigation/rootStack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, persistor } from './Source/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import CustomFlashMessage from './Source/Components/flashMessage';
import { fetchCartItems, markCartInitialized } from './Source/redux/slices/cartSlice';
import { fetchWishlistItems } from './Source/redux/slices/wishlistSlice';
import { loadGuestCart } from './Source/redux/slices/cartSlice';

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
    const initializeCart = async () => {
      if (token) {
        // For authenticated users
        try {
          await dispatch(fetchCartItems());
        } catch (error) {
          console.error('Error fetching cart items:', error);
          dispatch(markCartInitialized());
        }
      } else {
        // For guest users
        try {
          const guestCart = await loadGuestCart();
          dispatch({ 
            type: 'cart/setGuestCart', 
            payload: guestCart 
          });
        } catch (error) {
          console.error('Error loading guest cart:', error);
          dispatch(markCartInitialized());
        }
      }
    };
    
    if (!initialized) {
      initializeCart();
    }
  }, [token, dispatch, initialized]);

  // Initialize wishlist on login
  useEffect(() => {
    const initializeWishlist = async () => {
      if (token && user?.id) {
        try {
          await dispatch(fetchWishlistItems(user.id));
        } catch (error) {
          console.error('Error fetching wishlist items:', error);
        }
      }
    };
    
    initializeWishlist();
  }, [token, user?.id, dispatch]);

  return (
    <NavigationContainer>
      <RootStack />
      <CustomFlashMessage />
    </NavigationContainer>
  );
};

export default AppWrapper;