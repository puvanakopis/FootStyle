"use client";

import React from "react";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

interface SavedAddressesProps {
    savedAddress: { label: string; address: string } | null;
    user: any;
    selectedOption: "saved" | "new";
    setSelectedOption: (option: "saved" | "new") => void;
    newAddress: {
        fullName: string;
        phone: string;
        email: string;
        street: string;
        district: string;
        province: string;
        country: string;
        postalCode: string;
    };
    handleAddressChange: (field: keyof typeof newAddress, value: string) => void;
    provinceDistricts: Record<string, string[]>;
}

const SavedAddresses: React.FC<SavedAddressesProps> = ({
    savedAddress,
    user,
    selectedOption,
    setSelectedOption,
    newAddress,
    handleAddressChange,
    provinceDistricts,
}) => {
    return (
        <div className="lg:col-span-8">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 md:p-8">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                            <IoLocationOutline className="text-[#ee2b4b]" size={22} />
                            Delivery Address
                        </h2>
                    </div>

                    {/* SAVED ADDRESS */}
                    {savedAddress && (
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <input
                                    type="radio"
                                    name="address-select"
                                    checked={selectedOption === "saved"}
                                    onChange={() => setSelectedOption("saved")}
                                    className="w-5 h-5 text-[#ee2b4b] border-gray-300 focus:ring-[#ee2b4b]"
                                />
                                <h3 className="text-lg font-bold text-neutral-900">Saved Address</h3>
                            </div>

                            <label
                                className={`cursor-pointer relative flex flex-col p-4 rounded-xl border-2 transition-all ${selectedOption === "saved"
                                        ? "border-[#ee2b4b] bg-[#ee2b4b]/5"
                                        : "border-neutral-200 hover:border-neutral-300"
                                    }`}
                            >
                                <div className="text-sm text-neutral-700 whitespace-pre-line mt-2">
                                    <p className="font-bold text-neutral-900 mb-1">
                                        {user?.firstName} {user?.lastName}
                                    </p>
                                    {savedAddress.address}
                                    <p className="mt-2 text-neutral-500">{user?.phoneNumber}</p>
                                </div>
                            </label>
                        </div>
                    )}

                    {/* DIVIDER */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white text-neutral-500 font-medium">
                                or enter a new address
                            </span>
                        </div>
                    </div>

                    {/* NEW ADDRESS */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <input
                                type="radio"
                                name="address-select"
                                checked={selectedOption === "new"}
                                onChange={() => setSelectedOption("new")}
                                className="w-5 h-5 text-[#ee2b4b] border-gray-300 focus:ring-[#ee2b4b]"
                            />
                            <h3 className="text-lg font-bold text-neutral-900">New Address</h3>
                        </div>

                        <div
                            className={`${selectedOption === "new" ? "" : "opacity-40 pointer-events-none"
                                } transition-opacity`}
                        >
                            {/* CONTACT DETAILS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={newAddress.fullName}
                                        onChange={(e) => handleAddressChange("fullName", e.target.value)}
                                        className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={newAddress.phone}
                                        onChange={(e) => handleAddressChange("phone", e.target.value)}
                                        className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={newAddress.email}
                                        onChange={(e) => handleAddressChange("email", e.target.value)}
                                        className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b]"
                                    />
                                </div>
                            </div>

                            {/* ADDRESS DETAILS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Street Address"
                                        value={newAddress.street}
                                        onChange={(e) => handleAddressChange("street", e.target.value)}
                                        className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Province</label>
                                    <select
                                        value={newAddress.province}
                                        onChange={(e) => handleAddressChange("province", e.target.value)}
                                        className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b]"
                                    >
                                        <option value="">Select Province</option>
                                        {Object.keys(provinceDistricts).map(prov => (
                                            <option key={prov} value={prov}>{prov} Province</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">District</label>
                                    <select
                                        value={newAddress.district}
                                        onChange={(e) => handleAddressChange("district", e.target.value)}
                                        disabled={!newAddress.province}
                                        className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b]"
                                    >
                                        <option value="">Select District</option>
                                        {newAddress.province &&
                                            provinceDistricts[newAddress.province].map(district => (
                                                <option key={district} value={district}>{district}</option>
                                            ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Country</label>
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        value={newAddress.country}
                                        onChange={(e) => handleAddressChange("country", e.target.value)}
                                        className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Postal Code</label>
                                    <input
                                        type="text"
                                        placeholder="Postal Code"
                                        value={newAddress.postalCode}
                                        onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                                        className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* BACK LINK */}
            <div className="flex items-center justify-between pt-4">
                <Link
                    href="/cart"
                    className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 font-medium"
                >
                    <IoMdArrowBack />
                    Back to Cart
                </Link>
            </div>
        </div>
    );
};

export default SavedAddresses;