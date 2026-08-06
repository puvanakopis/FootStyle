"use client";

import { useState } from "react";
import { Mail, Sparkles, CheckCircle } from "lucide-react";
import { showToast } from "@/utils/toast";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    showToast("success", "Welcome to FootStyle VIP Access!");
  };

  return (
    <section className="flex justify-center px-4 py-16 md:px-8">
      <div className="relative w-full max-w-[1020px] overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white p-8 text-center md:p-14">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#ee2b4b]/10 blur-[100px] pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ee2b4b]/20 bg-[#ee2b4b]/10 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-[#ee2b4b]">
            <Sparkles className="w-3.5 h-3.5" /> VIP Sneaker Club
          </span>

          <h2 className="max-w-[720px] text-3xl font-black text-slate-900 leading-tight tracking-tight md:text-4xl">
            GET 10% OFF YOUR FIRST DROP
          </h2>

          <p className="max-w-[600px] text-sm text-slate-600 font-medium">
            Unlock early drop access, private restock alerts, and exclusive members-only coupon codes.
          </p>

          {isSubmitted ? (
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-50 px-6 py-4 text-emerald-700 text-sm font-bold animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>You&apos;re on the VIP list! Check your inbox for your 10% discount code.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full rounded-xl border border-slate-200/80 bg-slate-50 py-3.5 pl-11 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b4b] focus:ring-1 focus:ring-[#ee2b4b] transition-all"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center rounded-xl bg-[#ee2b4b] px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white hover:bg-[#ff3b5c] transition-all shrink-0"
              >
                Join VIP Access
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-400 font-medium">
            No spam guaranteed. Unsubscribe anytime with one click.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;