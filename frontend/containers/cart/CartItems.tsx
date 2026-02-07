"use client";

import { MdOutlineDeleteOutline } from "react-icons/md";

interface Variant {
    size: string;
    quantity: number;
}

interface CartItem {
    id: string;
    productId: string;
    name: string;
    category: string;
    price: number;
    image: string;
    variants: Variant[];
}

interface CartItemsProps {
    cartItems: CartItem[];
    isLoading: boolean;
    handleUpdateQuantity: (productId: string, size: string, action: "increment" | "decrement") => void;
    handleRemoveItem: (productId: string, size: string) => void;
    handleRefreshCart: () => void;
}

const CartItems = ({ cartItems, handleUpdateQuantity, handleRemoveItem, handleRefreshCart }: CartItemsProps) => {
    const getTotalQuantity = (variants: Variant[]) =>
        variants.reduce((total, variant) => total + variant.quantity, 0);

    const getTotalPriceForItem = (item: CartItem) =>
        item.price * getTotalQuantity(item.variants);

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-neutral-500 mb-6">Add some products to your cart to see them here</p>
                <button
                    onClick={handleRefreshCart}
                    className="px-6 py-2 bg-[#ee2b4b] text-white rounded-lg hover:bg-[#d12541] transition-colors"
                >
                    Refresh Cart
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
                            onError={(e) => { (e.target as HTMLImageElement).src = "/default-product.jpg"; }}
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-1 justify-between">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                <p className="text-sm text-neutral-500 mt-1">{item.category}</p>

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

                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center border rounded-lg border-neutral-200 bg-white">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.productId, variant.size, "decrement")}
                                                            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-neutral-100"
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
                                                            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-neutral-100"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => handleRemoveItem(item.productId, variant.size)}
                                                        className="flex items-center gap-1.5 text-sm font-medium text-neutral-400 hover:text-red-500 transition-colors"
                                                        title="Remove this variant"
                                                    >
                                                        <MdOutlineDeleteOutline className="text-[20px]" />
                                                        <span className="hidden sm:inline">Remove</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="text-right mt-2">
                                                <span className="text-sm text-neutral-500">
                                                    Rs {item.price} × {variant.quantity} = Rs {item.price * variant.quantity}.00
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

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