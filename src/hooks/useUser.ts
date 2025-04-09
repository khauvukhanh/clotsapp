import { useState, useEffect } from 'react';
import apiClient from '../services/client';

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('auth/profile');
      setUser(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { user, isLoading, error, refetch: fetchUserData };
}; 