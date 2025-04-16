import { useEffect } from 'react';
import { 
  requestNotificationPermission, 
  getFCMToken, 
  updateFCMToken,
  setupForegroundHandler,
  setupNotificationOpenedHandler
} from '../services/notificationService';

export const useNotificationSetup = (onNotificationReceived?: (message: any) => void) => {
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

    // Setup foreground message handler
    const unsubscribeForeground = setupForegroundHandler((message) => {
      console.log('Foreground message received in hook:', message);
      if (onNotificationReceived) {
        onNotificationReceived(message);
      }
    });

    // Setup notification opened handler
    setupNotificationOpenedHandler((data) => {
      console.log('Notification opened with data:', data);
      if (onNotificationReceived) {
        onNotificationReceived(data);
      }
    });

    setupNotifications();

    // Cleanup
    return () => {
      unsubscribeForeground();
    };
  }, [onNotificationReceived]);
}; 