"use client";

import { useState } from "react";

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "Puvanakopis",
    lastName: "Mehanathan",
    email: "puvanakopis@gmail.com",
    phone: "+94 75 78 94 561",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saved Data:", formData);
  };

  return (
    <div className="lg:col-span-9 space-y-8">

      {/* --------------- Personal Information --------------- */}
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
    </div>
  );
};

export default AccountDetails;