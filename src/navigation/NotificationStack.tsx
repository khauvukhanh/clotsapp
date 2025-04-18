import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from '../screens/NotificationScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';

export type NotificationStackParamList = {
  Notification: undefined;
  OrderDetail: { orderId: string };
};

const Stack = createNativeStackNavigator<NotificationStackParamList>();

const NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default NotificationStack; 