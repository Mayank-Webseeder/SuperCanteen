// Modular Firebase Messaging
import {
  getMessaging,
  getToken,
  onMessage,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
} from '@notifee/react-native';

import { Platform, Linking } from 'react-native';

const LOG_TAG = '[NotificationService]';
const DEBUG = true;

const messaging = getMessaging(getApp()); // ✅ Correct modular setup

// 1. Create Notification Channel (Android)
export const initializeNotificationChannel = async () => {
  try {
    DEBUG && console.log(`${LOG_TAG} Creating notification channel`);
    await notifee.createChannel({
      id: 'default',
      name: 'Deals & Offers',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      sound: 'default',
      vibration: true,
      vibrationPattern: [300, 500, 300, 500],
      lights: true,
      lightColor: '#FF5722',
      bypassDnd: true,
      showBadge: true,
      description: 'Special offers and order updates',
    });
    DEBUG && console.log(`${LOG_TAG} Channel created successfully`);
  } catch (e) {
    console.error(`${LOG_TAG} Channel creation failed`, e);
  }
};

// 2. Request Notification Permission
export const checkNotificationPermissions = async () => {
  try {
    DEBUG && console.log(`${LOG_TAG} Checking notification permissions`);
    const settings = await notifee.getNotificationSettings();
    DEBUG && console.log(`${LOG_TAG} Permission status:`, settings.authorizationStatus);

    if (settings.authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
      const result = await notifee.requestPermission();
      return result.authorizationStatus === AuthorizationStatus.AUTHORIZED;
    }

    return true;
  } catch (err) {
    console.error(`${LOG_TAG} Permission check error:`, err);
    return false;
  }
};

// 3. Display Notification
export const displayNotification = async (notification, data) => {
  try {
    DEBUG && console.log(`${LOG_TAG} Displaying notification`, notification);
    await notifee.displayNotification({
      id: Date.now().toString(),
      title: notification?.title ?? 'Notification',
      body: notification?.body ?? '',
      data: data ?? {},
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
        smallIcon: 'ic_notification',
        vibrationPattern: [300, 500],
        lights: ['#FF5722', 300, 600],
      },
    });
  } catch (e) {
    console.error(`${LOG_TAG} Failed to display`, e);
  }
};

// 4. Foreground + Background Notification Handlers
export const setupNotificationHandlers = () => {
  DEBUG && console.log(`${LOG_TAG} Setting up handlers`);

  const unsubscribe = onMessage(messaging, async message => {
    DEBUG && console.log(`${LOG_TAG} Foreground message:`, message);

    // ✅ Only show custom notification if it's a "data-only" message
    if (message?.notification == null && message?.data?.title) {
      await displayNotification({
        title: message.data.title,
        body: message.data.body,
      }, message.data);
    } else {
      DEBUG && console.log(`${LOG_TAG} Skipping display — notification payload already handled by Firebase`);
    }
  });

  setBackgroundMessageHandler(messaging, async message => {
    DEBUG && console.log(`${LOG_TAG} Background message:`, message);

    // Background: Firebase shows notification, but we can still log or do something with data
    if (message?.notification == null && message?.data?.title) {
      await displayNotification({
        title: message.data.title,
        body: message.data.body,
      }, message.data);
    }
  });

  return () => unsubscribe();
};


// 5. Initialize Notifications
export const initializeNotifications = async () => {
  DEBUG && console.log(`${LOG_TAG} Initializing notifications`);

  const hasPermission = await checkNotificationPermissions();
  if (!hasPermission) {
    console.warn(`${LOG_TAG} Notification permission not granted`);
    return;
  }

  await initializeNotificationChannel();

  let token;
  try {
    token = await getToken(messaging); // ✅ modular token fetch
    DEBUG && console.log(`${LOG_TAG} FCM Token:`, token);
  } catch (e) {
    console.error(`${LOG_TAG} Failed to get token`, e);
  }

  const unsubscribe = setupNotificationHandlers();

  return { token, unsubscribe };
};

// 6. Open Native Notification Settings
export const openSystemNotificationSettings = async () => {
  try {
    if (Platform.OS === 'android') {
      await notifee.openNotificationSettings();
    } else {
      await Linking.openURL('app-settings:');
    }
  } catch (e) {
    console.error(`${LOG_TAG} Error opening settings`, e);
  }
};
