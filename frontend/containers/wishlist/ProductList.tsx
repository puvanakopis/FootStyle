"use client";

import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { MdBlock, MdOutlineShoppingCart } from "react-icons/md";
import { TbShoppingCartOff } from "react-icons/tb";

interface Product {
  id: string;
  addedOn: string;
  price: string;
  status: "in-stock" | "out-of-stock";
  title: string;
  subtitle: string;
  color?: string;
  size?: string;
  rating?: { stars: number; reviews: number };
  image: string;
  disabled?: boolean;
}

const products: Product[] = [
  {
    id: "1",
    addedOn: "October 24, 2023",
    price: "Rs 145.00",
    status: "in-stock",
    title: "Speed Runner Pro",
    subtitle: "Basketball Sneaker",
    color: "Red",
    size: "9.5 (Last saved)",
    rating: { stars: 4, reviews: 42 },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWMS3ZqlSHblgEuSBl3H9KrESpT45jiSsQqEz9Ze9KRzDTS6_-lZ9R4lCY3W4D408RHuqvwJVSiQVMwCTzuqUYub1KXrK1ZJpqPDa_YYXiEir-Q3qxY7biH9j2DxJ73sTTKHHOFHdy3Wtc8Z3RPYaXCm_WeQeFISZcpJWDw2E_7q-3sNYBcQ7enMV4evbL5BhYRTh-1muqmNPNpZvHtBqhnPqvTWjt0_IlyPSbP702UReH4BZoCicxpPPoLkqOzo8DVBZeu9oOLChJ",
  },
  {
    id: "2",
    addedOn: "September 15, 2023",
    price: "Rs 160.00",
    status: "in-stock",
    title: "Air Pulse 90",
    subtitle: "Casual Sneaker",
    color: "Mustard",
    size: "11 (Last saved)",
    rating: { stars: 5, reviews: 128 },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAk78r_VH9KmyTZ5k6Kri-zxpTb3ITYmX5C6f8dN26fJHIc6zSUU7_aniKs6-inddn0UOJLaPLczD4ysP81KHvByuAcXAoY3Q5TcctF6LRU9JhcTM2QBLakAcTp27xwE_ni9FTR39P_cgO_ntQ8qSuxYZSZiaLVOcpZAUpIVbnlPh77MdvAtgkSbX38y_4RIYcvLSxr4T4dGNo4z9DIIusqujCgwUuy0HAILTyu3_qxuTCFt9UMTk-8Z1OknI1I1v_9Ii4TOjMB5Lr",
  },
  {
    id: "3",
    addedOn: "July 12, 2023",
    price: "Rs 110.00",
    status: "out-of-stock",
    title: "Urban Trekker Low",
    subtitle: "Men's Running Shoe",
    color: "Grey",
    rating: { stars: 0, reviews: 0 },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq9OXD6c-16MG8_MrQwWygSdWLPjNwsk1r8kbz_ggrS_AOpQgI6I-fC_Q8yiBjxOPcICG_Jcz2TYE4AHr7GzLZIgVR-aP04pt9C8-f4aElFBHx8y4YotmyWFfUVDyXMG9_3_BNyn_BndEzLr4huI9UiqorMVJMSOmQe--7IGP_Y1vt0x0GAE6nf50R71pfmeW5_Hb8zILXYoAvvRvyhQGvSAUVndB98MEXstuSi1Io6ILhqObcDtmHS_MOMv8NHUcneC5VijBuUBhz",
    disabled: true,
  },
];

const ProductList: React.FC = () => {
  return (
    <div className="space-y-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-white rounded-2xl shadow-sm border border-neutral-100 hover:border-[#ee2b4b]/20 transition-all duration-300 overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex flex-wrap gap-4 justify-between items-center bg-neutral-50/50">
            <div className={`flex flex-wrap gap-x-8 gap-y-2 ${product.disabled ? "opacity-60" : ""}`}>
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Added on</p>
                <p className="text-sm font-medium text-neutral-900 mt-0.5">{product.addedOn}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Price</p>
                <p className="text-sm font-medium text-neutral-900 mt-0.5">{product.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {product.status === "in-stock" ? (
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
            <div
              className={`shrink-0 relative overflow-hidden rounded-lg w-32 h-32 sm:w-40 sm:h-40 ${
                product.disabled ? "grayscale opacity-80" : ""
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${product.image})` }}
              />
            </div>

            {/* Details */}
            <div className={`flex-1 flex flex-col justify-center ${product.disabled ? "opacity-80" : ""}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">{product.title}</h3>
                  <p className="text-sm text-neutral-500 mb-2">{product.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.color && (
                  <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-600">{product.color}</span>
                )}
                {product.size && (
                  <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-600">{product.size}</span>
                )}
              </div>
              {product.rating && product.rating.stars > 0 && (
                <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-500 text-[16px]">
                     <CiStar /> 
                    </span>
                  ))}
                  <span className="text-neutral-400 text-xs ml-1">({product.rating.reviews} reviews)</span>
                </div>
              )}
              {product.disabled && (
                <p className="text-sm text-neutral-500 italic">This item is currently unavailable.</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-end gap-3 mt-4 sm:mt-0 min-w-[160px]">
              <button
                className={`w-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg shadow-lg transition-colors ${
                  product.disabled
                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "bg-[#ee2b4b] text-white hover:bg-[#d4203e] shadow-[#ee2b4b]/20"
                }`}
                disabled={product.disabled}
              >
                {product.disabled ? <TbShoppingCartOff className="text-[20px]" /> : <MdOutlineShoppingCart className="text-[20px]" />}
                Add to Cart
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 border border-neutral-200 text-neutral-600 text-sm font-medium rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                <AiOutlineDelete className="text-[20px]" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;