import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import ApiClient from '../services/client';
import { Product } from './useProducts';

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
}

interface CartResponse {
  items: CartItem[];
  totalAmount: number;
}

interface UseCartReturn {
  cartItems: CartItem[];
  totalAmount: number;
  isLoading: boolean;
  error: string | null;
  fetchCartItems: () => Promise<void>;
  removeAllItems: () => Promise<void>;
}

const useCart = (): UseCartReturn => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ApiClient.get('cart');
      setCartItems(response.data.items);
      setTotalAmount(response.data.totalAmount);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch cart items');
      Alert.alert('Error', error.message || 'Failed to fetch cart items');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeAllItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await ApiClient.delete('cart');
      setCartItems([]);
      setTotalAmount(0);
    } catch (err) {
      setError(err as string);
      console.error('Error removing cart items:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useCallback(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return {
    cartItems,
    totalAmount,
    isLoading,
    error,
    fetchCartItems,
    removeAllItems,
  };
};

export default useCart; 