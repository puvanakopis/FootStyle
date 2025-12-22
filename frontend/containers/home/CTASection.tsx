"use client";

const CTASection = () => {
  return (
    <section className="flex justify-center px-4 py-16 md:px-10">
      <div className="w-full max-w-[960px] rounded-3xl bg-[#ee2b4b]/5 p-8 text-center md:p-12">
        <div className="flex flex-col items-center gap-4">
          <span className="rounded-full bg-[#ee2b4b]/10 px-4 py-1 text-sm font-bold text-[#ee2b4b]">
            Newsletter
          </span>
          <h2 className="max-w-[720px] text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Join our Community
          </h2>
          <p className="max-w-[600px] text-base text-text-sec-light">
            Get 10% off your first order and stay updated with the latest trends, exclusive drops, and member-only sales.
          </p>

          <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border-0 bg-white py-3 pl-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
            />
            <button className="flex items-center justify-center rounded-lg bg-[#ee2b4b] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#ee2b4b]/20 transition-transform hover:scale-105">
              Subscribe
            </button>
          </div>

          <p className="text-xs text-gray-400">
            By subscribing, you agree to our Terms &amp; Conditions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;