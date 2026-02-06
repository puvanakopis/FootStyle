"use client";

import { IoMdAdd, IoMdTrendingUp } from "react-icons/io";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineShoppingBag, MdOutlineGroup, MdOutlineInventory2 } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RecentOrder {
    id: string;
    product: string;
    customer: string;
    date: string;
    amount: number;
    status: string;
}

interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    revenueChange: number;
    orderChange: number;
    customerChange: number;
    productChange: number;
    recentOrders: RecentOrder[];
}

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderRadius: number;
    }[];
}

interface AdminDashboardProps {
    dashboardStats: DashboardStats;
    chartData: ChartData;
    isLoading: boolean;
    formatCurrency: (amount: number) => string;
    getStatusColor: (status: string) => string;
}

const chartOptions = {
    responsive: true,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1000,
                callback: (value: number) => `Rs. ${value.toLocaleString()}`,
            },
        },
    },
};

export default function AdminDashboard({
    dashboardStats,
    chartData,
    isLoading,
    formatCurrency,
    getStatusColor
}: AdminDashboardProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 lg:p-10 scroll-smooth">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Heading */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-black text-text-main tracking-tight">
                            Dashboard Overview
                        </h2>
                        <p className="text-text-secondary">
                            Welcome back, Admin. Here&#39;s what&#39;s happening with your store today.
                        </p>
                    </div>
                </div>

                {/* Loading state */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-[#f3e7e9] shadow-sm">
                                <div className="animate-pulse">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="bg-gray-200 p-2.5 rounded-xl w-10 h-10"></div>
                                        <div className="bg-gray-200 w-16 h-6 rounded-full"></div>
                                    </div>
                                    <div>
                                        <div className="bg-gray-200 w-24 h-4 rounded mb-2"></div>
                                        <div className="bg-gray-200 w-32 h-8 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Stats cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Revenue */}
                            <div className="bg-white p-6 rounded-2xl border border-[#f3e7e9] shadow-sm flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="bg-green-100 p-2.5 rounded-xl text-green-600">
                                        <FaRegMoneyBillAlt />
                                    </div>
                                    <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        <IoMdTrendingUp className="text-sm" />
                                        {dashboardStats.revenueChange}%
                                    </span>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-sm font-medium">Total Revenue</p>
                                    <h3 className="text-2xl font-black text-text-main mt-1">
                                        {formatCurrency(dashboardStats.totalRevenue)}
                                    </h3>
                                </div>
                            </div>

                            {/* Orders */}
                            <div className="bg-white p-6 rounded-2xl border border-[#f3e7e9] shadow-sm flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
                                        <MdOutlineShoppingBag />
                                    </div>
                                    <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                        <IoMdTrendingUp className="text-sm" />
                                        {dashboardStats.orderChange}%
                                    </span>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-sm font-medium">Total Orders</p>
                                    <h3 className="text-2xl font-black text-text-main mt-1">{dashboardStats.totalOrders}</h3>
                                </div>
                            </div>

                            {/* Customers */}
                            <div className="bg-white p-6 rounded-2xl border border-[#f3e7e9] shadow-sm flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="bg-purple-100 p-2.5 rounded-xl text-purple-600">
                                        <MdOutlineGroup />
                                    </div>
                                    <span className="flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                                        <IoMdTrendingUp className="text-sm" />
                                        {dashboardStats.customerChange}%
                                    </span>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-sm font-medium">Active Users</p>
                                    <h3 className="text-2xl font-black text-text-main mt-1">{dashboardStats.totalCustomers}</h3>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="bg-white p-6 rounded-2xl border border-[#f3e7e9] shadow-sm flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600">
                                        <MdOutlineInventory2 />
                                    </div>
                                    <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                                        <IoMdAdd className="text-sm" />
                                        {dashboardStats.productChange} new
                                    </span>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-sm font-medium">Total Products</p>
                                    <h3 className="text-2xl font-black text-text-main mt-1">{dashboardStats.totalProducts}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Sales chart */}
                        <div className="bg-white rounded-2xl border border-[#f3e7e9] shadow-sm p-6">
                            <h3 className="text-lg font-bold text-text-main mb-2">Sales Overview</h3>
                            <p className="text-sm text-text-secondary mb-6">
                                Revenue performance over the last 6 months
                            </p>
                            <Bar data={chartData} options={chartOptions} height={100} />
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white rounded-2xl border border-[#f3e7e9] shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-[#f3e7e9]">
                                <h3 className="text-lg font-bold text-text-main">Recent Orders</h3>
                                <p className="text-sm text-text-secondary">
                                    Manage the latest transactions
                                </p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-background-light text-text-secondary text-xs uppercase">
                                        <tr>
                                            <th className="px-6 py-4">Order ID</th>
                                            <th className="px-6 py-4">Product</th>
                                            <th className="px-6 py-4">Customer</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#f3e7e9]">
                                        {dashboardStats.recentOrders.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-8 text-center text-text-secondary">
                                                    No recent orders found
                                                </td>
                                            </tr>
                                        ) : (
                                            dashboardStats.recentOrders.map((order, index) => (
                                                <tr key={order.id || index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium">
                                                        #{order.id?.slice(-8).toUpperCase() || `ORD-${index.toString().padStart(4, '0')}`}
                                                    </td>
                                                    <td className="px-6 py-4">{order.product}</td>
                                                    <td className="px-6 py-4">{order.customer}</td>
                                                    <td className="px-6 py-4">{order.date}</td>
                                                    <td className="px-6 py-4 font-bold">
                                                        {formatCurrency(order.amount)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`font-bold text-xs ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}