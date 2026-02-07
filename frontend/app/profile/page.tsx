"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/Sidebar";
import ProfileDetails from "@/containers/profile/ProfileDetails";
import { useAuth } from "@/context/AuthContext";
import { Address } from "@/interfaces/authInterface";
import { showToast } from "@/utils/toast";
import Loading from "@/components/Loading";

const breadcrumbItems = [
    { label: "Account", href: "" },
    { label: "Profile", href: "/profile" },
];

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address?: Address;
}

// Province → District mapping
const provinceDistricts: Record<string, string[]> = {
    Western: ["Colombo", "Gampaha", "Kalutara"],
    Central: ["Kandy", "Matale", "Nuwara Eliya"],
    Southern: ["Galle", "Matara", "Hambantota"],
    Northern: ["Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu"],
    Eastern: ["Trincomalee", "Batticaloa", "Ampara"],
    "North Western": ["Kurunegala", "Puttalam"],
    "North Central": ["Anuradhapura", "Polonnaruwa"],
    Uva: ["Badulla", "Monaragala"],
    Sabaragamuwa: ["Ratnapura", "Kegalle"],
};

export default function Profile() {
    const { user, getCurrentUser, updateCurrentUser, isLoading } = useAuth();

    const [formData, setFormData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: undefined,
    });

    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Populate formData when user data changes
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                address: user.address || undefined,
            });
        }
    }, [user]);

    // Handle personal info changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle address changes
    const handleAddressChange = (field: keyof Address, value: string) => {
        setFormData((prev) => ({
            ...prev,
            address: {
                ...(prev.address || {}),
                [field]: value,
            } as Address,
        }));
    };

    // Handle personal info submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const updateData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                phoneNumber: formData.phoneNumber.trim(),
                address: formData.address || {},
            };

            await updateCurrentUser(updateData);
            await getCurrentUser();
            showToast("success", "Profile updated successfully!");
        } catch (error: any) {
            console.error("Failed to save profile:", error);
            showToast(
                "error",
                error?.response?.data?.message || "Failed to update profile. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle address save separately
    const handleSaveAddress = async () => {
        setIsSubmitting(true);

        try {
            const updateData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                phoneNumber: formData.phoneNumber.trim(),
                address: formData.address || {},
            };

            await updateCurrentUser(updateData);
            await getCurrentUser();

            showToast("success", "Address updated successfully!");
            setIsEditingAddress(false);
        } catch (error: any) {
            console.error("Failed to save address:", error);
            showToast(
                "error",
                error?.response?.data?.message || "Failed to update address. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Clear address
    const handleClearAddress = async () => {
        try {
            setIsSubmitting(true);

            const updateData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                phoneNumber: formData.phoneNumber.trim(),
                address: {},
            };

            await updateCurrentUser(updateData);
            await getCurrentUser();

            setFormData((prev) => ({
                ...prev,
                address: {},
            }));

            showToast("success", "Address removed successfully!");
            setIsEditingAddress(false);
        } catch (error: any) {
            console.error("Failed to remove address:", error);
            showToast(
                "error",
                error?.response?.data?.message || "Failed to remove address. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Check if address is empty
    const isAddressEmpty = () => {
        if (!formData.address) return true;
        const { street, district, province, zipCode, country } = formData.address;
        return !street && !district && !province && !zipCode && !country;
    };

    // Get address label based on content
    const getAddressLabel = () => {
        if (isAddressEmpty()) return "No Address";
        if (
            formData.address?.street?.toLowerCase().includes("apt") ||
            formData.address?.street?.toLowerCase().includes("apartment")
        ) {
            return "Apartment";
        }
        return "Home";
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Header />
                <Loading message='loading profile .....' />
                <Footer />
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    <div className="w-full lg:w-1/5">
                        <Sidebar />
                    </div>

                    <section className="w-full lg:w-4/5 space-y-6">
                        <ProfileDetails
                            formData={formData}
                            isEditingAddress={isEditingAddress}
                            isSubmitting={isSubmitting}
                            provinceDistricts={provinceDistricts}
                            handleChange={handleChange}
                            handleAddressChange={handleAddressChange}
                            handleSubmit={handleSubmit}
                            handleSaveAddress={handleSaveAddress}
                            handleClearAddress={handleClearAddress}
                            setIsEditingAddress={setIsEditingAddress}
                            isAddressEmpty={isAddressEmpty}
                            getAddressLabel={getAddressLabel}
                        />
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}