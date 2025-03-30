import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

export type HomeStackParamList = {
  Home: undefined;
  Category: {
    category: {
      id: number;
      name: string;
      image: any;
    };
  };
  ProductDetail: {
    product: {
      id: number;
      name: string;
      price: string;
      oldPrice: string | null;
      image: any;
    };
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{
          tabBarStyle: { display: 'none' }
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack; 