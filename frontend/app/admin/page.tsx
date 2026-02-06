"use client";

import { useEffect, useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { useProduct } from "@/context/ProductContext";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/containers/admin/Sidebar";
import AdminDashboard from "@/containers/admin/AdminDashboard";

interface RecentOrder {
    id: string;
    product: string;
    customer: string;
    date: string;
    amount: number;
    status: string;
}

export default function AdminDashboardPage() {
    const {
        allOrders: orders,
        getAllOrders,
        allOrdersLoading: orderLoading
    } = useOrder();

    const { products, fetchProducts, isLoading: productLoading } = useProduct();
    const { users, fetchUsers, isLoading: userLoading } = useUser();

    const [dashboardStats, setDashboardStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0,
        revenueChange: 0,
        orderChange: 0,
        customerChange: 0,
        productChange: 0,
        recentOrders: [] as RecentOrder[],
    });

    const [chartData, setChartData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Revenue",
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: "#ee2b4b",
                borderRadius: 8,
            },
        ],
    });

    useEffect(() => {
        getAllOrders();
        fetchProducts();
        fetchUsers();
    }, []);

    const calculateMonthlyRevenue = (ordersList: typeof orders) => {
        const monthlyRevenue = Array(6).fill(0);
        const currentDate = new Date();

        ordersList.forEach(order => {
            if (order.createdAt) {
                const orderDate = new Date(order.createdAt);
                const monthDiff =
                    (currentDate.getFullYear() - orderDate.getFullYear()) * 12 +
                    (currentDate.getMonth() - orderDate.getMonth());
                if (monthDiff >= 0 && monthDiff < 6) {
                    monthlyRevenue[5 - monthDiff] += order.total || 0;
                }
            }
        });

        return monthlyRevenue.map(val => Math.ceil(val / 1000) * 1000);
    };

    const calculateDashboardStats = () => {
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        const totalOrders = orders.length;

        const uniqueCustomers = new Set(
            orders.map(order =>
                typeof order.user === "string" ? order.user : order.user?._id
            )
        ).size;
        const totalCustomers = Math.max(uniqueCustomers, users.length);

        const totalProducts = products.length;

        const revenueChange = 12;
        const orderChange = orders.length > 20 ? 5 : 0;
        const customerChange = users.length > 50 ? 8 : 0;

        const productChange = products.filter(product => {
            if (!product.createdAt) return false;
            const createdDate = new Date(product.createdAt);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return createdDate > thirtyDaysAgo;
        }).length;

        const recentOrders = [...orders]
            .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
            .slice(0, 5)
            .map(order => ({
                id: order._id || "",
                product:
                    order.items?.[0]?.product &&
                        typeof order.items[0].product === "object"
                        ? order.items[0].product?.name || "Product"
                        : `Product ${order.items?.[0]?.product?.slice(-4) || ""}`,
                customer:
                    typeof order.user !== "string"
                        ? `${order.user?.firstName || ""} ${order.user?.lastName || ""}`.trim() || "Customer"
                        : "Customer",
                date: order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })
                    : "N/A",
                amount: order.total || 0,
                status: order.status || "Pending",
            }));

        const monthlyRevenue = calculateMonthlyRevenue(orders);

        setChartData({
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
                {
                    label: "Revenue",
                    data: monthlyRevenue,
                    backgroundColor: "#ee2b4b",
                    borderRadius: 8,
                },
            ],
        });

        setDashboardStats({
            totalRevenue,
            totalOrders,
            totalCustomers,
            totalProducts,
            revenueChange,
            orderChange,
            customerChange,
            productChange,
            recentOrders,
        });
    };

    useEffect(() => {
        calculateDashboardStats();
    }, [orders, products, users]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered":
                return "text-green-600";
            case "Processing":
                return "text-blue-600";
            case "Shipped":
                return "text-indigo-600";
            case "Pending":
                return "text-yellow-600";
            case "Cancelled":
                return "text-red-600";
            case "Returned":
                return "text-purple-600";
            default:
                return "text-gray-600";
        }
    };

    const formatCurrency = (amount: number) => `Rs. ${amount.toLocaleString()}`;

    const isLoading = orderLoading || productLoading || userLoading;

    return (
        <main className="flex min-h-screen">
            <aside className="h-screen fixed top-0 left-0 bg-gray-100">
                <Sidebar />
            </aside>

            <div className="flex-1 lg:ml-64 ml-8 p-6 overflow-y-auto">
                <AdminDashboard
                    dashboardStats={dashboardStats}
                    chartData={chartData}
                    isLoading={isLoading}
                    formatCurrency={formatCurrency}
                    getStatusColor={getStatusColor}
                />
            </div>
        </main>
    );
}