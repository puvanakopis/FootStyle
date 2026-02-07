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
import { formatDate } from "@/utils/dateUtils"
import Loading from "@/components/Loading";

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

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Header />
                <Loading message='loading wishlist .....' />
                <Footer />
            </main>
        )
    }

    // Error state
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

    // Empty wishlist
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
                                    {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
                                </p>
                            </div>
                            <WishlistFilter selectedSort={sortOption} onSortChange={handleSortChange} />
                        </div>
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
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}