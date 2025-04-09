import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Category } from '../types/category';

type RootStackParamList = {
  AllCategories: { category: Category };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CategoryItemProps {
  category: Category;
  onPress?: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ category, onPress }) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('AllCategories', { category });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <FastImage
        source={{ 
          uri: category.image,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.overlay}>
        <Text style={styles.name}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
