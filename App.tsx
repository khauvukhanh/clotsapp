/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ToastProvider } from './src/context/ToastContext';
import RootNavigator from './src/navigation/RootNavigator';
import NetworkToast from './src/components/NetworkToast';
import NotificationHandler from './src/components/NotificationHandler';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ToastProvider>
          <RootNavigator />
          <NetworkToast />
          <NotificationHandler />
        </ToastProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
