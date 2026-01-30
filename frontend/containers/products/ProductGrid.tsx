"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineExpandMore } from "react-icons/md";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  image: string;
  alt: string;
  rating: string;
}

const PRODUCTS_PER_PAGE = 12;

const ProductGrid = ({ products }: { products: Product[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleProductClick = (id: number) => {
    router.push(`/products/${id}`);
  };


  console.log("ProductCard imageUrl:", products);

  return (
    <div className="flex-1 w-full">
      {/* ------------- Top Bar ------------- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1b0d10] tracking-tight">
            Men&apos;s Running Shoes
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Showing {products.length} results
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600 hidden sm:block">
            Sort by:
          </span>
          <div className="relative group">
            <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:border-[#ee2b4b] transition-colors shadow-sm">
              <span>Newest Arrivals</span>
              <span className="material-symbols-outlined text-lg">
                <MdOutlineExpandMore />
              </span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              <a className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#ee2b4b]" href="#">
                Price: Low to High
              </a>
              <a className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#ee2b4b]" href="#">
                Price: High to Low
              </a>
              <a className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#ee2b4b]" href="#">
                Popularity
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ------------- Grid ------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer"
            onClick={() => handleProductClick(product._id)}
          >
            <ProductCard
              id={product.id}
              name={product.name}
              category={product.category}
              price={`Rs${product.price.toFixed(2)}`}
              oldPrice={product.oldPrice ? `Rs${product.oldPrice.toFixed(2)}` : undefined}
              rating={product.rating}
              imageUrl={product.images[0]}
              badge={product.badge}
            />
          </div>
        ))}
      </div>

      {/* ------------- Pagination ------------- */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProductGrid;