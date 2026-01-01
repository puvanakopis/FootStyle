"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<"email" | "otp" | "reset">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Send OTP to:", email);
        setStep("otp");
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Verify OTP:", otp);
        setStep("reset");
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Update password for:", email, "New password:", newPassword);
        alert("Password updated successfully!");
    };

    return (
        <main className="flex min-h-screen bg-['#dcb8be] justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-10">

                {step === "email" && (
                    <>
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-black text-text-dark">Forgot Password</h1>
                            <p className="text-gray-400 mt-1">Enter your email to reset your password</p>
                        </div>
                        <form className="flex flex-col gap-4" onSubmit={handleSendOtp}>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 px-4 rounded-lg border border-[#e7cfd3] focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                            />
                            <button
                                type="submit"
                                className="h-12 rounded-lg bg-[#ee2b4b] hover:bg-red-600 text-white font-bold shadow-md shadow-[#ee2b4b]/20 transition"
                            >
                                Send OTP
                            </button>
                        </form>
                    </>
                )}

                {step === "otp" && (
                    <>
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-black text-text-dark">Enter OTP</h1>
                            <p className="text-gray-400 mt-1">An OTP has been sent to your email: {email}</p>
                        </div>
                        <form className="flex flex-col gap-4" onSubmit={handleVerifyOtp}>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="h-12 px-4 rounded-lg border border-[#e7cfd3] focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                            />
                            <button
                                type="submit"
                                className="h-12 rounded-lg bg-[#ee2b4b] hover:bg-red-600 text-white font-bold shadow-md shadow-[#ee2b4b]/20 transition"
                            >
                                Verify OTP
                            </button>
                        </form>
                    </>
                )}

                {step === "reset" && (
                    <>
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-black text-text-dark">Reset Password</h1>
                            <p className="text-gray-400 mt-1">Enter your new password</p>
                        </div>
                        <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="h-12 w-full px-4 pr-12 rounded-lg border border-[#e7cfd3] focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="h-12 rounded-lg bg-[#ee2b4b] hover:bg-red-600 text-white font-bold shadow-md shadow-[#ee2b4b]/20 transition"
                            >
                                Update Password
                            </button>
                        </form>
                    </>
                )}

                <p className="text-center text-sm text-gray-500 mt-6">
                    Remembered your password?
                    <Link href="/login" className="text-[#ee2b4b] font-bold ml-1 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </main>
    );
}
