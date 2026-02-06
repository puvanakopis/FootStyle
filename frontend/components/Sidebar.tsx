"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { BiPackage } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { LuUserRound } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/utils/toast";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { label: "My Profile", icon: <LuUserRound />, path: "/profile" },
        { label: "Orders", icon: <BiPackage />, path: "/orders" },
        { label: "Wishlist", icon: <MdFavoriteBorder />, path: "/wishlist" },
    ];

    const handleLogout = () => {
        logout();
        showToast("success", "Logout successful");
        router.push("/login");
    };

    const handleClick = (path: string) => {
        router.push(path);
    };

    return (
        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-neutral-100">
                <div className="size-10 rounded-full bg-[#ee2b4b]/10 flex items-center justify-center text-[#ee2b4b]">
                    <VscAccount className="text-2xl" />
                </div>
                <div>
                    <h3 className="font-bold text-neutral-900">{user?.firstName || "User"}</h3>
                    <p className="text-xs text-neutral-500">{user?.email || ""}</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <button
                            key={item.label}
                            onClick={() => handleClick(item.path)}
                            className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors
                                ${isActive ? "text-[#ee2b4b] bg-[#ee2b4b]/5" : "text-neutral-600 hover:bg-neutral-50"}
                            `}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    );
                })}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                    <IoIosLogOut />
                    Log Out
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;