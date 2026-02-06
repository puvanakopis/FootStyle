import axios from 'axios';
import Cookies from 'js-cookie';
import { User, UsersResponse, UserResponse, } from '@/interfaces/userInterface';

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

export const userApi = {

    // ----------------- GET ALL USERS -----------------
    getUsers: async (): Promise<User[]> => {
        const response = await api.get<UsersResponse>('/api/users');
        return response.data;
    },


    // ----------------- DELETE USER -----------------
    deleteUser: async (id: string): Promise<{ message: string }> => {
        const response = await api.delete(`/api/users/${id}`);
        return response.data;
    },

    
    // ----------------- TOGGLE USER ACTIVE STATUS -----------------
    toggleUserActive: async (id: string): Promise<User> => {
        const response = await api.patch<UserResponse>(`/api/users/toggle-active/${id}`);
        return response.data.data;
    },

};