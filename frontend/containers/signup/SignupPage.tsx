"use client";

import Link from "next/dist/client/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        console.log({
            firstName,
            lastName,
            email,
            password,
        });
    };

    return (
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative bg-['#dcb8be] overflow-hidden">
            {/* Background effects */}
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
            <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 relative z-10 overflow-hidden">
                <div className="p-8 sm:p-10 flex flex-col gap-6">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-3xl font-black text-text-dark">
                            Create account
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Sign up to get started
                        </p>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-bold text-text-dark">
                                    First Name
                                </span>
                                <input
                                    type="text"
                                    placeholder="Puvanakopis"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="h-12 px-4 rounded-lg border border-[#e7cfd3] text-text-dark focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-bold text-text-dark">
                                    Last Name
                                </span>
                                <input
                                    type="text"
                                    placeholder="Mehanathan"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="h-12 px-4 rounded-lg border border-[#e7cfd3] text-text-dark focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                />
                            </label>
                        </div>

                        {/* Email */}
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-bold text-text-dark">
                                Email Address
                            </span>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 px-4 rounded-lg border border-[#e7cfd3] text-text-dark focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                            />
                        </label>

                        {/* Password */}
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-bold text-text-dark">
                                Password
                            </span>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 w-full px-4 pr-12 rounded-lg border border-[#e7cfd3] text-text-dark focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </label>

                        {/* Confirm Password */}
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-bold text-text-dark">
                                Confirm Password
                            </span>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="h-12 px-4 rounded-lg border border-[#e7cfd3] text-text-dark focus:ring-2 focus:ring-[#ee2b4b]/20 focus:border-[#ee2b4b] outline-none transition"
                            />
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="h-12 rounded-lg bg-[#ee2b4b] hover:bg-red-600 text-white font-bold shadow-lg shadow-[#ee2b4b]/20 hover:shadow-[#ee2b4b]/30 transition"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                        <div className="flex-grow border-t border-[#e7cfd3]" />
                        <span className="text-xs uppercase tracking-wider text-text-muted">
                            Or continue with
                        </span>
                        <div className="flex-grow border-t border-[#e7cfd3]" />
                    </div>

                    {/* OAuth */}
                    <button className="h-11 flex items-center justify-center gap-2 rounded-lg border border-[#e7cfd3] bg-white font-bold hover:bg-gray-50 transition">
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>

                    {/* Footer */}
                    <p className="text-center text-sm text-text-muted">
                        Already have an account?
                        <Link
                            href="/login"
                            className="text-[#ee2b4b] font-bold ml-1 hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}