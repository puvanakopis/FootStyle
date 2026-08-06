"use client";

import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

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
    <div className="space-y-4">
      {products.map((product) => {
        const stockStatus = getStockStatus(product);
        const isDisabled = !product.isActive || stockStatus === "out-of-stock";
        const imageUrl = getPrimaryImage(product);
        const reviewCount = getReviewCount(product);
        const addedDate = formatDate(product.createdAt);
        const averageRating = calculateAverageRating(product);
        const productId = product.id || product._id || "";
        const productName = product.title || product.name;

        return (
          <div
            key={productId}
            className="group rounded-3xl border border-slate-200/80 bg-white backdrop-blur-xl transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg"
          >
            {/* Wishlist item header */}
            <div className="px-5 py-3.5 border-b border-slate-200/80 flex flex-wrap gap-4 justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-6 text-xs">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Saved On</span>
                  <span className="font-bold text-slate-800">{addedDate}</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Price</span>
                  <span className="font-black text-[#ee2b4b]">Rs {product.price?.toLocaleString() || product.price}</span>
                </div>
              </div>

              {stockStatus === "in-stock" ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock Drop
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 text-slate-500 border border-slate-200/80">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Wishlist item body */}
            <div className="p-5 flex flex-col sm:flex-row gap-5 items-center">
              {/* Product Thumbnail */}
              <div className="shrink-0 relative overflow-hidden rounded-2xl w-28 h-28 bg-slate-50 border border-slate-200/80">
                <img
                  src={imageUrl}
                  alt={productName}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ee2b4b]">{product.gender || "Streetwear"}</span>
                <h3 className="text-base font-bold text-slate-900 hover:text-[#ee2b4b] transition-colors">{productName}</h3>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2">
                  <FaStar className="text-amber-500 text-xs" />
                  <span className="text-xs font-extrabold text-amber-600">{averageRating || 4.8}</span>
                  <span className="text-xs text-slate-500 font-medium">({reviewCount} reviews)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={isDisabled}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ee2b4b] text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#ee2b4b]/20 hover:bg-[#ff3b5c] transition-all disabled:opacity-40"
                >
                  <MdOutlineShoppingCart className="text-base" />
                  Move to Bag
                </button>

                <button
                  onClick={() => handleRemoveFromWishlist(productId, productName)}
                  className="p-3 rounded-xl border border-slate-200/80 bg-slate-100 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove from wishlist"
                >
                  <AiOutlineDelete className="text-lg" />
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