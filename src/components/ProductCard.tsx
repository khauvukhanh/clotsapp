import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type ProductCardProps = {
  name: string;
  price: string;
  image: any;
  isHorizontal?: boolean;
};

const ProductCard = ({ name, price, image, isHorizontal = false }: ProductCardProps) => {
  return (
    <TouchableOpacity style={[styles.container, isHorizontal && styles.horizontalContainer]}>
      <Image source={image} style={[styles.image, isHorizontal && styles.horizontalImage]} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  horizontalContainer: {
    width: 200,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  horizontalImage: {
    height: 180,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 4,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
});

export default ProductCard; 