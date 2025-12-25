const OrderSummary = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 border-b border-neutral-100 pb-6 mb-6">
                <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Subtotal</span>
                    <span className="font-bold">Rs 425.00</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Shipping</span>
                    <span className="text-green-600 font-bold text-sm">Free</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Tax</span>
                    <span className="font-bold">Rs 34.00</span>
                </div>
            </div>

            <div className="flex justify-between mb-8">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-extrabold">Rs 459.00</span>
            </div>

            <button className="w-full h-14 bg-[#ee2b4b] text-white font-bold rounded-xl hover:opacity-90 transition">
                Proceed to Checkout
            </button>
        </div>
    );
};

export default OrderSummary;