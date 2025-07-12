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
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOG_TAG = '[NotificationService]';
const DEBUG = true;

const messaging = getMessaging(getApp());

// Track initialization state
let notificationChannelInitialized = false;
let notificationHandlersInitialized = false;
const activeNotifications = new Set();

// 1. Create Notification Channel (Android)
export const initializeNotificationChannel = async () => {
  if (notificationChannelInitialized) {
    DEBUG && console.log(`${LOG_TAG} Channel already initialized`);
    return;
  }

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
    notificationChannelInitialized = true;
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

// 3. Display Notification (with enhanced duplicate prevention)
export const displayNotification = async (notification, data) => {
  try {
    const notificationId = data?.messageId || `notif_${Date.now()}`;
    const notificationKey = `${notification.title}_${notification.body}`;
    
    // Skip if this notification is already active
    if (activeNotifications.has(notificationKey)) {
      DEBUG && console.log(`${LOG_TAG} Skipping duplicate notification`);
      return;
    }

    activeNotifications.add(notificationKey);
    
    DEBUG && console.log(`${LOG_TAG} Displaying notification`, notification);
    
    await notifee.displayNotification({
      id: notificationId,
      title: notification?.title ?? 'Notification',
      body: notification?.body ?? '',
      data: data ?? {},
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
        smallIcon: 'ic_notification',
        color: '#FF5722',
        vibrationPattern: [300, 500],
        lights: ['#FF5722', 300, 600],
      },
    });

    // Remove from active set after 5 seconds
    setTimeout(() => {
      activeNotifications.delete(notificationKey);
    }, 5000);
  } catch (e) {
    console.error(`${LOG_TAG} Failed to display`, e);
  }
};

// 4. Notification Handlers (with background/foreground separation)
export const setupNotificationHandlers = () => {
  if (notificationHandlersInitialized) {
    DEBUG && console.log(`${LOG_TAG} Handlers already initialized`);
    return () => {};
  }

  DEBUG && console.log(`${LOG_TAG} Setting up handlers`);
  notificationHandlersInitialized = true;

  const handleForegroundMessage = async (message) => {
    DEBUG && console.log(`${LOG_TAG} Foreground message:`, message);
    
    if (!message.notification && !message.data?.title) return;

    await displayNotification({
      title: message.notification?.title || message.data?.title,
      body: message.notification?.body || message.data?.body,
    }, {
      ...message.data,
      messageId: message.messageId
    });
  };

  const handleBackgroundMessage = async (message) => {
    DEBUG && console.log(`${LOG_TAG} Background message:`, message);
    
    // Skip if this is a notification message (let system handle it)
    if (message.notification) {
      DEBUG && console.log(`${LOG_TAG} Skipping system notification in background`);
      return;
    }

    // Only process data messages in background
    if (message.data?.title) {
      await displayNotification({
        title: message.data.title,
        body: message.data.body,
      }, {
        ...message.data,
        messageId: message.messageId
      });
    }
  };

  // Foreground handler
  const unsubscribeForeground = onMessage(messaging, handleForegroundMessage);

  // Background handler (Android only)
  if (Platform.OS === 'android') {
    setBackgroundMessageHandler(messaging, handleBackgroundMessage);
  }

  return () => {
    notificationHandlersInitialized = false;
    unsubscribeForeground();
    DEBUG && console.log(`${LOG_TAG} Notification handlers cleaned up`);
  };
};

// 5. Initialize Notifications
export const initializeNotifications = async () => {
  DEBUG && console.log(`${LOG_TAG} Initializing notifications`);

  const hasPermission = await checkNotificationPermissions();
  if (!hasPermission) {
    console.warn(`${LOG_TAG} Notification permission not granted`);
    return { token: null, unsubscribe: () => {} };
  }

  await initializeNotificationChannel();

  let token;
  try {
    token = await getToken(messaging);
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