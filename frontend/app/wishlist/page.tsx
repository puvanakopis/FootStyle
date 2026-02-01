"use client";

import React, { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/Sidebar";
import ProductList from "@/containers/wishlist/ProductList";
import WishlistFilter from "@/containers/wishlist/WishlistFilter";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/interfaces/productInterface";
import Link from "next/link";

const breadcrumbItems = [
    { label: "Account", href: "" },
    { label: "Wishlist", href: "/wishlist" },
];

export default function Wishlist() {
    const { wishlist, isLoading, error, fetchWishlist } = useWishlist();
    const [sortOption, setSortOption] = useState<string>("newest");

    // Fetch wishlist on component mount
    useEffect(() => {
        fetchWishlist();
    }, []);

    // Handle sorting of wishlist products
    const sortedProducts = useMemo(() => {
        const products = [...wishlist];

        switch (sortOption) {
            case "newest":
                return products.sort((a, b) => {
                    const dateA = new Date(a.createdAt || "").getTime();
                    const dateB = new Date(b.createdAt || "").getTime();
                    return dateB - dateA;
                });

            case "oldest":
                return products.sort((a, b) => {
                    const dateA = new Date(a.createdAt || "").getTime();
                    const dateB = new Date(b.createdAt || "").getTime();
                    return dateA - dateB;
                });

            case "price-asc":
                return products.sort((a, b) => a.price - b.price);

            case "price-desc":
                return products.sort((a, b) => b.price - a.price);

            default:
                return products;
        }
    }, [wishlist, sortOption]);

    const handleSortChange = (sortValue: string) => {
        setSortOption(sortValue);
    };

    // Show loading state
    if (isLoading) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Header />
                <div className="px-30 py-6">
                    <Breadcrumbs items={breadcrumbItems} />
                    <div className="flex flex-col lg:flex-row gap-6 mt-6">
                        <div className="w-full lg:w-1/5">
                            <Sidebar />
                        </div>
                        <section className="w-full lg:w-4/5 space-y-6">
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ee2b4b]"></div>
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    // Show error state
    if (error) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Header />
                <div className="px-30 py-6">
                    <Breadcrumbs items={breadcrumbItems} />
                    <div className="flex flex-col lg:flex-row gap-6 mt-6">
                        <div className="w-full lg:w-1/5">
                            <Sidebar />
                        </div>
                        <section className="w-full lg:w-4/5 space-y-6">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                                <p className="text-red-600 font-medium">Error loading wishlist: {error}</p>
                                <button
                                    onClick={fetchWishlist}
                                    className="mt-4 px-4 py-2 bg-[#ee2b4b] text-white rounded-lg hover:bg-[#d4203e] transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    // Show empty wishlist state
    if (wishlist.length === 0) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Header />
                <div className="px-30 py-6">
                    <Breadcrumbs items={breadcrumbItems} />
                    <div className="flex flex-col lg:flex-row gap-6 mt-6">
                        <div className="w-full lg:w-1/5">
                            <Sidebar />
                        </div>
                        <section className="w-full lg:w-4/5 space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-12 text-center">
                                <h3 className="text-2xl font-bold text-neutral-900 mb-3">Your wishlist is empty</h3>
                                <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                                    Save items you love to your wishlist. Review them anytime and easily move them to the bag.
                                </p>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#ee2b4b] text-white font-medium rounded-lg hover:bg-[#d4203e] transition-colors"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    <div className="w-full lg:w-1/5">
                        <Sidebar />
                    </div>

                    <section className="w-full lg:w-4/5 space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-neutral-900">My Wishlist</h1>
                                <p className="text-neutral-600 mt-1">
                                    {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                                </p>
                            </div>
                            <WishlistFilter onSortChange={handleSortChange} />
                        </div>
                        <ProductList products={sortedProducts} />
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}