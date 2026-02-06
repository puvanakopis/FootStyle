"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/containers/home/HeroSection";
import ProductGrid from "@/containers/home/TrendingProductGrid";
import FeatureBanner from "@/containers/home/FeatureBanner";
import CTASection from "@/containers/home/CTASection";
import { useProduct } from "@/context/ProductContext";
import Loading from "@/components/Loading";

export default function Home() {
  const { products, fetchProducts, isLoading } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, []);

  const getAverageRating = (reviews: { rating: number }[]) =>
    reviews && reviews.length
      ? parseFloat(
        (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      )
      : 0;

  const topProducts = [...products]
    .sort((a, b) => getAverageRating(b.reviews) - getAverageRating(a.reviews))
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {isLoading ? (
        <Loading message="Loading products..." />
      ) : (
        <div>
          <HeroSection />
          <ProductGrid products={topProducts} getAverageRating={getAverageRating} />
          <FeatureBanner />
          <CTASection />
        </div>
      )}

      <Footer />
    </main>
  );
}