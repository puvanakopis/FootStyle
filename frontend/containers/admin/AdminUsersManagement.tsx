"use client";

import React, { useState } from "react";
import {
    MdPersonAdd,
    MdOutlineFileDownload,
    MdOutlineFilterAlt,
    MdOutlineExpandMore,
    MdOutlineEdit,
} from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface User {
    id: string;
    name: string;
    email: string;
    status: "Active" | "Pending" | "Suspended";
    registeredDate: string;
    registeredTime: string;
    avatar?: string;
    avatarInitials?: string;
    avatarColor?: string;
}

const sampleUsers: User[] = [
    {
        id: "#USR-0001",
        name: "Alex Morgan",
        email: "admin@footstyle.com",
        status: "Active",
        registeredDate: "Jan 12, 2023",
        registeredTime: "10:23 AM",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD9uutHA9yPotq66KVOT5TeaX26o_Xq5nCPA2K5JGfSfUXJi4z4YgdthHlbzPl2d0RP_lmJ8GU_hv_dYEYj3CPUAZVxOoeNcAm2Ln7-C5Cspk28kTJYCRkJJGpjBobg3usVktHOkkhalW9BIoYcpH83PPU33Ldxg3VOGbpTPswXx9mEuuTiWDf6jqu6WS4GHMoXH8-x8FtXqAGZGrLj2-C3xmVIz1gaTibRqrV9fvq4xvnjngbr3dhzcSGgOPkdR3G8O8z-IRJ5cxeL",
    },
    {
        id: "#USR-0002",
        name: "Alex Morgan",
        email: "admin@footstyle.com",
        status: "Active",
        registeredDate: "Jan 12, 2023",
        registeredTime: "10:23 AM",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD9uutHA9yPotq66KVOT5TeaX26o_Xq5nCPA2K5JGfSfUXJi4z4YgdthHlbzPl2d0RP_lmJ8GU_hv_dYEYj3CPUAZVxOoeNcAm2Ln7-C5Cspk28kTJYCRkJJGpjBobg3usVktHOkkhalW9BIoYcpH83PPU33Ldxg3VOGbpTPswXx9mEuuTiWDf6jqu6WS4GHMoXH8-x8FtXqAGZGrLj2-C3xmVIz1gaTibRqrV9fvq4xvnjngbr3dhzcSGgOPkdR3G8O8z-IRJ5cxeL",
    },
    {
        id: "#USR-0003",
        name: "Alex Morgan",
        email: "admin@footstyle.com",
        status: "Active",
        registeredDate: "Jan 12, 2023",
        registeredTime: "10:23 AM",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD9uutHA9yPotq66KVOT5TeaX26o_Xq5nCPA2K5JGfSfUXJi4z4YgdthHlbzPl2d0RP_lmJ8GU_hv_dYEYj3CPUAZVxOoeNcAm2Ln7-C5Cspk28kTJYCRkJJGpjBobg3usVktHOkkhalW9BIoYcpH83PPU33Ldxg3VOGbpTPswXx9mEuuTiWDf6jqu6WS4GHMoXH8-x8FtXqAGZGrLj2-C3xmVIz1gaTibRqrV9fvq4xvnjngbr3dhzcSGgOPkdR3G8O8z-IRJ5cxeL",
    },
];

const AdminUsersManagement: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredUsers = sampleUsers.filter(
        (user) =>
            (statusFilter === "All" || user.status === statusFilter) &&
            (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-black text-text-main tracking-tight">
                            User Management
                        </h2>
                        <p className="text-text-secondary">
                            View and manage all registered users, and statuses.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-[#ee2b4b] hover:bg-[#d0223f] text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm">
                            <MdPersonAdd size={20} />
                            <span>Add User</span>
                        </button>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-4 bg-white p-1 rounded-2xl border border-[#f3e7e9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-2">
                        <div className="flex-1 flex items-center w-full p-2">
                            <span className="material-symbols-outlined text-text-secondary ml-2">
                                <MdOutlineFilterAlt />
                            </span>
                            <div className="h-6 w-px bg-gray-200 mx-3"></div>
                            <div className="relative group">
                            </div>
                            <div className="relative group ml-2">
                                <button
                                    className="flex items-center gap-2 text-sm font-bold text-text-main hover:text-[#ee2b4b] transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
                                    onClick={() =>
                                        setStatusFilter(statusFilter === "All" ? "Active" : "All")
                                    }
                                >
                                    <span>Status: {statusFilter}</span>
                                    <MdOutlineExpandMore />
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
                                    placeholder="Filter by name or email..."
                                    className="w-full md:w-64 pl-9 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20 focus:outline-none placeholder-text-secondary/70"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
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
                                    <th className="px-6 py-4 font-semibold">User</th>
                                    <th className="px-6 py-4 font-semibold">User ID</th>
                                    <th className="px-6 py-4 font-semibold">Registered</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f3e7e9]">
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]/20 bg-white"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {user.avatar ? (
                                                    <div
                                                        className="w-10 h-10 rounded-full bg-cover bg-center"
                                                        style={{ backgroundImage: `url(${user.avatar})` }}
                                                    />
                                                ) : (
                                                    <div
                                                        className={`w-10 h-10 rounded-full ${user.avatarColor} flex items-center justify-center text-[#ee2b4b] text-xs font-bold`}
                                                    >
                                                        {user.avatarInitials}
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-text-main">
                                                        {user.name}
                                                    </span>
                                                    <span className="text-xs text-text-secondary">
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#ee2b4b]">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-text-secondary">
                                            {user.registeredDate} <br />
                                            <span className="text-xs opacity-70">
                                                {user.registeredTime}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${user.status === "Active"
                                                    ? "bg-green-100 text-green-800 border-green-200"
                                                    : user.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                        : "bg-red-100 text-red-800 border-red-200"
                                                    }`}
                                            >
                                                <span
                                                    className={`w-2 h-2 rounded-full mr-1 ${user.status === "Active"
                                                        ? "bg-green-500"
                                                        : user.status === "Pending"
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                        }`}
                                                ></span>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-[#ee2b4b] hover:bg-[#ee2b4b]/5 transition-colors">
                                                    <MdOutlineEdit size={20} />
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
                            Showing <span className="font-bold text-text-main">1-5</span> of{" "}
                            <span className="font-bold text-text-main">{sampleUsers.length}</span>{" "}
                            users
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main transition-colors disabled:opacity-50">
                                <LuChevronLeft />
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
                                50
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main transition-colors">
                                <LuChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersManagement;
