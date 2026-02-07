"use client";

import { useState } from "react";
import { FaAward, FaShippingFast, FaUsers, FaHeart, FaRocket, FaLeaf, } from "react-icons/fa";
import { MdOutlineHiking, MdOutlineHandshake, MdOutlineLocalShipping, } from "react-icons/md";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const [activeStat, setActiveStat] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const stats = [
    { number: "15K+", label: "Satisfied Customers", icon: <FaUsers /> },
    { number: "850+", label: "Premium Products", icon: <FaAward /> },
    { number: "75+", label: "Cities Covered", icon: <FaShippingFast /> },
    { number: "48-Hr", label: "Delivery Promise", icon: <FaHeart /> },
  ];

  const values = [
    {
      icon: <FaAward />,
      title: "Artisan Quality",
      description:
        "Each pair undergoes meticulous craftsmanship with premium materials and attention to detail.",
    },
    {
      icon: <FaLeaf />,
      title: "Eco-Responsible Design",
      description:
        "Prioritizing sustainable sourcing, ethical production, and minimal environmental impact.",
    },
    {
      icon: <MdOutlineHandshake />,
      title: "Client-Centered Approach",
      description:
        "We collaborate with our community, incorporating feedback into every collection.",
    },
    {
      icon: <MdOutlineLocalShipping />,
      title: "Reliable Service",
      description:
        "Seamless global delivery with dedicated support throughout your journey with us.",
    },
    {
      icon: <FaRocket />,
      title: "Progressive Innovation",
      description:
        "Pioneering new comfort technologies while maintaining timeless aesthetic appeal.",
    },
    {
      icon: <FaUsers />,
      title: "Inclusive Design Philosophy",
      description:
        "Creating versatile footwear that complements diverse lifestyles and personal expressions.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* About Content */}
      <div className="px-4 md:px-10 py-6">
        {/* Hero Section */}
        <section className="flex justify-center py-12 md:py-20">
          <div className="w-full max-w-[1280px] flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Text Content */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ee2b4b]">
                Our Journey
              </span>

              <h1 className="text-4xl font-black leading-tight tracking-tight text-text-main-light md:text-5xl lg:text-6xl">
                Redefining Footwear <br />
                <span className="text-[#ee2b4b]">Excellence.</span>
              </h1>

              <p className="text-lg leading-relaxed text-text-sec-light">
                Established in 2018, FootStyle emerged from a shared vision of three
                industry veterans who believed premium footwear should deliver both
                unparalleled comfort and sophisticated style. Today, we serve
                discerning clients across continents who value craftsmanship and
                innovation.
              </p>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ee2b4b]/10 text-2xl text-[#ee2b4b]">
                  <MdOutlineHiking />
                </div>
                <div>
                  <h3 className="font-bold text-text-main-light">
                    Crafted for Excellence
                  </h3>
                  <p className="text-sm text-text-sec-light">
                    From boutique workshop to global presence
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="lg:w-1/2 relative aspect-square overflow-hidden rounded-2xl group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop")',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm">Our flagship design studio</p>
                <p className="text-xs opacity-75">London, 2019</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-12">
          <div className="flex justify-center">
            <div className="w-full max-w-[1280px] flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                  onMouseEnter={() => setActiveStat(index)}
                  onMouseLeave={() => setActiveStat(null)}
                >
                  <div
                    className={`mb-4 text-2xl transition-all duration-300 ${activeStat === index
                      ? "text-[#ee2b4b] scale-110"
                      : "text-[#ee2b4b]"
                      }`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-text-main-light">
                    {stat.number}
                  </div>
                  <div className="text-sm text-text-sec-light mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values / Principles Section */}
        <section className="flex flex-col justify-center py-12">
          <div className="text-center">
            <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ee2b4b]">
              The Founders
            </span>
            <h2 className="text-3xl font-black text-text-main-light mt-4">
              Our Guiding Principles
            </h2>
            <p className="text-text-sec-light mt-2 max-w-2xl mx-auto">
              Three industry veterans united by a passion for redefining what
              premium footwear can be.
            </p>
          </div>

          <div className="w-full max-w-[1280px] mx-auto pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#f3e7e9] p-6 transition-all duration-300 hover:shadow-md hover:border-[#ee2b4b]/30 group cursor-pointer"
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <div
                  className={`mb-4 text-2xl transition-all duration-300 ${hoveredValue === index
                    ? "text-[#ee2b4b] scale-110"
                    : "text-[#ee2b4b]"
                    }`}
                >
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold text-text-main-light">
                  {value.title}
                </h4>
                <p className="mt-2 text-sm text-text-sec-light">
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