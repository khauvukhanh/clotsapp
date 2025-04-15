export interface OrderItem {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    thumbnail: string;
    images: string[];
    category: string;
    stock: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  quantity: number;
  price: number;
  _id: string;
} 