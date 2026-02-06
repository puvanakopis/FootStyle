"use client";

import React from "react";
import { MdOutlineExpandMore } from "react-icons/md";

interface OrderFilterProps {
    currentFilter: string;
    onFilterChange: (value: string) => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({
    currentFilter,
    onFilterChange,
}) => {
    return (
        <div className="flex justify-end mb-4">
            <div className="relative">
                <select
                    value={currentFilter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="appearance-none bg-white border border-neutral-200 text-neutral-900 text-sm rounded-lg 
                        focus:ring-[#ee2b4b] focus:border-[#ee2b4b] block w-48 p-2.5 pr-8"
                >
                    <option value="all">All Orders</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
                    <MdOutlineExpandMore className="text-xl" />
                </div>
            </div>
        </div>
    );
};

export default OrderFilter;