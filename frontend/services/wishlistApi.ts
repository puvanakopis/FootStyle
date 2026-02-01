import axios from 'axios';
import Cookies from 'js-cookie';
import { AddToWishlistRequest, WishlistProductsResponse, WishlistResponse } from '@/interfaces/wishlistInterface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Auto attach JWT token
api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const wishlistApi = {

    // ----------------- GET USER WISHLIST PRODUCTS -----------------
    getWishlistProducts: async (): Promise<WishlistProductsResponse> => {
        const response = await api.get<WishlistProductsResponse>('/api/wishlist');
        return response.data;
    },

    // ----------------- ADD PRODUCT TO WISHLIST -----------------
    addToWishlist: async (data: AddToWishlistRequest): Promise<WishlistResponse> => {
        const response = await api.post<WishlistResponse>('/api/wishlist/', data);
        return response.data;
    },

    // ----------------- REMOVE PRODUCT FROM WISHLIST -----------------
    removeFromWishlist: async (productId: string): Promise<WishlistResponse> => {
        const response = await api.delete<WishlistResponse>(`/api/wishlist/${productId}`);
        return response.data;
    }
};