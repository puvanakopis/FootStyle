"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <section className="flex justify-center pt-10 pb-4 px-4 md:px-8">
      <div className="flex w-full max-w-[1280px] items-end justify-between border-b border-slate-200/80 pb-5">
        <div className="flex flex-col gap-1">
          {subtitle && (
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ee2b4b]">
              {subtitle}
            </span>
          )}
          <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
            {title}
          </h2>
        </div>
        {linkText && linkHref && (
          <Link
            className="group hidden items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-600 hover:text-[#ee2b4b] transition-colors sm:flex"
            href={linkHref}
          >
            <span>{linkText}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/80 group-hover:bg-[#ee2b4b] group-hover:border-[#ee2b4b] group-hover:text-white transition-all">
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};

export default SectionHeader;