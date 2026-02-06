"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AxiosError } from "axios";
import { cartApi } from "@/services/cartApi";
import { Cart, CartContextType, AddToCartRequest, UpdateCartQuantityRequest, RemoveFromCartRequest } from "@/interfaces/cartInterface";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: unknown) => {
        const error = err as AxiosError<{ message: string }> | Error;
        if ("response" in error && error.response?.data?.message) {
            setError(error.response.data.message);
        } else if ("message" in error) {
            setError(error.message || "Something went wrong");
        } else {
            setError("Something went wrong");
        }
    };

    // ---------- FETCH CART ----------
    const fetchCart = async () => {
        try {
            setIsLoading(true);
            const response = await cartApi.getCart();
            setCart(response.cart);
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- ADD TO CART ----------
    const addToCart = async (data: AddToCartRequest) => {
        try {
            setIsLoading(true);
            await cartApi.addToCart(data);
            await fetchCart();
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- UPDATE QUANTITY ----------
    const updateQuantity = async (data: UpdateCartQuantityRequest) => {
        try {
            setIsLoading(true);
            await cartApi.updateQuantity(data);
            await fetchCart();
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- REMOVE FROM CART ----------
    const removeFromCart = async (data: RemoveFromCartRequest) => {
        try {
            setIsLoading(true);
            await cartApi.removeFromCart(data);
            await fetchCart();
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- CLEAR CART ----------
    const clearCart = async () => {
        try {
            setIsLoading(true);
            const response = await cartApi.clearCart();
            setCart(response.cart);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                isLoading,
                error,
                fetchCart,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};