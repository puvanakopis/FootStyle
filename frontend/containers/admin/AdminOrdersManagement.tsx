"use client";

import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineFilterAlt } from "react-icons/md";
import { MdOutlineExpandMore } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    date: string;
    time: string;
    total: string;
    paymentStatus: "Paid" | "Pending" | "Unpaid" | "Refunded";
    orderStatus: "Delivered" | "Processing" | "Shipped" | "Cancelled" | "Pending";
    avatarColor?: string;
    avatarInitials?: string;
    avatarUrl?: string;
}

const ordersData: Order[] = [
    {
        id: "#ORD-0012",
        customerName: "Sarah Connor",
        customerEmail: "sarah@example.com",
        date: "Oct 24, 2023",
        time: "10:45 AM",
        total: "$150.00",
        paymentStatus: "Paid",
        orderStatus: "Delivered",
        avatarColor: "bg-[#ee2b4b]/10",
        avatarInitials: "SC",
    },
    {
        id: "#ORD-0011",
        customerName: "John Doe",
        customerEmail: "john.d@example.com",
        date: "Oct 23, 2023",
        time: "02:15 PM",
        total: "$110.00",
        paymentStatus: "Pending",
        orderStatus: "Processing",
        avatarColor: "bg-blue-100",
        avatarInitials: "JD",
    },
    {
        id: "#ORD-0010",
        customerName: "Emily Smith",
        customerEmail: "emily@example.com",
        date: "Oct 23, 2023",
        time: "09:30 AM",
        total: "$125.00",
        paymentStatus: "Paid",
        orderStatus: "Shipped",
        avatarUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD9uutHA9yPotq66KVOT5TeaX26o_Xq5nCPA2K5JGfSfUXJi4z4YgdthHlbzPl2d0RP_lmJ8GU_hv_dYEYj3CPUAZVxOoeNcAm2Ln7-C5Cspk28kTJYCRkJJGpjBobg3usVktHOkkhalW9BIoYcpH83PPU33Ldxg3VOGbpTPswXx9mEuuTiWDf6jqu6WS4GHMoXH8-x8FtXqAGZGrLj2-C3xmVIz1gaTibRqrV9fvq4xvnjngbr3dhzcSGgOPkdR3G8O8z-IRJ5cxeL",
    },
    {
        id: "#ORD-0009",
        customerName: "Michael Brown",
        customerEmail: "mike.b@example.com",
        date: "Oct 22, 2023",
        time: "04:20 PM",
        total: "$198.00",
        paymentStatus: "Paid",
        orderStatus: "Delivered",
        avatarColor: "bg-orange-100",
        avatarInitials: "MB",
    },
    {
        id: "#ORD-0008",
        customerName: "Amy Liu",
        customerEmail: "amy.liu@example.com",
        date: "Oct 21, 2023",
        time: "11:10 AM",
        total: "$89.50",
        paymentStatus: "Refunded",
        orderStatus: "Cancelled",
        avatarColor: "bg-purple-100",
        avatarInitials: "AL",
    },
    {
        id: "#ORD-0007",
        customerName: "David Kim",
        customerEmail: "david.k@example.com",
        date: "Oct 20, 2023",
        time: "08:50 AM",
        total: "$245.00",
        paymentStatus: "Unpaid",
        orderStatus: "Pending",
        avatarColor: "bg-teal-100",
        avatarInitials: "DK",
    },
];

