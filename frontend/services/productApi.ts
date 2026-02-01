import axios from 'axios';
import Cookies from 'js-cookie';
import { Product, CreateProductRequest, UpdateProductRequest, AddReviewRequest, ProductsResponse, ProductResponse } from '@/interfaces/productInterface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Attach token automatically
api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const productApi = {

    // ----------------- GET ALL PRODUCTS -----------------
    getProducts: async (): Promise<Product[]> => {
        const response = await api.get<ProductsResponse>('/api/products');
        return response.data.data;
    },

    // ----------------- GET PRODUCT BY ID -----------------
    getProductById: async (id: string): Promise<Product> => {
        const response = await api.get<ProductResponse>(`/api/products/${id}`);
        return response.data.data;
    },

    // ----------------- CREATE PRODUCT -----------------
    createProduct: async (data: CreateProductRequest, images: File[]): Promise<Product> => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        images.forEach((image) => {
            formData.append("images", image);
        });

        const response = await api.post<ProductResponse>('/api/products', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data.data;
    },

    // ----------------- UPDATE PRODUCT -----------------
    updateProduct: async (id: string, data: UpdateProductRequest, images?: File[]): Promise<Product> => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        if (images && images.length > 0) {
            images.forEach((image) => {
                formData.append("images", image);
            });
        }

        const response = await api.put<ProductResponse>(`/api/products/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data.data;
    },

    // ----------------- DELETE PRODUCT -----------------
    deleteProduct: async (id: string): Promise<{ message: string }> => {
        const response = await api.delete(`/api/products/${id}`);
        return response.data;
    },

    // ----------------- ADD REVIEW -----------------
    addReview: async (productId: string, review: AddReviewRequest): Promise<Product> => {
        const response = await api.post<ProductResponse>(
            `/api/products/${productId}/review`,
            review
        );
        return response.data.data;
    },

    // ----------------- UPLOAD PRODUCT IMAGES -----------------
    uploadProductImages: async (images: File[]): Promise<{ images: string[] }> => {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image);
        });

        const response = await api.post('/api/products/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    },
};