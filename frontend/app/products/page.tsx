"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Filters from '@/containers/products/Filters';
import ProductGrid from '@/containers/products/ProductGrid';
import Loading from '@/components/loading';

import { useEffect } from "react";
import { useProduct } from "@/context/ProductContext";
import { showToast } from "@/lib/toast";

export default function Products() {
  const { products, fetchProducts, isLoading, error } = useProduct();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (error) {
      showToast('error', error);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="px-30 py-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-1/5">
            <Filters />
          </div>

          <div className="w-full lg:w-4/5">
            {/* Loading State */}
            {isLoading && <Loading />}

            {/* Product Grid */}
            {!isLoading && !error && (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}