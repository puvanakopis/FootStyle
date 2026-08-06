"use client";

import Link from "next/link";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";

const FeatureBanner = () => {
  return (
    <section className="mt-12 flex justify-center px-4 md:px-8">
      <div className="w-full max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-slate-100/90 p-8 md:p-14 lg:p-16 text-slate-900">
          {/* Background Ambient Overlay */}
          <div className="absolute -left-16 -top-16 h-80 w-80 rounded-full bg-[#ee2b4b]/10 blur-[100px] pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

          {/* Banner Content */}
          <div className="relative z-10 max-w-xl flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ee2b4b]/20 bg-[#ee2b4b]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#ee2b4b] w-fit">
              <Cpu className="w-3.5 h-3.5 text-[#ee2b4b]" /> Next-Gen Carbon Cushioning
            </div>

            <h2 className="text-3xl font-black text-slate-900 md:text-5xl leading-tight">
              ENGINEERED FOR <br />
              <span className="text-[#ee2b4b]">HYPER PERFORMANCE</span>
            </h2>

            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              Equipped with our carbon-infused plate technology delivering 35% higher energy return. Lightweight comfort, ultimate street resilience.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="group flex h-12 items-center gap-3 rounded-xl bg-[#ee2b4b] px-6 text-xs font-extrabold uppercase tracking-wider text-white hover:bg-[#ff3b5c] transition-all"
              >
                <span>Explore Tech Series</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <Sparkles className="w-4 h-4 text-emerald-500" /> 100% Authentic Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBanner;