import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import HomeStack from './HomeStack';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export type TabParamList = {
  HomeStack: undefined;
  Notification: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
        ],
        tabBarActiveTintColor: '#8E6CEF',
        tabBarInactiveTintColor: '#666666',
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
      }}
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
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'ProductDetail' || routeName === 'Category') {
              return { display: 'none' };
            }
            return styles.tabBar;
          })(route),
        })}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/notification.png')}
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