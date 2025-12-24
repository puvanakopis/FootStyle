"use client";

import React from "react";
import { HiMiniChevronRight } from "react-icons/hi2";

interface BreadcrumbItem {
  label: string;
  href?: string; 
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex mb-6 py-4 text-sm font-medium" aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <li>
                <a className="hover:text-[#ee2b4b] transition-colors" href={item.href}>
                  {item.label}
                </a>
              </li>
            ) : (
              <li aria-current="page" className="text-[#1b0d10] font-bold">
                {item.label}
              </li>
            )}
            {index < items.length - 1 && (
              <li>
                <HiMiniChevronRight className="text-sm text-black align-middle" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;