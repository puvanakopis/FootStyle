"use client";

import React from "react";
import { MdOutlineExpandMore } from "react-icons/md";

const WishlistFilter = () => {
    return (
        <div className="flex justify-end mb-4">
            <div className="relative">
                <select
                    className="appearance-none bg-white border border-neutral-200 text-neutral-900 text-sm rounded-lg focus:ring-[#ee2b4b] focus:border-[#ee2b4b] block w-48 p-2.5 pr-8"
                >
                    <option value="newest" selected>
                        Sort by: Newest Added
                    </option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="oldest">Date: Oldest First</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
                    <span className="material-symbols-outlined text-[20px]"><MdOutlineExpandMore/></span>
                </div>
            </div>
        </div>
    );
};

export default WishlistFilter;