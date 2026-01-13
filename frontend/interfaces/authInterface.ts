export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'user' | 'admin';
    profileImage?: string;
    phoneNumber?: string;
    country?: string;
    state?: string;
    pinCode?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}