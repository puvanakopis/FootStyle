"use client";

import React from "react";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";

interface ProductGridProps {
  products: any[];
  getAverageRating: (reviews: { rating: number }[]) => number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, getAverageRating }) => {
  return (
    <>
      <SectionHeader
        title="Trending Now"
        linkText="View All Products"
        subtitle="Don't Miss Out"
        linkHref="/products"
      />

      <section className="flex justify-center px-4 py-8 md:px-10">
        <div className="w-full max-w-[1280px]">
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                gender={product.gender}
                price={`Rs ${product.price.toFixed(2)}`}
                averageRating={getAverageRating(product.reviews).toString()}
                imageUrl={product.images[0]}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <button className="rounded-lg border border-[#e6d0d5] px-6 py-2.5 text-sm font-bold text-text-main-light hover:bg-white">
              View All Products
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductGrid;