"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { MdOutlineEmail, MdOutlineHiking, MdOutlineLocationOn, MdOutlinePhone } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200/80 bg-white pt-16 pb-10 text-slate-900 shadow-inner">
      <div className="layout-container flex justify-center px-4 md:px-8">
        <div className="flex w-full max-w-[1280px] flex-col gap-12">

          {/* Top Section */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

            {/* Brand Section */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3 w-fit">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ee2b4b] text-white shadow-lg shadow-[#ee2b4b]/20">
                  <MdOutlineHiking className="text-[24px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900">
                    FOOT<span className="text-[#ee2b4b]">STYLE</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Street & Luxury Drops</span>
                </div>
              </Link>

              <p className="text-xs leading-relaxed text-slate-600 font-medium">
                Step into the future of luxury streetwear. Curated authentic drops, performance ergonomics, and 24/7 VIP customer service.
              </p>

              {/* Social Media */}
              <div className="mt-2 flex items-center gap-3">
                {[
                  { icon: <IoLogoTiktok />, href: "#" },
                  { icon: <RiInstagramFill />, href: "#" },
                  { icon: <FaFacebookF />, href: "#" },
                  { icon: <FaTwitter />, href: "#" },
                ].map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100 text-slate-700 hover:border-[#ee2b4b]/50 hover:bg-[#ee2b4b] hover:text-white transition-all"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Shop Navigation */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#ee2b4b]">
                Explore Collections
              </h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "New Release Drops", href: "/products" },
                  { label: "Best Seller Sneakers", href: "/products" },
                  { label: "Men's Streetwear", href: "/products" },
                  { label: "Women's Collection", href: "/products" },
                  { label: "VIP Clearance Sale", href: "/products" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Help & Support */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#ee2b4b]">
                Help & Support
              </h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Order Tracking", href: "/orders" },
                  { label: "Shipping & Returns Policy", href: "/about" },
                  { label: "Authenticity Check", href: "/about" },
                  { label: "Size Guide Chart", href: "/about" },
                  { label: "Contact VIP Support", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#ee2b4b]">
                Official Flagship
              </h4>
              <div className="flex flex-col gap-3.5">
                <div className="flex items-start gap-3">
                  <MdOutlineLocationOn className="mt-0.5 text-base text-[#ee2b4b] shrink-0" />
                  <span className="text-xs text-slate-600 font-semibold">
                    No. 45, Galle Road, Colombo 03, Sri Lanka
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MdOutlinePhone className="text-base text-[#ee2b4b] shrink-0" />
                  <span className="text-xs text-slate-600 font-semibold">
                    +94 75 123 4567
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MdOutlineEmail className="text-base text-[#ee2b4b] shrink-0" />
                  <span className="text-xs text-slate-600 font-semibold">
                    support@footstyle.lk
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between border-t border-slate-200/80 pt-8 gap-4 md:flex-row">
            <p className="text-xs text-slate-500 font-semibold">
              © {new Date().getFullYear()} FootStyle Luxury Footwear. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link href="/about" className="text-xs text-slate-500 hover:text-slate-900 font-medium">
                Privacy Policy
              </Link>
              <Link href="/about" className="text-xs text-slate-500 hover:text-slate-900 font-medium">
                Terms of Service
              </Link>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-100 px-3.5 py-1.5 text-xs font-extrabold text-slate-700 hover:border-[#ee2b4b] hover:bg-[#ee2b4b] hover:text-white transition-all"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;