import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStack';
import ApiClient from '../services/client';
import BackHeader from '../components/Headers/BackHeader';

interface Category {
  _id: string;
  id: number;
  name: string;
  image: string;
}

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (width - 48) / COLUMN_COUNT; // 48 = padding (16) * 2 + gap (16)

const AllCategoriesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Category', { category: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.categoryImage}
        resizeMode="cover"
      />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8E6CEF" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="All Categories" />

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryItem: {
    width: ITEM_WIDTH,
    alignItems: 'center',
  },
  categoryImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#1A1A1A',
    textAlign: 'center',
  },
});

export default AllCategoriesScreen; 