"use client";

import React, { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/Sidebar";
import ProductList from "@/containers/wishlist/ProductList";
import WishlistFilter from "@/containers/wishlist/WishlistFilter";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/toast";
import { formatDate } from "@/utils/dateUtils";

const breadcrumbItems = [
    { label: "Account", href: "" },
    { label: "Wishlist", href: "/wishlist" },
];

export default function Wishlist() {
    const { wishlist, isLoading, error, fetchWishlist, removeFromWishlist } = useWishlist();
    const [sortOption, setSortOption] = useState<string>("newest");

    const router = useRouter();

    // Fetch wishlist on mount
    useEffect(() => {
        fetchWishlist();
    }, []);

    // Handle sorting
    const sortedProducts = useMemo(() => {
        const products = [...wishlist];
        switch (sortOption) {
            case "newest":
                return products.sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime());
            case "oldest":
                return products.sort((a, b) => new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime());
            case "price-asc":
                return products.sort((a, b) => a.price - b.price);
            case "price-desc":
                return products.sort((a, b) => b.price - a.price);
            default:
                return products;
        }
    }, [wishlist, sortOption]);

    const handleSortChange = (value: string) => {
        setSortOption(value);
    };

    // Helper functions
    const getStockStatus = (product: any) => {
        const totalStock = product.sizes.reduce((sum: number, size: any) => sum + size.stock, 0);
        return totalStock > 0 ? "in-stock" : "out-of-stock";
    };

    const getPrimaryImage = (product: any) => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        return `${API_BASE_URL}/uploads/product/${product.images[0]}`;
    };

    const getReviewCount = (product: any) => product.reviews.length;

    const getLastSavedSize = (product: any) => {
        const availableSize = product.sizes.find((size: any) => size.stock > 0);
        return availableSize ? availableSize.size : product.sizes[0]?.size || "N/A";
    };

    const calculateAverageRating = (product: any) => {
        if (product.reviews.length === 0) return 0;
        const sum = product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0);
        return sum / product.reviews.length;
    };

    // Event handlers
    const handleRemoveFromWishlist = async (productId: string, productName: string) => {
        try {
            await removeFromWishlist(productId);
            showToast("success", `"${productName}" removed from wishlist`);
        } catch (error) {
            console.error("Failed to remove from wishlist:", error);
            showToast("error", "Failed to remove item from wishlist. Please try again.");
        }
    };

    const handleAddToCart = (product: any) => {
        const stockStatus = getStockStatus(product);
        const isDisabled = !product.isActive || stockStatus === "out-of-stock";

        if (isDisabled) {
            showToast("error", "This product is currently unavailable");
            return;
        }

        showToast("success", `"${product.title || product.name}" added to cart`);
    };

    const handleViewProduct = (productId: string, productName: string) => {
        showToast("info", `Viewing "${productName}"`);
        router.push(`/products/${productId}`);
    };

    return (
        <main className="min-h-screen bg-[#fafafc] text-slate-900">
            <Header />
            <div className="px-4 md:px-10 py-6">
                <div className="w-full max-w-[1280px] mx-auto">
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
                                        {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
                                    </p>
                                </div>
                                {wishlist.length > 0 && (
                                    <WishlistFilter selectedSort={sortOption} onSortChange={handleSortChange} />
                                )}
                            </div>

                            {isLoading ? (
                                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-12 text-center">
                                    <div className="flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ee2b4b]"></div>
                                    </div>
                                    <p className="text-neutral-600 mt-4">Loading your wishlist...</p>
                                </div>
                            ) : error ? (
                                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-12 text-center">
                                    <div className="text-red-500 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                        Error Loading Wishlist
                                    </h3>
                                    <p className="text-neutral-500 mb-6">
                                        {error || "Failed to load your wishlist. Please try again."}
                                    </p>
                                    <button
                                        onClick={fetchWishlist}
                                        className="inline-block px-6 py-3 bg-[#ee2b4b] text-white rounded-lg font-bold hover:bg-red-600 transition"
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : wishlist.length === 0 ? (
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
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                        Your wishlist is empty
                                    </h3>
                                    <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                                        Save items you love to your wishlist. Review them anytime and easily move them to the bag.
                                    </p>

                                    <Link
                                        href="/products"
                                        className="inline-block px-6 py-3 bg-[#ee2b4b] text-white rounded-lg font-bold hover:bg-red-600 transition"
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <ProductList
                                    products={sortedProducts}
                                    isLoading={isLoading}
                                    getStockStatus={getStockStatus}
                                    getPrimaryImage={getPrimaryImage}
                                    getReviewCount={getReviewCount}
                                    formatDate={formatDate}
                                    getLastSavedSize={getLastSavedSize}
                                    calculateAverageRating={calculateAverageRating}
                                    handleRemoveFromWishlist={handleRemoveFromWishlist}
                                    handleAddToCart={handleAddToCart}
                                    handleViewProduct={handleViewProduct}
                                />
                            )}
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}