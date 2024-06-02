export type InitialState = {
  userData: User;
  cart: Cart;
  order: Order;
};

export type User = {
  username ?: string;
  email: string;
  id: string;
};

export type Product = {
  product_name: string;
  price: number;
  quantity: number;
  image:string;
};

export type Action = {
  type: string;
  payload: any;
};

export type CartProduct = {
  id: string;
  quantity: number;
  product_name: string;
  price: number;
  category: string;
  image:string;
  product_description?:string
};

export type Cart = {
  products: CartProduct[];
  id: string;
};

export type Order = {
  total: number;
  products: OrderProduct[];
  userId: string;
};

export type OrderProduct = {
  id: string;
  quantity: number;
  product_name: string;
  price: number;
  category: string;
  image:string;
  product_description?:string
};