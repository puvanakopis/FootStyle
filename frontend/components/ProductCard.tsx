"use client";

import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";

interface ProductCardProps {
  id: string | number;
  name: string;
  gender: string;
  price: string;
  rating: string;
  imageUrl: string;
  badge?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  gender,
  price,
  rating,
  imageUrl,
  badge,
}) => {

  const getImageUrl = (imageName: string) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    return `${API_BASE_URL}/uploads/product/${imageName}`;
  };

  return (
    <div className="group flex flex-col gap-4 rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${getImageUrl(imageUrl)})`
          }} aria-label={name}
        />
        {badge && (
          <div className="absolute left-3 top-3 rounded bg-[#ee2b4b] px-2 py-1 text-xs font-bold text-white">
            {badge}
          </div>
        )}
        <div className="absolute right-3 top-3 rounded-full bg-white p-1.5 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
          <span className="material-symbols-outlined block text-[20px] text-gray-400 hover:text-[#ee2b4b] cursor-pointer">
            <MdFavoriteBorder />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1 p-4">
        <div className="flex justify-between">
          <h3 className="font-bold leading-tight">{name}</h3>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-yellow-400 fill-current">
              <FaStar />
            </span>
            <span className="text-xs font-bold text-gray-500">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-text-sec-light">{gender}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-[#ee2b4b]">{price}</p>
          </div>
          <button className="rounded-full bg-[#e7e1e1ff] p-2 text-text-main-light transition-colors hover:bg-[#ee2b4b] hover:text-white">
            <span className="material-symbols-outlined block text-[20px] cursor-pointer">
              <FiShoppingCart />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;