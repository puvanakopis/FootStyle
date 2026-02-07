"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/utils/toast";

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
        <main className="flex-1 min-h-screen flex justify-center items-center bg-background text-foreground">

            {/* Background Wrapper */}
            <div className="flex-1 flex flex-col min-h-[calc(100vh-140px)] items-center justify-center p-4 sm:p-6 relative bg-['#dcb8be] overflow-hidden">

                {/* Background Effects */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#ee2b4b]/5 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#ee2b4b]/5 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#ee2b4b]/10 blur-3xl" />

                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(#ee2b4b 0.5px, transparent 0.5px)",
                            backgroundSize: "32px 32px",
                            opacity: 0.1,
                        }}
                    />
                </div>

                {/* Card */}
                <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 relative z-10 overflow-hidden">
                    <div className="p-8 sm:p-10 flex flex-col gap-6">

                        {/* Header */}
                        <div className="text-center">
                            <h1 className="text-3xl font-black text-text-dark">Reset Password</h1>
                            <p className="text-text-muted mt-1 text-gray-400">
                                Enter your new password to complete the reset process
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleResetPassword} className="flex flex-col gap-5">

                            {/* New Password */}
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-bold text-text-dark">New Password</span>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="h-12 w-full px-4 pr-12 rounded-lg border border-[#e7cfd3] bg-['#dcb8be] text-text-dark focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                        disabled={isLoading}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark"
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
                                className="h-12 rounded-lg bg-[#ee2b4b] hover:bg-red-600 text-white font-bold shadow-lg shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                        <span className="ml-2">Updating...</span>
                                    </div>
                                ) : (
                                    "Update Password"
                                )}
                            </button>
                        </form>

                    </div>
                </div>

            </div>
        </main>
    );
}