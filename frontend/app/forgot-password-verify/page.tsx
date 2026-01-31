"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/lib/toast";

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
            console.error("update password Error:", err);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-black text-center mb-6">
                    Reset Password
                </h1>

                <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="h-12 w-full px-4 pr-12 rounded-lg border"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <button
                        disabled={isLoading}
                        className="h-12 bg-[#ee2b4b] text-white rounded-lg font-bold"
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </main>
    );
}