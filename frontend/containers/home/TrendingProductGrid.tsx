"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

interface ProductGridProps {
  products: any[];
  getAverageRating: (reviews: { rating: number }[]) => number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, getAverageRating }) => {
  const [activeTab, setActiveTab] = useState("All Drops");
  const tabs = ["All Drops", "Trending Now", "New Arrivals", "Best Rated"];

  return (
    <>
      <SectionHeader
        title="HOTTEST DROPS"
        linkText="View All Drops"
        subtitle="Exclusive Streetwear"
        linkHref="/products"
      />

      <section className="flex flex-col items-center px-4 py-6 md:px-8">
        <div className="w-full max-w-[1280px]">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#ee2b4b] text-white shadow-md shadow-[#ee2b4b]/20 border border-[#ee2b4b]"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                {tab === "Trending Now" && <Flame className="w-3.5 h-3.5 text-amber-500" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, idx) => (
              <ProductCard
                key={product._id || idx}
                id={product._id}
                name={product.name}
                gender={product.gender}
                price={`Rs ${product.price?.toLocaleString() || product.price}`}
                averageRating={getAverageRating(product.reviews).toString()}
                imageUrl={product.images && product.images[0] ? product.images[0] : ""}
                badge={idx === 0 ? "HOT DROP" : idx === 1 ? "LIMITED" : undefined}
              />
            ))}
          </div>

          {/* Mobile View All CTA */}
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-700 shadow-sm hover:bg-[#ee2b4b] hover:text-white transition-all"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductGrid;