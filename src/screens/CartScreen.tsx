import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';

import { HomeStackParamList } from '../navigation/HomeStack';
import BackHeader from '../components/Headers/BackHeader';
import useCart from '../hooks/useCart';
import { Product } from '../hooks/useProducts';

// Types
type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
}

// Components
const CartItem = ({ item, onPress }: { item: CartItem; onPress: () => void }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <FastImage
      source={{ uri: item.product.thumbnail }}
      style={styles.productImage}
      resizeMode={FastImage.resizeMode.cover}
    />
    <View style={styles.itemInfo}>
      <Text style={styles.productName}>{item.product.name}</Text>
      <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

const LoadingState = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#8E6CEF" />
  </View>
);

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>Your cart is empty</Text>
  </View>
);

const CartFooter = ({ totalAmount }: { totalAmount: number }) => (
  <View style={styles.footer}>
    <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
    <TouchableOpacity style={styles.checkoutButton}>
      <Text style={styles.checkoutText}>Checkout</Text>
    </TouchableOpacity>
  </View>
);

// Main Component
const CartScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { cartItems, totalAmount, isLoading, fetchCartItems } = useCart();

  const handleItemPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="Shopping Cart" />
        <LoadingState />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="Shopping Cart" />
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem item={item} onPress={() => handleItemPress(item.product)} />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<EmptyState />}
      />
      {cartItems.length > 0 && <CartFooter totalAmount={totalAmount} />}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E6CEF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: '#8E6CEF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen; 