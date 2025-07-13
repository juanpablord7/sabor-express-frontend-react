export type Orders = {
  id: number;
  userId: number;
  state: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderDetail = {
  id: number;
  userId: number;
  state: number;
  totalPrice: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
};
