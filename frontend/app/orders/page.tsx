"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/Sidebar";
import OrderHistory from "@/containers/orders/OrderHistory";
import OrderFilter from "@/containers/orders/OrderFilter";
import { useOrder } from "@/context/OrderContext";
import { Order } from "@/interfaces/orderInterface";
import { showToast } from "@/utils/toast";
import { formatDate } from "@/utils/dateUtils"

const breadcrumbItems = [
    { label: "Account", href: "" },
    { label: "Orders", href: "/orders" },
];

export default function Orders() {
    const { getUserOrders, userOrders, userOrdersLoading, userOrdersError } = useOrder();
    const [filter, setFilter] = useState<string>("all");

    // Fetch user orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                await getUserOrders();
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        if (userOrdersError) {
            showToast("error", userOrdersError);
        }
    }, [userOrdersError]);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 0,
        }).format(amount);

    const getPrimaryImage = (product: any) => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

        if (!product) return "https://via.placeholder.com/100";

        if (typeof product === 'string') {
            return "https://via.placeholder.com/100";
        }

        if (product.image) {
            return `${API_BASE_URL}/uploads/product/${product.image}`;
        }
        if (product.images && product.images.length > 0) {
            return `${API_BASE_URL}/uploads/product/${product.images[0]}`;
        }

        return "https://via.placeholder.com/100";
    };

    // Filtered Orders
    const filteredOrders = useMemo(() => {
        if (filter === "all") return userOrders;
        return userOrders.filter(
            (order: Order) => order.status.toLowerCase() === filter.toLowerCase()
        );
    }, [userOrders, filter]);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />

            <div className="px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/5">
                        <Sidebar />
                    </div>

                    {/* Main Content */}
                    <section className="w-full lg:w-4/5 space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-neutral-900">
                                    My Orders
                                </h1>
                                <p className="text-neutral-600 mt-1">
                                    {userOrders.length} {userOrders.length === 1 ? 'Order' : 'Orders'}
                                </p>
                            </div>

                            <OrderFilter
                                currentFilter={filter}
                                onFilterChange={setFilter}
                            />
                        </div>

                        {/* Loading State */}
                        {userOrdersLoading ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-12 text-center">
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ee2b4b]"></div>
                                </div>
                                <p className="text-neutral-600 mt-4">Loading your orders...</p>
                            </div>
                        ) : userOrdersError ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-12 text-center">
                                <div className="text-red-500 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                    Error Loading Orders
                                </h3>
                                <p className="text-neutral-500 mb-6">
                                    {userOrdersError || "Failed to load your orders. Please try again."}
                                </p>
                                <button
                                    onClick={() => getUserOrders()}
                                    className="inline-block px-6 py-3 bg-[#ee2b4b] text-white rounded-lg font-bold hover:bg-red-600 transition"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : filteredOrders.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-12 text-center">
                                <div className="text-neutral-400 mb-4">
                                    <svg
                                        className="w-16 h-16 mx-auto"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>

                                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                    No orders found
                                </h3>
                                <p className="text-neutral-500 mb-6">
                                    {filter === "all"
                                        ? "You haven't placed any orders yet."
                                        : `You don't have any ${filter} orders.`}
                                </p>

                                <Link
                                    href="/products"
                                    className="inline-block px-6 py-3 bg-[#ee2b4b] text-white rounded-lg font-bold hover:bg-red-600 transition"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <OrderHistory
                                orders={filteredOrders}
                                formatDate={formatDate}
                                formatCurrency={formatCurrency}
                                getPrimaryImage={getPrimaryImage}
                            />
                        )}
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}