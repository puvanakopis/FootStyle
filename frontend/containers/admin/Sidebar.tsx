"use client";

import { JSX, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MdHiking, MdOutlineDashboard, MdOutlineGroup, MdOutlineInventory2, MdOutlineShoppingCart, MdMenu, MdClose, MdLogout, } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";

type NavItem = {
    id: string;
    label: string;
    href: string;
    icon: JSX.Element;
};

const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", href: "/admin", icon: <MdOutlineDashboard /> },
    { id: "products", label: "Products", href: "/admin/products", icon: <MdOutlineInventory2 /> },
    { id: "orders", label: "Orders", href: "/admin/orders", icon: <MdOutlineShoppingCart /> },
    { id: "customers", label: "Customers", href: "/admin/customers", icon: <MdOutlineGroup /> },
];

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <>
            {/* Mobile top bar */}
            <div className="lg:hidden h-16 flex items-center px-4 border-b border-[#f3e7e9] ">
                <button onClick={() => setOpen(true)} className="text-2xl text-text-main">
                    <MdMenu />
                </button>
            </div>

            {/* Overlay (mobile) */}
            {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static top-0 left-0 z-50
                    bg-white border-r border-[#f3e7e9]
                    flex flex-col
                    h-full lg:h-screen
                    transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-[#f3e7e9] flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#ee2b4b]/10 rounded-full p-1.5">
                            <MdHiking className="text-[#ee2b4b] text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-none">FootStyle</h1>
                            <p className="text-xs text-text-secondary font-medium">Admin Panel</p>
                        </div>
                    </div>

                    {/* Close button (mobile only) */}
                    <button onClick={() => setOpen(false)} className="lg:hidden text-2xl">
                        <MdClose />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                    <p className="px-3 text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                        Main Menu
                    </p>

                    {navItems.map((item) => {
                        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    router.push(item.href);
                                    setOpen(false);
                                }}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group text-left
                                    ${isActive ? "bg-[#ee2b4b]/10 text-[#ee2b4b]" : "text-text-main hover:bg-gray-50"}
                                `}
                            >
                                <span className={`text-[22px] ${isActive ? "text-[#ee2b4b]" : "text-text-secondary group-hover:text-[#ee2b4b]"}`}>
                                    {item.icon}
                                </span>
                                <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}

                    <div className="my-2 border-t border-[#f3e7e9]" />
                </nav>

                {/* User + Logout */}
                <div className="p-4 border-t border-[#f3e7e9] flex-shrink-0 flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                        <div
                            className="size-10 rounded-full bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9uutHA9yPotq66KVOT5TeaX26o_Xq5nCPA2K5JGfSfUXJi4z4YgdthHlbzPl2d0RP_lmJ8GU_hv_dYEYj3CPUAZVxOoeNcAm2Ln7-C5Cspk28kTJYCRkJJGpjBobg3usVktHOkkhalW9BIoYcpH83PPU33Ldxg3VOGbpTPswXx9mEuuTiWDf6jqu6WS4GHMoXH8-x8FtXqAGZGrLj2-C3xmVIz1gaTibRqrV9fvq4xvnjngbr3dhzcSGgOPkdR3G8O8z-IRJ5cxeL')",
                            }}
                        />
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">Puvanakopis</p>
                            <p className="text-xs text-text-secondary truncate">admin@footstyle.com</p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                        <MdLogout className="text-lg" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}