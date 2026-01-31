"use client";

import { useState, useEffect } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { FaStar, FaUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
    MdFavoriteBorder,
    MdOutlineAssignmentReturn,
    MdOutlineLocalShipping,
} from "react-icons/md";
import {
    Product,
    Review as ProductReview,
} from "@/interfaces/productInterface";

interface ProductDetailProps {
    product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const [productImages, setProductImages] = useState<string[]>([
        "https://via.placeholder.com/600x400"
    ]);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [displayedReviews, setDisplayedReviews] = useState(3);
    const [quantity, setQuantity] = useState(1);

    // Process product images
    useEffect(() => {
        if (product?.images?.length) {
            const processedImages = product.images.map(
                (img) =>
                    `${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${img}`
            );
            setProductImages(processedImages);
            setSelectedImage(processedImages[0]);
        } else {
            const placeholder = ["https://via.placeholder.com/600x400"];
            setProductImages(placeholder);
            setSelectedImage(placeholder[0]);
        }
    }, [product]);

    // Reviews mapping
    const customerReviews = (product.reviews || []).map(
        (review: ProductReview, index: number) => ({
            id: index + 1,
            name: review.user || "Anonymous",
            rating: review.rating || 0,
            date: new Date(review.createdAt || "").toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }
            ),
            comment: review.comment || "",
            verified: true,
        })
    );

    const sizes = (product.sizes || []).map((size) => ({
        size: size.size,
        available: size.stock > 0,
    }));

    const averageRating =
        product.reviews && product.reviews.length > 0
            ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
            product.reviews.length
            : product.rating || 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: product.reviews
            ? product.reviews.filter((r) => r.rating === star).length
            : 0,
        percentage:
            product.reviews && product.reviews.length > 0
                ? (product.reviews.filter((r) => r.rating === star).length /
                    product.reviews.length) *
                100
                : 0,
    }));

    const visibleReviews = showAllReviews
        ? customerReviews
        : customerReviews.slice(0, displayedReviews);

    const handleLoadMore = () => {
        if (!showAllReviews) {
            setDisplayedReviews((prev) =>
                Math.min(prev + 3, customerReviews.length)
            );
        } else {
            setDisplayedReviews(3);
        }
        setShowAllReviews(!showAllReviews);
    };

    const handleAddToCart = () => {
        if (!selectedSize) return alert("Please select a size");

        alert(`${product.name} (Size: ${selectedSize}) added to cart!`);
    };

    const handleQuantityChange = (change: number) => {
        const newQty = quantity + change;
        if (newQty >= 1 && newQty <= 10) setQuantity(newQty);
    };

    const getBadgeType = () => {
        if (!product.reviews?.length) return "New Arrival";
        if (averageRating >= 4.5) return "Top Rated";
        return "Popular";
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Main Image */}
                <div className="relative w-full aspect-[4/3] bg-[#edf0f5ff] rounded-2xl overflow-hidden shadow-soft group">
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                        <span className="bg-[#ee2b4b] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {getBadgeType()}
                        </span>

                        {!product.isActive && (
                            <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${selectedImage})` }}
                    />
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-4">
                    {productImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(img)}
                            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img
                                ? "border-[#ee2b4b] ring-2 ring-[#ee2b4b]/20"
                                : "border-transparent hover:border-slate-300"
                                }`}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        </button>
                    ))}
                </div>

                {/* CUSTOMER REVIEWS SECTION */}
                <div className="mt-12 bg-white rounded-2xl shadow-soft p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Customer Reviews
                            </h2>
                            <p className="text-slate-600 mt-1">
                                Based on {product.reviews?.length || 0} reviews
                            </p>
                        </div>
                        <button className="bg-[#ee2b4b] hover:bg-[#d62545] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 w-full sm:w-auto">
                            Write a Review
                        </button>
                    </div>

                    {/* Rating Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex flex-col items-center justify-center p-6 bg-[#f8f9fa] rounded-xl">
                            <div className="text-5xl font-bold text-slate-900 mb-2">
                                {averageRating.toFixed(1)}
                            </div>
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
                            <div className="text-sm text-slate-600">
                                {product.reviews?.length || 0} reviews
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            {ratingDistribution.map(
                                ({ star, count, percentage }) => (
                                    <div
                                        key={star}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex items-center gap-2 w-16">
                                            <span className="text-sm font-medium text-slate-700">
                                                {star}
                                            </span>
                                            <FaStar className="w-4 h-4 text-yellow-400 fill-current" />
                                        </div>
                                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="text-sm text-slate-600 w-10 text-right">
                                            {count}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Reviews Count */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 p-4 bg-[#f8f9fa] rounded-lg">
                        <div className="text-slate-700">
                            Showing{" "}
                            <span className="font-bold">
                                {visibleReviews.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-bold">
                                {customerReviews.length}
                            </span>{" "}
                            reviews
                        </div>
                        <div className="mt-2 sm:mt-0">
                            <select className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b]">
                                <option value="newest">Newest First</option>
                                <option value="highest">
                                    Highest Rated
                                </option>
                                <option value="lowest">Lowest Rated</option>
                                <option value="verified">
                                    Verified Purchases
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* Review List */}
                    <div className="space-y-6">
                        {customerReviews.length > 0 ? (
                            visibleReviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="border-b border-slate-200 pb-6 last:border-0 last:pb-0"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#edf0f5ff] flex items-center justify-center">
                                                <FaUserCircle className="w-6 h-6 text-slate-400" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold text-slate-900">
                                                        {review.name}
                                                    </h4>
                                                    {review.verified && (
                                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                            Verified Purchase
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <div className="flex items-center gap-1">
                                                        {Array.from(
                                                            { length: 5 },
                                                            (_, i) => (
                                                                <FaStar
                                                                    key={i}
                                                                    className={`w-4 h-4 ${i <
                                                                        review.rating
                                                                        ? "text-yellow-400 fill-current"
                                                                        : "text-slate-300"
                                                                        }`}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-slate-500">
                                                        {review.date}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-5xl mb-4">📝</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    No Reviews Yet
                                </h3>
                                <p className="text-slate-600">
                                    Be the first to review this product!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Load More */}
                    {customerReviews.length > 3 && (
                        <div className="mt-8 text-center">
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
                                            (
                                            {customerReviews.length -
                                                displayedReviews}{" "}
                                            more)
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {showAllReviews &&
                        displayedReviews >= customerReviews.length &&
                        customerReviews.length > 0 && (
                            <div className="mt-6 text-center p-4 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-green-700 font-medium">
                                    ✓ You&apos;ve viewed all{" "}
                                    {customerReviews.length} reviews
                                </p>
                            </div>
                        )}
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-5 flex flex-col h-full">
                <div className="sticky top-24">
                    <div className="mb-4">
                        <h2 className="text-[#ee2b4b] text-sm font-bold uppercase tracking-wide mb-2">
                            {product.gender}
                        </h2>

                        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                            {product.name}
                        </h1>

                        {product.title && (
                            <h3 className="text-lg text-slate-600 mb-2">
                                {product.title}
                            </h3>
                        )}

                        <div className="flex items-center gap-4 mt-4">
                            <span className="text-3xl font-bold text-slate-900">
                                Rs {product.price.toFixed(2)}
                            </span>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(averageRating)
                                            ? "text-yellow-400 fill-current"
                                            : "text-slate-300"
                                            }`}
                                    />
                                ))}
                                <span className="text-sm text-slate-500 ml-1">
                                    ({product.reviews?.length || 0} reviews)
                                </span>
                            </div>
                        </div>

                        {product.material && (
                            <div className="mt-2 text-sm text-slate-600">
                                Material: {product.material}
                            </div>
                        )}
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-8">
                        {product.description || "No description available."}
                    </p>

                    {/* Size + Quantity */}
                    <div className="space-y-6 border-t border-b border-gray-100 py-6 mb-8">
                        {/* Size */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-slate-900">
                                    Select Size (US)
                                </span>
                                <span className="text-xs text-slate-500">
                                    {selectedSize
                                        ? sizes.find(
                                            (s) => s.size === selectedSize
                                        )?.available
                                            ? "In Stock"
                                            : "Out of Stock"
                                        : "Select a size"}
                                </span>
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size.size}
                                        disabled={
                                            !size.available || !product.isActive
                                        }
                                        onClick={() =>
                                            setSelectedSize(size.size)
                                        }
                                        className={`h-12 rounded-lg border transition-all font-medium ${selectedSize === size.size
                                            ? "bg-[#ee2b4b] text-white font-bold shadow-lg shadow-[#ee2b4b]/30 border-[#ee2b4b]"
                                            : "border-gray-200 hover:border-[#ee2b4b] hover:text-[#ee2b4b] text-slate-700"
                                            } ${!size.available || !product.isActive
                                                ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                                                : ""
                                            }`}
                                    >
                                        {size.size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-slate-900">
                                    Quantity
                                </span>
                                <span className="text-xs text-slate-500">
                                    Max 10 per order
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                    className="w-12 h-12 rounded-lg border border-gray-200 hover:border-[#ee2b4b] hover:text-[#ee2b4b] flex items-center justify-center text-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    -
                                </button>

                                <div className="w-16 h-12 rounded-lg border border-gray-200 flex items-center justify-center text-lg font-bold">
                                    {quantity}
                                </div>

                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= 10}
                                    className="w-12 h-12 rounded-lg border border-gray-200 hover:border-[#ee2b4b] hover:text-[#ee2b4b] flex items-center justify-center text-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.isActive || !selectedSize}
                            className={`flex-1 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${!product.isActive || !selectedSize
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#ee2b4b] hover:bg-[#d62545] shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/40"
                                }`}
                        >
                            <BiShoppingBag className="w-6 h-6" />
                            {!product.isActive
                                ? "Out of Stock"
                                : !selectedSize
                                    ? "Select Size"
                                    : "Add to Cart"}
                        </button>

                        <button className="flex-none w-16 bg-[#edf0f5ff] border border-gray-200 hover:border-gray-300 rounded-xl flex items-center justify-center text-slate-700 transition-colors hover:text-red-500">
                            <MdFavoriteBorder className="w-6 h-6" />
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
                                    Enter your Postal code for Delivery
                                    Availability
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

                        {product.createdAt && (
                            <div className="text-xs text-slate-500 mt-4">
                                Product added on: {" "}
                                {new Date(
                                    product.createdAt
                                ).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
