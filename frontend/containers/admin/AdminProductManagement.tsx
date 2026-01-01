"use client";

import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineFileDownload, MdOutlineEdit, MdOutlineAdd } from "react-icons/md";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { MdCategory, MdInventory, MdAttachMoney } from "react-icons/md";

type Product = {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    oldPrice?: number;
    stock: number;
    stockStatus: "Low" | "Med" | "High" | "Out";
    status: "Active" | "Draft" | "Archived";
    image: string;
};

const sampleProducts: Product[] = [
    {
        id: "1",
        name: "Nike Air Max 270",
        sku: "NK-AM-270-RD",
        category: "Running",
        price: 150,
        oldPrice: 180,
        stock: 2,
        stockStatus: "Low",
        status: "Active",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC8nutm2JDkOOAyiY_GBY4PdfQPqA9L6hIer-JXCvWfOFz5TY4CcjpNFylQQQAI54jGD2WA7HM0z5yYh1gJJQlqEhOYia4q4rGUFzel8usfjxSZq0Xe98UoeTRf4NILpWzT8gzntCS4nnBYufhTYttxLNokOlTxc-3GvYtrEOE0C7jbHFP7-n0fD0mZzO5abz-6DRnOYfsLY-4nS_GC4dNcav258cvSqTJqODb8UwdetldoJTCvoKvgPpbmDYacperkYkhOYhsHWpxX",
    },
    {
        id: "2",
        name: "Adidas Ultraboost 22",
        sku: "AD-UB-22-GR",
        category: "Sports",
        price: 190,
        stock: 12,
        stockStatus: "Med",
        status: "Active",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBqzGpfPxe0XUK_7q3m7gUxpsinido-lSciLBe2EhYwRTvf9Jl22BChLHGsO-7d2wMeK0rVNN2xRu1oT5Nm3NtuBXiAbSp2JEmgrNVJifjvJom2jsjR158gAM3AB0Rd7CvTtcxgegXYuOHa4jdRECo7IjvCw7YQRtwfTyn2Drpzq-OETvDVVk3F93ASuaqZIOBbuNVndwQaENo6TB1xxFpDTO_3kvrxRPbXxcP120xoQTxSwDDvrEr1aZX8RpvjMO9STTO5SlVoL6vy",
    },
];

const AdminProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(sampleProducts);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [stockFilter, setStockFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("All");

    const filteredProducts = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-black text-text-main tracking-tight">
                            Product Management
                        </h2>
                        <p className="text-text-secondary">
                            Manage your store&apos;s products, stock levels, and pricing.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-text-main px-4 py-2.5 rounded-xl border border-[#f3e7e9] font-bold transition-all shadow-sm">
                            <MdOutlineFileDownload className="text-xl" />
                            <span>Export CSV</span>
                        </button>
                        <button className="flex items-center gap-2 bg-[#ee2b4b] text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all active:scale-95">
                            <MdOutlineAdd className="text-xl" />
                            <span>Add New Product</span>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-4 bg-white p-1 rounded-2xl border border-[#f3e7e9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-2">
                        <div className="flex-1 flex items-center w-full p-2 gap-2">
                            {/* Category Filter */}
                            <div className="relative">
                                <MdCategory className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg pointer-events-none" />
                                <select
                                    className="pl-10 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    <option value="All">All Categories</option>
                                    <option value="Running">Running</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Casual">Casual</option>
                                </select>
                            </div>

                            {/* Stock Filter */}
                            <div className="relative">
                                <MdInventory className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg pointer-events-none" />
                                <select
                                    className="pl-10 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={stockFilter}
                                    onChange={(e) => setStockFilter(e.target.value)}
                                >
                                    <option value="All">Stock Status</option>
                                    <option value="Low">Low</option>
                                    <option value="Med">Med</option>
                                    <option value="High">High</option>
                                    <option value="Out">Out</option>
                                </select>
                            </div>

                            {/* Price Filter */}
                            <div className="relative">
                                <MdAttachMoney className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg pointer-events-none" />
                                <select
                                    className="pl-10 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                >
                                    <option value="All">Price Range</option>
                                    <option value="0-50">$0 - $50</option>
                                    <option value="50-100">$50 - $100</option>
                                    <option value="100-200">$100 - $200</option>
                                    <option value="200+">$200+</option>
                                </select>
                            </div>
                        </div>

                        {/* Search & Export */}
                        <div className="w-full md:w-auto p-2 flex items-center gap-2">
                            <div className="relative flex-1">
                                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg" />
                                <input
                                    type="text"
                                    placeholder="Search by name or SKU..."
                                    className="w-full pl-9 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20 placeholder-text-secondary/70"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Product Table */}
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
                                    <th className="px-6 py-4 font-semibold">Product</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Price</th>
                                    <th className="px-6 py-4 font-semibold">Stock</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f3e7e9]">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]/20 bg-white"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-12 h-12 rounded-xl bg-gray-100 bg-cover bg-center border border-gray-200"
                                                    style={{ backgroundImage: `url(${product.image})` }}
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-text-main">{product.name}</span>
                                                    <span className="text-xs text-text-secondary">{product.sku}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-text-main font-medium bg-[#f8f6f6] px-2.5 py-1 rounded-lg">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-text-main">
                                            ${product.price}
                                            {product.oldPrice && (
                                                <span className="text-xs text-text-secondary line-through ml-1">
                                                    ${product.oldPrice}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full border ${product.stockStatus === "Low"
                                                    ? "bg-red-100 text-red-800 border-red-200"
                                                    : product.stockStatus === "Med"
                                                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                        : "bg-green-100 text-green-800 border-green-200"
                                                    }`}
                                            >
                                                {product.stock} left
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full border ${product.status === "Active"
                                                    ? "bg-green-100 text-green-800 border-green-200"
                                                    : product.status === "Draft"
                                                        ? "bg-gray-100 text-gray-800 border-gray-200"
                                                        : "bg-red-100 text-red-800 border-red-200"
                                                    }`}
                                            >
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-[#ee2b4b] hover:bg-[#ee2b4b]/5 transition-colors"
                                                    title="Edit Product"
                                                >
                                                    <MdOutlineEdit className="text-lg" />
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
                            Showing <span className="font-bold text-text-main">1-2</span> of{" "}
                            <span className="font-bold text-text-main">{products.length}</span> products
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main disabled:opacity-50">
                                <LuChevronLeft className="text-lg" />
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg bg-[#ee2b4b] text-white font-bold text-sm">
                                1
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main text-sm font-medium">
                                2
                            </button>
                            <span className="text-text-secondary">...</span>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main text-sm font-medium">
                                12
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main">
                                <LuChevronRight className="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProductManagement;
