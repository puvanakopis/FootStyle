"use client";

interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    totalItems: number;
    handleCheckoutClick: () => void;
}

const TAX_RATE = 0.02;
const FREE_SHIPPING_THRESHOLD = 5000;

const OrderSummary = ({ subtotal, shipping, tax, total, totalItems, handleCheckoutClick }: OrderSummaryProps) => {

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8 sticky top-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Cart summary */}
            <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Items in cart</span>
                    <span className="font-bold">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                </div>
            </div>

            <div className="space-y-4 border-b border-neutral-100 pb-6 mb-6">
                <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Subtotal</span>
                    <span className="font-bold">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Shipping</span>
                    {shipping === 0 ? (
                        <span className="text-green-600 font-bold text-sm">Free</span>
                    ) : (
                        <span className="font-bold">{formatCurrency(shipping)}</span>
                    )}
                </div>

                <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Tax ({TAX_RATE * 100}%)</span>
                    <span className="font-bold">{formatCurrency(tax)}</span>
                </div>
            </div>

            <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold">Total</span>
                <div className="text-right">
                    <span className="text-3xl font-extrabold block">{formatCurrency(total)}</span>
                    {shipping === 0 && subtotal > 0 && (
                        <span className="text-green-600 text-sm block mt-1">Free shipping applied!</span>
                    )}
                    {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
                        <span className="text-neutral-500 text-sm block mt-1">
                            Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
                        </span>
                    )}
                </div>
            </div>

            <button
                onClick={handleCheckoutClick}
                className="w-full h-14 bg-[#ee2b4b] text-white font-bold rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={totalItems === 0}
            >
                Proceed to Checkout
            </button>

            {/* Additional information */}
            <div className="mt-6 pt-6 border-t border-neutral-100">
                <div className="flex items-start text-sm text-neutral-500">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z" clipRule="evenodd" />
                    </svg>
                    <p>Estimated delivery: 3-7 business days</p>
                </div>
                <div className="flex items-start text-sm text-neutral-500 mt-2">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                    </svg>
                    <p>14-day return policy for Sri Lanka</p>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;