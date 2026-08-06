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
  averageRating: string | number;
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
      const errorMessage = (error as any)?.response?.data?.message || 'Failed to update wishlist';
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
      const errorMessage = (error as any)?.response?.data?.message || 'Failed to add product to cart';
      showToast('error', errorMessage);
    } finally {
      setIsCartProcessing(false);
    }
  };

  return (
    <div
      onClick={() => handleProductClick(id)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-300 hover:border-[#ee2b4b]/30 cursor-pointer">
     
      {/* Wishlist loading overlay */}
      {isWishlistProcessing && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-xs z-30 rounded-2xl flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-[#ee2b4b] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-100">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{
            backgroundImage: `url(${getImageUrl(imageUrl)})`
          }}
          aria-label={name}
        />

        {/* Badge Tag */}
        {badge ? (
          <div className="absolute left-2.5 top-2.5 rounded-full bg-[#ee2b4b]/10 border border-[#ee2b4b]/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#ee2b4b] z-20">
            {badge}
          </div>
        ) : (
          <div className="absolute left-2.5 top-2.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-700 z-20 border border-slate-200/80">
            Authentic
          </div>
        )}

        {/* Wishlist Toggle Button */}
        <div
          className={`absolute right-2.5 top-2.5 rounded-2xl p-2.5 backdrop-blur-md border transition-all duration-300 z-20 ${
            isInWishlist 
              ? 'bg-[#ee2b4b] border-[#ee2b4b] text-white' 
              : 'bg-white/90 border-slate-200/80 text-slate-600 hover:bg-[#ee2b4b]/10 hover:border-[#ee2b4b]/30 hover:text-[#ee2b4b]'
          }`}
          onClick={handleWishlistToggle}
        >
          <span
            className={`block text-[18px] transition-transform duration-200 ${isWishlistProcessing ? 'animate-pulse' : ''}`}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist ? <MdFavorite /> : <MdFavoriteBorder />}
          </span>
        </div>

        {/* Quick View Button Overlay */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <button className="px-4 py-2 bg-slate-900 text-white font-extrabold text-xs tracking-wider uppercase rounded-2xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#ee2b4b]">
            Quick View
          </button>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="flex flex-col gap-2 pt-3.5 pb-1 px-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{gender || 'Unisex'}</span>
            <h3 className="font-extrabold text-sm leading-snug text-slate-900 line-clamp-1 group-hover:text-[#ee2b4b] transition-colors">{name}</h3>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 shrink-0">
            <FaStar className="text-[11px] text-amber-500" />
            <span className="text-[11px] font-extrabold text-amber-600">{averageRating || '4.8'}</span>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-black text-[#ee2b4b] tracking-tight">{price}</span>
            {price.includes("$") && parseFloat(price.replace("$", "")) > 50 && (
              <span className="text-[9px] font-bold text-emerald-600 tracking-wide uppercase">
                Free Express Drop
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isCartProcessing}
            aria-label="Add to cart"
            className={`relative flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300 ${
              isCartProcessing 
                ? 'bg-slate-100 text-slate-400 border border-slate-200/80' 
                : 'bg-[#ee2b4b]/10 border border-[#ee2b4b]/20 text-[#ee2b4b] hover:bg-[#ee2b4b] hover:border-[#ee2b4b] hover:text-white'
            }`}
          >
            <FiShoppingCart className="text-base" />
            {isCartProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
                <div className="w-4 h-4 border-2 border-[#ee2b4b] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Cart processing full card overlay */}
      {isCartProcessing && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-xs rounded-2xl flex items-center justify-center z-20">
          <div className="w-8 h-8 border-2 border-[#ee2b4b] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;