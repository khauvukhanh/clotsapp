import client from './client';
import { OrderItem } from '../types/order';

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  note: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetOrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  pages: number;
  statusCounts: {
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
}

export const getOrders = async (status?: string): Promise<GetOrdersResponse> => {
  const response = await client.get<GetOrdersResponse>('/orders', {
    params: { status }
  });
  return response.data;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await client.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch order details');
  }
};

export interface CreateOrderRequest {
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  note?: string;
}

export interface OrderResponse {
  _id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export const createOrder = async (orderData: CreateOrderRequest): Promise<OrderResponse> => {
  try {
    const response = await client.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to create order');
  }
}; 