'use client';

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login(email, password);
            router.push('/');
            showToast('success', 'Login successful!');
        } catch (error: any) {
            console.error('Login failed:', error);

            const errorMsg =
                error?.response?.data?.message ||
                error?.message ||
                'Login failed. Please check your credentials.';

            showToast('error', errorMsg);
        }
    };

    const handleGoogleLogin = () => {
        showToast('error', 'Google login is not implemented yet');
    };

    return (
        <main className="min-h-screen flex flex-col justify-between bg-[#fafafc] text-slate-900">
            <Header />

            {/* Login Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#ee2b4b]/10 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                {/* Card */}
                <div className="w-full max-w-[460px] bg-white rounded-3xl border border-slate-200/80 relative z-10 overflow-hidden p-8 sm:p-10 flex flex-col gap-6">
                    {/* Header */}
                    <div className="text-center flex flex-col items-center">
                        <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#ee2b4b] border border-[#ee2b4b]/20 mb-3">
                            VIP Member Access
                        </span>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">
                            Welcome Back
                        </h1>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                            Enter your credentials to access your FootStyle account
                        </p>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {/* Email */}
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Email Address</span>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-900 text-xs font-bold placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition-all"
                                required
                                disabled={isLoading}
                            />
                        </label>

                        {/* Password */}
                        <label className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Password</span>
                                <Link href="/forgot-password" className="text-[#ee2b4b] text-xs font-extrabold hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 w-full px-4 pr-12 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-900 text-xs font-bold placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition-all"
                                    required
                                    minLength={6}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                                    disabled={isLoading}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 h-12 rounded-xl bg-[#ee2b4b] hover:bg-[#ff3b5c] text-white font-extrabold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                    <span className="ml-2">Logging in...</span>
                                </div>
                            ) : (
                                'Log In with Email'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                        <div className="flex-grow border-t border-slate-200/80" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Or continue with</span>
                        <div className="flex-grow border-t border-slate-200/80" />
                    </div>

                    {/* OAuth */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="h-11 flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 transition disabled:opacity-50 cursor-pointer"
                    >
                        <FcGoogle className="text-lg" />
                        Continue with Google
                    </button>

                    {/* Footer link */}
                    <p className="text-center text-xs font-medium text-slate-500">
                        Don&apos;t have an account?
                        <Link href="/signup" className="text-[#ee2b4b] font-extrabold ml-1.5 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}

