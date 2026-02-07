"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/utils/toast";

export default function SignupVerify() {
    const { verifySignupOtp } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOtpConfirm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            showToast("error", "Email is required. Please return to signup page.");
            return;
        }

        setLoading(true);
        try {
            await verifySignupOtp({ email, otp });

            showToast("success", "OTP verified! Account created successfully.");

            router.push("/login");
        } catch (error) {
            showToast("error", "OTP verification failed");
            console.error("OTP verification error:", error);
            setOtp("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="flex-1 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-4 sm:p-6 relative bg-['#dcb8be'] overflow-hidden">

                {/* Background */}
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
                <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 relative z-10 overflow-hidden p-8 sm:p-10 flex flex-col gap-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-black text-text-dark">Enter OTP</h1>
                        <p className="text-gray-400 mt-1">
                            An OTP has been sent to your email:
                            <span className="block font-medium text-text-dark mt-1">{email}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Please check your inbox (and spam folder)
                        </p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleOtpConfirm}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-text-dark">One-Time Password (OTP)</label>
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="h-12 px-4 rounded-lg border border-[#e7cfd3] focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition text-center text-lg tracking-widest"
                                required
                                maxLength={6}
                                pattern="[0-9]{6}"
                                title="Please enter a 6-digit OTP"
                            />
                            <p className="text-xs text-gray-500 text-center">
                                Enter the 6-digit code sent to your email
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`h-12 rounded-lg bg-[#ee2b4b] hover:bg-red-600 text-white font-bold shadow-lg shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/30 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    <span className="ml-2">Verifying OTP...</span>
                                </div>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-text-muted">
                            Didn&apos;t receive the OTP?
                            <button
                                onClick={() => router.push(`/signup?email=${encodeURIComponent(email)}`)}
                                className="text-[#ee2b4b] font-bold ml-1 hover:underline"
                            >
                                Go back to signup
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}