"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

interface Review {
  rating: number;
  comment?: string;
}

interface Product {
  _id: string;
  name: string;
  gender: string;
  price: number;
  badge?: string;
  images: string[];
  material: string;
  reviews: Review[];
}

const PRODUCTS_PER_PAGE = 12;

const ProductGrid = ({ products }: { products: Product[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  // calculate average rating
  const getAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  };

  return (
    <div className="flex-1 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="cursor-pointer"
            onClick={() => handleProductClick(product._id)}
          >
            <ProductCard
              id={product._id}
              name={product.name}
              gender={product.gender}
              price={`Rs ${product.price.toFixed(2)}`}
              averageRating={getAverageRating(product.reviews)}
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