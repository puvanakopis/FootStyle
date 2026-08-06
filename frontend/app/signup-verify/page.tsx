"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/utils/toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <main className="min-h-screen flex flex-col justify-between bg-[#fafafc] text-slate-900">
            <Header />

            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#ee2b4b]/10 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                {/* Card */}
                <div className="w-full max-w-[480px] bg-white rounded-3xl border border-slate-200/80 relative z-10 overflow-hidden p-8 sm:p-10 flex flex-col gap-6">
                    <div className="text-center flex flex-col items-center">
                        <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#ee2b4b] border border-[#ee2b4b]/20 mb-3">
                            Confirm Registration
                        </span>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">Enter OTP Code</h1>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                            An OTP has been sent to your email:
                            <span className="block font-bold text-[#ee2b4b] mt-1">{email}</span>
                        </p>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={handleOtpConfirm}>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-extrabold uppercase tracking-widest text-slate-500">One-Time Password (OTP)</label>
                            <input
                                type="text"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-900 text-base font-bold placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition-all text-center tracking-widest"
                                required
                                maxLength={6}
                                pattern="[0-9]{6}"
                                title="Please enter a 6-digit OTP"
                            />
                            <p className="text-[11px] text-slate-400 text-center font-medium mt-1">
                                Check your email inbox & spam folder
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 h-12 rounded-xl bg-[#ee2b4b] hover:bg-[#ff3b5c] text-white font-extrabold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                    <span className="ml-2">Verifying OTP...</span>
                                </div>
                            ) : (
                                "Verify & Activate Account"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-xs text-slate-500 font-medium">
                            Didn&apos;t receive the code?
                            <button
                                onClick={() => router.push(`/signup?email=${encodeURIComponent(email)}`)}
                                className="text-[#ee2b4b] font-extrabold ml-1.5 hover:underline"
                            >
                                Back to Signup
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
