"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Filters from '@/containers/products/Filters';
import ProductGrid from '@/containers/products/ProductGrid';
import Loading from '@/components/loading';

import { useEffect, useState } from "react";
import { useProduct } from "@/context/ProductContext";
import { showToast } from "@/lib/toast";

export default function Products() {
  const { products, fetchProducts, isLoading, error } = useProduct();

  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (error) showToast('error', error);
  }, [error]);

  // Handlers
  const handleGenderChange = (category: string) => {
    setSelectedGender(prev =>
      prev.includes(category) ? prev.filter(g => g !== category) : [...prev, category]
    );
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(prev =>
      prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
    );
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    if (type === "min") setPriceRange([Math.min(value, priceRange[1] - 10), priceRange[1]]);
    else setPriceRange([priceRange[0], Math.max(value, priceRange[0] + 10)]);
  };

  const handleClearAll = () => {
    setSelectedGender([]);
    setSelectedMaterial([]);
    setPriceRange([0, 10000]);
  };

  // Apply filters
  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedGender.length === 0 || selectedGender.includes(p.category);
    const materialMatch = selectedMaterial.length === 0 || selectedMaterial.includes(p.material);
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    return categoryMatch && materialMatch && priceMatch;
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="px-30 py-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-1/5">
            <Filters
              selectedGender={selectedGender}
              selectedMaterial={selectedMaterial}
              priceRange={priceRange}
              onGenderChange={handleGenderChange}
              onMaterialChange={handleMaterialChange}
              onPriceChange={handlePriceChange}
              onClearAll={handleClearAll}
            />
          </div>

          <div className="w-full lg:w-4/5">
            {isLoading && <Loading />}
            {!isLoading && !error && <ProductGrid products={filteredProducts} />}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}