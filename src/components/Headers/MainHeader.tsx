import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStack';

interface MainHeaderProps {
  label: string;
  badgeCount?: number;
}

const MainHeader: React.FC<MainHeaderProps> = ({ label, badgeCount = 0 }) => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      {/* Avatar user */}
      <TouchableOpacity>
        <Image 
          source={require('../../assets/icons/avatar.png')} // Thay ảnh đại diện user
          style={styles.avatar} 
        />
      </TouchableOpacity>

      {/* Nút chọn danh mục */}
      <TouchableOpacity style={styles.categoryButton}>
        <Text style={styles.categoryText}>{label}</Text>
      </TouchableOpacity>

      {/* Nút giỏ hàng */}
      <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
        <Icon name="cart-outline" size={24} color="#333" />
        {badgeCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#8E6CEF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MainHeader;
