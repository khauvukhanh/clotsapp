import React, { useEffect } from 'react';
import { setupForegroundHandler, setupNotificationOpenedHandler } from '../services/notificationService';
import { useToast } from '../context/ToastContext';

const NotificationHandler: React.FC = () => {
  const { showToast } = useToast();

  useEffect(() => {
    // Setup foreground message handler with toast
    const unsubscribe = setupForegroundHandler(
      (message) => {
        console.log('Message received:', message);
      },
      showToast
    );

    // Setup notification opened handler
    setupNotificationOpenedHandler((data) => {
      console.log('Notification opened with data:', data);
      // You can handle navigation or other actions here
    });

    return () => {
      unsubscribe();
    };
  }, [showToast]);

  return null;
};

export default NotificationHandler; 