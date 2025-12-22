"use client";

const FeatureBanner = () => {
  return (
    <section className="mt-8 flex justify-center px-4 md:px-10">
      <div className="w-full max-w-[1280px]">
        <div className="relative overflow-hidden rounded-2xl bg-black px-6 py-12 md:px-12 md:py-20">
          {/* Background image */}
          <div
            className="absolute inset-0 opacity-60 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAy0N8ACj-e_fU_PRRSVBDhOhviKMWEDj-C9Iog3M6BQao-g28BQg8wpzXuWZcxqSeO6XwTBua27zV0dO4r24nhDgJDrGgB1FOY-k5GZEE23dAGcwXJ_sk3giti-t0ecNE9GzApXRZCEEHc5Jlk9EvoU-ekP5PdDrvZCClsz8Cd9LXMUei_euVnZgpC8Tblbx5JN8udHbPzWmTRmJ_LLbsCvX4Lvs3-02pypV2TvjP3qSaRdOOZt5lFkgnwghdJwNLACkwkj6xV4TBJ")',
            }}
            aria-label="Dark abstract pattern with shoe silhouette"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-black text-white md:text-5xl">
              Engineered for <span className="text-[#ee2b4b]">Performance</span>
            </h2>
            <p className="mt-4 text-gray-300">
              Our new tech-infused soles provide 30% more energy return. Feel the
              difference in every step.
            </p>
            <button className="mt-8 cursor-pointer flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-black transition-colors hover:bg-gray-100">
              Explore Technology
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBanner;