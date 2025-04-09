import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUser } from '../../hooks/useUser';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const HomeHeader = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user, isLoading } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.greeting}>
          {isLoading ? 'Loading...' : `Hello, ${user?.name || 'Guest'}`}
        </Text>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="account-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  leftSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default HomeHeader; 