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


// ----------------- SIGNUP -----------------

export interface LoginRequest {
    email: string;
    password: string;
}

// ----------------- SIGNUP -----------------
export interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// For OTP verification
export interface OTPRequest {
    email: string;
    otp: string;
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
    requestSignupOtp: (data: SignupRequest) => Promise<void>;
    verifySignupOtp: (data: OTPRequest) => Promise<void>;
    clearError: () => void;
}