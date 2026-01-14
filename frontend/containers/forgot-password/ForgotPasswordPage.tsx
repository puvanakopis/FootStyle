"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPasswordPage() {
    const { requestPasswordResetOtp, isLoading, error, clearError } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        await requestPasswordResetOtp(email);
        router.push(`/forgot-password-otp?email=${encodeURIComponent(email)}`);
    };

    return (
        <main className="flex min-h-screen justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <h1 className="text-3xl font-black text-center mb-6">
                    Forgot Password
                </h1>

                {error && (
                    <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                    <input
                        type="email"
                        required
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 px-4 rounded-lg border"
                    />

                    <button
                        disabled={isLoading}
                        className="h-12 bg-[#ee2b4b] text-white rounded-lg font-bold"
                    >
                        {isLoading ? "Sending..." : "Send OTP"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Remembered your password?
                    <Link href="/login" className="text-[#ee2b4b] font-bold ml-1">
                        Log in
                    </Link>
                </p>
            </div>
        </main>
    );
}