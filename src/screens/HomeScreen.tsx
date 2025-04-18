import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import CategorySection from '../components/CategorySections';
import MainHeader from '../components/Headers/MainHeader';
import SearchBar from '../components/SearchBar';
import TopSellingSection from '../components/TopSellingSection';
import ApiClient from '../services/client';
import { useUser } from '../hooks/useUser';
import { useTopSellingProducts } from '../hooks/useTopSellingProducts';
import { useNewProducts } from '../hooks/useNewProducts';
import { formatProducts } from '../utils/productFormatter';
import { useNotificationSetup } from '../hooks/useNotificationSetup';
import useCart from '../hooks/useCart';
import { useFocusEffect } from '@react-navigation/native';

interface Category {
  id: number;
  name: string;
  image: string;
}

const HomeScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: isLoadingUser } = useUser();
  const { products: topSellingProducts, isLoading: isLoadingTopSelling } = useTopSellingProducts(10);
  const { products: newProducts, isLoading: isLoadingNew } = useNewProducts(10);
  const insets = useSafeAreaInsets();
  const { cartItems, fetchCartItems } = useCart();

  // Initialize notification setup
  useNotificationSetup();

  useEffect(() => {
    fetchCategories();
    fetchCartItems();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCartItems();
    }, [fetchCartItems])
  );

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await ApiClient.get('categories');
      setCategories(response.data);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  // Format products using the utility function
  const formattedTopSellingProducts = formatProducts(topSellingProducts);
  const formattedNewProducts = formatProducts(newProducts);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <MainHeader 
        label={isLoadingUser ? "Loading..." : user?.name || "Guest"} 
        badgeCount={totalQuantity}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.searchBar}>
          <SearchBar />
        </View>
        {/* Categories Section */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8E6CEF" />
          </View>
        ) : (
          <CategorySection categories={categories} />
        )}

        {/* Products Section */}
        {isLoadingTopSelling || isLoadingNew ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8E6CEF" />
          </View>
        ) : (
          <>
            <TopSellingSection title="Top Selling" products={formattedTopSellingProducts} />
            <TopSellingSection title="New In" products={formattedNewProducts} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  searchBar: {
    marginHorizontal: 9,
    marginTop: 24,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

