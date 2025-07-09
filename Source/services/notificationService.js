import { getMessaging, requestPermission, getToken, onMessage, onNotificationOpenedApp, getInitialNotification, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { store } from '../redux/store';
import { saveFCMToken, addNotification } from '../redux/slices/notificationSlice';

// Request permission and get token
export const requestNotificationPermission = async () => {
  try {
    const messaging = getMessaging();
    const authStatus = await requestPermission(messaging);
    const enabled =
      authStatus === 1 || // AUTHORIZED
      authStatus === 2;   // PROVISIONAL

    if (enabled) {
      const fcmToken = await getToken(messaging);
      console.log("FCM TOKEN IS=====================>",fcmToken)
      store.dispatch(saveFCMToken(fcmToken));
      return fcmToken;
    }
  } catch (error) {
    console.log('Notification permission error:', error);
  }
  return null;
};

// Foreground, background, and kill state notification setup
export const setupNotificationHandlers = () => {
  const messaging = getMessaging();

  // Foreground notifications
  onMessage(messaging, async remoteMessage => {
    const { notification, data } = remoteMessage;

    store.dispatch(addNotification({
      id: Date.now().toString(),
      title: notification?.title,
      body: notification?.body,
      data,
      timestamp: new Date().toISOString(),
      read: false
    }));

    await displayNotification(notification, data);
  });

  // Background messages
  setBackgroundMessageHandler(async remoteMessage => {
    const { notification, data } = remoteMessage;

    store.dispatch(addNotification({
      id: Date.now().toString(),
      title: notification?.title,
      body: notification?.body,
      data,
      timestamp: new Date().toISOString(),
      read: false
    }));
  });

  // App opened from background
  onNotificationOpenedApp(messaging, remoteMessage => {
    handleNotificationNavigation(remoteMessage);
  });

  // App opened from quit state
  getInitialNotification(messaging).then(remoteMessage => {
    if (remoteMessage) {
      handleNotificationNavigation(remoteMessage);
    }
  });
};

const displayNotification = async (notification, data) => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: notification?.title,
    body: notification?.body,
    data,
    android: {
      channelId: 'default',
      smallIcon: 'ic_notification', // ensure this icon is in your `res` folder
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      sound: 'default',
    },
  });
};

const handleNotificationNavigation = (remoteMessage) => {
  const { data } = remoteMessage;
  if (data?.type === 'order') {
    // Navigate to order detail
  } else if (data?.type === 'offer') {
    // Navigate to offers screen
  }
};
