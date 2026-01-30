"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  images: string[];
  rating: string;
  material: string;
}

const PRODUCTS_PER_PAGE = 12;

const ProductGrid = ({ products }: { products: Product[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="flex-1 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="cursor-pointer" onClick={() => handleProductClick(product.id)}>
            <ProductCard
              id={product.id}
              name={product.name}
              category={product.category}
              price={`Rs${product.price.toFixed(2)}`}
              rating={product.rating}
              imageUrl={product.images[0]}
              badge={product.badge}
            />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProductGrid;