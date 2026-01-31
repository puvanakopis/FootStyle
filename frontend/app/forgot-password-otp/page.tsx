"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/lib/toast";

export default function ForgotPasswordOtp() {
    const { verifyPasswordResetOtp, isLoading, clearError } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "";
    const [otp, setOtp] = useState("");

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (!otp.trim()) {
            showToast("error", "OTP is required");
            return;
        }

        try {
            await verifyPasswordResetOtp({ email, otp });

            showToast("success", "OTP verified successfully!");

            router.push(
                `/forgot-password-verify?email=${encodeURIComponent(email)}&otp=${otp}`
            );
        } catch (err) {
            showToast("error", "Invalid OTP. Please try again.");
            console.error("Verify Password Reset OTP Error:", err);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-black text-center mb-6">
                    Verify OTP
                </h1>

                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                    <input
                        type="text"
                        required
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="h-12 px-4 rounded-lg border"
                    />

                    <button
                        disabled={isLoading}
                        className="h-12 bg-[#ee2b4b] text-white rounded-lg font-bold"
                    >
                        {isLoading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            </div>
        </main>
    );
}