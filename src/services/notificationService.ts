import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import client from './client';

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