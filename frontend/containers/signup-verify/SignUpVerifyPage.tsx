"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignPpVerifyPage() {
    const { verifySignupOtp } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOtpConfirm = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) {
            alert("Email is required. Please return to signup page.");
            return;
        }
        
        setLoading(true);
        try {
            await verifySignupOtp({ email, otp });
            alert("OTP verified! Account created successfully.");
            router.push("/login");
        } catch (error: any) {
            alert(error?.response?.data?.message || "OTP verification failed");
            setOtp("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-1 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative bg-['#dcb8be'] overflow-hidden">
            <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 relative z-10 overflow-hidden p-8 sm:p-10 flex flex-col gap-6">
                <div className="text-center">
                    <h1 className="text-3xl font-black text-text-dark">Enter OTP</h1>
                    <p className="text-gray-400 mt-1">
                        An OTP has been sent to your email: {email}
                    </p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handleOtpConfirm}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="h-12 px-4 rounded-lg border border-[#e7cfd3] focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`h-12 rounded-lg bg-[#ee2b4b] hover:bg-red-600 text-white font-bold shadow-lg shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/30 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </main>
    );
}