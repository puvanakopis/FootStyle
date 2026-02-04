import axios from "axios";
import Cookies from "js-cookie";
import {
    AddToCartRequest,
    CartResponse,
    UpdateCartQuantityRequest,
    RemoveFromCartRequest
} from "@/interfaces/cartInterface";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Auto attach JWT
api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export const cartApi = {
    // -------- GET CART --------
    getCart: async (): Promise<CartResponse> => {
        const res = await api.get<CartResponse>("/api/cart");
        return res.data;
    },

    // -------- ADD TO CART --------
    addToCart: async (data: AddToCartRequest): Promise<CartResponse> => {
        const res = await api.post<CartResponse>("/api/cart/add", data);
        return res.data;
    },

    // -------- UPDATE QUANTITY --------
    updateQuantity: async (data: UpdateCartQuantityRequest): Promise<CartResponse> => {
        const res = await api.post<CartResponse>("/api/cart/update-quantity", data);
        return res.data;
    },

    // -------- REMOVE FROM CART --------
    removeFromCart: async (data: RemoveFromCartRequest): Promise<CartResponse> => {
        const res = await api.post<CartResponse>("/api/cart/remove", data);
        return res.data;
    },

    // -------- CLEAR CART --------
    clearCart: async (): Promise<CartResponse> => {
        const res = await api.post<CartResponse>("/api/cart/clear");
        return res.data;
    },
};