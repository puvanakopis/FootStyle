"use client";

import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { MdFavoriteBorder, MdOutlineAssignmentReturn, MdOutlineLocalShipping } from "react-icons/md";

interface Thumbnail {
    imageUrl: string;
    alt: string;
}

interface ProductDetailProps {
    id: number;
    mainImage: string;
    mainAlt: string;
    thumbnails: Thumbnail[];
    name: string;
    category: string;
    price: number;
    rating: number;
    reviews: number;
    description: string;
    colors: { name: string; colorClass: string }[];
    sizes: { size: string; available: boolean }[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({
    mainImage,
    mainAlt,
    thumbnails,
    name,
    category,
    price,
    rating,
    reviews,
    description,
    colors,
    sizes,
}) => {
    const [selectedImage, setSelectedImage] = useState(mainImage);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(colors[0]?.name || null);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Images */}
            <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Main Image */}
                <div className="relative w-full aspect-[4/3] bg-[#edf0f5ff] rounded-2xl overflow-hidden shadow-soft group">
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                        <span className="bg-[#ee2b4b] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            New Arrival
                        </span>
                    </div>
                    <div
                        className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${selectedImage})` }}
                        aria-label={mainAlt}
                    ></div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-4">
                    {thumbnails.map((thumb, idx) => (
                        <button
                            key={idx}
                            className={`aspect-square bg-[#edf0f5ff] rounded-xl overflow-hidden border-2 ${selectedImage === thumb.imageUrl
                                ? "border-[#ee2b4b] ring-2 ring-[#ee2b4b]/20"
                                : "border-transparent hover:border-slate-300"
                                } bg-[#edf0f5ff] transition-all`}
                            onClick={() => setSelectedImage(thumb.imageUrl)}
                        >
                            <div
                                className="w-full h-full bg-[#edf0f5ff] bg-center bg-cover"
                                style={{ backgroundImage: `url(${thumb.imageUrl})` }}
                                aria-label={thumb.alt}
                            ></div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Column: Product Details */}
            <div className="lg:col-span-5 flex flex-col h-full">
                <div className="sticky top-24">
                    {/* Heading */}
                    <div className="mb-4">
                        <h2 className="text-[#ee2b4b] text-sm font-bold uppercase tracking-wide mb-2">
                            {category}
                        </h2>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                            {name}
                        </h1>
                        <div className="flex items-center gap-4 mt-4">
                            <span className="text-3xl font-bold text-slate-900">
                                Rs{price}
                            </span>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span
                                        key={i}
                                        className={`material-symbols-outlined text-xl ${i < Math.floor(rating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-slate-300"
                                            }`}
                                    >
                                        <FaStar />
                                    </span>
                                ))}
                                <span className="text-sm text-slate-500 ml-1">
                                    ({reviews} reviews)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed mb-8">
                        {description}
                    </p>

                    {/* Selectors */}
                    <div className="space-y-6 border-t border-b border-gray-100 py-6 mb-8">
                        {/* Color Selector */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-slate-900">
                                    Color
                                </span>
                                <span className="text-sm text-slate-500">
                                    {selectedColor}
                                </span>
                            </div>
                            <div className="flex gap-3">
                                {colors.map((color, idx) => (
                                    <button
                                        key={idx}
                                        aria-label={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full shadow-sm ring-1 transition-all 
                ${color.colorClass} 
                ${selectedColor === color.name ? "ring-2 ring-[#ee2b4b]" : "ring-1 ring-gray-200"}`}
                                    ></button>
                                ))}
                            </div>

                        </div>

                        {/* Size Selector */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-slate-900">
                                    Select Size (US)
                                </span>
                            </div>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size.size}
                                        disabled={!size.available}
                                        onClick={() => setSelectedSize(size.size)}
                                        className={`h-12 rounded-lg border ${selectedSize === size.size
                                            ? "bg-[#ee2b4b] text-white font-bold shadow-lg shadow-[#ee2b4b]/30 border-[#ee2b4b]"
                                            : "border-gray-200 hover:border-[#ee2b4b] hover:text-[#ee2b4b] text-slate-700"
                                            } transition-all font-medium ${!size.available
                                                ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                                                : ""
                                            }`}
                                    >
                                        {size.size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-8">
                        <button className="flex-1 bg-[#ee2b4b] hover:bg-[#ee2b4b]-dark text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/40 transition-all duration-300 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined"><BiShoppingBag /></span>
                            Add to Cart
                        </button>
                        <button className="flex-none w-16 bg-[#edf0f5ff] border border-gray-200 hover:border-gray-300 rounded-xl flex items-center justify-center text-slate-700 transition-colors">
                            <span className="material-symbols-outlined">      <MdFavoriteBorder className="w-6 h-6 hover:text-red-500" /></span>
                        </button>
                    </div>

                    {/* Extra Info */}
                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex bg-[#edf0f5ff] items-start gap-3 p-3 rounded-lg ">
                            <span className="material-symbols-outlined text-[#ee2b4b]">
                                <MdOutlineLocalShipping className="w-6 h-6" />
                            </span>
                            <div>
                                <p className="font-bold text-slate-900">
                                    Free Delivery
                                </p>
                                <p className="text-slate-500">
                                    Enter your Postal code for Delivery Availability
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-[#edf0f5ff]">
                            <span className="material-symbols-outlined text-[#ee2b4b]">
                                <MdOutlineAssignmentReturn className="w-6 h-6" />
                            </span>
                            <div>
                                <p className="font-bold text-slate-900">
                                    Free Returns
                                </p>
                                <p className="text-slate-500">
                                    30 days return policy for all items
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;