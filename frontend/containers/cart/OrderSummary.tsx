"use client";

import { ShieldCheck, Truck } from "lucide-react";

interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    totalItems: number;
    handleCheckoutClick: () => void;
}

const TAX_RATE = 0.02;

const OrderSummary = ({ subtotal, shipping, tax, total, totalItems, handleCheckoutClick }: OrderSummaryProps) => {

    const formatCurrency = (amount: number) => {
        return `Rs ${amount?.toLocaleString() || amount}`;
    };

    return (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 backdrop-blur-xl sticky top-24">
            <h2 className="text-xl font-black text-slate-900 mb-6">Order Summary</h2>

            {/* Cart summary badge */}
            <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80/60">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>Items Selected</span>
                    <span className="text-[#ee2b4b]">{totalItems} drop{totalItems !== 1 ? 's' : ''}</span>
                </div>
            </div>

            <div className="space-y-3.5 border-b border-slate-200/80 pb-6 mb-6 text-xs">
                <div className="flex justify-between text-slate-500 font-medium">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between text-slate-500 font-medium">
                    <span>Express Shipping</span>
                    {shipping === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE DROP</span>
                    ) : (
                        <span className="font-bold text-slate-900">{formatCurrency(shipping)}</span>
                    )}
                </div>

                <div className="flex justify-between text-slate-500 font-medium">
                    <span>Estimated Tax ({TAX_RATE * 100}%)</span>
                    <span className="font-bold text-slate-900">{formatCurrency(tax)}</span>
                </div>
            </div>

            <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Total Price</span>
                <div className="text-right">
                    <span className="text-3xl font-black text-[#ee2b4b]">{formatCurrency(total)}</span>
                    {shipping === 0 && subtotal > 0 && (
                        <span className="text-emerald-600 text-[11px] font-bold block mt-1">Free express shipping applied!</span>
                    )}
                </div>
            </div>

            <button
                onClick={handleCheckoutClick}
                className="w-full h-13 bg-[#ee2b4b] text-white text-xs font-extrabold uppercase tracking-wider rounded-2xl hover:bg-[#ff3b5c] transition disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={totalItems === 0}
            >
                Proceed to Checkout
            </button>

            {/* Additional trust info */}
            <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                    <Truck className="w-4 h-4 text-[#ee2b4b]" />
                    <p>Express 24h Order Dispatching</p>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <p>100% Authenticity Verified</p>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;