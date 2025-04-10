import client from './client';

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateOrderRequest {
  shippingAddress: ShippingAddress;
  paymentMethod: string;
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