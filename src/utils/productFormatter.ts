import { Product } from '../hooks/useProducts';

export const formatProduct = (product: Product) => ({
  ...product,
  id: product._id,
  name: product.name,
  price: `$${product.price.toFixed(2)}`,
  oldPrice: product.discountPrice > 0 ? `$${product.discountPrice.toFixed(2)}` : null,
  image: { uri: product.thumbnail }
});

export const formatProducts = (products: Product[]) => products.map(formatProduct); 