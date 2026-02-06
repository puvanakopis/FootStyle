"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AxiosError } from "axios";
import { wishlistApi } from "@/services/wishlistApi";
import { WishlistContextType, AddToWishlistRequest } from "@/interfaces/wishlistInterface";
import { Product } from "@/interfaces/productInterface";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};

interface WishlistProviderProps {
    children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: unknown) => {
        const error = err as AxiosError<{ message: string }> | Error;
        if ('response' in error && error.response?.data?.message) {
            setError(error.response.data.message);
        } else if ('message' in error) {
            setError(error.message || "Something went wrong");
        } else {
            setError("Something went wrong");
        }
    };

    // ---------------- FETCH WISHLIST ----------------
    const fetchWishlist = async () => {
        try {
            setIsLoading(true);
            const response = await wishlistApi.getWishlistProducts();
            setWishlist(response.products);
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- ADD TO WISHLIST ----------------
    const addToWishlist = async (data: AddToWishlistRequest) => {
        try {
            setIsLoading(true);
            await wishlistApi.addToWishlist(data);
            fetchWishlist();
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- REMOVE FROM WISHLIST ----------------
    const removeFromWishlist = async (productId: string) => {
        try {
            setIsLoading(true);
            await wishlistApi.removeFromWishlist(productId);
            fetchWishlist();
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                isLoading,
                error,
                fetchWishlist,
                addToWishlist,
                removeFromWishlist,
                clearWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};