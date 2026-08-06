"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NoCurrentProduct() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#fafafc] text-slate-900">
      <Header />
      <div className="px-4 md:px-10 py-12">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 sm:p-12 text-center max-w-md w-full transition-all duration-300 hover:border-[#ee2b4b]/30 shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ee2b4b]/10 text-2xl text-[#ee2b4b] mb-4">
              🔍
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Product Not Found</h3>
            <p className="text-xs text-slate-500 font-medium mb-6">
              The product you&#39;re looking for doesn&#39;t exist or has been removed from our drop schedule.
            </p>
            <button
              onClick={() => router.push('/products')}
              className="bg-[#ee2b4b] hover:bg-[#ff3b5c] text-white text-xs font-extrabold uppercase tracking-wider py-3.5 px-6 rounded-2xl shadow-md shadow-[#ee2b4b]/20 transition-all duration-300"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}