"use client";

import { useEffect, useState } from "react";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import OrderSummary from '@/containers/cart/OrderSummary';
import CartItems from '@/containers/cart/CartItems';
import { useCart } from "@/context/CartContext";
import { showToast } from "@/utils/toast";
import { CartItem as CartItemType, CartVariant } from "@/interfaces/cartInterface";
import { TAX_RATE, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '@/constants/cart';
import { useRouter } from "next/dist/client/components/navigation";
import Loading from "@/components/Loading";

const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
];

export default function CartPage() {

    const router = useRouter();
    const { cart, isLoading, updateQuantity, removeFromCart, fetchCart } = useCart();
    const [localLoading, setLocalLoading] = useState(false);
    const [cartItems, setCartItems] = useState<any[]>([]);

    // Transform cart data for display
    const getImageUrl = (imagePath: string) => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!imagePath || imagePath === "/default-product.jpg") return "/default-product.jpg";
        if (imagePath.startsWith("http")) return imagePath;
        return `${API_BASE_URL}/uploads/product/${imagePath}`;
    };

    useEffect(() => {
        if (cart && cart.items) {
            const transformedItems = cart.items.map((item: CartItemType) => {
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

    // Cart helpers
    const calculateSubtotal = () => {
        if (!cartItems || cartItems.length === 0) return 0;
        return cartItems.reduce((total, item) => {
            const itemTotal = item.variants.reduce((variantTotal, variant) => {
                return variantTotal + (item.price * variant.quantity);
            }, 0);
            return total + itemTotal;
        }, 0);
    };

    const calculateShipping = (subtotal: number) => {
        if (subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0) return 0;
        return SHIPPING_COST;
    };

    const calculateTax = (subtotal: number) => subtotal * TAX_RATE;

    const calculateTotal = (subtotal: number, shipping: number, tax: number) =>
        subtotal + shipping + tax;

    const subtotal = calculateSubtotal();
    const shipping = calculateShipping(subtotal);
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal, shipping, tax);

    const totalItems = cartItems.reduce((total, item) => {
        return total + item.variants.reduce((variantTotal, variant) => variantTotal + variant.quantity, 0);
    }, 0);

    const handleCheckoutClick = () => {
        if (!cartItems || cartItems.length === 0) {
            showToast('error', 'Your cart is empty. Please add items to checkout.');
            return;
        }

        if (subtotal < 100) {
            showToast('info', 'Minimum order value is Rs 100 for checkout.');
            return;
        }

        showToast('success', 'Proceeding to checkout...');
        router.push('/checkout');
    };

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

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            {isLoading ? (
                <Loading message="Loading products..." />
            ) : (
                <div className="px-30 py-6">
                    <Breadcrumbs items={breadcrumbItems} />
                    <PageHeader title="Your Shopping Cart" />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-8 space-y-6">
                            <CartItems
                                cartItems={cartItems}
                                isLoading={isLoading || localLoading}
                                handleUpdateQuantity={handleUpdateQuantity}
                                handleRemoveItem={handleRemoveItem}
                                handleRefreshCart={handleRefreshCart}
                            />
                        </div>

                        <div className="lg:col-span-4 lg:sticky lg:top-24">
                            <OrderSummary
                                subtotal={subtotal}
                                shipping={shipping}
                                tax={tax}
                                total={total}
                                totalItems={totalItems}
                                handleCheckoutClick={handleCheckoutClick}
                            />
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </main>
    );
}