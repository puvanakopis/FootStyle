"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/utils/toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForgotPasswordVerify() {
    const { resetPassword, isLoading, clearError } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "";
    const otp = searchParams.get("otp") || "";

    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (!newPassword.trim()) {
            showToast("error", "Password cannot be empty");
            return;
        }

        try {
            await resetPassword({ email, otp, newPassword });
            showToast("success", "Password updated successfully!");
            router.push("/login");
        } catch (err) {
            showToast("error", "Failed to update password.");
            console.error("Update password error:", err);
        }
    };

    return (
        <main className="min-h-screen flex flex-col justify-between bg-[#fafafc] text-slate-900">
            <Header />

            {/* Background Wrapper */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#ee2b4b]/10 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                {/* Card */}
                <div className="w-full max-w-[460px] bg-white rounded-3xl border border-slate-200/80 relative z-10 overflow-hidden p-8 sm:p-10 flex flex-col gap-6">
                    {/* Header */}
                    <div className="text-center flex flex-col items-center">
                        <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#ee2b4b] border border-[#ee2b4b]/20 mb-3">
                            New Password Setup
                        </span>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">Reset Password</h1>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                            Enter your new password to complete the reset process
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                        {/* New Password */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">New Password</span>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="h-12 w-full px-4 pr-12 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-900 text-xs font-bold placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition-all"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                                    disabled={isLoading}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 h-12 rounded-xl bg-[#ee2b4b] hover:bg-[#ff3b5c] text-white font-extrabold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                    <span className="ml-2">Updating...</span>
                                </div>
                            ) : (
                                "Update Password"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </main>
    );
}
