import React, { createContext, useContext, useEffect, useState } from 'react';
import ApiClient from '../services/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserProfile = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  login: (token: string, callback: () => void) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const fetchProfile = async () => {
    try {
      const response = await ApiClient.get('auth/profile');
      setUserProfile(response.data);
      AsyncStorage.setItem('profile', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const login = async (token: string, callback: () => void) => {
    AsyncStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    await fetchProfile();
    callback?.();
  };

  const logout = async () => {
    AsyncStorage.removeItem('isAuthenticated');
    AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await AsyncStorage.getItem('isAuthenticated');
      setIsAuthenticated(auth === 'true');
      const profileData = await AsyncStorage.getItem('profile');
      if (profileData) {
        setUserProfile(JSON.parse(profileData));
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userProfile, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 