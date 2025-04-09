import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  View,
} from 'react-native';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import ApiClient from '../services/client';
import { useToast } from '../context/ToastContext';

interface CartButtonProps {
  productId: string;
  quantity?: number;
  onAddToCart?: () => void;
}

const CartButton = ({ productId, quantity = 1, onAddToCart }: CartButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const scaleAnim = new Animated.Value(1);
  const { showToast } = useToast();

  const handleAddToCart = async () => {
    try {
      setIsAnimating(true);
      
      // Start animation
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();

      // Call API to add item to cart
      await ApiClient.post('cart/items', {
        productId,
        quantity,
      });

      showToast('Item added to cart', 'success');
      onAddToCart?.();
    } catch (error: any) {
      showToast(error.message || 'Failed to add item to cart', 'error');
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleAddToCart}
      disabled={isAnimating}
    >
      <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
        <FastImage
          source={require('../assets/icons/cart.png')}
          style={styles.icon}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.text}>Add to Cart</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8E6CEF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
    marginRight: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CartButton; 