"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AxiosError } from "axios";
import { orderApi } from "@/services/orderApi";
import { Order, OrderContextType, CreateOrderRequest, AddPaymentRequest, UpdateOrderStatusRequest, } from "@/interfaces/orderInterface";

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
    // ---------- GET ALL ORDERS ----------
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [allOrdersLoading, setAllOrdersLoading] = useState(false);
    const [allOrdersError, setAllOrdersError] = useState<string | null>(null);

    // ---------- GET USER ORDERS ----------
    const [userOrders, setUserOrders] = useState<Order[]>([]);
    const [userOrdersLoading, setUserOrdersLoading] = useState(false);
    const [userOrdersError, setUserOrdersError] = useState<string | null>(null);

    // ---------- GET ORDER BY ID ----------
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState<string | null>(null);

    // ---------- CREATE ORDER ----------
    const [createOrderLoading, setCreateOrderLoading] = useState(false);
    const [createOrderError, setCreateOrderError] = useState<string | null>(null);

    // ---------- ADD PAYMENT ----------
    const [addPaymentLoading, setAddPaymentLoading] = useState(false);
    const [addPaymentError, setAddPaymentError] = useState<string | null>(null);

    // ---------- UPDATE ORDER STATUS ----------
    const [updateStatusLoading, setUpdateStatusLoading] = useState(false);
    const [updateStatusError, setUpdateStatusError] = useState<string | null>(null);

    const handleError = (err: unknown, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
        const error = err as AxiosError<{ message: string }> | Error;
        if ("response" in error && error.response?.data?.message) {
            setError(error.response.data.message);
        } else if ("message" in error) {
            setError(error.message || "Something went wrong");
        } else {
            setError("Something went wrong");
        }
    };

    // ---------- GET ALL ORDERS ----------
    const getAllOrders = async () => {
        try {
            setAllOrdersLoading(true);
            const res = await orderApi.getAllOrders();
            setAllOrders(res.orders);
            setAllOrdersError(null);
        } catch (err) {
            handleError(err, setAllOrdersError);
        } finally {
            setAllOrdersLoading(false);
        }
    };

    // ---------- GET USER ORDERS ----------
    const getUserOrders = async () => {
        try {
            setUserOrdersLoading(true);
            const res = await orderApi.getUserOrders();
            setUserOrders(res.orders);
            setUserOrdersError(null);
        } catch (err) {
            handleError(err, setUserOrdersError);
        } finally {
            setUserOrdersLoading(false);
        }
    };

    // ---------- GET ORDER BY ID ----------
    const getOrderById = async (orderId: string) => {
        try {
            setOrderLoading(true);
            const res = await orderApi.getOrderById(orderId);
            setCurrentOrder(res.order);
            setOrderError(null);
        } catch (err) {
            handleError(err, setOrderError);
        } finally {
            setOrderLoading(false);
        }
    };

    // ---------- CREATE ORDER ----------
    const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
        try {
            setCreateOrderLoading(true);
            const res = await orderApi.createOrder(data);
            await getUserOrders();
            setCreateOrderError(null);
            return res.order;
        } catch (err) {
            handleError(err, setCreateOrderError);
            throw err;
        } finally {
            setCreateOrderLoading(false);
        }
    };

    // ---------- ADD PAYMENT ----------
    const addPaymentToOrder = async (orderId: string, data: AddPaymentRequest) => {
        try {
            setAddPaymentLoading(true);
            const res = await orderApi.addPaymentToOrder(orderId, data);
            setCurrentOrder(res.order);
            await getUserOrders();
            setAddPaymentError(null);
        } catch (err) {
            handleError(err, setAddPaymentError);
            throw err;
        } finally {
            setAddPaymentLoading(false);
        }
    };

    // ---------- UPDATE ORDER STATUS ----------
    const updateOrderStatus = async (orderId: string, data: UpdateOrderStatusRequest) => {
        try {
            setUpdateStatusLoading(true);
            const res = await orderApi.updateOrderStatus(orderId, data);
            setCurrentOrder(res.order);
            await getAllOrders();
            setUpdateStatusError(null);
        } catch (err) {
            handleError(err, setUpdateStatusError);
            throw err;
        } finally {
            setUpdateStatusLoading(false);
        }
    };

    const clearCurrentOrder = () => setCurrentOrder(null);

    return (
        <OrderContext.Provider
            value={{
                allOrders,
                allOrdersLoading,
                allOrdersError,
                userOrders,
                userOrdersLoading,
                userOrdersError,
                currentOrder,
                orderLoading,
                orderError,
                createOrderLoading,
                createOrderError,
                addPaymentLoading,
                addPaymentError,
                updateStatusLoading,
                updateStatusError,
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