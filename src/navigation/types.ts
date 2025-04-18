export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  MainTabs: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
};

export type TabParamList = {
  HomeStack: undefined;
  Notification: undefined;
  Profile: undefined;
  Order: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
  Category: { categoryId: string };
  Cart: undefined;
  Checkout: undefined;
};

export type OrderStackParamList = {
  OrderList: undefined;
  OrderDetail: { orderId: string };
}; 