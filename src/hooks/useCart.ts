import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import ApiClient from '../services/client';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    thumbnail: string;
    images: string[];
    category: string;
    stock: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
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
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  updatingItems: string[]; // Array of product IDs that are currently being updated
}

const useCart = (): UseCartReturn => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingItems, setUpdatingItems] = useState<string[]>([]);

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

  const removeItem = useCallback(async (productId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await ApiClient.delete(`cart/items/${productId}`);
      await fetchCartItems(); // Refresh cart items after deletion
    } catch (err) {
      setError(err as string);
      console.error('Error removing item from cart:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchCartItems]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    try {
      setUpdatingItems(prev => [...prev, productId]);
      setError(null);
      await ApiClient.put(`cart/items/${productId}`, { quantity });
      const response = await ApiClient.get('cart');
      setCartItems(response.data.items);
      setTotalAmount(response.data.totalAmount);
    } catch (err) {
      setError(err as string);
      console.error('Error updating item quantity:', err);
      throw err;
    } finally {
      setUpdatingItems(prev => prev.filter(id => id !== productId));
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
    removeItem,
    updateQuantity,
    updatingItems,
  };
};

export default useCart; 