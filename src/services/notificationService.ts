import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import client from './client';
import { useToast } from '../context/ToastContext';

export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      // Request iOS permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('iOS Notification permission granted');
        return true;
      }
      console.log('iOS Notification permission denied');
      return false;
    } else {
      // Android permission is granted by default
      const authStatus = await messaging().hasPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Android Notification permission granted');
        return true;
      }
      console.log('Android Notification permission denied');
      return false;
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

export const getFCMToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

export const updateFCMToken = async (token: string): Promise<boolean> => {
  try {
    await client.post('auth/fcm-token', { fcmToken: token });
    console.log('FCM token updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating FCM token:', error);
    return false;
  }
};

export const checkNotificationPermission = async (): Promise<boolean> => {
  try {
    const authStatus = await messaging().hasPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    return enabled;
  } catch (error) {
    console.error('Error checking notification permission:', error);
    return false;
  }
};

// Setup foreground message handler
export const setupForegroundHandler = (onMessageReceived: (message: any) => void, showToast?: (message: string, title?: string, type?: 'success' | 'error' | 'info') => void) => {
  return messaging().onMessage(async (remoteMessage) => {
    console.log('Foreground message received:', remoteMessage);
    
    // Handle the notification data
    if (remoteMessage.notification) {
      const { title, body } = remoteMessage.notification;
      console.log('Notification title:', title);
      console.log('Notification body:', body);
      
      showToast?.(body || '', title || 'New Notification', 'info');

    }

    // Handle the data payload
    if (remoteMessage.data) {
      console.log('Notification data:', remoteMessage.data);
    }

    // Call the callback with the message
    onMessageReceived(remoteMessage);
  });
};

// Setup notification opened handler
export const setupNotificationOpenedHandler = (onNotificationOpened: (data: any) => void) => {
  // Handle notification opened from background
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('Notification opened from background:', remoteMessage);
    if (remoteMessage.data) {
      onNotificationOpened(remoteMessage.data);
    }
  });

  // Check if app was opened from a notification
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('Notification opened from quit state:', remoteMessage);
        if (remoteMessage.data) {
          onNotificationOpened(remoteMessage.data);
        }
      }
    });
}; 