const AdminOrdersManagement: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("Last 30 Days");

    const filteredOrders = ordersData.filter((order) => {
        return (
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-black text-text-main tracking-tight">
                            Orders Management
                        </h2>
                        <p className="text-text-secondary">
                            View and manage all customer orders and their status.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-4 bg-white p-1 rounded-2xl border border-[#f3e7e9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-2">
                        <div className="flex-1 flex items-center w-full p-2">
                            <span className="material-symbols-outlined text-text-secondary ml-2"><MdOutlineFilterAlt /></span>
                            <div className="h-6 w-px bg-gray-200 mx-3"></div>
                            <div className="relative group">
                                <button
                                    className="flex items-center gap-2 text-sm font-bold text-text-main hover:text-[#ee2b4b] transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
                                    onClick={() =>
                                        setStatusFilter(statusFilter === "All" ? "Paid" : "All")
                                    }
                                >
                                    <span>Status: {statusFilter}</span>
                                    <span className="material-symbols-outlined text-lg"><MdOutlineExpandMore /></span>
                                </button>
                            </div>
                            <div className="relative group ml-2">
                                <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-[#ee2b4b] transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50">
                                    <span>Date: {dateFilter}</span>
                                    <span className="material-symbols-outlined text-lg"><MdOutlineExpandMore /></span>
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-auto p-2">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary material-symbols-outlined text-lg">
                                    <IoSearch />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Filter by name or ID..."
                                    className="w-full md:w-64 pl-9 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20 focus:outline-none placeholder-text-secondary/70"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl border border-[#f3e7e9] shadow-sm overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8f6f6] text-text-secondary text-xs uppercase tracking-wider border-b border-[#f3e7e9]">
                                    <th className="px-6 py-4 font-semibold w-10">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]/20 bg-white"
                                        />
                                    </th>
                                    <th className="px-6 py-4 font-semibold">Order ID</th>
                                    <th className="px-6 py-4 font-semibold">Customer</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Total</th>
                                    <th className="px-6 py-4 font-semibold">Payment</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f3e7e9]">
                                {filteredOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]/20 bg-white"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#ee2b4b]">
                                            <a className="hover:underline" href="#">
                                                {order.id}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {order.avatarUrl ? (
                                                    <div
                                                        className="size-8 rounded-full bg-cover bg-center"
                                                        style={{ backgroundImage: `url(${order.avatarUrl})` }}
                                                    />
                                                ) : (
                                                    <div
                                                        className={`size-8 rounded-full ${order.avatarColor} flex items-center justify-center text-[#ee2b4b] text-xs font-bold`}
                                                    >
                                                        {order.avatarInitials}
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-text-main">
                                                        {order.customerName}
                                                    </span>
                                                    <span className="text-xs text-text-secondary">
                                                        {order.customerEmail}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-text-secondary">
                                            {order.date} <br />
                                            <span className="text-xs opacity-70">{order.time}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-text-main">{order.total}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span
                                                    className={`size-2 rounded-full ${order.paymentStatus === "Paid"
                                                        ? "bg-green-500"
                                                        : order.paymentStatus === "Pending"
                                                            ? "bg-yellow-500"
                                                            : order.paymentStatus === "Refunded"
                                                                ? "bg-red-500"
                                                                : "bg-gray-400"
                                                        }`}
                                                ></span>
                                                <span className="text-sm text-text-main">{order.paymentStatus}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${order.orderStatus === "Delivered"
                                                    ? "bg-green-100 text-green-800 border-green-200"
                                                    : order.orderStatus === "Processing"
                                                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                        : order.orderStatus === "Shipped"
                                                            ? "bg-blue-100 text-blue-800 border-blue-200"
                                                            : order.orderStatus === "Cancelled"
                                                                ? "bg-red-100 text-red-800 border-red-200"
                                                                : "bg-gray-100 text-gray-800 border-gray-200"
                                                    }`}
                                            >
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-[#ee2b4b] hover:bg-[#ee2b4b]/5 transition-colors"
                                                    title="Edit Order"
                                                >
                                                    <span className="material-symbols-outlined text-lg"><MdOutlineEdit /></span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-[#f3e7e9] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-text-secondary">
                            Showing <span className="font-bold text-text-main">1-6</span> of{" "}
                            <span className="font-bold text-text-main">{ordersData.length}</span> orders
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main transition-colors disabled:opacity-50">
                                <span className="material-symbols-outlined text-lg"><LuChevronLeft /></span>
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg bg-[#ee2b4b] text-white font-bold text-sm">
                                1
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main transition-colors text-sm font-medium">
                                2
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main transition-colors text-sm font-medium">
                                3
                            </button>
                            <span className="text-text-secondary">...</span>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main transition-colors text-sm font-medium">
                                12
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main transition-colors">
                                <span className="material-symbols-outlined text-lg"><LuChevronRight /></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrdersManagement;