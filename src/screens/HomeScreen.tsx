import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import CategorySection from '../components/CategorySections';
import MainHeader from '../components/Headers/MainHeader';
import SearchBar from '../components/SearchBar';
import TopSellingSection from '../components/TopSellingSection';
const HomeScreen = () => {
  const categories = [
    { id: 1, name: 'Hoodies', image: require('../assets/icons/hoodie.png') },
    { id: 2, name: 'Shorts', image: require('../assets/icons/short.png') },
    { id: 3, name: 'Shoes', image: require('../assets/icons/shoes.png') },
    { id: 4, name: 'Bag', image: require('../assets/icons/bag.png')},
    { id: 5, name: 'Accessories', image: require('../assets/icons/accessories.png')},
  ];

  const products = [
    { 
      id: 1, 
      name: "Men's Harrington Jacket", 
      price: "$148.00", 
      oldPrice: null, 
      image: require('../assets/icons/product.png') 
    },
    { 
      id: 2, 
      name: "Max Cirro Men's Slides", 
      price: "$55.00", 
      oldPrice: "$100.97", 
      image: require('../assets/icons/product.png') 
    },
    { 
      id: 3, 
      name: "Max Cirro Men's Slides", 
      price: "$55.00", 
      oldPrice: "$100.97", 
      image: require('../assets/icons/product.png') 
    },
    { 
      id: 4, 
      name: "Max Cirro Men's Slides", 
      price: "$55.00", 
      oldPrice: "$100.97", 
      image: require('../assets/icons/product.png') 
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader label="Men" />

      <ScrollView style={styles.scrollView}>
        <View style={styles.searchBar}>
          <SearchBar />
        </View>
        {/* Categories Section */}
        <CategorySection categories={categories} />

        <TopSellingSection title="Top Selling" products={products} />
        <TopSellingSection title="New In" products={products} />
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
});

export default HomeScreen;
