import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import HomeStack from './HomeStack';
import NotificationStack from './NotificationStack';
import ProfileScreen from '../screens/ProfileScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import OrderStack from './OrderStack';

export type TabParamList = {
  HomeStack: undefined;
  Notification: undefined;
  Profile: undefined;
  Order: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            display: getTabBarVisibility(route),
          },
        ],
        tabBarActiveTintColor: '#8E6CEF',
        tabBarInactiveTintColor: '#666666',
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/home.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStack}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/notification.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Order"
        component={OrderStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/order.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/profile.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  const hideOnScreens = ['ProductDetail', 'Category', 'Cart', 'Checkout', 'OrderDetail'];
  return hideOnScreens.includes(routeName) ? 'none' : 'flex';
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    height: 64,
    backgroundColor: '#FFFFFF',
  },
  tabBarItem: {
    height: 64,
    paddingVertical: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  tabBarIcon: {
    width: 40,
    height: 40,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default TabNavigator; 