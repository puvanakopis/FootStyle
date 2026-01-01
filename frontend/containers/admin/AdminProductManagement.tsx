"use client";

import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDownload, MdEdit, MdDelete } from "react-icons/md";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdCategory, MdInventory, MdAttachMoney, MdAdd } from "react-icons/md";

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

export default function AdminProductManagement() {
    const [products, setProducts] = useState<Product[]>(sampleProducts);

    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                            Product Management
                        </h2>
                        <p className="text-gray-500">
                            Manage your store&apos;s shoe collection, stock levels, and pricing.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-[#ee2b4b] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-[#ee2b4b]/5 transition-all active:scale-95">
                        <MdAdd className="text-xl" />
                        <span>Add New Product</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        {/* Category Filter */}
                        <div className="relative">
                            <MdCategory className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-lg" />
                            <select className="pl-10 pr-8 py-2.5 bg-gray-50 border rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-[#ee2b4b]/5 cursor-pointer min-w-[160px]">
                                <option value="">All Categories</option>
                                <option value="running">Running</option>
                                <option value="casual">Casual</option>
                                <option value="formal">Formal</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>

                        {/* Stock Status Filter */}
                        <div className="relative">
                            <MdInventory className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-lg" />
                            <select className="pl-10 pr-8 py-2.5 bg-gray-50 border rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-[#ee2b4b]/5 cursor-pointer min-w-[160px]">
                                <option value="">Stock Status</option>
                                <option value="in-stock">In Stock</option>
                                <option value="low-stock">Low Stock</option>
                                <option value="out-of-stock">Out of Stock</option>
                            </select>
                        </div>

                        {/* Price Filter */}
                        <div className="relative">
                            <MdAttachMoney className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-lg" />
                            <select className="pl-10 pr-8 py-2.5 bg-gray-50 border rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-[#ee2b4b]/5 cursor-pointer min-w-[140px]">
                                <option value="">Price Range</option>
                                <option value="0-50">$0 - $50</option>
                                <option value="50-100">$50 - $100</option>
                                <option value="100-200">$100 - $200</option>
                                <option value="200+">$200+</option>
                            </select>
                        </div>
                    </div>

                    {/* Search & Export */}
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-64">
                            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                            <input
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/5 focus:outline-none placeholder-gray-400"
                                placeholder="Search by name, SKU..."
                                type="text"
                            />
                        </div>
                        <button
                            className="flex items-center justify-center p-2.5 bg-gray-50 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors"
                            title="Export Data"
                        >
                            <MdOutlineDownload className="text-lg" />
                        </button>
                    </div>
                </div>

                {/* Product Table */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold w-12">
                                        <input
                                            className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]/5"
                                            type="checkbox"
                                        />
                                    </th>
                                    <th className="px-6 py-4 font-semibold">Product Details</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Price</th>
                                    <th className="px-6 py-4 font-semibold">Stock</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <input
                                                className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]/5"
                                                type="checkbox"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-14 h-14 rounded-xl bg-gray-100 bg-cover bg-center border border-gray-200 shadow-sm"
                                                    style={{ backgroundImage: `url(${product.image})` }}
                                                />
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{product.name}</p>
                                                    <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-900 font-medium bg-gray-100 px-2.5 py-1 rounded-lg">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900">${product.price}</span>
                                                {product.oldPrice && (
                                                    <span className="text-xs text-gray-500 line-through">
                                                        ${product.oldPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-full max-w-[100px] flex flex-col gap-1">
                                                <div className="flex justify-between text-xs font-medium">
                                                    <span
                                                        className={`${product.stockStatus === "Low"
                                                                ? "text-red-600"
                                                                : product.stockStatus === "Med"
                                                                    ? "text-orange-600"
                                                                    : "text-green-600"
                                                            }`}
                                                    >
                                                        {product.stock} left
                                                    </span>
                                                    <span className="text-gray-500">{product.stockStatus}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${product.stockStatus === "Low"
                                                                ? "bg-red-500"
                                                                : product.stockStatus === "Med"
                                                                    ? "bg-orange-400"
                                                                    : "bg-green-500"
                                                            }`}
                                                        style={{ width: `${(product.stock / 100) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${product.status === "Active"
                                                        ? "bg-green-100 text-green-700 border-green-200"
                                                        : product.status === "Draft"
                                                            ? "bg-gray-100 text-gray-700 border-gray-200"
                                                            : "bg-red-100 text-red-700 border-red-200"
                                                    }`}
                                            >
                                                <span
                                                    className={`w-2 h-2 rounded-full ${product.status === "Active"
                                                            ? "bg-green-500"
                                                            : product.status === "Draft"
                                                                ? "bg-gray-500"
                                                                : "bg-red-500"
                                                        }`}
                                                ></span>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="p-1.5 text-gray-500 hover:text-[#ee2b4b] hover:bg-[#ee2b4b]/5 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <MdEdit className="text-[20px]" />
                                                </button>
                                                <button
                                                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <MdDelete className="text-[20px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-bold text-gray-900">1</span> to{" "}
                            <span className="font-bold text-gray-900">{products.length}</span> of{" "}
                            <span className="font-bold text-gray-900">1,432</span> results
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                <IoChevronBack className="text-xl" />
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#ee2b4b] text-white text-sm font-bold">
                                1
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-900 hover:bg-gray-100 text-sm font-medium">
                                2
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-900 hover:bg-gray-100 text-sm font-medium">
                                3
                            </button>
                            <span className="text-gray-500 px-1">...</span>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-900 hover:bg-gray-100 text-sm font-medium">
                                12
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                                <IoChevronForward className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}