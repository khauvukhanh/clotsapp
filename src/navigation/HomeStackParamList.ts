import { Product } from '../hooks/useProducts';

export type HomeStackParamList = {
  Home: undefined;
  Category: {
    category: {
      _id: string;
      name: string;
      image: string;
    };
  };
  ProductDetail: {
    product: Product;
  };
  AllCategories: undefined;
  Cart: undefined;
  Profile: undefined;
}; 