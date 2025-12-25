"use client";

import { useState } from "react";
import { IoAdd, IoHomeOutline } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";

const ProfileDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "Puvanakopis",
    lastName: "Mehanathan",
    email: "puvanakopis@gmail.com",
    phone: "+94 75 78 94 561",
    addresses: [
      {
        id: 1,
        label: "Home",
        address:
          "12/5 Galle Road\nColombo 03\nSri Lanka",
        isDefault: true,
      },
      {
        id: 2,
        label: "Office",
        address:
          "45 Park Street\nColombo 02\nSri Lanka",
        isDefault: false,
      },

    ],
  });

  const [editingAddress, setEditingAddress] = useState<null | number>(null);
  const [editValue, setEditValue] = useState("");

  const [addingAddress, setAddingAddress] = useState(false);
  const [newAddressValue, setNewAddressValue] = useState("Street\nCity\nCountry");

  // Handle personal info changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saved Data:", formData);
  };

  // Open Add New Address modal
  const handleAddAddress = () => {
    setAddingAddress(true);
    setNewAddressValue("Street\nCity\nCountry");
  };

  // Save new address
  const handleSaveNewAddress = () => {
    const newAddress = {
      id: Date.now(),
      label: "New Address",
      address: newAddressValue,
      isDefault: false,
    };

    setFormData((prev) => ({
      ...prev,
      addresses: [...prev.addresses, newAddress],
    }));
    setAddingAddress(false);
    setNewAddressValue("");
  };

  // Cancel adding new address
  const handleCancelNewAddress = () => {
    setAddingAddress(false);
    setNewAddressValue("");
  };

  // Delete address
  const handleDeleteAddress = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((addr) => addr.id !== id),
    }));
  };

  // Edit address 
  const handleEditAddress = (id: number) => {
    const addr = formData.addresses.find((a) => a.id === id);
    if (addr) {
      setEditingAddress(id);
      setEditValue(addr.address);
    }
  };

  // Save edited address
  const handleSaveEdit = () => {
    if (editingAddress !== null) {
      setFormData((prev) => ({
        ...prev,
        addresses: prev.addresses.map((addr) =>
          addr.id === editingAddress ? { ...addr, address: editValue } : addr
        ),
      }));
      setEditingAddress(null);
      setEditValue("");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingAddress(null);
    setEditValue("");
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

      {/* ---------------- Title ---------------- */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 mb-2">
          Profile Details
        </h1>
      </section>


      {/* ---------------- Personal Information ---------------- */}
      <section className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-neutral-900">
            Personal Information
          </h2>
          <button className="text-sm font-semibold text-[#ee2b4b] hover:underline">
            Edit
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
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

            {/* Last Name */}
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

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-white py-3 pl-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full flex-1 rounded-lg border border-neutral-300 focus:border-0 bg-white py-3 pl-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-[#ee2b4b] hover:bg-[#d4203e] text-white font-bold rounded-xl px-8 h-12 shadow-lg shadow-[#ee2b4b]/20
                hover:shadow-[#ee2b4b]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>

      {/* ---------------- Shipping Addresses ---------------- */}
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
              className={`relative group p-5 rounded-xl transition-all
                ${addr.isDefault
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
                {addr.address}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Edit Address Modal ---------------- */}
      {editingAddress !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">Edit Address</h3>
            <textarea
              className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
              rows={5}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
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

      {/* ---------------- Add Address Modal ---------------- */}
      {addingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">Add New Address</h3>
            <textarea
              className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
              rows={5}
              value={newAddressValue}
              onChange={(e) => setNewAddressValue(e.target.value)}
            />
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