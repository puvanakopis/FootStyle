import axios from 'axios';
import {
    LoginRequest,
} from '@/interfaces/authInterface';

const API_BASE_URL = process.env.API_URL || 'http://localhost:4000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authApi = {

    login: async (data: LoginRequest) => {
        const response = await api.post('/api/auth/login', data);
        return response.data;
    },
};

export default api;