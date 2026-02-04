"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import SavedAddresses from "@/containers/delivery-address/SavedAddresses";
import OrderSummary from "@/containers/delivery-address/OrderSummary";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_COST = 200;
const TAX_RATE = 0.02;

// Province → District mapping
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

export default function DeliveryAddress() {
    const { cart } = useCart();
    const { user, isAuthenticated } = useAuth();

    // --- Address Logic ---
    const savedAddress = user?.address
        ? {
            label: "Saved Address",
            address: `${user.address.street || ""}\n${user.address.district || ""}`,
        }
        : null;

    const [selectedOption, setSelectedOption] = useState<"saved" | "new">(
        savedAddress ? "saved" : "new"
    );

    const [newAddress, setNewAddress] = useState({
        fullName: "",
        phone: "",
        email: "",
        street: "",
        district: "",
        province: "",
        country: "",
        postalCode: "",
    });

    const handleAddressChange = (field: keyof typeof newAddress, value: string) => {
        if (field === "province") {
            setNewAddress(prev => ({ ...prev, province: value, district: "" }));
        } else {
            setNewAddress(prev => ({ ...prev, [field]: value }));
        }
    };

    // --- Order Summary Logic ---
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

    // IMAGE RESOLVER
    const getImageUrl = (imagePath?: string) => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!imagePath || imagePath === "/default-product.jpg") return "/default-product.jpg";
        if (imagePath.startsWith("http")) return imagePath;
        return `${API_BASE_URL}/uploads/product/${imagePath}`;
    };

    // FORMAT CURRENCY
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 0,
        }).format(amount);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Cart", href: "/cart" },
        { label: "Delivery Address", href: "/delivery-address" },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />

            <div className="px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <PageHeader title="Shipping Information" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <SavedAddresses
                        savedAddress={savedAddress}
                        user={user}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
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
                    />
                </div>
            </div>

            <Footer />
        </main>
    );
}