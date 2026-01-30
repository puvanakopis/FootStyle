import axios from 'axios';
import Cookies from 'js-cookie';
import {
    LoginRequest,
    AuthResponse,
    SignupRequest,
    OTPRequest,
    PasswordResetRequest,
    User,
    UpdateUserRequest
} from '@/interfaces/authInterface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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

export const authApi = {
    // ----------------- LOGIN -----------------
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post('/api/auth/login', data);
        Cookies.set('token', response.data.token);
        return response.data;
    },

    // ----------------- SIGNUP -----------------
    requestSignupOtp: async (data: SignupRequest): Promise<{ message: string; email: string }> => {
        const response = await api.post('/api/auth/signup/request-otp', data);
        return response.data;
    },

    verifySignupOtp: async (data: OTPRequest): Promise<AuthResponse> => {
        const response = await api.post('/api/auth/signup/verify-otp', data);
        Cookies.set('token', response.data.token);
        return response.data;
    },

    // ----------------- PASSWORD RESET -----------------
    requestPasswordResetOtp: async (data: { email: string }): Promise<{ message: string; email: string }> => {
        const response = await api.post('/api/auth/forgot-password/request-otp', data);
        return response.data;
    },

    verifyPasswordResetOtp: async (data: OTPRequest): Promise<{ message: string }> => {
        const response = await api.post('/api/auth/forgot-password/verify-otp', data);
        return response.data;
    },

    resetPassword: async (data: PasswordResetRequest): Promise<{ message: string }> => {
        const response = await api.post('/api/auth/forgot-password/reset', data);
        return response.data;
    },

    // ----------------- GET CURRENT USER -----------------
    getCurrentUser: async (): Promise<{ user: User }> => {
        const token = Cookies.get('token');
        if (!token) throw new Error('No token found. Please login.');
        const response = await api.get('/api/auth/me');
        return response.data;
    },

    // ----------------- UPDATE CURRENT USER -----------------
    updateCurrentUser: async (data: UpdateUserRequest): Promise<{ user: User }> => {
        const token = Cookies.get('token');
        if (!token) throw new Error('No token found. Please login.');
        const response = await api.put('/api/auth/me', data);
        return response.data;
    },

    // ----------------- LOGOUT -----------------
    logout: (): void => {
        Cookies.remove('token');
    },
};