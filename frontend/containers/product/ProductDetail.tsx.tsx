"use client";

import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { MdFavoriteBorder, MdOutlineAssignmentReturn, MdOutlineLocalShipping } from "react-icons/md";
import { FaUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Thumbnail {
    imageUrl: string;
    alt: string;
}

interface Review {
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
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
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [displayedReviews, setDisplayedReviews] = useState(3);

    // Sample reviews data
    const customerReviews: Review[] = [
        {
            id: 1,
            name: "Alex Johnson",
            rating: 5,
            date: "March 15, 2024",
            comment: "Best running shoes I've ever owned! Perfect fit and amazing cushioning. Highly recommend for long-distance running.",
            verified: true,
        },
        {
            id: 2,
            name: "Sarah Miller",
            rating: 4,
            date: "February 28, 2024",
            comment: "Great shoes overall. Comfortable and lightweight. The only downside is they run a bit narrow. Would suggest going half size up.",
            verified: true,
        },
        {
            id: 3,
            name: "Michael Chen",
            rating: 5,
            date: "April 2, 2024",
            comment: "Excellent performance! Used them for my marathon training and they held up perfectly. The Zoom Air cushioning is fantastic.",
            verified: true,
        },
        {
            id: 4,
            name: "Emily Rodriguez",
            rating: 3,
            date: "January 20, 2024",
            comment: "Good shoes but the color faded a bit after a few washes. Performance-wise they're decent for the price.",
            verified: false,
        },
        {
            id: 5,
            name: "David Wilson",
            rating: 5,
            date: "March 30, 2024",
            comment: "Perfect combination of comfort and style. Wear them both for running and casual outings. Very versatile!",
            verified: true,
        },
        {
            id: 6,
            name: "Jessica Taylor",
            rating: 4,
            date: "April 10, 2024",
            comment: "Great value for money. The cushioning is excellent and they're very durable. Already logged 200 miles in them!",
            verified: true,
        },
        {
            id: 7,
            name: "Robert Kim",
            rating: 5,
            date: "March 22, 2024",
            comment: "These shoes transformed my running experience. The energy return is incredible. Highly recommended for serious runners.",
            verified: true,
        },
        {
            id: 8,
            name: "Amanda Lewis",
            rating: 2,
            date: "February 15, 2024",
            comment: "Disappointed with the durability. The sole started separating after just 2 months of light use.",
            verified: true,
        },
        {
            id: 9,
            name: "Kevin Brown",
            rating: 5,
            date: "April 5, 2024",
            comment: "Perfect for my daily 5k runs. Lightweight yet supportive. The color options are fantastic too!",
            verified: true,
        },
        {
            id: 10,
            name: "Lisa Wang",
            rating: 4,
            date: "March 18, 2024",
            comment: "Very comfortable right out of the box. No break-in period needed. The fit is true to size.",
            verified: true,
        },
    ];

    const averageRating = customerReviews.reduce((acc, review) => acc + review.rating, 0) / customerReviews.length;
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: customerReviews.filter(r => r.rating === star).length,
        percentage: (customerReviews.filter(r => r.rating === star).length / customerReviews.length) * 100
    }));

    const visibleReviews = showAllReviews
        ? customerReviews
        : customerReviews.slice(0, displayedReviews);

    const handleLoadMore = () => {
        if (!showAllReviews) {
            setDisplayedReviews(prev => Math.min(prev + 3, customerReviews.length));
        } else {
            setDisplayedReviews(3);
        }
        setShowAllReviews(!showAllReviews);
    };

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

                {/* Customer Reviews Section */}
                <div className="mt-12 bg-white rounded-2xl shadow-soft p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>
                            <p className="text-slate-600 mt-1">
                                Based on {customerReviews.length} reviews
                            </p>
                        </div>
                        <button className="bg-[#ee2b4b] hover:bg-[#d62545] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 w-full sm:w-auto">
                            Write a Review
                        </button>
                    </div>

                    {/* Overall Rating Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex flex-col items-center justify-center p-6 bg-[#f8f9fa] rounded-xl">
                            <div className="text-5xl font-bold text-slate-900 mb-2">{averageRating.toFixed(1)}</div>
                            <div className="flex items-center gap-1 mb-3">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`w-6 h-6 ${i < Math.floor(averageRating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-slate-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="text-sm text-slate-600">{customerReviews.length} reviews</div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            {ratingDistribution.map(({ star, count, percentage }) => (
                                <div key={star} className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 w-16">
                                        <span className="text-sm font-medium text-slate-700">{star}</span>
                                        <FaStar className="w-4 h-4 text-yellow-400 fill-current" />
                                    </div>
                                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-slate-600 w-10 text-right">
                                        {count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reviews Count and Filter */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 p-4 bg-[#f8f9fa] rounded-lg">
                        <div className="text-slate-700">
                            Showing <span className="font-bold">{visibleReviews.length}</span> of{" "}
                            <span className="font-bold">{customerReviews.length}</span> reviews
                        </div>
                        <div className="mt-2 sm:mt-0">
                            <select className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b]">
                                <option value="newest">Newest First</option>
                                <option value="highest">Highest Rated</option>
                                <option value="lowest">Lowest Rated</option>
                                <option value="verified">Verified Purchases</option>
                            </select>
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {visibleReviews.map((review) => (
                            <div key={review.id} className="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#edf0f5ff] flex items-center justify-center">
                                            <FaUserCircle className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-slate-900">{review.name}</h4>
                                                {review.verified && (
                                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                                        ✓ Verified
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex items-center gap-1">
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-slate-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-slate-500">{review.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-700 leading-relaxed">{review.comment}</p>
                                <div className="flex items-center gap-4 mt-4">
                                    <button className="text-sm text-slate-600 hover:text-[#ee2b4b] transition-colors flex items-center gap-1">
                                        <span>Helpful</span>
                                        <span className="text-xs">(12)</span>
                                    </button>
                                    <button className="text-sm text-slate-600 hover:text-[#ee2b4b] transition-colors">
                                        Reply
                                    </button>
                                    <button className="text-sm text-slate-600 hover:text-[#ee2b4b] transition-colors ml-auto">
                                        Report
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More / Show Less Button */}
                    <div className="mt-8 text-center">
                        {customerReviews.length > 3 && (
                            <button
                                onClick={handleLoadMore}
                                className="inline-flex items-center gap-2 bg-[#ee2b4b] hover:bg-[#d62545] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                {showAllReviews ? (
                                    <>
                                        <FaChevronUp className="w-4 h-4" />
                                        Show Less Reviews
                                    </>
                                ) : (
                                    <>
                                        <FaChevronDown className="w-4 h-4" />
                                        Load More Reviews
                                        <span className="ml-1 text-sm opacity-90">
                                            ({customerReviews.length - displayedReviews} more)
                                        </span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {/* No More Reviews Message */}
                    {showAllReviews && displayedReviews >= customerReviews.length && (
                        <div className="mt-6 text-center p-4 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-green-700 font-medium">
                                ✓ You&apos;ve viewed all {customerReviews.length} reviews
                            </p>
                        </div>
                    )}
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
                                Rs {price}
                            </span>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(rating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-slate-300"
                                            }`}
                                    />
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
                        <button className="flex-1 bg-[#ee2b4b] hover:bg-[#d62545] text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/40 transition-all duration-300 flex items-center justify-center gap-2">
                            <BiShoppingBag className="w-6 h-6" />
                            Add to Cart
                        </button>
                        <button className="flex-none w-16 bg-[#edf0f5ff] border border-gray-200 hover:border-gray-300 rounded-xl flex items-center justify-center text-slate-700 transition-colors">
                            <MdFavoriteBorder className="w-6 h-6 hover:text-red-500" />
                        </button>
                    </div>

                    {/* Extra Info */}
                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex bg-[#edf0f5ff] items-start gap-3 p-3 rounded-lg">
                            <MdOutlineLocalShipping className="w-6 h-6 text-[#ee2b4b]" />
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
                            <MdOutlineAssignmentReturn className="w-6 h-6 text-[#ee2b4b]" />
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