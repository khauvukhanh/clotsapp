import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CategoryItem = ({ name, image }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 20,
  },
  imageWrapper: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    marginTop: 6,
    fontSize: 12,
  },
});

export default CategoryItem;
