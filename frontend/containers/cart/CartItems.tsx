"use client";

import { useState, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useCart } from "@/context/CartContext";
import { CartItem as CartItemType, CartVariant } from "@/interfaces/cartInterface";
import { showToast } from "@/lib/toast";

interface CartItemDisplay {
    id: string;
    productId: string;
    name: string;
    category: string;
    price: number;
    image: string;
    variants: {
        size: string;
        quantity: number;
    }[];
}

const CartItems = () => {
    const { cart, isLoading, updateQuantity, removeFromCart, fetchCart } = useCart();
    const [cartItems, setCartItems] = useState<CartItemDisplay[]>([]);
    const [localLoading, setLocalLoading] = useState<boolean>(false);

    // Get image URL helper function
    const getImageUrl = (imagePath: string) => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!imagePath || imagePath === "/default-product.jpg") {
            return "/default-product.jpg";
        }
        if (imagePath.startsWith("http")) {
            return imagePath;
        }
        return `${API_BASE_URL}/uploads/product/${imagePath}`;
    };

    // Transform cart data for display
    useEffect(() => {
        if (cart && cart.items) {
            const transformedItems: CartItemDisplay[] = cart.items.map((item: CartItemType) => {
                const variants = item.variants.map((variant: CartVariant) => ({
                    size: variant.size,
                    quantity: variant.quantity,
                }));

                return {
                    id: item.product?._id || `temp-${Date.now()}`,
                    productId: item.product?._id || "",
                    name: item.product?.name || "Unknown Product",
                    category: item.product?.gender || "Uncategorized",
                    price: item.product?.price || 0,
                    image: getImageUrl(item.product?.images?.[0]),
                    variants
                };
            });

            setCartItems(transformedItems);
        }
    }, [cart]);

    // Handle quantity update
    const handleUpdateQuantity = async (productId: string, size: string, action: "increment" | "decrement") => {
        try {
            setLocalLoading(true);
            await updateQuantity({ productId, size, action });
            showToast('success', `Quantity ${action === 'increment' ? 'increased' : 'decreased'} successfully!`);
        } catch (error) {
            console.error("Failed to update quantity :", error);
            showToast('error', 'Cannot update quantity. Only limited stock available.');
        } finally {
            setLocalLoading(false);
        }
    };

    // Handle item removal
    const handleRemoveItem = async (productId: string, size: string) => {
        try {
            setLocalLoading(true);
            await removeFromCart({ productId, size });
            showToast('success', 'Item removed from cart successfully!');
        } catch (error) {
            console.error("Failed to remove item:", error);
            showToast('error', 'Failed to remove item. Please try again.');
        } finally {
            setLocalLoading(false);
        }
    };

    // Handle cart refresh
    const handleRefreshCart = async () => {
        try {
            setLocalLoading(true);
            await fetchCart();
            showToast('info', 'Cart refreshed successfully!');
        } catch (error) {
            console.error("Failed to refresh cart:", error);
            showToast('error', 'Failed to refresh cart. Please try again.');
        } finally {
            setLocalLoading(false);
        }
    };

    // Calculate total quantity for a product variant
    const getTotalQuantity = (variants: CartItemDisplay["variants"]) => {
        return variants.reduce((total, variant) => total + variant.quantity, 0);
    };

    // Calculate total price for a product with all variants
    const getTotalPriceForItem = (item: CartItemDisplay) => {
        const totalQuantity = getTotalQuantity(item.variants);
        return item.price * totalQuantity;
    };

    if (isLoading || localLoading) {
        return (
            <div className="flex flex-col gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                        <div className="flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-2xl shadow-sm border border-neutral-100">
                            <div className="w-full sm:w-32 aspect-square rounded-xl bg-neutral-200" />
                            <div className="flex-1 space-y-4">
                                <div className="h-4 bg-neutral-200 rounded w-3/4" />
                                <div className="h-3 bg-neutral-200 rounded w-1/2" />
                                <div className="flex gap-3">
                                    <div className="h-6 bg-neutral-200 rounded w-16" />
                                    <div className="h-6 bg-neutral-200 rounded w-20" />
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-8 bg-neutral-200 rounded w-24" />
                                    <div className="h-8 bg-neutral-200 rounded w-24" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-neutral-500 mb-6">Add some products to your cart to see them here</p>
                <button
                    onClick={handleRefreshCart}
                    disabled={localLoading}
                    className="px-6 py-2 bg-[#ee2b4b] text-white rounded-lg hover:bg-[#d12541] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {localLoading ? "Refreshing..." : "Refresh Cart"}
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {cartItems.map((item) => (
                <div
                    key={`${item.id}-${item.variants[0]?.size}`}
                    className="flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:border-[#ee2b4b]/20 transition-all"
                >
                    {/* Product Image */}
                    <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-neutral-50 flex-shrink-0 group">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/default-product.jpg";
                            }}
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-1 justify-between">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                <p className="text-sm text-neutral-500 mt-1">{item.category}</p>

                                {/* Display each variant separately */}
                                <div className="mt-4 space-y-3">
                                    {item.variants.map((variant, index) => (
                                        <div key={`${item.id}-${variant.size}-${index}`} className="p-3 bg-neutral-50 rounded-lg">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div className="flex flex-wrap gap-3">
                                                    <span className="px-3 py-1 text-sm bg-white rounded-md border border-neutral-200">
                                                        Size: {variant.size}
                                                    </span>
                                                    <span className="px-3 py-1 text-sm bg-white rounded-md border border-neutral-200">
                                                        Qty: {variant.quantity}
                                                    </span>
                                                </div>

                                                {/* Quantity Controls for this specific variant */}
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center border rounded-lg border-neutral-200 bg-white">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.productId, variant.size, "decrement")}
                                                            disabled={localLoading}
                                                            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            −
                                                        </button>
                                                        <input
                                                            readOnly
                                                            value={variant.quantity}
                                                            className="w-10 h-8 text-center text-sm bg-transparent"
                                                        />
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.productId, variant.size, "increment")}
                                                            disabled={localLoading}
                                                            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    {/* Remove this specific variant */}
                                                    <button
                                                        onClick={() => handleRemoveItem(item.productId, variant.size)}
                                                        disabled={localLoading}
                                                        className="flex items-center gap-1.5 text-sm font-medium text-neutral-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                                        title="Remove this variant"
                                                    >
                                                        <MdOutlineDeleteOutline className="text-[20px]" />
                                                        <span className="hidden sm:inline">Remove</span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price for this variant */}
                                            <div className="text-right mt-2">
                                                <span className="text-sm text-neutral-500">
                                                    Rs {item.price} × {variant.quantity} = Rs {item.price * variant.quantity}.00
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total price for all variants of this product */}
                            <div className="sm:text-right">
                                <p className="text-lg font-bold text-gray-900">
                                    Rs {getTotalPriceForItem(item)}.00
                                </p>
                                <p className="text-sm text-neutral-500 mt-1">
                                    {getTotalQuantity(item.variants)} item(s) total
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartItems;