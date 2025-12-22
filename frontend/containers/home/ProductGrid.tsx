"use client";

import SectionHeader from "@/components/SectionHeader";

const ProductGrid: React.FC = () => (
  <section>
    <SectionHeader 
      title="Trending Now" 
      linkText="View All Products" 
      linkHref="/products" 
    />
  </section>
);

export default ProductGrid;
