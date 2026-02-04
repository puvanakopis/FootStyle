"use client";

import React from "react";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";

interface Address {
    fullName: string;
    phoneNumber: string;
    email: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
}

interface NewAddressProps {
    newAddress: Address;
    handleAddressChange: (field: keyof Address, value: string) => void;
    provinceDistricts: Record<string, string[]>;
}

const NewAddress: React.FC<NewAddressProps> = ({
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

                    {/* NEW ADDRESS */}
                    <div>
                        {/* CONTACT DETAILS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={newAddress.fullName}
                                    onChange={(e) => handleAddressChange("fullName", e.target.value)}
                                    className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b] focus:border-[#ee2b4b]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={newAddress.phoneNumber}
                                    onChange={(e) => handleAddressChange("phoneNumber", e.target.value)}
                                    className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b] focus:border-[#ee2b4b]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={newAddress.email}
                                    onChange={(e) => handleAddressChange("email", e.target.value)}
                                    className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b] focus:border-[#ee2b4b]"
                                    required
                                />
                            </div>
                        </div>

                        {/* ADDRESS DETAILS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Street Address *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Street Address"
                                    value={newAddress.street}
                                    onChange={(e) => handleAddressChange("street", e.target.value)}
                                    className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b] focus:border-[#ee2b4b]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Province *</label>
                                <select
                                    value={newAddress.province}
                                    onChange={(e) => handleAddressChange("province", e.target.value)}
                                    className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b] focus:border-[#ee2b4b]"
                                    required
                                >
                                    <option value="">Select Province</option>
                                    {Object.keys(provinceDistricts).map(prov => (
                                        <option key={prov} value={prov}>{prov} Province</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">District *</label>
                                <select
                                    value={newAddress.city}
                                    onChange={(e) => handleAddressChange("city", e.target.value)}
                                    disabled={!newAddress.province}
                                    className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b] focus:border-[#ee2b4b]"
                                    required
                                >
                                    <option value="">Select District</option>
                                    {newAddress.province &&
                                        provinceDistricts[newAddress.province]?.map(district => (
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
                                    className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b] focus:border-[#ee2b4b]"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Postal Code *</label>
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={newAddress.postalCode}
                                    onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                                    className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b] focus:border-[#ee2b4b]"
                                    required
                                />
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
                    {/* <IoMdArrowBack /> */}
                    Back to Cart
                </Link>
            </div>
        </div>
    );
};

export default NewAddress;