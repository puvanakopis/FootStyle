"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { showToast } from '@/utils/toast';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Signup() {
    const { requestSignupOtp } = useAuth();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate passwords match
        if (password !== confirmPassword) {
            showToast('error', "Passwords do not match");
            return;
        }

        // Validate password length
        if (password.length < 6) {
            showToast('error', "Password must be at least 6 characters long");
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('error', "Please enter a valid email address");
            return;
        }

        setLoading(true);
        try {
            await requestSignupOtp({ firstName, lastName, email, password });
            showToast('success', 'OTP sent successfully! Please check your email');
            router.push(`/signup-verify?email=${encodeURIComponent(email)}`);
        } catch (error) {
            showToast('error', "Failed to send OTP");
            console.error('Signup error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        showToast('error', 'Google signup is not implemented yet');
    };

    return (
        <main className="min-h-screen flex flex-col justify-between bg-[#fafafc] text-slate-900">
            <Header />

            {/* Signup Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#ee2b4b]/10 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                {/* Card */}
                <div className="w-full max-w-[500px] bg-white rounded-3xl border border-slate-200/80 relative z-10 overflow-hidden p-8 sm:p-10 flex flex-col gap-6">
                    <div className="text-center flex flex-col items-center">
                        <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#ee2b4b] border border-[#ee2b4b]/20 mb-3">
                            Join FootStyle Club
                        </span>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">Create Account</h1>
                        <p className="text-xs text-slate-500 font-medium mt-1">Sign up for exclusive streetwear drop alerts</p>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">First Name</span>
                                <input
                                    type="text"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-900 text-xs font-bold placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition-all"
                                    required
                                    disabled={loading}
                                />
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Last Name</span>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-900 text-xs font-bold placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition-all"
                                    required
                                    disabled={loading}
                                />
                            </label>
                        </div>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Email Address</span>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-900 text-xs font-bold placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition-all"
                                required
                                disabled={loading}
                            />
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Password</span>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 w-full px-4 pr-12 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-900 text-xs font-bold placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition-all"
                                    required
                                    minLength={6}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                                    disabled={loading}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Confirm Password</span>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="h-12 w-full px-4 pr-12 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-900 text-xs font-bold placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition-all"
                                    required
                                    minLength={6}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                                    disabled={loading}
                                >
                                    {showConfirmPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 h-12 rounded-xl bg-[#ee2b4b] hover:bg-[#ff3b5c] text-white font-extrabold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                    <span className="ml-2">Sending OTP...</span>
                                </div>
                            ) : (
                                'Send OTP'
                            )}
                        </button>
                    </form>

                    <div className="flex items-center gap-4">
                        <div className="flex-grow border-t border-slate-200/80" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                            Or continue with
                        </span>
                        <div className="flex-grow border-t border-slate-200/80" />
                    </div>

                    <button
                        onClick={handleGoogleSignup}
                        className="h-11 flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
                        disabled={loading}
                    >
                        <FcGoogle className="text-lg" />
                        Continue with Google
                    </button>

                    <p className="text-center text-xs font-medium text-slate-500">
                        Already have an account?
                        <Link
                            href="/login"
                            className="text-[#ee2b4b] font-extrabold ml-1.5 hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
