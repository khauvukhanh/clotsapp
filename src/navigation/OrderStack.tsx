import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import OrderListScreen from "../screens/OrderListScreen";
import OrderDetailScreen from '../screens/OrderDetailScreen';

export type OrderStackParamList = {
  OrderList: undefined;
  OrderDetail: { orderId: string };
};

const Stack = createNativeStackNavigator<OrderStackParamList>();

const OrderStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OrderList" component={OrderListScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default OrderStack;
