"use client";

import { IoHomeOutline } from "react-icons/io5";
import { PiBuildingApartment } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { Address } from "@/interfaces/authInterface";
import { User, ShieldCheck } from "lucide-react";

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
    <div className="lg:col-span-9 space-y-6">
      {/* Profile Header VIP Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-r from-white via-slate-50 to-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ee2b4b] text-white">
            <User className="w-8 h-8" />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ee2b4b] bg-[#ee2b4b]/10 border border-[#ee2b4b]/20 px-2.5 py-0.5 rounded-md">
                VIP SNEAKERHEAD TIER
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900">{formData.firstName} {formData.lastName}</h2>
            <p className="text-xs text-slate-500 font-medium">{formData.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white border border-slate-200/80 px-4 py-2.5 rounded-2xl">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <div className="text-left">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Account Status</span>
            <span className="text-xs font-bold text-slate-900">Verified Collector</span>
          </div>
        </div>
      </div>

      {/* Personal Info Section */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex justify-between items-center mb-6 border-b border-slate-200/80 pb-4">
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">Personal Information</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full rounded-xl border border-slate-200/80 bg-slate-100 py-3 px-4 text-xs font-bold text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b]"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#ee2b4b] hover:bg-[#ff3b5c] disabled:opacity-40 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl px-7 py-3 transition-all cursor-pointer"
            >
              {isSubmitting ? "Saving..." : "Save Profile Details"}
            </button>
          </div>
        </form>
      </section>

      {/* Shipping Address Section */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex justify-between items-center mb-6 border-b border-slate-200/80 pb-4">
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">Default Shipping Address</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              className="text-xs font-extrabold text-[#ee2b4b] uppercase tracking-wider hover:underline"
            >
              {isEditingAddress ? "Cancel" : "Edit Address"}
            </button>
            {!isAddressEmpty() && (
              <button
                onClick={handleClearAddress}
                disabled={isSubmitting}
                className="flex items-center gap-1 text-xs font-extrabold text-red-600 uppercase tracking-wider hover:underline disabled:opacity-40"
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
              <div className="space-y-2 md:col-span-2">
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address?.street || ""}
                  onChange={(e) => handleAddressChange("street", e.target.value)}
                  className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b]"
                  placeholder="Enter street address"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Province</label>
                <select
                  value={formData.address?.province || ""}
                  onChange={(e) => handleAddressChange("province", e.target.value)}
                  className="block w-full rounded-xl border border-slate-200/80 bg-slate-50 h-11 px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#ee2b4b]"
                >
                  <option value="">Select Province</option>
                  {Object.keys(provinceDistricts).map((prov) => (
                    <option key={prov} value={prov}>
                      {prov} Province
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">District</label>
                <select
                  value={formData.address?.district || ""}
                  onChange={(e) => handleAddressChange("district", e.target.value)}
                  className="block w-full rounded-xl border border-slate-200/80 bg-slate-50 h-11 px-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#ee2b4b]"
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
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  value={formData.address?.zipCode || ""}
                  onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                  className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b]"
                  placeholder="ZIP code"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.address?.country || ""}
                  onChange={(e) => handleAddressChange("country", e.target.value)}
                  className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b]"
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditingAddress(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200/80 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#ee2b4b] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#ff3b5c] transition-all disabled:opacity-40"
              >
                {isSubmitting ? "Saving..." : "Save Address"}
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`relative p-5 rounded-2xl transition-all ${isAddressEmpty()
                ? "border border-dashed border-slate-300 bg-slate-50"
                : "border border-[#ee2b4b]/30 bg-[#ee2b4b]/5"
              }`}
          >
            <div className="flex items-center gap-2 mb-3">
              {getAddressLabel() === "Home" ? (
                <IoHomeOutline className="text-[#ee2b4b]" />
              ) : getAddressLabel() === "Apartment" ? (
                <PiBuildingApartment className="text-[#ee2b4b]" />
              ) : (
                <IoHomeOutline className="text-slate-400" />
              )}
              <span className="font-bold text-slate-900 text-sm">{getAddressLabel()}</span>

              {!isAddressEmpty() && (
                <span className="text-[9px] font-extrabold uppercase bg-[#ee2b4b] text-white px-2.5 py-0.5 rounded-md ml-2">
                  PRIMARY
                </span>
              )}
            </div>

            {isAddressEmpty() ? (
              <p className="text-xs text-slate-500 italic">
                No shipping address configured. Click Edit Address to set delivery destination.
              </p>
            ) : (
              <div className="text-xs text-slate-700 space-y-1 font-semibold">
                {formData.address?.street && <p>{formData.address.street}</p>}
                <div className="flex flex-wrap gap-1">
                  {formData.address?.district && <span>{formData.address.district}</span>}
                  {formData.address?.province && <span>, {formData.address.province}</span>}
                  {formData.address?.zipCode && <span> - {formData.address.zipCode}</span>}
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