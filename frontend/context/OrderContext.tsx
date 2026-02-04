"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AxiosError } from "axios";
import { orderApi } from "@/services/orderApi";
import {
    Order,
    OrderContextType,
    CreateOrderRequest,
    AddPaymentRequest,
    UpdateOrderStatusRequest
} from "@/interfaces/orderInterface";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within an OrderProvider");
    }
    return context;
};

interface OrderProviderProps {
    children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
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

    // ---------- GET ALL ORDERS (Admin only) ----------
    const getAllOrders = async () => {
        try {
            setIsLoading(true);
            const res = await orderApi.getAllOrders();
            setOrders(res.orders);
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- GET USER ORDERS ----------
    const getUserOrders = async () => {
        try {
            setIsLoading(true);
            const res = await orderApi.getUserOrders();
            setOrders(res.orders);
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- GET ORDER BY ID ----------
    const getOrderById = async (orderId: string) => {
        try {
            setIsLoading(true);
            const res = await orderApi.getOrderById(orderId);
            setCurrentOrder(res.order);
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- CREATE ORDER ----------
    const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
        try {
            setIsLoading(true);
            const res = await orderApi.createOrder(data);
            await getUserOrders(); // refresh user's order list
            return res.order;
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- ADD PAYMENT TO ORDER ----------
    const addPaymentToOrder = async (orderId: string, data: AddPaymentRequest) => {
        try {
            setIsLoading(true);
            const res = await orderApi.addPaymentToOrder(orderId, data);
            setCurrentOrder(res.order);
            await getUserOrders();
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- UPDATE ORDER STATUS (Admin only) ----------
    const updateOrderStatus = async (orderId: string, data: UpdateOrderStatusRequest) => {
        try {
            setIsLoading(true);
            const res = await orderApi.updateOrderStatus(orderId, data);
            setCurrentOrder(res.order);
            await getAllOrders();
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const clearCurrentOrder = () => setCurrentOrder(null);

    return (
        <OrderContext.Provider
            value={{
                orders,
                currentOrder,
                isLoading,
                error,
                getAllOrders,
                getUserOrders,
                getOrderById,
                createOrder,
                addPaymentToOrder,
                updateOrderStatus,
                clearCurrentOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};