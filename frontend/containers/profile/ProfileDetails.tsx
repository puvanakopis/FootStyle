"use client";

import { IoHomeOutline } from "react-icons/io5";
import { PiBuildingApartment } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { Address } from "@/interfaces/authInterface";

interface ProfileDetailsProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address?: Address;
  };
  isEditingAddress: boolean;
  isSubmitting: boolean;
  provinceDistricts: Record<string, string[]>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddressChange: (field: keyof Address, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSaveAddress: () => void;
  handleClearAddress: () => void;
  setIsEditingAddress: React.Dispatch<React.SetStateAction<boolean>>;
  isAddressEmpty: () => boolean;
  getAddressLabel: () => string;
}

const ProfileDetails = ({
  formData,
  isEditingAddress,
  isSubmitting,
  provinceDistricts,
  handleChange,
  handleAddressChange,
  handleSubmit,
  handleSaveAddress,
  handleClearAddress,
  setIsEditingAddress,
  isAddressEmpty,
  getAddressLabel,
}: ProfileDetailsProps) => {
  return (
    <div className="lg:col-span-9 space-y-8">
      {/* Personal Info */}
      <section className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-neutral-900">Personal Information</h2>
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
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
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
          <h2 className="text-xl font-bold text-neutral-900">Shipping Address</h2>
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

              {/* Province Dropdown */}
              <div className="space-y-2 md:col-span-1">
                <label className="block text-sm font-medium mb-2">Province</label>
                <select
                  value={formData.address?.province || ""}
                  onChange={(e) => handleAddressChange("province", e.target.value)}
                  className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b] bg-white text-sm text-gray-900"
                >
                  <option value="">Select Province</option>
                  {Object.keys(provinceDistricts).map((prov) => (
                    <option key={prov} value={prov}>
                      {prov} Province
                    </option>
                  ))}
                </select>
              </div>

              {/* District Dropdown */}
              <div className="space-y-2 md:col-span-1">
                <label className="block text-sm font-medium mb-2">District</label>
                <select
                  value={formData.address?.district || ""}
                  onChange={(e) => handleAddressChange("district", e.target.value)}
                  className="block w-full rounded-lg border border-neutral-300 h-11 px-4 focus:ring-[#ee2b4b] bg-white text-sm text-gray-900"
                  disabled={!formData.address?.province}
                >
                  <option value="">Select District</option>
                  {formData.address?.province &&
                    provinceDistricts[formData.address.province]?.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                </select>
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
              <span className="font-bold text-neutral-900">{getAddressLabel()}</span>

              {!isAddressEmpty() && (
                <span className="text-[10px] font-bold uppercase bg-[#ee2b4b] text-white px-2 py-0.5 rounded-full ml-2">
                  Default
                </span>
              )}
            </div>

            {isAddressEmpty() ? (
              <p className="text-sm text-neutral-500 italic">
                No address saved. Click Edit Address to add one.
              </p>
            ) : (
              <div className="text-sm text-neutral-600 space-y-1">
                {formData.address?.street && <p>{formData.address.street}</p>}
                <div className="flex flex-wrap gap-1">
                  {formData.address?.district && <span>{formData.address.district}</span>}
                  {formData.address?.province && <span>, {formData.address.province}</span>}
                  {formData.address?.zipCode && <span>{formData.address.zipCode}</span>}
                </div>
                {formData.address?.country && <p>{formData.address.country}</p>}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfileDetails;