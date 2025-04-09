import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStack';
import FastImage from 'react-native-fast-image';

interface Category {
  id: number;
  name: string;
  image: string;
}

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection = ({ categories }: CategorySectionProps) => {
  const navigation = useNavigation<NavigationProp>();

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Category', { category: item })}
      style={styles.categoryItem}
    >
      <FastImage 
        source={{ uri: item.image }} 
        style={styles.categoryImage}
        resizeMode="cover"
      />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllCategories')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Categories List */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 16,
    color: '#8E6CEF',
  },
  listContainer: {
    paddingRight: 16,
  },
  categoryItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#1A1A1A',
  },
});

export default CategorySection;
