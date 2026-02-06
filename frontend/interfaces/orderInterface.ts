
import { Product } from "./productInterface";

// ---------- ADDRESS ----------
export interface Address {
  fullName: string;
  phoneNumber: string;
  email: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

// ---------- PAYMENT ----------
export interface PaymentMethod {
  method: "Card" | "PayPal" | "GooglePay" | "Wallet" | "COD";
  status: "Pending" | "Paid" | "Failed" | "Refunded";
  transactionId?: string | null;
}

// ---------- ORDER ITEM ----------
export interface OrderItem {
  product: string | Product;
  size: string;
  quantity: number;
}

// ---------- ORDER ----------
export interface Order {
  _id: string;
  user: string | { _id: string; name?: string; email?: string };
  items: OrderItem[];
  shippingAddress: Address;
  payment: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ---------- REQUESTS ----------
export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: number;
  shippingFee: number;
  total: number;
}

export interface AddPaymentRequest {
  method: "Card" | "PayPal" | "GooglePay" | "Wallet" | "COD";
  transactionId?: string;
}

export interface UpdateOrderStatusRequest {
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
}

// ---------- API RESPONSES ----------
export interface OrdersResponse {
  success?: boolean;
  message?: string;
  orders: Order[];
}

export interface OrderResponse {
  success?: boolean;
  message?: string;
  order: Order;
}

// ---------- CONTEXT STATE PER OPERATION ----------
export interface OrderContextType {
  // GET ALL ORDERS
  allOrders: Order[];
  allOrdersLoading: boolean;
  allOrdersError: string | null;

  // GET USER ORDERS
  userOrders: Order[];
  userOrdersLoading: boolean;
  userOrdersError: string | null;

  // GET ORDER BY ID
  currentOrder: Order | null;
  orderLoading: boolean;
  orderError: string | null;

  // CREATE ORDER
  createOrderLoading: boolean;
  createOrderError: string | null;

  // ADD PAYMENT
  addPaymentLoading: boolean;
  addPaymentError: string | null;

  // UPDATE ORDER STATUS
  updateStatusLoading: boolean;
  updateStatusError: string | null;

  // ---------- ACTIONS ----------
  getAllOrders: () => Promise<void>;
  getUserOrders: () => Promise<void>;
  getOrderById: (orderId: string) => Promise<void>;
  createOrder: (data: CreateOrderRequest) => Promise<Order>;
  addPaymentToOrder: (orderId: string, data: AddPaymentRequest) => Promise<void>;
  updateOrderStatus: (orderId: string, data: UpdateOrderStatusRequest) => Promise<void>;
  clearCurrentOrder: () => void;
}