import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/HomeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackHeader from '../components/Headers/BackHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import { useProductDetail } from '../hooks/useProductDetail';
import useAddToCart from '../hooks/useAddToCart';
import useCart from '../hooks/useCart';

type ProductDetailRouteProp = RouteProp<HomeStackParamList, 'ProductDetail'>;
type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { product: initialProduct } = route.params;
  
  const { product, isLoading, error } = useProductDetail(initialProduct._id);
  const { cartItems, fetchCartItems } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const cartIconAnim = useRef(new Animated.Value(1)).current;
  
  const displayProduct = product || initialProduct;

  useEffect(() => {
    fetchCartItems();
  }, []);

  const { isAdding, scaleAnim, handleAddToCart } = useAddToCart({
    productId: displayProduct._id,
    quantity: 1,
    onSuccess: () => {
      // Animate cart icon
      Animated.sequence([
        Animated.timing(cartIconAnim, {
          toValue: 1.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(cartIconAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(async () => {
        await fetchCartItems(); // Update cart items
      });
    },
  });

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const renderImageGallery = () => {
    if (!displayProduct.images || displayProduct.images.length === 0) {
      return (
        <FastImage
          source={{ uri: displayProduct.thumbnail }}
          style={styles.mainImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
    }

    return (
      <View>
        <FastImage
          source={{ uri: displayProduct.images[selectedImageIndex] || displayProduct.thumbnail }}
          style={styles.mainImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        {displayProduct.images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailContainer}
          >
            {displayProduct.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImageIndex(index)}
                style={[
                  styles.thumbnail,
                  selectedImageIndex === index && styles.selectedThumbnail,
                ]}
              >
                <FastImage
                  source={{ uri: image }}
                  style={styles.thumbnailImage}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader 
          title="Product Details" 
          rightIcon={{
            name: 'cart-outline',
            onPress: handleCartPress,
            badgeCount: cartItems.length,
            animation: cartIconAnim,
          }}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8E6CEF" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader 
          title="Product Details" 
          rightIcon={{
            name: 'cart-outline',
            onPress: handleCartPress,
            badgeCount: cartItems.length,
            animation: cartIconAnim,
          }}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load product details</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader 
        title="Product Details" 
        rightIcon={{
          name: 'cart-outline',
          onPress: handleCartPress,
          badgeCount: cartItems.length,
          animation: cartIconAnim,
        }}
      />
      <ScrollView style={styles.scrollView}>
        {renderImageGallery()}
        
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{displayProduct.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${displayProduct.price.toFixed(2)}</Text>
            {displayProduct.discountPrice > 0 && (
              <Text style={styles.discountPrice}>
                ${displayProduct.discountPrice.toFixed(2)}
              </Text>
            )}
          </View>
          
          <View style={styles.stockContainer}>
            <Text style={styles.stockLabel}>Stock:</Text>
            <Text style={[
              styles.stockValue,
              displayProduct.stock > 10 ? styles.inStock : 
              displayProduct.stock > 0 ? styles.lowStock : styles.outOfStock
            ]}>
              {displayProduct.stock > 0 ? `${displayProduct.stock} available` : 'Out of stock'}
            </Text>
          </View>
          
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{displayProduct.description}</Text>
          
          <Animated.View style={[styles.addToCartContainer, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity 
              style={[
                styles.addToCartButton,
                (displayProduct.stock <= 0 || isAdding) && styles.disabledButton
              ]}
              onPress={handleAddToCart}
              disabled={displayProduct.stock <= 0 || isAdding}
            >
              <Icon name="cart-plus" size={24} color="#FFFFFF" />
              <Text style={styles.addToCartText}>
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
  },
  mainImage: {
    width: width,
    height: width,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#8E6CEF',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  contentContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#8E6CEF',
    marginRight: 10,
  },
  discountPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stockLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 5,
  },
  stockValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  inStock: {
    color: '#4CAF50',
  },
  lowStock: {
    color: '#FF9800',
  },
  outOfStock: {
    color: '#F44336',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  addToCartContainer: {
    marginBottom: 20,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#8E6CEF',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});
export default ProductDetailScreen;

