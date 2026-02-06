import axios from "axios";
import Cookies from "js-cookie";
import {
    CreateOrderRequest,
    OrderResponse,
    OrdersResponse,
    AddPaymentRequest,
    UpdateOrderStatusRequest
} from "@/interfaces/orderInterface";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export const orderApi = {
    // -------- GET ALL ORDERS (Admin only) --------
    getAllOrders: async (): Promise<OrdersResponse> => {
        const res = await api.get<OrdersResponse>("/api/orders");
        return res.data;
    },

    // -------- GET ORDER BY ID --------
    getOrderById: async (orderId: string): Promise<OrderResponse> => {
        const res = await api.get<OrderResponse>(`/api/orders/${orderId}`);
        return res.data;
    },

    // -------- CREATE ORDER WITHOUT PAYMENT --------
    createOrder: async (data: CreateOrderRequest): Promise<OrderResponse> => {
        const res = await api.post<OrderResponse>("/api/orders/create", data);
        return res.data;
    },

    // -------- ADD PAYMENT TO ORDER --------
    addPaymentToOrder: async (orderId: string, data: AddPaymentRequest): Promise<OrderResponse> => {
        const res = await api.put<OrderResponse>(`/api/orders/${orderId}/payment`, data);
        return res.data;
    },

    // -------- UPDATE ORDER STATUS (Admin only) --------
    updateOrderStatus: async (orderId: string, data: UpdateOrderStatusRequest): Promise<OrderResponse> => {
        const res = await api.put<OrderResponse>(`/api/orders/${orderId}/status`, data);
        return res.data;
    },

    // -------- GET ORDERS BY USER  --------
    getUserOrders: async (): Promise<OrdersResponse> => {
        const res = await api.get<OrdersResponse>("/api/orders/user/all");
        return res.data;
    },
};