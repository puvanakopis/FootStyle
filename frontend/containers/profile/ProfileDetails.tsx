"use client";

import { useState, useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { PiBuildingApartment } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import { Address } from "@/interfaces/authInterface";
import { showToast } from "@/lib/toast";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: Address;
}

const ProfileDetails = () => {
  const { user, getCurrentUser, updateCurrentUser } = useAuth();
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

  // Handle form submit to update user
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
      showToast("error", error?.response?.data?.message || "Failed to update profile. Please try again.");
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
      showToast("error", error?.response?.data?.message || "Failed to update address. Please try again.");
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
      showToast("error", error?.response?.data?.message || "Failed to remove address. Please try again.");
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

  return (
    <div className="lg:col-span-9 space-y-8">
      {/* Personal Info */}
      <section className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-neutral-900">
            Personal Information
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-white py-3 pl-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-white py-3 pl-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-gray-100 py-3 pl-4 text-sm text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">
                Email cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-white py-3 pl-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#ee2b4b] hover:bg-[#d4203e] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl px-8 h-12 shadow-lg shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* Shipping Address */}
      <section className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-neutral-900">
            Shipping Address
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              className="flex items-center gap-1 text-sm font-semibold text-[#ee2b4b] hover:underline"
            >
              {isEditingAddress ? "Cancel" : "Edit Address"}
            </button>
            {!isAddressEmpty() && (
              <button
                onClick={handleClearAddress}
                disabled={isSubmitting}
                className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <AiOutlineDelete />
                Remove
              </button>
            )}
          </div>
        </div>

        {isEditingAddress ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Street
                </label>
                <input
                  type="text"
                  value={formData.address?.street || ""}
                  onChange={(e) => handleAddressChange("street", e.target.value)}
                  className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-white py-3 pl-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                  placeholder="Enter street address"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  District
                </label>
                <input
                  type="text"
                  value={formData.address?.district || ""}
                  onChange={(e) => handleAddressChange("district", e.target.value)}
                  className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-white py-3 pl-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                  placeholder="Enter district"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  province
                </label>
                <input
                  type="text"
                  value={formData.address?.province || ""}
                  onChange={(e) => handleAddressChange("province", e.target.value)}
                  className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-white py-3 pl-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                  placeholder="Enter province"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.address?.zipCode || ""}
                  onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                  className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-white py-3 pl-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                  placeholder="Enter ZIP/postal code"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.address?.country || ""}
                  onChange={(e) => handleAddressChange("country", e.target.value)}
                  className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-white py-3 pl-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                  placeholder="Enter country"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditingAddress(false)}
                className="px-6 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg bg-[#ee2b4b] text-white hover:bg-[#d4203e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Save Address"}
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`relative p-5 rounded-xl transition-all ${isAddressEmpty()
              ? "border-2 border-dashed border-neutral-300 bg-neutral-50"
              : "border-2 border-[#ee2b4b] bg-[#ee2b4b]/5"
              }`}
          >
            <div className="flex items-center gap-2 mb-3">
              {getAddressLabel() === "Home" ? (
                <IoHomeOutline className="text-[#ee2b4b]" />
              ) : getAddressLabel() === "Apartment" ? (
                <PiBuildingApartment className="text-[#ee2b4b]" />
              ) : (
                <IoHomeOutline className="text-neutral-400" />
              )}
              <span className="font-bold text-neutral-900">
                {getAddressLabel()}
              </span>

              {!isAddressEmpty() && (
                <span className="text-[10px] font-bold uppercase bg-[#ee2b4b] text-white px-2 py-0.5 rounded-full ml-2">
                  Default
                </span>
              )}
            </div>

            {isAddressEmpty() ? (
              <p className="text-sm text-neutral-500 italic">
                No address saved. Click "Edit Address" to add one.
              </p>
            ) : (
              <div className="text-sm text-neutral-600 space-y-1">
                {formData.address?.street && (
                  <p>{formData.address.street}</p>
                )}
                <div className="flex flex-wrap gap-1">
                  {formData.address?.district && <span>{formData.address.district}</span>}
                  {formData.address?.province && (
                    <span>, {formData.address.province}</span>
                  )}
                  {formData.address?.zipCode && (
                    <span>{formData.address.zipCode}</span>
                  )}
                </div>
                {formData.address?.country && (
                  <p>{formData.address.country}</p>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfileDetails;