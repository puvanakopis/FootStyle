import Link from "next/link";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { MdOutlineEmail, MdOutlineHiking, MdOutlineLocationOn, MdOutlinePhone } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="border-t border-[#f3e7e9] bg-white pt-16 pb-8">
      <div className="layout-container flex justify-center px-4 md:px-10">
        <div className="flex w-full max-w-[1280px] flex-col gap-12">

          {/* ------------------- Top Section ------------------- */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

            {/* -------- Brand Section -------- */}
            <div className="flex flex-col gap-4">
              
              {/* Logo and Brand Name */}
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ee2b4b]/10 text-[#ee2b4b]">
                    {/* Brand Icon */}
                    <span className="material-symbols-outlined text-[24px]">
                      <MdOutlineHiking />
                    </span>
                  </div>
                  {/* Brand Text */}
                  <h2 className="text-xl font-bold leading-tight tracking-tight">
                    FootStyle
                  </h2>
                </Link>
              </div>

              {/* Brand Description */}
              <p className="text-sm leading-relaxed text-text-sec-light">
                Step into the future of footwear. We combine style, comfort, and
                performance for the modern urban explorer.
              </p>

              {/* Social Media Icons */}
              <div className="mt-2 flex gap-4">
                <Link href="#" className="text-gray-400 transition-colors hover:text-[#ee2b4b]">
                  <IoLogoTiktok />
                </Link>

                <Link href="#" className="text-gray-400 transition-colors hover:text-[#ee2b4b]">
                  <RiInstagramFill />
                </Link>

                <Link href="#" className="text-gray-400 transition-colors hover:text-[#ee2b4b]">
                  <FaFacebookF />
                </Link>

                <Link href="#" className="text-gray-400 transition-colors hover:text-[#ee2b4b]">
                  <FaTwitter />
                </Link>
              </div>
            </div>

            {/* -------- Shop Links -------- */}
            <div className="flex flex-col gap-4">
              <h4 className="text-base font-bold text-text-main-light">
                Shop
              </h4>

              {/* Shop Navigation Links */}
              <div className="flex flex-col gap-2">
                {[
                  "New Arrivals",
                  "Best Sellers",
                  "Men's Shoes",
                  "Women's Shoes",
                  "Sale",
                ].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-sm text-text-sec-light transition-colors hover:text-[#ee2b4b]"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* -------- Help & Support -------- */}
            <div className="flex flex-col gap-4">
              <h4 className="text-base font-bold text-text-main-light">
                Help & Support
              </h4>

              {/* Help Links */}
              <div className="flex flex-col gap-2">
                {[
                  "Order Status",
                  "Shipping & Returns",
                  "Size Guide",
                  "FAQ",
                  "Contact Us",
                ].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-sm text-text-sec-light transition-colors hover:text-[#ee2b4b]"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* -------- Contact Information -------- */}
            <div className="flex flex-col gap-4">
              <h4 className="text-base font-bold text-text-main-light">
                Contact
              </h4>

              {/* Address */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-1 text-sm text-[#ee2b4b]">
                    <MdOutlineLocationOn />
                  </span>
                  <span className="text-sm text-text-sec-light">
                    No. 45, Galle Road, Colombo 03, Sri Lanka
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-[#ee2b4b]">
                    <MdOutlinePhone />
                  </span>
                  <span className="text-sm text-text-sec-light">
                    +94 75 123 4567
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-[#ee2b4b]">
                    <MdOutlineEmail />
                  </span>
                  <span className="text-sm text-text-sec-light">
                    support@footstyle.lk
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------- Bottom Bar ------------------- */}
          <div className="flex flex-col items-center justify-between border-t border-[#f3e7e9] pt-8 md:flex-row">
            
            {/* Copyright */}
            <p className="text-sm text-text-sec-light">
              © {new Date().getFullYear()} FootStyle. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="mt-4 flex gap-6 md:mt-0">
              <Link
                href="#"
                className="text-sm text-text-sec-light transition-colors hover:text-[#ee2b4b]"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="text-sm text-text-sec-light transition-colors hover:text-[#ee2b4b]"
              >
                Terms of Service
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;