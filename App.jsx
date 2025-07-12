import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootStack from './Source/navigation/rootStack';
import { store, persistor } from './Source/redux/store';
import { fetchCartItems, setGuestCart, loadGuestCart } from './Source/redux/slices/cartSlice';
import { fetchWishlistItems } from './Source/redux/slices/wishlistSlice';
import { setAuthInitialized } from './Source/redux/slices/authSlice';
import { setSelectedAddress } from './Source/redux/slices/selectedAddressSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from './Source/navigation/navigationService';
import { useNotificationPermission } from './Source/hook/useNotificationPermission';
import { initializeNotifications } from './Source/services/notificationService';
import { NotificationPermissionDialog } from './Source/otherComponents/notificationDialog';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@components/toastConfig';
import CustomFlashMessage from '@components/flashMessage';

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
  const isLoggedIn = !!token;

  const {
    showPermissionDialog,
    handleAllowNotifications,
    handleDenyNotifications,
    checkAndShowPermissionDialog
  } = useNotificationPermission();

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
    let unsubscribeNotifications;

    const initializeApp = async () => {
      try {
        const hasPermission = await checkAndShowPermissionDialog();
        if (hasPermission) {
          const { unsubscribe } = await initializeNotifications();
          unsubscribeNotifications = unsubscribe;
        }

        // Initialize cart based on auth status
        if (isLoggedIn) {
          await dispatch(fetchCartItems());
          if (user?.id) {
            await dispatch(fetchWishlistItems(user.id));
          }
        } else {
          const guestCart = await loadGuestCart();
          dispatch(setGuestCart(guestCart));
        }

        await loadStoredAddress();
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        dispatch(setAuthInitialized());
      }
    };

    initializeApp();

    return () => {
      if (unsubscribeNotifications) {
        unsubscribeNotifications();
      }
    };
  }, [isLoggedIn, user?.id, dispatch]);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <RootStack />
      </NavigationContainer>
      <CustomFlashMessage/>
      <Toast config={toastConfig} />
      
      {showPermissionDialog && (
        <NotificationPermissionDialog
          onAllow={handleAllowNotifications}
          onDeny={handleDenyNotifications}
        />
      )}
    </>
  );
};

export default AppWrapper;