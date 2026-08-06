"use client";

import { useState, useEffect } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { FaStar, FaTimes, FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";
import { MdFavoriteBorder, MdOutlineAssignmentReturn, MdOutlineLocalShipping } from "react-icons/md";
import { Product, Review as ProductReview } from "@/interfaces/productInterface";
import { useAuth } from "@/context/AuthContext";
import { useProduct } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { showToast } from "@/utils/toast";

interface ProductDetailProps {
    product: Product;
}

interface ReviewFormData {
    rating: number;
    comment: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const { user, isAuthenticated } = useAuth();
    const { addReview } = useProduct();
    const { cart, addToCart, isLoading: cartLoading } = useCart();

    const [productImages, setProductImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [displayedReviews, setDisplayedReviews] = useState(3);
    const [quantity, setQuantity] = useState(1);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewForm, setReviewForm] = useState<ReviewFormData>({ rating: 0, comment: "" });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userReview, setUserReview] = useState<ProductReview | null>(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    // Process product images
    useEffect(() => {
        if (product?.images?.length) {
            const processedImages = product.images.map(
                (img) => `${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${img}`
            );
            setSelectedImage(processedImages[0]);
            setProductImages(processedImages);
        } else {
            const placeholder = ["https://via.placeholder.com/600x400"];
            setProductImages(placeholder);
            setSelectedImage(placeholder[0]);
        }
    }, [product]);

    // Check if user has already reviewed this product
    useEffect(() => {
        if (user && product.reviews) {
            const existingReview = product.reviews.find((review) => {
                const revUser = review.user as any;
                return revUser === user.id || revUser?._id === user.id || (review as any).userId === user.id;
            });
            setUserReview(existingReview || null);
        } else {
            setUserReview(null);
        }
    }, [user, product.reviews]);

    // Check if product is already in cart
    useEffect(() => {
        if (cart && cart.items) {
            const cartItem = cart.items.find(item => item.product._id === product._id);
            if (cartItem) {
                const inCartSize = cartItem.variants[0]?.size;
                if (inCartSize) {
                    setSelectedSize(inCartSize);
                    const cartQuantity = cartItem.variants[0]?.quantity || 1;
                    setQuantity(cartQuantity);
                }
            }
        }
    }, [cart, product._id]);

    // Reviews mapping with user info
    const customerReviews = (product.reviews || []).map((review: ProductReview, index: number) => ({
        id: index + 1,
        userId: review.user,
        rating: review.rating || 0,
        date: new Date(review.createdAt || "").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        comment: review.comment || "",
    }));

    // Sizes mapping with stock check
    const sizes = (product.sizes || []).map((size) => ({
        size: size.size,
        available: size.stock > 0,
        stock: size.stock
    }));

    // Average rating
    const averageRating =
        product.reviews && product.reviews.length > 0
            ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
            : product.rating || 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: product.reviews ? product.reviews.filter((r) => r.rating === star).length : 0,
        percentage:
            product.reviews && product.reviews.length > 0
                ? (product.reviews.filter((r) => r.rating === star).length / product.reviews.length) * 100
                : 0,
    }));

    const visibleReviews = showAllReviews ? customerReviews : customerReviews.slice(0, displayedReviews);

    const handleLoadMore = () => {
        if (!showAllReviews) {
            setDisplayedReviews((prev) => Math.min(prev + 3, customerReviews.length));
        } else {
            setDisplayedReviews(3);
        }
        setShowAllReviews(!showAllReviews);
    };

    // Modified handleAddToCart function
    const handleAddToCart = async () => {
        if (!selectedSize) {
            showToast("error", "Please select a size");
            return;
        }

        // Check if user is authenticated
        if (!isAuthenticated) {
            showToast("error", "Please login to add items to cart");
            return;
        }

        // Check if selected size is available
        const selectedSizeData = sizes.find(s => s.size === selectedSize);
        if (!selectedSizeData?.available) {
            showToast("error", "Selected size is out of stock");
            return;
        }

        // Check stock availability
        if (quantity > selectedSizeData.stock) {
            showToast("error", `Only ${selectedSizeData.stock} items available in this size`);
            return;
        }

        try {
            setIsAddingToCart(true);

            // Prepare data for AddToCartRequest
            const cartData = {
                productId: product._id || product.id || "",
                size: selectedSize,
                quantity: quantity
            };

            // Call the cart API via context
            await addToCart(cartData);

            showToast("success", `${product.name} (Size: ${selectedSize}) added to cart!`);

        } catch (error) {
            console.error("Add to cart error:", error);
            showToast("error", "Failed to add item to cart. Please try again.");
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleQuantityChange = (change: number) => {
        const newQty = quantity + change;

        // Check stock if size is selected
        if (selectedSize) {
            const selectedSizeData = sizes.find(s => s.size === selectedSize);
            if (selectedSizeData && newQty > selectedSizeData.stock) {
                showToast("error", `Only ${selectedSizeData.stock} items available`);
                return;
            }
        }

        if (newQty >= 1) setQuantity(newQty);
    };

    // Handle size selection with stock validation
    const handleSizeSelect = (size: string) => {
        const sizeData = sizes.find(s => s.size === size);

        if (!sizeData?.available) {
            showToast("error", "This size is out of stock");
            return;
        }

        setSelectedSize(size);

        // Reset quantity to 1 when size changes
        setQuantity(1);
    };

    const getBadgeType = () => {
        if (!product.reviews?.length) return "New Arrival";
        if (averageRating >= 4.5) return "Top Rated";
        return "Popular";
    };

    const handleReviewModalOpen = () => {
        if (!isAuthenticated) {
            showToast("error", "Please login to write a review");
            return;
        }
        if (userReview) {
            showToast("error", "You have already reviewed this product");
            return;
        }
        setShowReviewModal(true);
    };

    const handleReviewModalClose = () => {
        setShowReviewModal(false);
        setReviewForm({ rating: 0, comment: "" });
        setHoveredRating(0);
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            showToast("error", "Please login to submit a review");
            return;
        }
        if (userReview) {
            showToast("error", "You have already reviewed this product");
            return;
        }

        setIsSubmitting(true);

        if (reviewForm.rating === 0) {
            showToast("error", "Please select a rating");
            setIsSubmitting(false);
            return;
        }

        if (!reviewForm.comment.trim() || reviewForm.comment.trim().length < 10) {
            showToast("error", "Please write a review with at least 10 characters");
            setIsSubmitting(false);
            return;
        }

        try {
            await addReview(product._id || product.id || "", {
                rating: reviewForm.rating,
                comment: reviewForm.comment,
            });
            showToast("success", "Thank you for your review!");
            handleReviewModalClose();
        } catch (error) {
            console.error("Review submission error:", error);
            showToast("error", "Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReviewForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRatingClick = (rating: number) => {
        setReviewForm((prev) => ({ ...prev, rating }));
    };

    const getReviewButtonText = () => {
        if (!isAuthenticated) return "Login to Review";
        if (userReview) return "You've Already Reviewed";
        return "Write a Review";
    };

    const isReviewButtonDisabled = () => !isAuthenticated || userReview !== null;

    // Check if product is in cart
    const isProductInCart = cart?.items?.some(item => item.product._id === product._id);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* LEFT COLUMN - Media & Reviews */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    {/* Main Image Viewport */}
                    <div className="relative w-full aspect-[4/3] bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:border-[#ee2b4b]/30 group">
                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                            <span className="bg-[#ee2b4b] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-md shadow-[#ee2b4b]/20">
                                {getBadgeType()}
                            </span>

                            {!product.isActive && (
                                <span className="bg-slate-800 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-slate-700">
                                    Out of Stock
                                </span>
                            )}

                            {isProductInCart && (
                                <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                    In Your Cart
                                </span>
                            )}
                        </div>

                        <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                            style={{ backgroundImage: `url(${selectedImage})` }}
                        />
                    </div>

                    {/* Thumbnails Showcase */}
                    <div className="grid grid-cols-4 gap-3">
                        {productImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === img
                                    ? "border-[#ee2b4b] ring-2 ring-[#ee2b4b]/20 scale-102"
                                    : "border-slate-200/80 bg-slate-50 opacity-70 hover:opacity-100"
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
                    <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 lg:p-8 transition-all duration-300 hover:border-[#ee2b4b]/30 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-900">
                                    Collector Reviews
                                </h2>
                                <p className="text-xs text-slate-500 mt-1">
                                    Based on {product.reviews?.length || 0} verified customer ratings
                                </p>
                            </div>
                            <button
                                onClick={handleReviewModalOpen}
                                disabled={isReviewButtonDisabled()}
                                className={`font-extrabold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all duration-300 w-full sm:w-auto ${isReviewButtonDisabled()
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                    : "bg-[#ee2b4b] hover:bg-[#ff3b5c] text-white shadow-md shadow-[#ee2b4b]/20"
                                    }`}
                            >
                                {getReviewButtonText()}
                            </button>
                        </div>

                        {/* User's existing review */}
                        {userReview && (
                            <div className="mb-8 p-4 bg-[#ee2b4b]/10 rounded-2xl border border-[#ee2b4b]/20">
                                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#ee2b4b] mb-2">Your Verified Review</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < userReview.rating
                                                    ? "text-amber-400 fill-current"
                                                    : "text-slate-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        {userReview.createdAt ?
                                            new Date(userReview.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            }) :
                                            "Recently"
                                        }
                                    </span>
                                </div>
                                <p className="text-xs text-slate-700 font-medium">{userReview.comment}</p>
                            </div>
                        )}

                        {/* Rating Summary Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200/80 transition-all duration-300 hover:border-[#ee2b4b]/30 shadow-xs">
                                <div className="text-5xl font-black text-slate-900 mb-2">
                                    {averageRating.toFixed(1)}
                                </div>
                                <div className="flex items-center gap-1 mb-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(averageRating)
                                                ? "text-amber-400 fill-current"
                                                : "text-slate-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="text-xs text-slate-500 font-semibold">
                                    {product.reviews?.length || 0} reviews
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-2.5">
                                {ratingDistribution.map(
                                    ({ star, count, percentage }) => (
                                        <div
                                            key={star}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex items-center gap-1.5 w-14">
                                                <span className="text-xs font-bold text-slate-700">
                                                    {star}
                                                </span>
                                                <FaStar className="w-3 h-3 text-amber-400 fill-current" />
                                            </div>
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#ee2b4b] rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="text-xs text-slate-500 w-8 text-right font-semibold">
                                                {count}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Review List */}
                        <div className="space-y-4">
                            {customerReviews.length > 0 ? (
                                visibleReviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="border border-slate-200/80 bg-white p-5 rounded-2xl transition-all duration-300 hover:border-[#ee2b4b]/30 shadow-xs"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-[#ee2b4b]/10 flex items-center justify-center text-[#ee2b4b]">
                                                    <FaUserCircle className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-900">
                                                        Collector #{review.id}
                                                    </h4>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <div className="flex items-center gap-0.5">
                                                            {Array.from(
                                                                { length: 5 },
                                                                (_, i) => (
                                                                    <FaStar
                                                                        key={i}
                                                                        className={`w-3 h-3 ${i < review.rating
                                                                            ? "text-amber-400 fill-current"
                                                                            : "text-slate-300"
                                                                            }`}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                        <span className="text-[10px] text-slate-500 font-medium">
                                                            {review.date}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <h3 className="text-base font-bold text-slate-900 mb-1">
                                        No Reviews Yet
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium">
                                        Be the first sneakerhead to write a review for this drop!
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Load More */}
                        {customerReviews.length > 3 && (
                            <div className="mt-6 text-center">
                                <button
                                    onClick={handleLoadMore}
                                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-[#ee2b4b] text-slate-700 hover:text-white text-xs font-extrabold uppercase tracking-wider py-3 px-6 rounded-xl transition-all duration-300 border border-slate-200/80"
                                >
                                    {showAllReviews ? (
                                        <>
                                            <FaChevronUp className="w-3.5 h-3.5" />
                                            Collapse Reviews
                                        </>
                                    ) : (
                                        <>
                                            <FaChevronDown className="w-3.5 h-3.5" />
                                            Load All ({customerReviews.length - displayedReviews} More)
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN - Purchase Specifications */}
                <div className="lg:col-span-5 flex flex-col h-full">
                    <div className="sticky top-24 rounded-2xl border border-slate-200/80 bg-white p-6 lg:p-8 transition-all duration-300 hover:border-[#ee2b4b]/30 shadow-sm">
                        <div className="mb-6">
                            <span className="text-[#ee2b4b] text-xs font-extrabold uppercase tracking-widest mb-1.5 block">
                                {product.gender} STREETWEAR
                            </span>

                            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-3 mt-3">
                                <span className="text-3xl font-black text-[#ee2b4b] tracking-tight">
                                    Rs {product.price?.toLocaleString() || product.price}
                                </span>

                                <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                                    <FaStar className="w-3.5 h-3.5 text-amber-500 fill-current" />
                                    <span className="text-xs font-extrabold text-amber-600">
                                        {averageRating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                            {product.description || "High-end ergonomic urban sneakers crafted for durability, maximum traction, and supreme aesthetics."}
                        </p>

                        {/* Size + Quantity Picker */}
                        <div className="space-y-6 border-t border-b border-slate-200/80 py-6 mb-6">
                            {/* Size Selection */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                                        Select Size (US)
                                    </span>
                                    <span className="text-[11px] font-bold text-[#ee2b4b]">
                                        {selectedSize
                                            ? sizes.find(
                                                (s) => s.size === selectedSize
                                            )?.available
                                                ? `In Stock (${sizes.find(s => s.size === selectedSize)?.stock})`
                                                : "Out of Stock"
                                            : "Choose size"}
                                    </span>
                                </div>

                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size.size}
                                            disabled={
                                                !size.available || !product.isActive
                                            }
                                            onClick={() => handleSizeSelect(size.size)}
                                            className={`h-11 rounded-2xl border text-xs transition-all duration-200 font-bold ${selectedSize === size.size
                                                ? "bg-[#ee2b4b] text-white shadow-md shadow-[#ee2b4b]/30 border-[#ee2b4b]"
                                                : "border-slate-200/80 bg-slate-50 hover:border-[#ee2b4b]/30 hover:bg-[#ee2b4b]/10 hover:text-[#ee2b4b] text-slate-700"
                                                } ${!size.available || !product.isActive
                                                    ? "bg-slate-100 text-slate-400 border-slate-200/80 cursor-not-allowed line-through"
                                                    : ""
                                                }`}
                                        >
                                            {size.size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Stepper */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                                        Quantity
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className="w-11 h-11 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-[#ee2b4b]/10 hover:border-[#ee2b4b]/30 flex items-center justify-center text-lg font-bold text-slate-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        -
                                    </button>

                                    <div className="w-14 h-11 rounded-2xl border border-slate-200/80 bg-white flex items-center justify-center text-sm font-extrabold text-slate-900">
                                        {quantity}
                                    </div>

                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={selectedSize ? quantity >= (sizes.find(s => s.size === selectedSize)?.stock || 0) : false}
                                        className="w-11 h-11 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-[#ee2b4b]/10 hover:border-[#ee2b4b]/30 flex items-center justify-center text-lg font-bold text-slate-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Actions */}
                        <div className="flex gap-3 mb-6">
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.isActive || !selectedSize || cartLoading || isAddingToCart}
                                className={`flex-1 text-white text-xs font-extrabold uppercase tracking-wider py-4 px-6 rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center gap-2.5 ${!product.isActive || !selectedSize || cartLoading || isAddingToCart
                                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    : "bg-[#ee2b4b] hover:bg-[#ff3b5c] shadow-[#ee2b4b]/20"
                                    }`}
                            >
                                {cartLoading || isAddingToCart ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <BiShoppingBag className="w-5 h-5" />
                                        {!product.isActive
                                            ? "Out of Stock"
                                            : !selectedSize
                                                ? "Select Size"
                                                : isProductInCart
                                                    ? "Update Cart"
                                                    : "Add to Drop Bag"}
                                    </>
                                )}
                            </button>

                            <button className="flex-none w-14 bg-white border border-slate-200/80 hover:border-[#ee2b4b]/30 hover:bg-[#ee2b4b]/10 rounded-2xl flex items-center justify-center text-slate-600 hover:text-[#ee2b4b] transition-all duration-300">
                                <MdFavoriteBorder className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Express Delivery Info */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 transition-all duration-300 hover:border-[#ee2b4b]/30">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ee2b4b]/10 text-[#ee2b4b] text-xl">
                                    <MdOutlineLocalShipping />
                                </div>
                                <div>
                                    <p className="font-extrabold text-xs text-slate-900">
                                        Free Express Global Delivery
                                    </p>
                                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                        Ships within 24 hours with live tracking
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 transition-all duration-300 hover:border-[#ee2b4b]/30">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ee2b4b]/10 text-[#ee2b4b] text-xl">
                                    <MdOutlineAssignmentReturn />
                                </div>
                                <div>
                                    <p className="font-extrabold text-xs text-slate-900">
                                        100% Authenticity Guarantee
                                    </p>
                                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                        30 days hassle-free return policy
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LIGHT REVIEW MODAL */}
            {showReviewModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-slate-200/80 p-6 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-900">
                                    Write Collector Review
                                </h2>
                                <p className="text-slate-500 text-xs mt-0.5 font-medium">
                                    Posting as: {user?.firstName} {user?.lastName}
                                </p>
                            </div>
                            <button
                                onClick={handleReviewModalClose}
                                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                <FaTimes className="w-4 h-4 text-slate-500" />
                            </button>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleReviewSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                                        Overall Rating <span className="text-[#ee2b4b]">*</span>
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => handleRatingClick(star)}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                className="p-1"
                                            >
                                                <FaStar
                                                    className={`w-8 h-8 transition-all duration-200 ${star <= (hoveredRating || reviewForm.rating)
                                                        ? "text-amber-400 fill-current"
                                                        : "text-slate-300"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                                        Your Review <span className="text-[#ee2b4b]">*</span>
                                    </label>
                                    <textarea
                                        name="comment"
                                        value={reviewForm.comment}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Share your experience with fit, comfort, and materials..."
                                        className="w-full p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b] resize-none"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 pt-3 border-t border-slate-200/80">
                                    <button
                                        type="button"
                                        onClick={handleReviewModalClose}
                                        className="flex-1 py-3 px-5 border border-slate-200/80 text-slate-700 font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-[#ee2b4b] hover:bg-[#ff3b5c] text-white font-extrabold text-xs uppercase tracking-wider py-3 px-5 rounded-xl transition-all duration-300 disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Review"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;