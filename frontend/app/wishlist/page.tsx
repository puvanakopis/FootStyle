"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/Sidebar";
import ProductList from "@/containers/wishlist/ProductList";
import WishlistFilter from "@/containers/wishlist/WishlistFilter";
import { Product } from "@/interfaces/productInterface";

const breadcrumbItems = [
    { label: "Account", href: "" },
    { label: "Wishlist", href: "/wishlist" },
];

const wishlistProducts: Product[] = [
    {
        id: "1",
        name: "Speed Runner Pro",
        gender: "Men",
        material: "Mesh",
        description: "High-performance basketball sneaker with breathable mesh",
        price: 145.0,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDWMS3ZqlSHblgEuSBl3H9KrESpT45jiSsQqEz9Ze9KRzDTS6_-lZ9R4lCY3W4D408RHuqvwJVSiQVMwCTzuqUYub1KXrK1ZJpqPDa_YYXiEir-Q3qxY7biH9j2DxJ73sTTKHHOFHdy3Wtc8Z3RPYaXCm_WeQeFISZcpJWDw2E_7q-3sNYBcQ7enMV4evbL5BhYRTh-1muqmNPNpZvHtBqhnPqvTWjt0_IlyPSbP702UReH4BZoCicxpPPoLkqOzo8DVBZeu9oOLChJ",
        ],
        sizes: [
            { size: "9.5", stock: 10 },
            { size: "10", stock: 5 },
            { size: "10.5", stock: 7 },
        ],
        reviews: [
            {
                user: "John Doe",
                rating: 4,
                comment: "Great shoes!",
                createdAt: "2023-10-25",
            },
        ],
        isActive: true,
        rating: 4,
        title: "Speed Runner Pro Basketball Sneaker",
        createdAt: "2024-01-15",
    },
    {
        id: "2",
        name: "Air Pulse 90",
        gender: "Men",
        material: "Leather",
        description: "Premium casual sneaker with leather finish",
        price: 160.0,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDAk78r_VH9KmyTZ5k6Kri-zxpTb3ITYmX5C6f8dN26fJHIc6zSUU7_aniKs6-inddn0UOJLaPLczD4ysP81KHvByuAcXAoY3Q5TcctF6LRU9JhcTM2QBLakAcTp27xwE_ni9FTR39P_cgO_ntQ8qSuxYZSZiaLVOcpZAUpIVbnlPh77MdvAtgkSbX38y_4RIYcvLSxr4T4dGNo4z9DIIusqujCgwUuy0HAILTyu3_qxuTCFt9UMTk-8Z1OknI1I1v_9Ii4TOjMB5Lr",
        ],
        sizes: [
            { size: "11", stock: 15 },
            { size: "11.5", stock: 8 },
            { size: "12", stock: 3 },
        ],
        reviews: [
            {
                user: "Jane Smith",
                rating: 5,
                comment: "Very comfortable!",
                createdAt: "2023-09-16",
            },
            {
                user: "Mike Johnson",
                rating: 5,
                comment: "Best shoes ever!",
                createdAt: "2023-09-20",
            },
        ],
        isActive: true,
        rating: 5,
        title: "Air Pulse 90 Casual Sneaker",
        createdAt: "2024-01-10",
    },
    {
        id: "3",
        name: "Urban Trekker Low",
        gender: "Men",
        material: "Synthetic",
        description: "Lightweight men's running shoe",
        price: 110.0,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAq9OXD6c-16MG8_MrQwWygSdWLPjNwsk1r8kbz_ggrS_AOpQgI6I-fC_Q8yiBjxOPcICG_Jcz2TYE4AHr7GzLZIgVR-aP04pt9C8-f4aElFBHx8y4YotmyWFfUVDyXMG9_3_BNyn_BndEzLr4huI9UiqorMVJMSOmQe--7IGP_Y1vt0x0GAE6nf50R71pfmeW5_Hb8zILXYoAvvRvyhQGvSAUVndB98MEXstuSi1Io6ILhqObcDtmHS_MOMv8NHUcneC5VijBuUBhz",
        ],
        sizes: [
            { size: "9", stock: 0 },
            { size: "9.5", stock: 0 },
            { size: "10", stock: 0 },
        ],
        reviews: [],
        isActive: false,
        rating: 0,
        title: "Urban Trekker Low Running Shoe",
        createdAt: "2024-01-05",
    },
    {
        id: "4",
        name: "Classic Comfort",
        gender: "Women",
        material: "Mesh",
        description: "Casual everyday sneaker",
        price: 95.0,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDWMS3ZqlSHblgEuSBl3H9KrESpT45jiSsQqEz9Ze9KRzDTS6_-lZ9R4lCY3W4D408RHuqvwJVSiQVMwCTzuqUYub1KXrK1ZJpqPDa_YYXiEir-Q3qxY7biH9j2DxJ73sTTKHHOFHdy3Wtc8Z3RPYaXCm_WeQeFISZcpJWDw2E_7q-3sNYBcQ7enMV4evbL5BhYRTh-1muqmNPNpZvHtBqhnPqvTWjt0_IlyPSbP702UReH4BZoCicxpPPoLkqOzo8DVBZeu9oOLChJ",
        ],
        sizes: [
            { size: "7", stock: 8 },
            { size: "7.5", stock: 12 },
            { size: "8", stock: 6 },
        ],
        reviews: [
            {
                user: "Sarah Wilson",
                rating: 4,
                comment: "Very comfortable for daily wear",
                createdAt: "2023-12-28",
            },
        ],
        isActive: true,
        rating: 4,
        title: "Classic Comfort Casual Sneaker",
        createdAt: "2024-01-20",
    },
];

export default function Wishlist() {
    const [sortOption, setSortOption] = useState<string>("newest");

    const sortedProducts = useMemo(() => {
        const products = [...wishlistProducts];

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
    }, [sortOption]);

    const handleSortChange = (sortValue: string) => {
        setSortOption(sortValue);
    };

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
                        <WishlistFilter onSortChange={handleSortChange} />
                        <ProductList products={sortedProducts} />
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}