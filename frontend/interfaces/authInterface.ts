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

// PASSWORD RESET
export interface PasswordResetRequest {
    email: string;
    otp: string;
    newPassword: string;
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
}