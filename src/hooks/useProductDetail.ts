import { useState, useEffect } from 'react';
import apiClient from '../services/client';
import { Product } from './useProducts';

export const useProductDetail = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (productId) {
      fetchProductDetail(productId);
    }
  }, [productId]);

  const fetchProductDetail = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`products/${id}`);
      setProduct(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { product, isLoading, error, refetch: fetchProductDetail };
}; 