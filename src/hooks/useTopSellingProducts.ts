import { useState, useEffect } from 'react';
import apiClient from '../services/client';
import { Product } from './useProducts';

export const useTopSellingProducts = (limit: number = 10) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTopSellingProducts();
  }, [limit]);

  const fetchTopSellingProducts = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`products/top-selling?limit=${limit}`);
      setProducts(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { products, isLoading, error, refetch: fetchTopSellingProducts };
}; 