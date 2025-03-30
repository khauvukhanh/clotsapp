import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CategoryItem from './CategoryItem';
import { HomeStackParamList } from '../navigation/HomeStack';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const CategorySection = ({ categories }: any) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{ padding: 16 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Categories</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ fontSize: 16, color: '#8E6CEF' }}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách danh mục */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Category', { category: item })}>
            <CategoryItem name={item.name} image={item.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategorySection;
