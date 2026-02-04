import { Product } from "./productInterface";

export interface CartVariant {
    size: string;
    quantity: number;
}

export interface CartItem {
    product: Product;
    variants: CartVariant[];
}

export interface Cart {
    _id?: string;
    user: string;
    items: CartItem[];
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface AddToCartRequest {
    productId: string;
    size: string;
    quantity: number;
}

export interface UpdateCartQuantityRequest {
    productId: string;
    size: string;
    action: "increment" | "decrement";
}

export interface RemoveFromCartRequest {
    productId: string;
    size: string;
}

export interface CartResponse {
    success: boolean;
    message?: string;
    cart: Cart;
}

export interface CartState {
    cart: Cart | null;
    isLoading: boolean;
    error: string | null;
}

export interface CartContextType extends CartState {
    fetchCart: () => Promise<void>;
    addToCart: (data: AddToCartRequest) => Promise<void>;
    updateQuantity: (data: UpdateCartQuantityRequest) => Promise<void>;
    removeFromCart: (data: RemoveFromCartRequest) => Promise<void>;
    clearCart: () => Promise<void>;
}