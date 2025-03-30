import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProductItem from './ProductItem';
import { HomeStackParamList } from '../navigation/HomeStack';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const TopSellingSection = ({ title, products }: any) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{ padding: 16 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 16 }}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <ProductItem 
              name={item.name} 
              price={item.price} 
              oldPrice={item.oldPrice} 
              image={item.image} 
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopSellingSection;
