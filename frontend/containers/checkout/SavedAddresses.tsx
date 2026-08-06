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
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 backdrop-blur-xl">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-6 border-b border-slate-200/80 pb-4">
                        <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                            <IoLocationOutline className="text-[#ee2b4b]" size={22} />
                            Delivery Destination
                        </h2>
                    </div>

                    {/* NEW ADDRESS */}
                    <div>
                        {/* CONTACT DETAILS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Full Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter recipient full name"
                                    value={newAddress.fullName}
                                    onChange={(e) => handleAddressChange("fullName", e.target.value)}
                                    className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Phone Number *</label>
                                <input
                                    type="tel"
                                    placeholder="+94 77 123 4567"
                                    value={newAddress.phoneNumber}
                                    onChange={(e) => handleAddressChange("phoneNumber", e.target.value)}
                                    className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Email Address *</label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={newAddress.email}
                                    onChange={(e) => handleAddressChange("email", e.target.value)}
                                    className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b]"
                                    required
                                />
                            </div>
                        </div>

                        {/* ADDRESS DETAILS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                                    Street Address *
                                </label>
                                <input
                                    type="text"
                                    placeholder="House No, Street name, Apartment"
                                    value={newAddress.street}
                                    onChange={(e) => handleAddressChange("street", e.target.value)}
                                    className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Province *</label>
                                <select
                                    value={newAddress.province}
                                    onChange={(e) => handleAddressChange("province", e.target.value)}
                                    className="block w-full rounded-xl border border-slate-200/80 bg-slate-50 h-11 px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#ee2b4b]"
                                    required
                                >
                                    <option value="">Select Province</option>
                                    {Object.keys(provinceDistricts).map(prov => (
                                        <option key={prov} value={prov}>{prov} Province</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">District *</label>
                                <select
                                    value={newAddress.city}
                                    onChange={(e) => handleAddressChange("city", e.target.value)}
                                    disabled={!newAddress.province}
                                    className="block w-full rounded-xl border border-slate-200/80 bg-slate-50 h-11 px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#ee2b4b]"
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
                                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Country</label>
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={newAddress.country}
                                    onChange={(e) => handleAddressChange("country", e.target.value)}
                                    className="w-full rounded-xl border border-slate-200/80 bg-slate-100 py-3 px-4 text-xs font-bold text-slate-500 cursor-not-allowed"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Postal Code *</label>
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={newAddress.postalCode}
                                    onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                                    className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b]"
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
                    className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-600 hover:text-[#ee2b4b] transition-colors"
                >
                    Back to Drop Bag
                </Link>
            </div>
        </div>
    );
};

export default NewAddress;