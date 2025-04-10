import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Category } from '../types/category';
import { Product } from '../types/product';

export type RootStackParamList = {
  Home: undefined;
  AllCategories: undefined;
  Category: { category: Category };
  ProductDetail: { product: Product };
  Cart: undefined;
  Checkout: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 