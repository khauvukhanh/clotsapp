import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = ({ label }: any) => {
  const navigation = useNavigation();
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
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Image source={require('../../assets/icons/cart.png')} style={styles.cartIcon} />
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8E5BE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    width: 20,
    height: 20,
  }
});

export default Header;
