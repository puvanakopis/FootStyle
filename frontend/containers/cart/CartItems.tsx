"use client";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { ShoppingBag } from "lucide-react";

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

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="text-center py-16 px-6 rounded-3xl border border-slate-200/80 bg-white backdrop-blur-xl shadow-xs">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ee2b4b]/10 text-[#ee2b4b] mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Your Drop Bag is Empty</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 font-medium">Explore the latest streetwear sneaker drops and add items to your cart</p>
                <button
                    onClick={handleRefreshCart}
                    className="px-6 py-3 bg-[#ee2b4b] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl hover:bg-[#ff3b5c] transition-all shadow-md shadow-[#ee2b4b]/20"
                >
                    Refresh Drop Bag
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {cartItems.map((item) => (
                <div
                    key={`${item.id}-${item.variants[0]?.size}`}
                    className="flex flex-col sm:flex-row gap-5 p-4 md:p-5 rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all"
                >
                    {/* Product Image */}
                    <div className="w-full sm:w-28 aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 group">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => { (e.target as HTMLImageElement).src = "/default-product.jpg"; }}
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-1 justify-between gap-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                            <div>
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ee2b4b]">{item.category || "Streetwear"}</span>
                                <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                            </div>
                            <span className="text-lg font-black text-[#ee2b4b]">
                                Rs {(item.price * getTotalQuantity(item.variants)).toLocaleString()}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {item.variants.map((variant, index) => (
                                <div key={`${item.id}-${variant.size}-${index}`} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80/60">
                                    <span className="px-2.5 py-1 text-xs font-bold bg-white text-slate-800 rounded-lg border border-slate-200/80">
                                        US {variant.size}
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center rounded-xl border border-slate-200/80 bg-white">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.productId, variant.size, "decrement")}
                                                className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-l-xl transition-colors font-bold"
                                            >
                                                −
                                            </button>
                                            <span className="w-9 text-center text-xs font-bold text-slate-900">
                                                {variant.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.productId, variant.size, "increment")}
                                                className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-r-xl transition-colors font-bold"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => handleRemoveItem(item.productId, variant.size)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                            title="Remove item"
                                        >
                                            <MdOutlineDeleteOutline className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartItems;