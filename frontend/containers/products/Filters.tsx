"use client";

import React from "react";
import { MdOutlineTune } from "react-icons/md";
import { X } from "lucide-react";

interface FiltersProps {
  selectedGender: string[];
  selectedMaterial: string[];
  priceRange: [number, number];
  onGenderChange: (gender: string) => void;
  onMaterialChange: (material: string) => void;
  onPriceChange: (type: "min" | "max", value: number) => void;
  onClearAll: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedGender,
  selectedMaterial,
  priceRange,
  onGenderChange,
  onMaterialChange,
  onPriceChange,
  onClearAll
}) => {
  const minPrice = 0;
  const maxPrice = 200000;

  return (
    <aside className="w-full">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:border-[#ee2b4b]/30 shadow-sm sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-5">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <MdOutlineTune className="text-[#ee2b4b] text-lg" /> Filter Drops
          </h2>
          <button
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-[#ee2b4b] transition-colors"
            onClick={onClearAll}
          >
            <X className="w-3 h-3" /> Clear All
          </button>
        </div>

        {/* Gender Filter */}
        <div className="mb-6 border-b border-slate-200/80 pb-5">
          <h3 className="text-xs font-extrabold text-[#ee2b4b] mb-3 uppercase tracking-widest">
            Category / Gender
          </h3>
          <div className="space-y-2.5">
            {["Men", "Women", "Kids"].map((gender) => (
              <label key={gender} className="flex items-center gap-3 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 bg-slate-50 text-[#ee2b4b] focus:ring-[#ee2b4b] focus:ring-offset-0 accent-[#ee2b4b] h-4 w-4"
                  checked={selectedGender.includes(gender)}
                  onChange={() => onGenderChange(gender)}
                />
                <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                  {gender}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6 border-b border-slate-200/80 pb-5">
          <h3 className="text-xs font-extrabold text-[#ee2b4b] mb-3 uppercase tracking-widest">
            Price Range (Rs)
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Min Price</label>
              <input
                type="number"
                min={minPrice}
                max={priceRange[1] - 10}
                value={priceRange[0]}
                onChange={(e) => onPriceChange("min", Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-900 focus:outline-none focus:border-[#ee2b4b]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Max Price</label>
              <input
                type="number"
                min={priceRange[0] + 10}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => onPriceChange("max", Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-900 focus:outline-none focus:border-[#ee2b4b]"
              />
            </div>
          </div>
        </div>

        {/* Material Filter */}
        <div className="mb-2">
          <h3 className="text-xs font-extrabold text-[#ee2b4b] mb-3 uppercase tracking-widest">
            Material Specs
          </h3>
          <div className="space-y-2.5">
            {["Mesh", "Leather", "Synthetic", "Other"].map((material) => (
              <label key={material} className="flex items-center gap-3 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 bg-slate-50 text-[#ee2b4b] focus:ring-[#ee2b4b] focus:ring-offset-0 accent-[#ee2b4b] h-4 w-4"
                  checked={selectedMaterial.includes(material)}
                  onChange={() => onMaterialChange(material)}
                />
                <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                  {material}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;