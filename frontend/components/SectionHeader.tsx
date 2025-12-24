"use client";

import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle = "",
  linkText = "",
  linkHref = "",
}) => {
  return (
    <section className="flex justify-center pt-8 pb-4">
      <div className="flex w-full max-w-[1280px] items-end justify-between pb-4">
        <div>
          <span className="text-sm font-bold uppercase tracking-widest text-[#ee2b4b]">
            {subtitle}
          </span>
          <h2 className="mt-1 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {title}
          </h2>
        </div>
        {linkText && (
          <a
            className="hidden text-sm font-bold text-[#ee2b4b] hover:underline sm:block"
            href={linkHref}
          >
            {linkText}
          </a>
        )}
      </div>
    </section>
  );
};

export default SectionHeader;