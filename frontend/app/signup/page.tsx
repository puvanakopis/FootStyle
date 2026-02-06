"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { showToast } from '@/utils/toast';
import Loading from "@/components/Loading";

export default function Signup() {
    const { requestSignupOtp , isLoading } = useAuth();
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
        // Google signup implementation
        showToast('error', 'Google signup is not implemented yet');
    };


    if (isLoading) return <Loading/>;

    return (
        <main className="min-h-screen bg-background text-foreground">

            {/* Signup Content */}
            <div className="flex-1 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-4 sm:p-6 relative bg-['#dcb8be'] overflow-hidden">
                {/* Background effects (same as login) */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#ee2b4b]/5 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#ee2b4b]/5 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#ee2b4b]/10 blur-3xl" />
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(#ee2b4b 0.5px, transparent 0.5px)",
                            backgroundSize: "32px 32px",
                            opacity: 0.1,
                        }}
                    />
                </div>

                {/* Card */}
                <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 relative z-10 overflow-hidden p-8 sm:p-10 flex flex-col gap-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-black text-text-dark">Create account</h1>
                        <p className="text-gray-400 mt-1">Sign up to get started</p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleSignup}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-bold text-text-dark">First Name</span>
                                <input
                                    type="text"
                                    placeholder="Puvanakopis"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="h-12 px-4 rounded-lg border border-[#e7cfd3] focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                    required
                                    disabled={loading}
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-bold text-text-dark">Last Name</span>
                                <input
                                    type="text"
                                    placeholder="Mehanathan"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="h-12 px-4 rounded-lg border border-[#e7cfd3] focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                    required
                                    disabled={loading}
                                />
                            </label>
                        </div>

                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-bold text-text-dark">Email Address</span>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 px-4 rounded-lg border border-[#e7cfd3] focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                required
                                disabled={loading}
                            />
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-bold text-text-dark">Password</span>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 w-full px-4 pr-12 rounded-lg border border-[#e7cfd3] focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                    required
                                    minLength={6}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark"
                                    disabled={loading}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-bold text-text-dark">Confirm Password</span>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="h-12 w-full px-4 pr-12 rounded-lg border border-[#e7cfd3] focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                    required
                                    minLength={6}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark"
                                    disabled={loading}
                                >
                                    {showConfirmPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`h-12 rounded-lg bg-[#ee2b4b] hover:bg-red-600 text-white font-bold shadow-lg shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/30 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    <span className="ml-2">Sending OTP...</span>
                                </div>
                            ) : (
                                'Send OTP'
                            )}
                        </button>
                    </form>

                    <div className="flex items-center gap-4">
                        <div className="flex-grow border-t border-[#e7cfd3]" />
                        <span className="text-xs uppercase tracking-wider text-text-muted">
                            Or continue with
                        </span>
                        <div className="flex-grow border-t border-[#e7cfd3]" />
                    </div>

                    <button
                        onClick={handleGoogleSignup}
                        className="h-11 flex items-center justify-center gap-2 rounded-lg border border-[#e7cfd3] bg-white font-bold hover:bg-gray-50 transition"
                        disabled={loading}
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>

                    <p className="text-center text-sm text-text-muted">
                        Already have an account?
                        <Link
                            href="/login"
                            className="text-[#ee2b4b] font-bold ml-1 hover:underline"
                            onClick={(e) => {
                                if (loading) {
                                    e.preventDefault();
                                    showToast('info', 'Please wait for the current operation to complete');
                                }
                            }}
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}