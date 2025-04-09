import React from "react";
import { Text, FlatList, Image, TouchableOpacity, StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from '../components/Headers/BackHeader';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/HomeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProducts, Product } from '../hooks/useProducts';
import FastImage from 'react-native-fast-image';
import { EmptyState } from '../components/EmptyState';

type CategoryRouteProp = RouteProp<HomeStackParamList, 'Category'>;
type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const CategoryScreen = () => {
  const route = useRoute<CategoryRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { category } = route.params;
  const { products, isLoading, error } = useProducts(category._id);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <FastImage 
        source={{ uri: item.thumbnail }}
        style={styles.productImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          {item.discountPrice > 0 && (
            <Text style={styles.oldPrice}>${item.discountPrice.toFixed(2)}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title={category.name} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8E6CEF" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load products</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState 
              icon="package-variant-closed"
              title="No Products Found"
              message="There are no products available in this category yet."
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  productImage: {
    width: 120,
    height: 120,
  },
  productInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8E6CEF",
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: "#666666",
    textDecorationLine: 'line-through',
  },
});

export default CategoryScreen;
