import { User, Product, CartItem, Purchase } from '../types';

const STORAGE_KEYS = {
  USERS: 'ecofinds_users',
  CURRENT_USER: 'ecofinds_current_user',
  PRODUCTS: 'ecofinds_products',
  CART: 'ecofinds_cart',
  PURCHASES: 'ecofinds_purchases'
};

// User storage
export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

// Product storage
export const saveProduct = (product: Product): void => {
  const products = getProducts();
  const existingIndex = products.findIndex(p => p.id === product.id);
  
  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.push(product);
  }
  
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};

export const getProducts = (): Product[] => {
  const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return products ? JSON.parse(products) : [];
};

export const deleteProduct = (productId: string): void => {
  const products = getProducts().filter(p => p.id !== productId);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};

// Cart storage
export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};

export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem(STORAGE_KEYS.CART);
  return cart ? JSON.parse(cart) : [];
};

// Purchase storage
export const savePurchase = (purchase: Purchase): void => {
  const purchases = getPurchases();
  purchases.push(purchase);
  localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
};

export const getPurchases = (): Purchase[] => {
  const purchases = localStorage.getItem(STORAGE_KEYS.PURCHASES);
  return purchases ? JSON.parse(purchases) : [];
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};