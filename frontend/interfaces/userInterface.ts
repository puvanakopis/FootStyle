export interface Address {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

export interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email: string;
    role: 'customer' | 'admin';
    phoneNumber?: string;
    profileImage?: string | null;
    address?: Address;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateUserRequest {
    firstName?: string;
    lastName?: string;
    username?: string;
    email: string;
    password: string;
    role?: 'customer' | 'admin';
    phoneNumber?: string;
    profileImage?: string | null;
    address?: Address;
    isActive?: boolean;
}

export interface UpdateUserRequest {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: 'customer' | 'admin';
    phoneNumber?: string;
    profileImage?: string | null;
    address?: Address;
    isActive?: boolean;
}

export interface UsersResponse {
    success: boolean;
    count?: number;
    data: User[];
    message?: string;
}

export interface UserResponse {
    success: boolean;
    data: User;
    message?: string;
}

export interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
}

export interface UserContextType extends UserState {
    fetchUsers: () => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    toggleActive: (id: string) => Promise<void>;
    clearError: () => void;
}