"use client";

import { IoMdAdd, IoMdTrendingUp } from "react-icons/io";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineShoppingBag, MdOutlineGroup, MdOutlineInventory2 } from "react-icons/md";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Revenue",
                data: [45, 60, 35, 75, 50, 85],
                backgroundColor: "#ee2b4b",
                borderRadius: 8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 15 },
            },
        },
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                {/* Breadcrumbs & Heading */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-black text-text-main tracking-tight">
                            Dashboard Overview
                        </h2>
                        <p className="text-text-secondary">
                            Welcome back, Alex. Here&#39;s what&#39;s happening with your store today.
                        </p>
                    </div>

                    <button className="flex items-center gap-2 bg-[#ee2b4b] hover:bg-[#ee2b4b]/90 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-[#ee2b4b]/20 transition-all active:scale-95">
                        <span className="text-xl"><IoMdAdd /></span>
                        <span>Add New Product</span>
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Revenue */}
                    <div className="bg-white p-6 rounded-2xl border border-[#f3e7e9] shadow-sm flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="bg-green-100 p-2.5 rounded-xl text-green-600">
                                <FaRegMoneyBillAlt />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <IoMdTrendingUp className="text-sm" />
                                12%
                            </span>
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm font-medium">Total Revenue</p>
                            <h3 className="text-2xl font-black text-text-main mt-1">
                                Rs. 45,231
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
                                5%
                            </span>
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm font-medium">Total Orders</p>
                            <h3 className="text-2xl font-black text-text-main mt-1">356</h3>
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
                                8%
                            </span>
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm font-medium">Active Users</p>
                            <h3 className="text-2xl font-black text-text-main mt-1">1,205</h3>
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
                                2 new
                            </span>
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm font-medium">Total Products</p>
                            <h3 className="text-2xl font-black text-text-main mt-1">1,432</h3>
                        </div>
                    </div>
                </div>

                {/* Sales Chart */}
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
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">#ORD-0012</td>
                                    <td className="px-6 py-4">Nike Air Max 270</td>
                                    <td className="px-6 py-4">Sarah Connor</td>
                                    <td className="px-6 py-4">Oct 24, 2023</td>
                                    <td className="px-6 py-4 font-bold">Rs. 150.00</td>
                                    <td className="px-6 py-4">
                                        <span className="text-green-600 font-bold text-xs">
                                            Delivered
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}