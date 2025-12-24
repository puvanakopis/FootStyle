"use client";

import { IoMdArrowRoundForward } from "react-icons/io";

const HeroSection = () => {
  return (
    <section className="flex justify-center px-4 py-8 md:px-10 md:py-12">
      <div className="w-full max-w-[1280px]">
        <div className="@container">
          <div className="flex flex-col-reverse gap-8 rounded-2xl bg-white p-6 shadow-sm @[864px]:flex-row @[864px]:items-center @[864px]:p-12">

            {/* Text Content */}
            <div className="flex flex-col gap-6 @[480px]:gap-8 @[864px]:w-1/2">
              <div className="flex flex-col gap-4 text-left">
                <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ee2b4b]">
                  New Collection 2024
                </span>

                <h1 className="text-4xl font-black leading-tight tracking-tight text-text-main-light @[480px]:text-5xl lg:text-6xl">
                  Step Up <br />
                  <span className="text-[#ee2b4b]">Your Game.</span>
                </h1>

                <h2 className="max-w-md text-base font-normal leading-relaxed text-text-sec-light @[480px]:text-lg">
                  Discover the latest collection of performance and lifestyle sneakers designed for those who never stop moving.
                </h2>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="flex h-12 min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#ee2b4b] px-6 text-base font-bold text-white shadow-lg shadow-[#ee2b4b]/30 transition-transform  hover:bg-red-600">
                  <span>Shop Now</span>
                  <span className="material-symbols-outlined text-sm">
                    <IoMdArrowRoundForward />
                  </span>
                </button>
              </div>
            </div>

            {/* Image Section */}


            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl group @[864px]:h-full @[864px]:w-1/2">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop")'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;