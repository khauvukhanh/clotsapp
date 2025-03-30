/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import NetworkToast from './src/components/NetworkToast';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
      <NetworkToast />
    </AuthProvider>
  );
}
