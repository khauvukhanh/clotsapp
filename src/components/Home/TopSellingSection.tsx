import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStack';
import FastImage from 'react-native-fast-image';
import { Product } from '../../hooks/useProducts';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

interface TopSellingSectionProps {
  title: string;
  products: Product[];
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.4;

const TopSellingSection = ({ title, products }: TopSellingSectionProps) => {
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <FastImage
        source={{ uri: item.thumbnail }}
        style={styles.productImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          {item.discountPrice > 0 && (
            <Text style={styles.discountPrice}>
              ${item.discountPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  productCard: {
    width: ITEM_WIDTH,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: ITEM_WIDTH,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E6CEF',
    marginRight: 8,
  },
  discountPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
});

export default TopSellingSection; 