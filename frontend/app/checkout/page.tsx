"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import NewAddress from "@/containers/checkout/SavedAddresses";
import OrderSummary from "@/containers/checkout/OrderSummary";
import PaymentPopup from "@/containers/checkout/PaymentPopup";

import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/toast";
import { TAX_RATE, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '@/constants/cart';
import Loading from '@/components/Loading';

const provinceDistricts: Record<string, string[]> = {
    "Western": ["Colombo", "Gampaha", "Kalutara"],
    "Central": ["Kandy", "Matale", "Nuwara Eliya"],
    "Southern": ["Galle", "Matara", "Hambantota"],
    "Northern": ["Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu"],
    "Eastern": ["Trincomalee", "Batticaloa", "Ampara"],
    "North Western": ["Kurunegala", "Puttalam"],
    "North Central": ["Anuradhapura", "Polonnaruwa"],
    "Uva": ["Badulla", "Monaragala"],
    "Sabaragamuwa": ["Ratnapura", "Kegalle"],
};

export default function Checkout() {
    const router = useRouter();
    const { cart, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { createOrder, createOrderLoading, createOrderError, addPaymentToOrder, addPaymentLoading, addPaymentError } = useOrder();

    // State for payment popup
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

    // Address state
    const [newAddress, setNewAddress] = useState({
        fullName: user ? `${user.firstName} ${user.lastName}` : "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
        street: "",
        city: "",
        province: "",
        postalCode: "",
        country: "Sri Lanka",
    });

    const handleAddressChange = (field: keyof typeof newAddress, value: string) => {
        if (field === "province") {
            setNewAddress(prev => ({ ...prev, province: value, city: "" }));
        } else {
            setNewAddress(prev => ({ ...prev, [field]: value }));
        }
    };

    // Order summary calculation
    const [summary, setSummary] = useState({
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
    });

    useEffect(() => {
        if (!cart?.items?.length) {
            setSummary({ subtotal: 0, shipping: 0, tax: 0, total: 0 });
            return;
        }

        let subtotal = 0;
        cart.items.forEach(item => {
            item.variants.forEach(variant => {
                subtotal += (item.product?.price || 0) * variant.quantity;
            });
        });

        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        const tax = subtotal * TAX_RATE;
        const total = subtotal + shipping + tax;

        setSummary({ subtotal, shipping, tax, total });
    }, [cart]);

    // Validate address before placing order
    const validateAddress = () => {
        const requiredFields = ['fullName', 'phoneNumber', 'email', 'street', 'city', 'province', 'postalCode'];

        for (const field of requiredFields) {
            if (!newAddress[field as keyof typeof newAddress]) {
                const msg = `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
                showToast("error", msg);
                return false;
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newAddress.email)) {
            showToast("error", "Please enter a valid email address");
            return false;
        }

        // Validate phone number 
        const phoneRegex = /^(?:\+94|0)[1-9][0-9]{8}$/;
        if (!phoneRegex.test(newAddress.phoneNumber.replace(/\s+/g, ''))) {
            showToast("error", "Please enter a valid Sri Lankan phone number");
            return false;
        }

        return true;
    };

    // Handle order creation
    const handlePlaceOrder = async () => {
        if (!isAuthenticated || !cart?.items?.length) {
            showToast("error", "Please login and add items to cart");
            return;
        }

        if (!validateAddress()) return;

        try {
            const orderItems = cart.items.flatMap(item =>
                item.variants.map(variant => ({
                    product: item.product?._id || "",
                    size: variant.size,
                    quantity: variant.quantity
                }))
            );

            const orderData = {
                items: orderItems,
                shippingAddress: newAddress,
                subtotal: summary.subtotal,
                shippingFee: summary.shipping,
                total: summary.total
            };

            const createdOrder = await createOrder(orderData);
            setCreatedOrderId(createdOrder._id);
            setShowPaymentPopup(true);

        } catch (error: any) {
            const errorMessage = createOrderError || error.response?.data?.message || "Failed to create order";
            showToast("error", errorMessage);
        }
    };

    // Handle payment success
    const handlePaymentSuccess = async () => {
        if (!createdOrderId) return;

        try {
            await addPaymentToOrder(createdOrderId, {
                method: "COD",
                transactionId: undefined
            });

            await clearCart();

            showToast("success", "Order and payment completed successfully!");

            setTimeout(() => {
                router.push('/orders');
            }, 2000);

        } catch (error: any) {
            const errorMessage = addPaymentError || "Failed to process payment";
            console.error("Payment error:", error);
            showToast("error", errorMessage);
        }
    };

    // Handle payment cancellation
    const handlePaymentCancel = () => {
        setShowPaymentPopup(false);
        showToast("info", "You can complete payment later from your orders page");

        setTimeout(() => {
            router.push('/orders');
        }, 1500);
    };

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 0,
        }).format(amount);

    const getImageUrl = (imagePath?: string) => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!imagePath || imagePath === "/default-product.jpg") return "/default-product.jpg";
        if (imagePath.startsWith("http")) return imagePath;
        return `${API_BASE_URL}/uploads/product/${imagePath}`;
    };

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Cart", href: "/cart" },
        { label: "Delivery Address", href: "/checkout" },
    ];

    // Combine loading states for UI
    const isLoading = createOrderLoading || addPaymentLoading;

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Header />
                <Loading message='loading checkout page ...'/>
                <Footer />
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />

            <div className="px-4 md:px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <PageHeader title="Shipping Information" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <NewAddress
                        newAddress={newAddress}
                        handleAddressChange={handleAddressChange}
                        provinceDistricts={provinceDistricts}
                    />

                    <OrderSummary
                        items={cart?.items || []}
                        summary={summary}
                        isAuthenticated={isAuthenticated}
                        formatCurrency={formatCurrency}
                        getImageUrl={getImageUrl}
                        freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
                        onPlaceOrder={handlePlaceOrder}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            {createdOrderId && (
                <PaymentPopup
                    isOpen={showPaymentPopup}
                    onClose={handlePaymentCancel}
                    orderId={createdOrderId}
                    totalAmount={summary.total}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}

            <Footer />
        </main>
    );
}