"use client";

import React, { createContext, useContext, useState, ReactNode, } from "react";
import { AxiosError } from "axios";
import { productApi } from "@/services/productApi";
import { ProductContextType, Product, CreateProductRequest, UpdateProductRequest, AddReviewRequest, } from "@/interfaces/productInterface";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};

interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

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

    // ---------------- FETCH ALL PRODUCTS ----------------
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const fetchedProducts = await productApi.getProducts();
            setProducts(fetchedProducts);
            fetchProducts();
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- FETCH PRODUCT BY ID ----------------
    const fetchProductById = async (id: string) => {
        try {
            setIsLoading(true);
            const product = await productApi.getProductById(id);
            setCurrentProduct(product);
            fetchProducts();
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };


    // ---------------- CREATE PRODUCT ----------------
    const createProduct = async (data: CreateProductRequest, images: File[]) => {
        try {
            setIsLoading(true);

            // Validate images
            if (images.length !== 4) {
                throw new Error("Product must contain exactly 4 images");
            }
            await productApi.createProduct(data, images);
            fetchProducts();

        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- UPDATE PRODUCT ----------------
    const updateProduct = async (id: string, data: UpdateProductRequest, images?: File[]) => {
        try {
            setIsLoading(true);

            await productApi.updateProduct(id, data, images);
            fetchProducts();

        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- DELETE PRODUCT ----------------
    const deleteProduct = async (id: string) => {
        try {
            setIsLoading(true);
            await productApi.deleteProduct(id);

            fetchProducts();

        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- ADD REVIEW ----------------
    const addReview = async (productId: string, review: AddReviewRequest) => {
        try {
            setIsLoading(true);
            await productApi.addReview(productId, review);
            fetchProducts();

        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const clearCurrentProduct = () => {
        setCurrentProduct(null);
    };



    return (
        <ProductContext.Provider
            value={{
                products,
                isLoading,
                error,
                currentProduct,
                fetchProducts,
                fetchProductById,
                clearCurrentProduct,
                createProduct,
                updateProduct,
                deleteProduct,
                addReview,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};