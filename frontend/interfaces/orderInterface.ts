import { Product } from "./productInterface";

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

export interface PaymentMethod {
  method: "Card" | "PayPal" | "GooglePay" | "Wallet" | "COD";
  status: "Pending" | "Paid" | "Failed" | "Refunded";
  transactionId?: string | null;
}

export interface OrderItem {
  product: string | Product;
  size: string;
  quantity: number;
}

export interface Order {
  _id: string;
  user: string | {
    _id: string;
    name?: string;
    email?: string;
  };
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

export interface OrdersResponse {
  success: boolean;
  message?: string;
  orders: Order[];
}

export interface OrderResponse {
  success: boolean;
  message?: string;
  order: Order;
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

export interface OrderContextType extends OrderState {
  getAllOrders: () => Promise<void>;
  getOrderById: (orderId: string) => Promise<void>;
  createOrder: (data: CreateOrderRequest) => Promise<Order>;
  addPaymentToOrder: (orderId: string, data: AddPaymentRequest) => Promise<void>;
  updateOrderStatus: (orderId: string, data: UpdateOrderStatusRequest) => Promise<void>;
  clearCurrentOrder: () => void;
}