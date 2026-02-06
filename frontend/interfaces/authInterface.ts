export interface Address {
    street?: string;
    district?: string;
    province?: string;
    zipCode?: string;
    country?: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username?: string;
    email: string;
    role: 'customer' | 'admin';
    profileImage?: string;
    phoneNumber?: string;
    address?: Address;
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

export interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface OTPRequest {
    email: string;
    otp: string;
}

export interface PasswordResetRequest {
    email: string;
    otp: string;
    newPassword: string;
}

export interface UpdateUserRequest {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profileImage?: string;
    address?: Address;
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
    requestSignupOtp: (data: SignupRequest) => Promise<void>;
    verifySignupOtp: (data: OTPRequest) => Promise<void>;
    requestPasswordResetOtp: (email: string) => Promise<void>;
    verifyPasswordResetOtp: (data: OTPRequest) => Promise<void>;
    resetPassword: (data: PasswordResetRequest) => Promise<void>;
    getCurrentUser: () => Promise<void>;
    updateCurrentUser: (data: UpdateUserRequest) => Promise<void>;
}