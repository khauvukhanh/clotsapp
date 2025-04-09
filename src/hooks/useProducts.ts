import { useState, useEffect } from 'react';
import apiClient from '../services/client';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  thumbnail: string;
  images: string[];
  category: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useProducts = (categoryId?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (categoryId) {
      fetchProducts(categoryId);
    }
  }, [categoryId]);

  const fetchProducts = async (categoryId: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`products/category/${categoryId}`);
      setProducts(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { products, isLoading, error, refetch: fetchProducts };
}; 