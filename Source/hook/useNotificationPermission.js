import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  checkNotificationPermissions,
  initializeNotifications,
  openSystemNotificationSettings
} from '../services/notificationService';

export const useNotificationPermission = () => {
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  const checkAndShowPermissionDialog = async () => {
    const hasPermission = await checkNotificationPermissions();
    const permissionData = await AsyncStorage.getItem('@notification_permission');
    const permissionState = permissionData ? JSON.parse(permissionData) : null;
    
    if (!hasPermission) {
      if (!permissionState || permissionState.denied) {
        const lastAsked = permissionState?.lastAsked ? new Date(permissionState.lastAsked) : null;
        const daysSinceDenied = lastAsked ? Math.floor((new Date() - lastAsked) / (1000 * 60 * 60 * 24)) : Infinity;
        
        if (daysSinceDenied > 7) {
          setShowPermissionDialog(true);
          await AsyncStorage.setItem('@notification_permission', JSON.stringify({
            asked: true,
            lastAsked: new Date().toISOString(),
            denied: false
          }));
        }
      } else {
        setShowPermissionDialog(true);
      }
    } else {
      await initializeNotifications();
    }
  };

  const handleAllowNotifications = async () => {
    await openSystemNotificationSettings();
    setShowPermissionDialog(false);
  };

  const handleDenyNotifications = async () => {
    await AsyncStorage.setItem('@notification_permission', JSON.stringify({
      asked: true,
      lastAsked: new Date().toISOString(),
      denied: true
    }));
    setShowPermissionDialog(false);
  };



  // Handle app state changes to check permissions when app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'active') {
        const hasPermission = await checkNotificationPermissions();
        if (hasPermission) {
          await initializeNotifications();
        }
      }
    });

    return () => subscription.remove();
  }, []);

  return {
    showPermissionDialog,
    handleAllowNotifications,
    handleDenyNotifications,
    checkAndShowPermissionDialog,
    openSystemNotificationSettings
  };
};