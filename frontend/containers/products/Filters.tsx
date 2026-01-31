"use client";

import React from "react";
import { MdOutlineTune } from "react-icons/md";

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
  const maxPrice = 10000;

  return (
    <aside className="w-full">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-[#f3e7e9] sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#1b0d10] flex items-center gap-2">
            <MdOutlineTune className="text-[#ee2b4b]" /> Filters
          </h2>
          <button
            className="text-xs font-semibold text-[#9a4c59] hover:text-[#ee2b4b] underline"
            onClick={onClearAll}
          >
            Clear All
          </button>
        </div>

        {/* Gender Filter */}
        <div className="mb-6 border-b border-[#f3e7e9] pb-4">
          <h3 className="text-sm font-bold text-[#1b0d10] mb-3 uppercase tracking-wider">
            Gender
          </h3>
          <div className="space-y-2">
            {["Men", "Women", "Kids"].map(gender => (
              <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b] bg-transparent"
                  checked={selectedGender.includes(gender)}
                  onChange={() => onGenderChange(gender)}
                />
                <span className="text-sm text-gray-600 group-hover:text-[#ee2b4b] transition-colors">
                  {gender}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6 border-b border-[#f3e7e9] pb-4">
          <h3 className="text-sm font-bold text-[#1b0d10] mb-3 uppercase tracking-wider">
            Price Range
          </h3>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Min (Rs)</label>
              <input
                type="number"
                min={minPrice}
                max={priceRange[1] - 10}
                value={priceRange[0]}
                onChange={(e) => onPriceChange("min", Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee2b4b] focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Max (Rs)</label>
              <input
                type="number"
                min={priceRange[0] + 10}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => onPriceChange("max", Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee2b4b] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Material Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-[#1b0d10] mb-3 uppercase tracking-wider">
            Material
          </h3>
          <div className="space-y-2">
            {["Mesh", "Leather", "Synthetic", "Other"].map(material => (
              <label key={material} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b] bg-transparent"
                  checked={selectedMaterial.includes(material)}
                  onChange={() => onMaterialChange(material)}
                />
                <span className="text-sm text-gray-600 group-hover:text-[#ee2b4b] transition-colors">
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