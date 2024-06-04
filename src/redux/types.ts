export type InitialState = {
  userData: User;
  cart: Cart;
  orders: Order[];
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

//export type Orders = Order[];


export type Order = {
  total: number;
  products: OrderProduct[];
  userId: string;
  id : string;
  createdAt : Date;
  updatedAt ?: Date;
  status:OrederStatus;
};
enum OrederStatus{
  Pending,
  Delivered,
  cancelled
}

export type OrderProduct = {
  id: string;
  quantity: number;
  product_name: string;
  price: number;
  category: string;
  image:string;
  product_description?:string
};