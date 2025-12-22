"use client";

import React, { useState } from "react";
import { MdOutlineTune } from "react-icons/md";

const Filters= () => {
  const [selectedGender, setSelectedGender] = useState<string[]>(["Men"]);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>(["Synthetic"]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 70]);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);

  const minPrice = 0;
  const maxPrice = 10000;

  const toggleGender = (gender: string) => {
    setSelectedGender(prev =>
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterial(prev =>
      prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
    );
  };

  const selectColor = (color: string) => {
    setSelectedColor(prev => (prev === color ? null : color));
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    if (type === "min") {
      setPriceRange([Math.min(value, priceRange[1] - 10), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.max(value, priceRange[0] + 10)]);
    }
  };

  const handleSliderMouseDown = (type: "min" | "max") => {
    setIsDragging(type);
  };

  const handleSliderMouseUp = () => {
    setIsDragging(null);
  };

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max(x / rect.width, 0), 1);
    const value = Math.round(minPrice + percentage * (maxPrice - minPrice));
    
    handlePriceChange(isDragging, value);
  };

  const clearAll = () => {
    setSelectedGender([]);
    setSelectedMaterial([]);
    setSelectedColor(null);
    setPriceRange([0, 100]);
  };

  const applyFilters = () => {
    const filters = {
      gender: selectedGender,
      material: selectedMaterial,
      color: selectedColor,
      priceRange,
    };
    console.log("Applied Filters:", filters);
  };

  const minPercentage = ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100;
  const maxPercentage = ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100;

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
            onClick={clearAll}
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
                  onChange={() => toggleGender(gender)}
                />
                <span className="text-sm text-gray-600 group-hover:text-[#ee2b4b] transition-colors">
                  {gender}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range - Dual Thumb Slider */}
        <div className="mb-6 border-b border-[#f3e7e9] pb-4">
          <h3 className="text-sm font-bold text-[#1b0d10] mb-3 uppercase tracking-wider">
            Price Range
          </h3>
          
          <div className="space-y-4">

            {/* Dual Range Slider */}
            <div 
              className="relative py-4 px-2 cursor-pointer"
              onMouseMove={handleSliderMove}
              onMouseUp={handleSliderMouseUp}
              onMouseLeave={handleSliderMouseUp}
            >
              {/* Background Track */}
              <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-[#e7cfd3] rounded-lg -translate-y-1/2"></div>
              
              {/* Selected Range Track */}
              <div 
                className="absolute top-1/2 h-1.5 bg-[#ee2b4b] rounded-lg -translate-y-1/2"
                style={{
                  left: `${minPercentage}%`,
                  right: `${100 - maxPercentage}%`
                }}
              ></div>
              
              {/* Min Thumb */}
              <div 
                className="absolute top-1/2 w-5 h-5 bg-white border-2 border-[#ee2b4b] rounded-full shadow-md -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing"
                style={{ left: `${minPercentage}%` }}
                onMouseDown={() => handleSliderMouseDown("min")}
              >
              </div>
              
              {/* Max Thumb */}
              <div 
                className="absolute top-1/2 w-5 h-5 bg-white border-2 border-[#ee2b4b] rounded-full shadow-md -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing"
                style={{ left: `${maxPercentage}%` }}
                onMouseDown={() => handleSliderMouseDown("max")}
              >
              </div>
            </div>

            {/* Price Labels */}
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span>Rs  {minPrice}</span>
              <span>Rs  {maxPrice}</span>
            </div>

            {/* Input Fields for Precise Control */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Min (Rs )</label>
                <input
                  type="number"
                  min={minPrice}
                  max={priceRange[1] - 10}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange("min", Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee2b4b] focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Max (Rs )</label>
                <input
                  type="number"
                  min={priceRange[0] + 10}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange("max", Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee2b4b] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Color Filter */}
        <div className="mb-6 border-b border-[#f3e7e9] pb-4">
          <h3 className="text-sm font-bold text-[#1b0d10] mb-3 uppercase tracking-wider">
            Color
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              aria-label="red"
              onClick={() => selectColor("red")}
              className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ${
                selectedColor === "red" ? "ring-red-500" : "ring-gray-300"
              } ring-offset-white`}
              style={{ backgroundColor: "red" }}
            ></button>

            <button
              aria-label="blue"
              onClick={() => selectColor("blue")}
              className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ${
                selectedColor === "blue" ? "ring-blue-500" : "ring-gray-300"
              } ring-offset-white`}
              style={{ backgroundColor: "blue" }}
            ></button>

            <button
              aria-label="black"
              onClick={() => selectColor("black")}
              className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ${
                selectedColor === "black" ? "ring-black-500" : "ring-gray-300"
              } ring-offset-white`}
              style={{ backgroundColor: "black" }}
            ></button>

            <button
              aria-label="white"
              onClick={() => selectColor("white")}
              className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ${
                selectedColor === "white" ? "ring-gray-500" : "ring-gray-300"
              } ring-offset-white`}
              style={{ backgroundColor: "white" }}
            ></button>

            <button
              aria-label="green"
              onClick={() => selectColor("green")}
              className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ${
                selectedColor === "green" ? "ring-green-500" : "ring-gray-300"
              } ring-offset-white`}
              style={{ backgroundColor: "green" }}
            ></button>
          </div>
        </div>

        {/* Material Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-[#1b0d10] mb-3 uppercase tracking-wider">
            Material
          </h3>
          <div className="space-y-2">
            {["Mesh", "Leather", "Synthetic"].map(material => (
              <label key={material} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b] bg-transparent"
                  checked={selectedMaterial.includes(material)}
                  onChange={() => toggleMaterial(material)}
                />
                <span className="text-sm text-gray-600 group-hover:text-[#ee2b4b] transition-colors">
                  {material}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button
          className="w-full bg-[#ee2b4b] hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
};

export default Filters;