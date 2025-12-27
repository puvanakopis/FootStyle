"use client";

import Input from "@/components/UI/Input";
import { MdOutlinePhonelinkLock } from "react-icons/md";

const SecuritySection = () => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-neutral-900">Security</h2>
        <p className="text-sm text-neutral-500 mt-1">
          Keep your account secure.
        </p>
      </div>

      <form className="space-y-8">
        {/* Change Password */}
        <div>
          <h3 className="font-bold text-neutral-900 mb-4">
            Change Password
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Password */}
            <Input
              label="Current Password"
              placeholder="••••••••"
            />

            <div className="md:col-span-2" />

            {/* New Password */}
            <Input
              label="New Password"
              placeholder="Min. 8 characters"
            />

            {/* Confirm Password */}
            <Input
              label="Confirm New Password"
              placeholder="••••••••"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl px-6 h-10 shadow-sm transition-colors"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="border-t border-neutral-100 pt-6">
          <h3 className="font-bold text-neutral-900 mb-4">
            Two-Factor Authentication
          </h3>

          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl bg-neutral-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <MdOutlinePhonelinkLock size={20} />
              </div>

              <div>
                <p className="font-bold text-sm text-neutral-900">
                  Add an extra layer of security
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Protect your account with 2FA via SMS or Authenticator App.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="text-sm font-bold text-[#ee2b4b] hover:text-red-700 transition-colors"
            >
              Enable
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SecuritySection;