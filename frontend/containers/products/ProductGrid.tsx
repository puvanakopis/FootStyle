"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { Product, Review } from "@/interfaces/productInterface";
import { PackageX } from "lucide-react";

const PRODUCTS_PER_PAGE = 12;

const ProductGrid = ({ products }: { products: Product[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handleProductClick = (id: string) => {
    if (id) router.push(`/products/${id}`);
  };

  const getAverageRating = (reviews?: Review[]) => {
    if (!reviews || reviews.length === 0) return 4.8;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  };

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-[#ee2b4b]/30 min-h-[350px] shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ee2b4b]/10 text-[#ee2b4b] mb-4">
          <PackageX className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-2">No Matching Drops Found</h3>
        <p className="text-xs text-slate-500 max-w-md font-medium">
          Try clearing your filters or searching for another keyword to discover live streetwear collections.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {products.map((product) => {
          const prodId = product._id || product.id || "";
          return (
            <div
              key={prodId}
              className="cursor-pointer"
              onClick={() => handleProductClick(prodId)}
            >
              <ProductCard
                id={prodId}
                name={product.name}
                gender={product.gender}
                price={`Rs ${product.price?.toLocaleString() || product.price}`}
                averageRating={getAverageRating(product.reviews)}
                imageUrl={product.images?.[0] || ""}
              />
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductGrid;