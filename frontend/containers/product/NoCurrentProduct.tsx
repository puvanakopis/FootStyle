"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NoCurrentProduct() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="px-8 lg:px-30 py-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h3>
            <p>The product you&#39;re looking for doesn&#39;t exist.</p>
            <button
              onClick={() => router.push('/products')}
              className="bg-[#ee2b4b] hover:bg-[#d62545] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
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