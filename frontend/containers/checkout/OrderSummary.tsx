"use client";

import Link from "next/link";
import { CiLock } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";

interface Variant {
    size: string;
    quantity: number;
}

interface CartItem {
    product?: {
        _id?: string;
        name?: string;
        price?: number;
        images?: string[];
    };
    variants: Variant[];
}

interface Summary {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

interface OrderSummaryProps {
    items: CartItem[];
    summary: Summary;
    isAuthenticated: boolean;
    formatCurrency: (value: number) => string;
    getImageUrl: (path?: string) => string;
    freeShippingThreshold: number;
    onPlaceOrder: () => Promise<void>;
    isLoading: boolean;
}

const OrderSummary = ({
    items,
    summary,
    isAuthenticated,
    formatCurrency,
    getImageUrl,
    freeShippingThreshold,
    onPlaceOrder,
    isLoading,
}: OrderSummaryProps) => {
    const isEmpty = items.length === 0;

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            return;
        }
        await onPlaceOrder();
    };

    return (
        <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">Order Summary</h2>

                {/* EMPTY STATE */}
                {isEmpty ? (
                    <div className="text-center py-8">
                        <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-2">Your cart is empty</h3>
                        <p className="text-neutral-600 mb-6">Add items to your cart to see order summary</p>
                        <Link href="/products" className="inline-flex items-center justify-center px-6 py-3 bg-[#ee2b4b] text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                            Shop Now
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* CART ITEMS */}
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item) =>
                                item.variants.map((variant, idx) => (
                                    <div key={`${item.product?._id || idx}-${variant.size}`} className="flex gap-4 pb-4 border-b border-neutral-100 last:border-0">
                                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                                            <img
                                                src={getImageUrl(item.product?.images?.[0])}
                                                alt={item.product?.name || "Product"}
                                                className="h-full w-full object-cover"
                                                onError={(e) => ((e.target as HTMLImageElement).src = "/default-product.jpg")}
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-center">
                                            <h3 className="text-sm font-semibold text-neutral-900">{item.product?.name}</h3>
                                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                                <p className="text-xs text-neutral-500">Size: {variant.size}</p>
                                                <span className="text-xs text-neutral-400">•</span>
                                                <p className="text-xs text-neutral-500">Qty: {variant.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center text-right">
                                            <span className="text-sm font-bold text-neutral-900">
                                                {formatCurrency((item.product?.price || 0) * variant.quantity)}
                                            </span>
                                            {item.product?.price && (
                                                <span className="text-xs text-neutral-500">{formatCurrency(item.product.price)} each</span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* SUMMARY */}
                        <div className="space-y-4 border-t border-neutral-100 pt-6 mb-6">
                            <div className="flex justify-between">
                                <span className="text-sm text-neutral-500 font-medium">Subtotal</span>
                                <span className="font-bold text-neutral-900">{formatCurrency(summary.subtotal)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-sm text-neutral-500 font-medium">Shipping</span>
                                <span className={`font-bold text-sm ${summary.shipping === 0 ? "text-green-600" : "text-neutral-900"}`}>
                                    {summary.shipping === 0 ? "Free" : formatCurrency(summary.shipping)}
                                </span>
                            </div>

                            {summary.shipping > 0 && summary.subtotal < freeShippingThreshold && (
                                <div className="text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                                    Add {formatCurrency(freeShippingThreshold - summary.subtotal)} more for free shipping!
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="text-sm text-neutral-500 font-medium">Tax (2%)</span>
                                <span className="font-bold text-neutral-900">{formatCurrency(summary.tax)}</span>
                            </div>
                        </div>

                        {/* TOTAL */}
                        <div className="flex justify-between items-end border-t border-neutral-100 pt-6 mb-8">
                            <span className="text-lg font-bold text-neutral-900">Total Amount</span>
                            <div className="text-right">
                                <span className="block text-2xl font-extrabold text-neutral-900">
                                    {formatCurrency(summary.total)}
                                </span>
                                <span className="text-xs text-neutral-400">LKR</span>
                            </div>
                        </div>

                        {/* CTA */}
                        {!isAuthenticated ? (
                            <Link href="/login" className="block">
                                <button className="w-full bg-[#ee2b4b] hover:bg-[#d4203e] text-white font-bold text-lg h-14 rounded-xl shadow-lg transition-all flex items-center justify-center">
                                    Login to Checkout
                                </button>
                            </Link>
                        ) : (
                            <button
                                onClick={handleCheckout}
                                disabled={isLoading}
                                className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-[#ee2b4b] hover:bg-[#d4203e]'} text-white font-bold text-lg h-14 rounded-xl shadow-lg transition-all flex items-center justify-center`}
                            >
                                {isLoading ? (
                                    <>
                                        <FiLoader className="animate-spin mr-2" />
                                        Creating Order...
                                    </>
                                ) : (
                                    'Proceed to Payment'
                                )}
                            </button>
                        )}

                        {/* FOOTER */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-neutral-400 mb-2">
                                By placing your order, you agree to our{" "}
                                <Link href="/terms" className="underline hover:text-neutral-600">Terms of Service</Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="underline hover:text-neutral-600">Privacy Policy</Link>.
                            </p>
                            <div className="flex items-center justify-center gap-2 text-neutral-400">
                                <CiLock className="text-[16px]" />
                                <span className="text-xs font-medium">SSL Secure Payment</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OrderSummary;