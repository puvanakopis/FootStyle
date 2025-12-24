"use client";

import React, { useState } from "react";
import { BiPackage } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

const navItems = [
    { label: "My Profile", icon: <LuUserRound /> },
    { label: "Orders", icon: <BiPackage /> },
    { label: "Wishlist", icon: <MdFavoriteBorder /> },
    { label: "Settings", icon: <IoSettingsOutline /> },
    { label: "Log Out", icon: <IoIosLogOut />, color: "text-red-500" },
];

const Sidebar: React.FC = () => {
    const userName = "Puvanakopis";
    const userEmail = "puvanakopis@gmail.com";

    const [activeItem, setActiveItem] = useState<string>("My Profile");

    const handleClick = (label: string) => {
        setActiveItem(label);
        console.log(`Selected: ${label}`);
    };

    return (
        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-neutral-100">
                <div className="size-14 rounded-full bg-[#ee2b4b]/10 flex items-center justify-center text-[#ee2b4b]">
                    <VscAccount className="text-3xl" />
                </div>
                <div>
                    <h3 className="font-bold text-neutral-900">{userName}</h3>
                    <p className="text-xs text-neutral-500">{userEmail}</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
                {navItems.map((item) => {
                    const isActive = activeItem === item.label;
                    const textColor = item.color ? item.color : isActive ? "text-[#ee2b4b]" : "text-neutral-600";
                    const bgColor = isActive ? "bg-[#ee2b4b]/5" : "hover:bg-neutral-50";
                    const borderColor = isActive ? "border-[#ee2b4b]" : "border-transparent";

                    return (
                        <button
                            key={item.label}
                            onClick={() => handleClick(item.label)}
                            className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium ${textColor} ${bgColor} transition-colors border-l-4 ${borderColor}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;