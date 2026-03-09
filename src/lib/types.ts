export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export type CartItem = {
  product: Product;
  qty: number;
};

export type OrderSummary = {
  order_id: string;
  total: number;
  items_count: number;
  items: CartItem[];
};

export type CartSummary = {
  subtotal: number;
  items_count: number;
};
