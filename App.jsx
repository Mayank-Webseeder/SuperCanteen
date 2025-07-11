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
import { navigationRef } from './Source/navigation/navigationService';
import { useNotificationPermission } from './Source/hook/useNotificationPermission'
import { initializeNotifications } from './Source/services/notificationService';
import { NotificationPermissionDialog } from './Source/otherComponents/notificationDialog';

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

  // Use the notification permission hook
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
    const initializeApp = async () => {
      try {
        // Initialize notifications if permission exists
        const hasPermission = await checkAndShowPermissionDialog();
        if (hasPermission) {
          await initializeNotifications();
        }

        // Initialize rest of app
        await Promise.all([
          token ? dispatch(fetchCartItems()) : loadGuestCart().then(cart => dispatch(setGuestCart(cart))),
          token && user?.id ? dispatch(fetchWishlistItems(user.id)) : Promise.resolve()
        ]);

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
    <NavigationContainer ref={navigationRef}>
      <RootStack />
      <CustomFlashMessage />
      <Toast config={toastConfig} />
      
      {showPermissionDialog && (
        <NotificationPermissionDialog
          onAllow={handleAllowNotifications}
          onDeny={handleDenyNotifications}
        />
      )}
    </NavigationContainer>
  );
};

export default AppWrapper;