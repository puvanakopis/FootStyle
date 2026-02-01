import { Product } from './productInterface';

export interface Wishlist {
    _id?: string;
    user: string;
    products: Product[];
    createdAt?: string;
    updatedAt?: string;
}

export interface AddToWishlistRequest {
    productId: string;
}

export interface WishlistResponse {
    success: boolean;
    data: Wishlist;
    message?: string;
}

export interface WishlistProductsResponse {
    success: boolean;
    data: Product[];
    message?: string;
}

export interface WishlistState {
    wishlist: Product[];
    isLoading: boolean;
    error: string | null;
}

export interface WishlistContextType extends WishlistState {
    fetchWishlist: () => Promise<void>;
    addToWishlist: (data: AddToWishlistRequest) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
    clearWishlist: () => void;
}