"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { AxiosError } from "axios";
import { productApi } from "@/services/productApi";
import {
    ProductContextType,
    Product,
    CreateProductRequest,
    UpdateProductRequest,
    AddReviewRequest,
} from "@/interfaces/productInterface";

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
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchProducts();
    }, []);

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
            setTotalCount(fetchedProducts.length);
            console.log("Fetched products:", fetchedProducts);
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

            const newProduct = await productApi.createProduct(data, images);
            setProducts(prev => [...prev, newProduct]);
            setTotalCount(prev => prev + 1);
            setCurrentProduct(newProduct);
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
            const updatedProduct = await productApi.updateProduct(id, data, images);

            // Update products list
            setProducts(prev =>
                prev.map(product =>
                    product.id === id ? updatedProduct : product
                )
            );

            // Update current product if it's the one being edited
            if (currentProduct?.id === id) {
                setCurrentProduct(updatedProduct);
            }
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

            // Remove from products list
            setProducts(prev => prev.filter(product => product.id !== id));
            setTotalCount(prev => prev - 1);

            // Clear current product if it's the one being deleted
            if (currentProduct?.id === id) {
                setCurrentProduct(null);
            }
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
            const updatedProduct = await productApi.addReview(productId, review);

            // Update products list
            setProducts(prev =>
                prev.map(product =>
                    product.id === productId ? updatedProduct : product
                )
            );

            // Update current product if it's the one being reviewed
            if (currentProduct?.id === productId) {
                setCurrentProduct(updatedProduct);
            }
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- CLEAR CURRENT PRODUCT ----------------
    const clearCurrentProduct = () => {
        setCurrentProduct(null);
    };

    // ---------------- CLEAR ERROR ----------------
    const clearError = () => {
        setError(null);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                currentProduct,
                isLoading,
                error,
                totalCount,
                fetchProducts,
                fetchProductById,
                createProduct,
                updateProduct,
                deleteProduct,
                addReview,
                clearCurrentProduct,
                clearError,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};