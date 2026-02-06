"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Filters from '@/containers/products/Filters';
import ProductGrid from '@/containers/products/ProductGrid';
import Loading from '@/components/Loading';

import { useEffect, useState } from "react";
import { useProduct } from "@/context/ProductContext";
import { showToast } from "@/utils/toast";

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
  const handleGenderChange = (gender: string) => {
    setSelectedGender(prev =>
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
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
    const isActive = p.isActive === true;
    const genderMatch = selectedGender.length === 0 || selectedGender.includes(p.gender);
    const materialMatch = selectedMaterial.length === 0 || selectedMaterial.includes(p.material);
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    return isActive && genderMatch && materialMatch && priceMatch;
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Header />
        <Loading message='loading products .....'/>
        <Footer />
      </main>
    )
  }

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
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}