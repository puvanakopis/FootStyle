import axios from 'axios';
import { LoginRequest, AuthResponse, SignupRequest, OTPRequest } from '@/interfaces/authInterface';

const API_BASE_URL = process.env.API_URL || 'http://localhost:4000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authApi = {

    // LOGIN
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post('/api/auth/login', data);
        return response.data;
    },

    // SIGNUP - Request OTP
    requestSignupOtp: async (data: SignupRequest): Promise<{ message: string; email: string }> => {
        const response = await api.post('/api/auth/signup/request-otp', data);
        return response.data;
    },

    // SIGNUP - Verify OTP
    verifySignupOtp: async (data: OTPRequest): Promise<AuthResponse> => {
        const response = await api.post('/api/auth/signup/verify-otp', data);
        return response.data;
    },
};

export default api;