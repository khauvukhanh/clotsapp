import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductItem = ({ name, price, oldPrice, image }: any) => {
  return (
    <View style={styles.container}>
      {/* Hình ảnh sản phẩm */}
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
        <TouchableOpacity style={styles.favoriteIcon}>
          {/* <AntDesign name="hearto" size={20} color="black" /> */}
        </TouchableOpacity>
      </View>

      {/* Tên sản phẩm */}
      <Text style={styles.name}>{name}</Text>

      {/* Giá sản phẩm */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.price}>{price}</Text>
        {oldPrice && <Text style={styles.oldPrice}>{oldPrice}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    padding: 10,
    marginRight: 16,
  },
  imageWrapper: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  name: {
    marginTop: 10,
    fontSize: 14,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  oldPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 8,
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default ProductItem;
