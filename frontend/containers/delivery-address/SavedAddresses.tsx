"use client";

import { IoLocationOutline } from "react-icons/io5";

const SavedAddresses = () => {
    const user = {
        firstName: "Puvanakopis",
        lastName: "Mehanathan",
        email: "puvanakopis@gmail.com",
        phone: "+94 75 78 94 561",
        addresses: [
            {
                id: 1,
                label: "Home",
                address: "12/5 Galle Road\nColombo 03\nSri Lanka",
                isDefault: true,
            },
            {
                id: 2,
                label: "Office",
                address: "45 Park Street\nColombo 02\nSri Lanka",
                isDefault: false,
            },
        ],
    };

    return (
        <div className="lg:col-span-8">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#ee2b4b]">
                                <IoLocationOutline />
                            </span>
                            Saved Addresses
                        </h2>
                        <button
                            type="button"
                            className="text-sm font-semibold text-[#ee2b4b] hover:text-red-600 transition-colors"
                        >
                            Manage Addresses
                        </button>
                    </div>

                    {/* Saved Address Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user.addresses.map((addr) => (
                            <label
                                key={addr.id}
                                className={`cursor-pointer relative flex flex-col p-4 rounded-xl border-2 transition-all ${addr.isDefault
                                    ? "border-[#ee2b4b] bg-[#ee2b4b]/5"
                                    : "border border-neutral-200 hover:border-neutral-300 bg-white"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold ${addr.isDefault
                                            ? "bg-[#ee2b4b] text-white"
                                            : "bg-neutral-100 text-neutral-600"
                                            }`}
                                    >
                                        {addr.label}
                                    </span>
                                    <input
                                        type="radio"
                                        name="saved-address"
                                        defaultChecked={addr.isDefault}
                                        className="w-5 h-5 text-[#ee2b4b] border-gray-300 focus:ring-[#ee2b4b] "
                                    />
                                </div>
                                <div className="text-sm text-neutral-600 whitespace-pre-line">
                                    <p className="font-bold text-neutral-900 mb-1">
                                        {user.firstName} {user.lastName}
                                    </p>
                                    {addr.address}
                                    <p className="mt-2 text-neutral-500">{user.phone}</p>
                                </div>
                            </label>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white text-neutral-500 font-medium">
                                or add a new address
                            </span>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <h3 className="text-lg font-bold text-neutral-900 mb-6">
                        Contact Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                defaultValue={`${user.firstName} ${user.lastName}`}
                                className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                defaultValue={user.phone}
                                className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                defaultValue={user.email}
                                className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                            />
                        </div>
                    </div>

                    {/* Address Details (editable form for new address) */}
                    <h3 className="text-lg font-bold text-neutral-900 mb-6 pt-4 border-t border-neutral-100">
                        Address Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Street Address
                            </label>
                            <input
                                className="block w-full rounded-lg border border-neutral-300 text-neutral-900 className= focus:outline-none focus:ring-2 focus:ring-[#ee2b4b] sm:text-sm h-11 px-4"
                                placeholder="Street Address"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                City
                            </label>
                            <input
                                className="block w-full rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b] sm:text-sm h-11 px-4"
                                placeholder="City"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Province
                            </label>
                            <select className="block w-full rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b] sm:text-sm h-11 px-4">
                                <option value="">Select Province</option>
                                <option value="Western">Western Province</option>
                                <option value="Central">Central Province</option>
                                <option value="Southern">Southern Province</option>
                                <option value="Northern">Northern Province</option>
                                <option value="Eastern">Eastern Province</option>
                                <option value="North Western">North Western Province</option>
                                <option value="North Central">North Central Province</option>
                                <option value="Uva">Uva Province</option>
                                <option value="Sabaragamuwa">Sabaragamuwa Province</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Postal Code
                            </label>
                            <input
                                className="block w-full rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b] sm:text-sm h-11 px-4"
                                placeholder="Postal Code"
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Country
                            </label>
                            <select className="block w-full rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b] sm:text-sm h-11 px-4">
                                <option>Sri Lanka</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SavedAddresses;