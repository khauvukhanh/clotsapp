import { useState, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import ApiClient from '../services/client';

interface UseAddToCartProps {
  productId: string;
  quantity: number;
  onSuccess?: () => void;
}

interface UseAddToCartReturn {
  isAdding: boolean;
  scaleAnim: Animated.Value;
  handleAddToCart: () => Promise<void>;
}

const useAddToCart = ({ productId, quantity, onSuccess }: UseAddToCartProps): UseAddToCartReturn => {
  const [isAdding, setIsAdding] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleAddToCart = async () => {
    if (isAdding) return;

    try {
      setIsAdding(true);

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

      onSuccess?.();
    } catch (error: any) {
    } finally {
      setIsAdding(false);
    }
  };

  return {
    isAdding,
    scaleAnim,
    handleAddToCart,
  };
};

export default useAddToCart; 