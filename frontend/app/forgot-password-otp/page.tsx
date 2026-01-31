"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPasswordOtp() {
    const { verifyPasswordResetOtp, isLoading, error, clearError } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "";
    const [otp, setOtp] = useState("");

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        await verifyPasswordResetOtp({ email, otp });
        router.push(`/forgot-password-verify?email=${encodeURIComponent(email)}&otp=${otp}`);
    };

    return (
        <main className="min-h-screen bg-background text-foreground flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-black text-center mb-6">
                    Verify OTP
                </h1>

                {error && (
                    <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
                )}

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