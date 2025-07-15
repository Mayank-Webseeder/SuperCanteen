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
  AndroidStyle,
  EventType, // Add this if you need event types
} from '@notifee/react-native';
import { Platform, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const messaging = getMessaging(getApp());
const NOTIFICATION_STORAGE_KEY = '@displayed_notifications';
const MAX_NOTIFICATION_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

const LOG_TAG = '[NotificationService]';
const DEBUG = true;

// Track initialization state
let isInitialized = false;
let unsubscribeForeground = null;
let cleanupInterval = null;

// 1. Notification Channel Setup
const initializeNotificationChannel = async () => {
  try {
    await notifee.createChannel({
      id: 'default',
      name: 'Deals & Updates',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      sound: 'default',
      lights: true,
      lightColor: '#2E6074',
      vibration: true,
      bypassDnd: true,
      showBadge: true,
    });
  } catch (error) {
    console.error('Channel creation failed:', error);
  }
};

// 2. Persistent Notification Tracking
let displayedNotifications = new Map();

const loadDisplayedNotifications = async () => {
  try {
    const stored = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      
      if (Array.isArray(parsed)) {
        const now = Date.now();
        const filtered = parsed.filter(
          ([id, timestamp]) => now - timestamp < MAX_NOTIFICATION_AGE_MS
        );
        displayedNotifications = new Map(filtered);
        await saveDisplayedNotifications();
      } else {
        console.warn('Invalid notification storage format. Resetting...');
        displayedNotifications = new Map();
        await AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY); // Clean corrupted data
      }
    }
  } catch (error) {
    console.error('Error loading notifications:', error);
    displayedNotifications = new Map(); // fallback to empty
  }
};

const saveDisplayedNotifications = async () => {
  try {
    await AsyncStorage.setItem(
      NOTIFICATION_STORAGE_KEY,
      JSON.stringify(Array.from(displayedNotifications))
    );
  } catch (error) {
    console.error('Error saving notifications:', error);
  }
};

// 3. Notification Display with Deduplication
const displayNotification = async (remoteMessage) => {
  const { notification, data, messageId } = remoteMessage;
  
  if (!messageId) return;
  
  const now = Date.now();
  const timestamp = displayedNotifications.get(messageId);
  
  // Skip if notification was shown recently
  if (timestamp && (now - timestamp < MAX_NOTIFICATION_AGE_MS)) {
    return;
  }

  try {
    // Update tracking
    displayedNotifications.set(messageId, now);
    await saveDisplayedNotifications();

    // Display notification
    await notifee.displayNotification({
      id: messageId,
      title: notification?.title || 'New Update',
      body: notification?.body || '',
      data,
      android: {
        channelId: 'default',
        smallIcon: 'logo_colored',
        color: '#2874F0',
        timestamp: now,
        showWhen: true,
        autoCancel: true,
        pressAction: { id: 'default', launchActivity: 'default' },
        style: { type: AndroidStyle.BIGTEXT, text: notification?.body || '' },
        backgroundColor: '#F5F5F5',
      },
      ios: {
        threadId: 'flipkart-deals',
      },
    });
  } catch (error) {
    console.error('Notification display failed:', error);
    displayedNotifications.delete(messageId);
  }
};

// 4. Setup Handlers
const setupNotificationHandlers = () => {
  if (unsubscribeForeground) {
    return () => unsubscribeForeground();
  }

  // Foreground handler
  unsubscribeForeground = onMessage(messaging, displayNotification);

  // Background handler (Android only) - FIXED
  if (Platform.OS === 'android') {
    messaging.setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage?.notification) {
        console.log('[FCM] Skipped default system notification in background');
        return;
      }
      await displayNotification(remoteMessage);
    });
  }

  return () => {
    if (unsubscribeForeground) {
      unsubscribeForeground();
      unsubscribeForeground = null;
    }
  };
};


// 5. Main Initialization Function
export const initializeNotifications = async () => {
  if (isInitialized) {
    console.log('Notifications already initialized');
    return { token: null, unsubscribe: () => {} };
  }

  try {
    // Initialize channel and load stored notifications
    await initializeNotificationChannel();
    await loadDisplayedNotifications();

    // Check and request permissions
    const settings = await notifee.getNotificationSettings();
    if (settings.authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
      await notifee.requestPermission({
        sound: true,
        announcement: true,
        alert: true,
      });
    }

    // Get FCM token
    const token = await getToken(messaging);
    console.log('FCM Token:', token);

    // Setup handlers
    const unsubscribe = setupNotificationHandlers();

    // Setup periodic cleanup
    cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [id, timestamp] of displayedNotifications) {
        if (now - timestamp > MAX_NOTIFICATION_AGE_MS) {
          displayedNotifications.delete(id);
        }
      }
      saveDisplayedNotifications();
    }, 3600000);

    // Refresh on app state changes
    const appStateSubscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        loadDisplayedNotifications();
      }
    });

    isInitialized = true;
    
    return { 
      token, 
      unsubscribe: () => {
        clearInterval(cleanupInterval);
        cleanupInterval = null;
        appStateSubscription.remove();
        unsubscribe();
        isInitialized = false;
      }
    };
  } catch (error) {
    console.error('Notification initialization failed:', error);
    return { token: null, unsubscribe: () => {} };
  }
};

// 6. Utility function to check permissions (if needed)
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