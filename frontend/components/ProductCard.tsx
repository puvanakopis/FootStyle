"use client";

import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";
import { showToast } from "@/utils/toast";

interface ProductCardProps {
  id: string;
  name: string;
  gender: string;
  price: string;
  averageRating: string;
  imageUrl: string;
  badge?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  gender,
  price,
  averageRating,
  imageUrl,
  badge,
}) => {
  const router = useRouter();
  const { wishlist, addToWishlist, removeFromWishlist, isLoading } = useWishlist();
  const [isWishlistProcessing, setIsWishlistProcessing] = useState(false);
  const [isCartProcessing, setIsCartProcessing] = useState(false);

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const getImageUrl = (imageName: string) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    return `${API_BASE_URL}/uploads/product/${imageName}`;
  };

  const isInWishlist = wishlist.some((product) => product._id === id);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isWishlistProcessing || isLoading) return;

    try {
      setIsWishlistProcessing(true);

      if (isInWishlist) {
        await removeFromWishlist(id);
        showToast('success', 'Product removed from wishlist');
      } else {
        await addToWishlist({ productId: id });
        showToast('success', 'Product added to wishlist');
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
      const errorMessage = error.response?.data?.message || 'Failed to update wishlist';
      showToast('error', errorMessage);
    } finally {
      setIsWishlistProcessing(false);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isCartProcessing) return;

    try {
      setIsCartProcessing(true);

      await new Promise(resolve => setTimeout(resolve, 500));

      showToast('success', 'Product added to cart');
    } catch (error) {
      console.error("Add to cart error:", error);
      const errorMessage = error.response?.data?.message || 'Failed to add product to cart';
      showToast('error', errorMessage);
    } finally {
      setIsCartProcessing(false);
    }
  };

  return (
    <div
      onClick={() => handleProductClick(id)}
      className="group relative flex flex-col gap-4 rounded-xl bg-white shadow-sm transition-all duration-300 hover:border--100 cursor-pointer">
     
      {/* Loading overlay for wishlist */}
      {isWishlistProcessing && (
        <div className="absolute inset-0 bg-white/50 z-10 rounded-xl flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#ee2b4b] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${getImageUrl(imageUrl)})`
          }}
          aria-label={name}
        />
        {badge && (
          <div className="absolute left-3 top-3 rounded bg-[#ee2b4b] px-2 py-1 text-xs font-bold text-white z-20">
            {badge}
          </div>
        )}

        {/* Wishlist button */}
        <div
          className={`absolute right-3 top-3 rounded-full p-1.5 shadow-sm transition-all duration-200 group-hover:opacity-100 z-20 ${isInWishlist ? 'bg-[#fee] text-[#ee2b4b] opacity-100' : 'bg-white text-gray-400 opacity-0'}`}
          onClick={handleWishlistToggle}
        >
          <span
            className={`material-symbols-outlined block text-[20px] transition-transform duration-200 ${isWishlistProcessing ? 'animate-pulse' : ''}`}
            style={{
              cursor: isWishlistProcessing ? 'not-allowed' : 'pointer',
            }}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist ? <MdFavorite /> : <MdFavoriteBorder />}
          </span>
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button className="px-4 py-2 bg-white rounded-lg font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Quick View
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 p-4">
        <div className="flex justify-between">
          <h3 className="font-bold leading-tight text-gray-800 line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-yellow-400 fill-current">
              <FaStar />
            </span>
            <span className="text-xs font-bold text-gray-500">{averageRating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">{gender}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-[#ee2b4b]">{price}</p>
            {price.includes("$") && parseFloat(price.replace("$", "")) > 50 && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                Free Shipping
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isCartProcessing}
            className={`relative rounded-full p-2 transition-all duration-200 ${isCartProcessing ? 'bg-gray-100' : 'bg-[#e7e1e1ff] hover:bg-[#ee2b4b]'} text-text-main-light hover:text-white disabled:opacity-70`}
          >
            <span className="material-symbols-outlined block text-[20px]">
              <FiShoppingCart />
            </span>
            {isCartProcessing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Cart processing overlay */}
      {isCartProcessing && (
        <div className="absolute inset-0 bg-black/5 rounded-xl flex items-center justify-center z-20">
          <div className="w-8 h-8 border-2 border-[#ee2b4b] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;