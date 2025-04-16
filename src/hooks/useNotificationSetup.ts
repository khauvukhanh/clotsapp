import { useEffect } from 'react';
import { requestNotificationPermission, getFCMToken, updateFCMToken } from '../services/notificationService';

export const useNotificationSetup = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // Request notification permission
        const granted = await requestNotificationPermission();
        if (granted) {
          // Get FCM token if permission is granted
          const token = await getFCMToken();
          if (token) {
            // Update FCM token to server
            await updateFCMToken(token);
          }
        }
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };

    setupNotifications();
  }, []);
}; 