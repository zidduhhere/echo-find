export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  seller_id: string;
  seller?: User;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product?: Product;
  created_at: string;
}

export interface Purchase {
  id: string;
  buyer_id: string;
  total: number;
  purchase_date: string;
  purchase_items?: PurchaseItem[];
}

export interface PurchaseItem {
  id: string;
  purchase_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  product?: Product;
}

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Books',
  'Sports & Recreation',
  'Toys & Games',
  'Automotive',
  'Art & Crafts',
  'Music & Instruments',
  'Other'
] as const;

export type Category = typeof CATEGORIES[number];