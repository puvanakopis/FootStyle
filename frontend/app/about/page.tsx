"use client";

import { useState } from "react";
import { FaAward, FaShippingFast, FaUsers, FaHeart, FaRocket, FaLeaf } from "react-icons/fa";
import { MdOutlineHiking, MdOutlineHandshake, MdOutlineLocalShipping } from "react-icons/md";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const [activeStat, setActiveStat] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const stats = [
    { number: "15K+", label: "Satisfied Collectors", icon: <FaUsers /> },
    { number: "850+", label: "Limited Drops", icon: <FaAward /> },
    { number: "75+", label: "Cities Delivered", icon: <FaShippingFast /> },
    { number: "24-Hr", label: "Express Dispatch", icon: <FaHeart /> },
  ];

  const values = [
    {
      icon: <FaAward />,
      title: "100% Authenticity Guarantee",
      description:
        "Every single sneaker drop undergoes a rigorous multi-point verification process by expert authenticators.",
    },
    {
      icon: <FaLeaf />,
      title: "Eco-Responsible Design",
      description:
        "Prioritizing sustainable sourcing, recycled ergonomics, and ethical production workflows.",
    },
    {
      icon: <MdOutlineHandshake />,
      title: "Collector-First Culture",
      description:
        "We collaborate directly with global sneakerhead communities to source rare restocks and exclusive drops.",
    },
    {
      icon: <MdOutlineLocalShipping />,
      title: "Global Express Delivery",
      description:
        "Seamless international & island-wide Sri Lankan shipping with real-time tracking updates.",
    },
    {
      icon: <FaRocket />,
      title: "Hyper Performance Engineering",
      description:
        "Pioneering carbon cushioning technology while preserving streetwear aesthetics.",
    },
    {
      icon: <FaUsers />,
      title: "Inclusive Street Style",
      description:
        "Curating high-end footwear designed to elevate every wardrobe, identity, and personal expression.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafafc] text-slate-900">
      <Header />

      {/* About Content */}
      <div className="px-4 md:px-10 py-6">
        {/* Hero Section */}
        <section className="flex justify-center py-4 md:py-8">
          <div className="w-full max-w-[1280px] flex flex-col lg:flex-row lg:items-center gap-12">
            {/* Text Content */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#ee2b4b] border border-[#ee2b4b]/20">
                Our Heritage & Vision
              </span>

              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                Redefining Streetwear <br />
                <span className="text-[#ee2b4b]">Luxury Drops.</span>
              </h1>

              <p className="text-base leading-relaxed text-slate-600 font-medium">
                Established in 2022, FootStyle emerged to bridge the gap between high-performance athletic engineering and luxury streetwear aesthetics. Today, we serve collectors and trendsetters worldwide with guaranteed authentic footwear drops.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ee2b4b]/10 text-2xl text-[#ee2b4b]">
                  <MdOutlineHiking />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Crafted for Greatness
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    From flagship design hub to global streetwear destination
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="lg:w-1/2 relative aspect-square overflow-hidden rounded-3xl group border border-slate-200/80">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop")',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-base font-bold">FootStyle Flagship Design Studio</p>
                <p className="text-xs text-slate-300 font-medium">Colombo & Global Warehouses</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-12 border-y border-slate-200/80">
          <div className="flex justify-center">
            <div className="w-full max-w-[1280px] grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-2xl bg-slate-50 border border-slate-200/80 p-6 text-center transition-all duration-300 hover:border-[#ee2b4b]/40 hover:-translate-y-1 cursor-pointer"
                  onMouseEnter={() => setActiveStat(index)}
                  onMouseLeave={() => setActiveStat(null)}
                >
                  <div
                    className={`mb-3 text-2xl transition-all duration-300 ${activeStat === index ? "text-[#ee2b4b] scale-110" : "text-[#ee2b4b]"}`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-slate-900">
                    {stat.number}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values / Principles Section */}
        <section className="flex flex-col justify-center py-16">
          <div className="text-center mb-10">
            <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#ee2b4b]">
              Pillars of Excellence
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">
              Our Core Principles
            </h2>
            <p className="text-slate-600 mt-2 text-sm max-w-2xl mx-auto font-medium">
              Driven by innovation, authenticity, and dedication to streetwear culture.
            </p>
          </div>

          <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:border-[#ee2b4b]/30 group cursor-pointer"
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <div
                  className={`mb-4 text-2xl transition-all duration-300 ${hoveredValue === index ? "text-[#ee2b4b]" : "text-[#ee2b4b]"}`}
                >
                  {value.icon}
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 font-medium leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default About;