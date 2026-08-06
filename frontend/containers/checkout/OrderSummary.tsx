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
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 backdrop-blur-xl">
                <h2 className="text-xl font-black text-slate-900 mb-6">Order Summary</h2>

                {/* EMPTY STATE */}
                {isEmpty ? (
                    <div className="text-center py-8">
                        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 mb-2">Your cart is empty</h3>
                        <p className="text-xs text-slate-500 font-medium mb-6">Add items to your cart to see order summary</p>
                        <Link href="/products" className="inline-flex items-center justify-center px-6 py-3 bg-[#ee2b4b] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#ff3b5c] transition-all">
                            Shop Now
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* CART ITEMS */}
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item) =>
                                item.variants.map((variant, idx) => (
                                    <div key={`${item.product?._id || idx}-${variant.size}`} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0">
                                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-200/80">
                                            <img
                                                src={getImageUrl(item.product?.images?.[0])}
                                                alt={item.product?.name || "Product"}
                                                className="h-full w-full object-cover"
                                                onError={(e) => ((e.target as HTMLImageElement).src = "/default-product.jpg")}
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-center">
                                            <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{item.product?.name}</h3>
                                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">Size: {variant.size}</span>
                                                <span className="text-xs text-slate-500">Qty: {variant.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center text-right">
                                            <span className="text-xs font-extrabold text-[#ee2b4b]">
                                                {formatCurrency((item.product?.price || 0) * variant.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* SUMMARY */}
                        <div className="space-y-3.5 border-t border-slate-200/80 pt-6 mb-6 text-xs">
                            <div className="flex justify-between">
                                <span className="text-slate-500 font-medium">Subtotal</span>
                                <span className="font-bold text-slate-900">{formatCurrency(summary.subtotal)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500 font-medium">Shipping</span>
                                <span className={`font-bold ${summary.shipping === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                                    {summary.shipping === 0 ? "FREE DROP" : formatCurrency(summary.shipping)}
                                </span>
                            </div>

                            {summary.shipping > 0 && summary.subtotal < freeShippingThreshold && (
                                <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                                    Add {formatCurrency(freeShippingThreshold - summary.subtotal)} more for free shipping!
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="text-slate-500 font-medium">Estimated Tax (2%)</span>
                                <span className="font-bold text-slate-900">{formatCurrency(summary.tax)}</span>
                            </div>
                        </div>

                        {/* TOTAL */}
                        <div className="flex justify-between items-end border-t border-slate-200/80 pt-6 mb-8">
                            <span className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Total Price</span>
                            <div className="text-right">
                                <span className="block text-3xl font-black text-[#ee2b4b]">
                                    {formatCurrency(summary.total)}
                                </span>
                            </div>
                        </div>

                        {/* CTA */}
                        {!isAuthenticated ? (
                            <Link href="/login" className="block">
                                <button className="w-full bg-[#ee2b4b] hover:bg-[#ff3b5c] text-white font-extrabold text-xs uppercase tracking-wider h-13 rounded-2xl transition-all flex items-center justify-center">
                                    Login to Checkout
                                </button>
                            </Link>
                        ) : (
                            <button
                                onClick={handleCheckout}
                                disabled={isLoading}
                                className={`w-full ${isLoading ? 'bg-slate-300 text-slate-500' : 'bg-[#ee2b4b] hover:bg-[#ff3b5c] text-white'} font-extrabold text-xs uppercase tracking-wider h-13 rounded-2xl transition-all flex items-center justify-center`}
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
                            <p className="text-[11px] text-slate-400 mb-2 font-medium">
                                By placing your order, you agree to our{" "}
                                <Link href="/about" className="underline hover:text-slate-600">Terms of Service</Link>{" "}
                                and{" "}
                                <Link href="/about" className="underline hover:text-slate-600">Privacy Policy</Link>.
                            </p>
                            <div className="flex items-center justify-center gap-2 text-slate-500">
                                <CiLock className="text-[16px] text-emerald-600" />
                                <span className="text-xs font-semibold">256-Bit SSL Encrypted Payment</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OrderSummary;