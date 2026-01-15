"use client";

import { useState, useEffect } from "react";
import { IoAdd, IoHomeOutline } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";

interface Address {
  id: number;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addresses: Address[];
}

const ProfileDetails = () => {
  const { user, getCurrentUser, updateCurrentUser } = useAuth();
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    addresses: [],
  });

  const [editingAddress, setEditingAddress] = useState<null | number>(null);
  const [editAddressData, setEditAddressData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [addingAddress, setAddingAddress] = useState(false);
  const [newAddressData, setNewAddressData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // Populate formData when user data changes
  useEffect(() => {
    if (user) {
      const addresses: Address[] = [
        {
          id: 1,
          label: "Home",
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          zipCode: user.address?.zipCode || "",
          country: user.address?.country || "",
          isDefault: true,
        },
      ];
      // Sync form state with user data from context
      // eslint-disable-next-line
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber || "",
        addresses,
      });
    }
  }, [user]);

  // Handle personal info changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit to update user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCurrentUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        address: formData.addresses.find((a) => a.isDefault) || {},
      });
      await getCurrentUser();
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  // Add new address
  const handleAddAddress = () => {
    setAddingAddress(true);
    setNewAddressData({ street: "", city: "", state: "", zipCode: "", country: "" });
  };

  const handleSaveNewAddress = () => {
    const newAddr: Address = {
      id: Date.now(),
      label: "New Address",
      isDefault: false,
      ...newAddressData,
    };
    setFormData((prev) => ({
      ...prev,
      addresses: [...prev.addresses, newAddr],
    }));
    setAddingAddress(false);
  };

  const handleCancelNewAddress = () => setAddingAddress(false);

  // Edit address
  const handleEditAddress = (id: number) => {
    const addr = formData.addresses.find((a) => a.id === id);
    if (addr) {
      setEditingAddress(id);
      setEditAddressData({
        street: addr.street,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipCode,
        country: addr.country,
      });
    }
  };

  const handleSaveEdit = () => {
    if (editingAddress !== null) {
      setFormData((prev) => ({
        ...prev,
        addresses: prev.addresses.map((addr) =>
          addr.id === editingAddress ? { ...addr, ...editAddressData } : addr
        ),
      }));
      setEditingAddress(null);
    }
  };

  const handleCancelEdit = () => setEditingAddress(null);

  // Delete address
  const handleDeleteAddress = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((addr) => addr.id !== id),
    }));
  };

  // Set default address
  const handleSetDefault = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    }));
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
                className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-gray-100 py-3 pl-4 text-sm text-gray-500"
              />
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
              className="bg-[#ee2b4b] hover:bg-[#d4203e] text-white font-bold rounded-xl px-8 h-12 shadow-lg shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>

      {/* Shipping Addresses */}
      <section className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-neutral-900">
            Shipping Addresses
          </h2>
          <button
            onClick={handleAddAddress}
            className="flex items-center gap-1 text-sm font-semibold text-[#ee2b4b] hover:underline"
          >
            <IoAdd />
            Add New
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {formData.addresses.map((addr) => (
            <div
              key={addr.id}
              className={`relative group p-5 rounded-xl transition-all ${addr.isDefault
                  ? "border-2 border-[#ee2b4b] bg-[#ee2b4b]/5"
                  : "border border-neutral-200 hover:border-[#ee2b4b]/50"
                }`}
            >
              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-xs font-bold text-[#ee2b4b]"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleEditAddress(addr.id)}
                  className="p-1.5 hover:bg-white rounded-full text-red-600"
                >
                  <MdOutlineModeEditOutline />
                </button>
                <button
                  onClick={() => handleDeleteAddress(addr.id)}
                  className="p-1.5 hover:bg-white rounded-full text-red-600"
                >
                  <AiOutlineDelete />
                </button>
              </div>

              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                {addr.label === "Home" ? (
                  <IoHomeOutline className="text-[#ee2b4b]" />
                ) : (
                  <PiBuildingApartment className="text-neutral-400" />
                )}
                <span className="font-bold text-neutral-900">{addr.label}</span>

                {addr.isDefault && (
                  <span className="text-[10px] font-bold uppercase bg-[#ee2b4b] text-white px-2 py-0.5 rounded-full ml-2">
                    Default
                  </span>
                )}
              </div>

              {/* Address */}
              <p className="text-sm text-neutral-600 whitespace-pre-line">
                {`${addr.street}\n${addr.city}\n${addr.state}\n${addr.zipCode}\n${addr.country}`}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Address Modal */}
      {editingAddress !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">Edit Address</h3>

            {["street", "city", "state", "zipCode", "country"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={editAddressData[field as keyof typeof editAddressData]}
                onChange={(e) =>
                  setEditAddressData((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                className="w-full border border-neutral-300 rounded-lg p-2 mb-2 text-sm"
              />
            ))}

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 rounded-lg border border-neutral-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-lg bg-[#ee2b4b] text-white text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {addingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">Add New Address</h3>

            {["street", "city", "state", "zipCode", "country"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={newAddressData[field as keyof typeof newAddressData]}
                onChange={(e) =>
                  setNewAddressData((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                className="w-full border border-neutral-300 rounded-lg p-2 mb-2 text-sm"
              />
            ))}

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleCancelNewAddress}
                className="px-4 py-2 rounded-lg border border-neutral-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewAddress}
                className="px-4 py-2 rounded-lg bg-[#ee2b4b] text-white text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
