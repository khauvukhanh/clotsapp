import React from "react";
import { Text, FlatList, Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from '../components/Headers/BackHeader';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/HomeStack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CategoryRouteProp = RouteProp<HomeStackParamList, 'Category'>;
type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const products = [
  { 
    id: 1, 
    name: "Men's Harrington Jacket", 
    price: "$148.00", 
    oldPrice: null, 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 2, 
    name: "Max Cirro Men's Slides", 
    price: "$55.00", 
    oldPrice: "$100.97", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 3, 
    name: "Classic Denim Jeans", 
    price: "$89.99", 
    oldPrice: "$129.99", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 4, 
    name: "Premium Leather Sneakers", 
    price: "$199.99", 
    oldPrice: null, 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 5, 
    name: "Casual Cotton T-Shirt", 
    price: "$29.99", 
    oldPrice: "$39.99", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 6, 
    name: "Designer Backpack", 
    price: "$159.99", 
    oldPrice: "$199.99", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 7, 
    name: "Wool Blend Sweater", 
    price: "$79.99", 
    oldPrice: null, 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 8, 
    name: "Running Shoes Pro", 
    price: "$129.99", 
    oldPrice: "$159.99", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 9, 
    name: "Leather Wallet", 
    price: "$49.99", 
    oldPrice: "$69.99", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 10, 
    name: "Sports Shorts", 
    price: "$34.99", 
    oldPrice: null, 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 11, 
    name: "Designer Sunglasses", 
    price: "$179.99", 
    oldPrice: "$229.99", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 12, 
    name: "Casual Linen Shirt", 
    price: "$59.99", 
    oldPrice: null, 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 13, 
    name: "Premium Watch", 
    price: "$299.99", 
    oldPrice: "$399.99", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 14, 
    name: "Cotton Socks Pack", 
    price: "$24.99", 
    oldPrice: "$34.99", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 15, 
    name: "Leather Belt", 
    price: "$39.99", 
    oldPrice: null, 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 16, 
    name: "Sports Cap", 
    price: "$29.99", 
    oldPrice: "$39.99", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 17, 
    name: "Designer Scarf", 
    price: "$49.99", 
    oldPrice: null, 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 18, 
    name: "Premium Headphones", 
    price: "$199.99", 
    oldPrice: "$249.99", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 19, 
    name: "Smart Watch", 
    price: "$249.99", 
    oldPrice: "$299.99", 
    image: require('../assets/icons/product.png') 
  },
  { 
    id: 20, 
    name: "Leather Messenger Bag", 
    price: "$189.99", 
    oldPrice: null, 
    image: require('../assets/icons/product.png') 
  }
];

const CategoryScreen = () => {
  const route = useRoute<CategoryRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { category } = route.params;

  const renderProduct = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          {item.oldPrice && (
            <Text style={styles.oldPrice}>{item.oldPrice}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title={category.name} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  listContent: {
    padding: 16,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8E6CEF",
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: "#666666",
    textDecorationLine: 'line-through',
  },
});

export default CategoryScreen;
