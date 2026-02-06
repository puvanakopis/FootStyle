"use client";

import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { MdBlock, MdOutlineShoppingCart, MdOutlineRemoveRedEye } from "react-icons/md";
import { TbShoppingCartOff } from "react-icons/tb";

interface ProductListProps {
  products: any[];
  isLoading: boolean;
  getStockStatus: (product: any) => string;
  getPrimaryImage: (product: any) => string;
  getReviewCount: (product: any) => number;
  formatDate: (dateString?: string) => string;
  getLastSavedSize: (product: any) => string;
  calculateAverageRating: (product: any) => number;
  handleRemoveFromWishlist: (productId: string, productName: string) => void;
  handleAddToCart: (product: any) => void;
  handleViewProduct: (productId: string, productName: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  getStockStatus,
  getPrimaryImage,
  getReviewCount,
  formatDate,
  getLastSavedSize,
  calculateAverageRating,
  handleRemoveFromWishlist,
  handleAddToCart,
  handleViewProduct,
}) => {
  return (
    <div className="space-y-6">
      {products.map((product) => {
        const stockStatus = getStockStatus(product);
        const isDisabled = !product.isActive || stockStatus === "out-of-stock";
        const imageUrl = getPrimaryImage(product);
        const reviewCount = getReviewCount(product);
        const addedDate = formatDate(product.createdAt);
        const lastSavedSize = getLastSavedSize(product);
        const averageRating = calculateAverageRating(product);
        const productId = product.id || product._id || "";
        const productName = product.title || product.name;

        return (
          <div
            key={productId}
            className="group bg-white rounded-2xl shadow-sm border border-neutral-100 hover:border-[#ee2b4b]/20 transition-all duration-300 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-100 flex flex-wrap gap-4 justify-between items-center bg-neutral-50/50">
              <div className={`flex flex-wrap gap-x-8 gap-y-2 ${isDisabled ? "opacity-60" : ""}`}>
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Added on</p>
                  <p className="text-sm font-medium text-neutral-900 mt-0.5">{addedDate}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Price</p>
                  <p className="text-sm font-medium text-neutral-900 mt-0.5">Rs {product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {stockStatus === "in-stock" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-600">
                    <MdBlock className="text-[16px]" />
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-6">
              {/* Image */}
              <div className={`shrink-0 relative overflow-hidden rounded-lg w-32 h-32 sm:w-40 sm:h-40 ${isDisabled ? "grayscale opacity-80" : ""}`}>
                <a href={`/products/${productId}`}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  />
                </a>
              </div>

              {/* Details */}
              <div className={`flex-1 flex flex-col justify-center ${isDisabled ? "opacity-80" : ""}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <a href={`/products/${productId}`} className="hover:text-[#ee2b4b] transition-colors">
                      <h3 className="text-xl font-bold text-neutral-900 mb-1">{productName}</h3>
                    </a>
                    <p className="text-sm text-neutral-500 mb-2 line-clamp-2">
                      {product.description || `${product.gender}'s ${product.material} Shoe`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-600">{product.gender}</span>
                  <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-600">{product.material}</span>
                  <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-600">Size: {lastSavedSize}</span>
                </div>
                {reviewCount > 0 ? (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-[16px] ${star <= Math.round(averageRating) ? "text-yellow-500" : "text-neutral-300"}`}
                      >
                        <CiStar />
                      </span>
                    ))}
                    <span className="text-neutral-600 text-xs ml-2">
                      {averageRating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-neutral-300 text-sm font-medium">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-neutral-300 text-[16px]">
                        <CiStar />
                      </span>
                    ))}
                    <span className="text-neutral-400 text-xs ml-2">(No reviews yet)</span>
                  </div>
                )}
                {isDisabled && <p className="text-sm text-neutral-500 italic mt-2">This item is currently unavailable.</p>}
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-end gap-3 mt-4 sm:mt-0 min-w-[160px]">
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg shadow-lg transition-colors ${isDisabled ? "bg-neutral-200 text-neutral-400 cursor-not-allowed" : "bg-[#ee2b4b] text-white hover:bg-[#d4203e] shadow-[#ee2b4b]/20"
                    }`}
                  disabled={isLoading}
                >
                  {isDisabled ? <TbShoppingCartOff className="text-[20px]" /> : <MdOutlineShoppingCart className="text-[20px]" />}
                  Add to Cart
                </button>

                <button
                  onClick={() => handleViewProduct(productId, productName)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                  disabled={isLoading}
                >
                  <MdOutlineRemoveRedEye className="text-[20px]" />
                  View Product
                </button>

                <button
                  onClick={() => handleRemoveFromWishlist(productId, productName)}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 border border-neutral-200 text-neutral-600 text-sm font-medium rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <AiOutlineDelete className="text-[20px]" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;