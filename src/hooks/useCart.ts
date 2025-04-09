import { useState, useEffect } from 'react';
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
}

const useCart = (): UseCartReturn => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ApiClient.get<CartResponse>('cart');
      setCartItems(response.data.items);
      setTotalAmount(response.data.totalAmount);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch cart items');
      Alert.alert('Error', error.message || 'Failed to fetch cart items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    cartItems,
    totalAmount,
    isLoading,
    error,
    fetchCartItems,
  };
};

export default useCart; 