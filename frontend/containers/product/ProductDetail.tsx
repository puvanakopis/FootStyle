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
            const existingReview = product.reviews.find((review) => review.userId === user.id);
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
                productId: product._id,
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
            await addReview(product._id, {
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

                            {/* Show if product is in cart */}
                            {isProductInCart && (
                                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    In Cart
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
                            <button
                                onClick={handleReviewModalOpen}
                                disabled={isReviewButtonDisabled()}
                                className={`font-semibold py-3 px-6 rounded-xl transition-all duration-300 w-full sm:w-auto ${isReviewButtonDisabled()
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-[#ee2b4b] hover:bg-[#d62545] text-white"
                                    }`}
                            >
                                {getReviewButtonText()}
                            </button>
                        </div>

                        {/* User's existing review */}
                        {userReview && (
                            <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                <h3 className="font-bold text-blue-900 mb-2">Your Review</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`w-4 h-4 ${i < userReview.rating
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-slate-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-blue-700">
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
                                <p className="text-blue-800">{userReview.comment}</p>
                            </div>
                        )}

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
                                        className={`border-b border-slate-200 pb-6 last:border-0 last:pb-0 bg-blue-50 p-4 rounded-lg`}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#edf0f5ff] flex items-center justify-center">
                                                    <FaUserCircle className="w-6 h-6 text-slate-400" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-slate-900">
                                                            {review.userId}
                                                        </h4>

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
                                                ? `In Stock (${sizes.find(s => s.size === selectedSize)?.stock})`
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
                                            onClick={() => handleSizeSelect(size.size)}
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
                                    {selectedSize && (
                                        <span className="text-xs text-slate-500">
                                            Max: {sizes.find(s => s.size === selectedSize)?.stock || 0}
                                        </span>
                                    )}
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
                                        disabled={selectedSize ? quantity >= (sizes.find(s => s.size === selectedSize)?.stock || 0) : false}
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
                                disabled={!product.isActive || !selectedSize || cartLoading || isAddingToCart}
                                className={`flex-1 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${!product.isActive || !selectedSize || cartLoading || isAddingToCart
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#ee2b4b] hover:bg-[#d62545] shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/40"
                                    }`}
                            >
                                {cartLoading || isAddingToCart ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <BiShoppingBag className="w-6 h-6" />
                                        {!product.isActive
                                            ? "Out of Stock"
                                            : !selectedSize
                                                ? "Select Size"
                                                : isProductInCart
                                                    ? "Update Cart"
                                                    : "Add to Cart"}
                                    </>
                                )}
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
                                    Product added on:{" "}
                                    {new Date(
                                        product.createdAt
                                    ).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* REVIEW MODAL */}
            {showReviewModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Write a Review
                                </h2>
                                <p className="text-slate-600 text-sm mt-1">
                                    Reviewing as: {user?.firstName} {user?.lastName}
                                </p>
                            </div>
                            <button
                                onClick={handleReviewModalClose}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <FaTimes className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Product Info */}
                            <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-xl">
                                <div className="w-16 h-16 rounded-lg overflow-hidden">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${selectedImage})` }}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{product.name}</h3>
                                    <p className="text-sm text-slate-600">{product.title}</p>
                                </div>
                            </div>

                            <form onSubmit={handleReviewSubmit} className="space-y-6">
                                {/* Rating Section */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                                        Overall Rating <span className="text-red-500">*</span>
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
                                                    className={`w-10 h-10 transition-all duration-200 ${star <= (hoveredRating || reviewForm.rating)
                                                        ? "text-yellow-400 fill-current"
                                                        : "text-slate-300"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Poor</span>
                                        <span>Excellent</span>
                                    </div>
                                </div>

                                {/* Review Text */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        Your Review <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="comment"
                                        value={reviewForm.comment}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Share your experience with this product..."
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] resize-none"
                                        required
                                    />
                                    <p className="text-xs text-slate-500 mt-2">
                                        Minimum 10 characters
                                    </p>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex gap-4 pt-4 border-t border-slate-200">
                                    <button
                                        type="button"
                                        onClick={handleReviewModalClose}
                                        className="flex-1 py-3 px-6 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-[#ee2b4b] hover:bg-[#d62545] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Submitting...
                                            </span>
                                        ) : (
                                            "Submit Review"
                                        )}
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