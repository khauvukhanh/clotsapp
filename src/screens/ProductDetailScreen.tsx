import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HomeStackParamList} from '../navigation/HomeStack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ProductDetailRouteProp = RouteProp<HomeStackParamList, 'ProductDetail'>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const {product} = route.params;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left-thin" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton}>
          <Icon name="cart-outline" size={24} color="#1A1A1A" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image source={product.image} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.price}</Text>
            {product.oldPrice && (
              <Text style={styles.oldPrice}>{product.oldPrice}</Text>
            )}
          </View>
          <Text style={styles.description}>
            Experience the perfect blend of comfort and style with our premium product. Made from high-quality materials, this item offers exceptional durability and a modern aesthetic that complements any space.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Icon name="cart-plus" size={24} color="#FFFFFF" style={styles.cartIcon} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 16,
  },
  backButton: {
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#8E6CEF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 400,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8E6CEF',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 16,
    color: '#666666',
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginTop: 16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 44,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  addToCartButton: {
    backgroundColor: '#8E6CEF',
    height: 56,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    marginRight: 8,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
