'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
import Loading from "@/components/Loading";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading } = useAuth();
    const router = useRouter();

    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowLoading(false), 4000);
        return () => clearTimeout(timer);
    }, []);


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

    if (showLoading) return <Loading />;

    return (
        <main className="flex-1 min-h-screen flex justify-center items-center bg-background text-foreground">
            {/* Login Content */}
            <div className="flex-1 flex flex-col min-h-[calc(100vh-140px)] items-center justify-center p-4 sm:p-6 relative bg-['#dcb8be] overflow-hidden">
                {/* Background effects */}
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
                <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 relative z-10 overflow-hidden">
                    <div className="p-8 sm:p-10 flex flex-col gap-6">
                        {/* Header */}
                        <div className="text-center">
                            <h1 className="text-3xl font-black text-text-dark">
                                Welcome back
                            </h1>
                            <p className="text-text-muted mt-1 text-gray-400">
                                Enter your details to access your account
                            </p>
                        </div>

                        {/* Form */}
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            {/* Email */}
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-bold text-text-dark">Email Address</span>
                                <input
                                    type="email"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 px-4 rounded-lg border border-[#e7cfd3] bg-['#dcb8be] text-text-dark focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                    required
                                    disabled={isLoading}
                                />
                            </label>

                            {/* Password */}
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-bold text-text-dark">Password</span>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 w-full px-4 pr-12 rounded-lg border border-[#e7cfd3] bg-['#dcb8be] text-text-dark focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                        required
                                        minLength={6}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                                <div className="flex justify-end">
                                    <Link href="/forgot-password" className="text-[#ee2b4b] text-sm font-bold hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </label>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="h-12 rounded-lg bg-[#ee2b4b] hover:bg-red-600 text-white font-bold shadow-lg shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                        <span className="ml-2">Logging in...</span>
                                    </div>
                                ) : (
                                    'Log in with Email'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="flex-grow border-t border-[#e7cfd3]" />
                            <span className="text-xs uppercase tracking-wider text-text-muted">Or continue with</span>
                            <div className="flex-grow border-t border-[#e7cfd3]" />
                        </div>

                        {/* OAuth */}
                        <div className="grid">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="h-11 flex items-center justify-center gap-2 rounded-lg border border-[#e7cfd3] bg-white font-bold hover:bg-gray-50 transition disabled:opacity-50"
                            >
                                <FcGoogle className="text-xl" />
                                Continue with Google
                            </button>
                        </div>

                        {/* Footer */}
                        <p className="text-center text-sm text-text-muted">
                            Don&apos;t have an account?
                            <Link href="/signup" className="text-[#ee2b4b] font-bold ml-1 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
