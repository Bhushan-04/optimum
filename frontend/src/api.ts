const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface Product {
  id?: number;
  name: string;
  price: number;
  stock: number;
}

export interface OrderInput {
  productId: number;
  quantity: number;
}

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: number;
  customerName: string;
  total: number;
  items: OrderItem[];
}

//create a new product
export const createProduct = async (body: Product) => {
  const res = await fetch(`${BACKEND_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

//get all products
export const getAllProducts = async () => {
  const res = await fetch(`${BACKEND_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

//get all orders
export const getOrders = async() =>  {
  const res = await fetch(`${BACKEND_URL}/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

// create a new order
export const createOrder = async (body: { customerName: string; items: { productId: number; quantity: number }[] }) => {
  const res = await fetch(`${BACKEND_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}
