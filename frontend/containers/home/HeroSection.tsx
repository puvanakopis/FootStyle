import { Star, StarHalf, TrendingUp, ArrowRight, ShieldCheck, Zap, Flame, Award } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="w-full pt-4 pb-8">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-gradient-to-br from-white via-slate-50/80 to-slate-100/60 text-slate-900">

        {/* ── Animated Ambient Orbs ── */}
        <div className="absolute -left-[12%] -top-[12%] h-[500px] w-[500px] rounded-full bg-[#ee2b4b]/8 blur-[120px] pointer-events-none hero-animate-orb-drift" />
        <div className="absolute -bottom-[12%] -right-[12%] h-[600px] w-[600px] rounded-full bg-blue-500/6 blur-[130px] pointer-events-none hero-animate-orb-drift" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-violet-400/5 blur-[100px] pointer-events-none hero-animate-orb-pulse" />

        {/* Subtle Grid Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, #64748b 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* ── Hero Grid Container ── */}
        <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-6 md:p-12 lg:grid-cols-12 lg:gap-8 lg:p-14">

          {/* ── Left Hero Content ── */}
          <div className="flex flex-col gap-7 lg:col-span-6">
            <div className="flex flex-col gap-5 text-left">

              {/* Badges — staggered entrance */}
              <div className="flex flex-wrap items-center gap-3 hero-animate-slide-up">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ee2b4b]/8 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#ee2b4b] border border-[#ee2b4b]/15 transition-all duration-300 hover:bg-[#ee2b4b]/12 hover:border-[#ee2b4b]/25 cursor-default">
                  <Zap className="w-3.5 h-3.5 text-[#ee2b4b]" /> Exclusive Drop 2026
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/80 px-3 py-1.5 text-[10px] font-bold text-slate-600 border border-slate-200/60 transition-all duration-300 hover:bg-slate-200/60 cursor-default">
                  <TrendingUp className="w-3.5 h-3.5 text-[#ee2b4b]" />
                  #1 Trending Sneaker
                </span>
              </div>

              {/* Main Headline — animated entrance */}
              <h1 className="font-extrabold text-4xl leading-[1.02] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl hero-animate-slide-up hero-delay-100">
                UNLEASH <br />
                <span className="hero-shimmer-text">STREET LUXURY.</span>
              </h1>

              {/* Sub copy */}
              <p className="max-w-xl text-sm md:text-[15px] leading-relaxed text-slate-500 font-medium hero-animate-slide-up hero-delay-200">
                Engineered for maximum street performance. Discover next-gen lightweight responsiveness, premium materials, and authentic global drops — curated for the bold.
              </p>
            </div>

            {/* ── CTA Buttons ── */}
            <div className="flex flex-wrap items-center gap-4 hero-animate-slide-up hero-delay-300">
              <button
                onClick={() => router.push("/products")}
                className="hero-cta-primary group flex h-[52px] items-center gap-3 rounded-2xl px-7 text-xs font-extrabold uppercase tracking-wider text-white"
              >
                <span className="z-10">Explore Drops</span>
                <div className="z-10 flex h-7 w-7 items-center justify-center rounded-xl bg-white/20 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/30">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => router.push("/about")}
                className="group flex h-[52px] items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm px-6 text-xs font-extrabold uppercase tracking-wider text-slate-600 transition-all duration-300 hover:bg-white hover:border-slate-300 hover:text-slate-900 hover:shadow-lg hover:shadow-slate-200/40"
              >
                <ShieldCheck className="w-4 h-4 text-[#ee2b4b] transition-transform duration-300 group-hover:scale-110" />
                Authenticity Guarantee
              </button>
            </div>

            {/* ── Stats Bar ── */}
            <div className="mt-1 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6 border-t border-slate-200/60 pt-6 hero-animate-slide-up hero-delay-400">

              {/* Avatar Stack */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  <div className="h-10 w-10 rounded-full border-[2.5px] border-white bg-slate-200 bg-cover bg-center shadow-sm ring-1 ring-slate-100"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBfAw06J4ob_Kzi3zWFyg_SIyfrrNDW9cttIrZUcd5jul_AkiHP2Ovldz-Zp-wfdj6ZZKebGIiCxpPY7AzhCRL0VvH7p8WWHQ-Il6QAT-l0pTve_zvp7SLph7FjcQf0AwcDQNzn4P87pi2opNovNQ0mTKRQPjsvp6nzra0PsenNNugTAAWgNne3qJbXx3Yl3Y1IAqhe6HQb4PDfB7Izj4hJrtzARdx4pNIq57KIsc8FMN_2_O3JBvN9KwJ0jDyAtIJddUgDlAN6PwvT")' }}
                  />
                  <div className="h-10 w-10 rounded-full border-[2.5px] border-white bg-slate-200 bg-cover bg-center shadow-sm ring-1 ring-slate-100"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvMnBiqUEbrRMAaG4zi20WsEWcyUFGDF-nIqBm91x2RwMZRv2DBKxNc4q6wK60r14GFaru8IgCBKgzJ09IQ2lJvQVwzFEEBm0i3EqT6wEF-Ors19_bML_FgapRrmMHipZNJBu_0XVwJDdaYdzSdVAQ2Xuoao4dqNEtv3GBg_rTE2pc_mGNSDdr4XTYe05j18BDP6Un5Ub7Ww4tdtWuIMzTnbBEo7-9pT1_-ZW4K97BR4giGgsVOCKLTpINBsuzF5kjQHv1CVZKEwdh")' }}
                  />
                  <div className="h-10 w-10 rounded-full border-[2.5px] border-white bg-slate-200 bg-cover bg-center shadow-sm ring-1 ring-slate-100"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-usPSGQKNi79Vx-MA31KL0DHsqukdjr2wMxg4s4zNGa1XRuU5ili2H-VvOEatXsdsMV4MqFr8PvhUkcHh8aP30K0gZyHsYkDEgmYMkUnnGy6qhFDuWr81jjbVj_bybsET38aqcv08nWch6Udirf-Pi5fhRlGQx96V79jSiQrBb8tfRmlzkqrD-CJRvpgNQj0-SJuyfiFYCaOb730hdvxzUvF_yNhgvezYU9MUqaVwrEaRZ12saLmNFLXe6unr5Zj0OADu0OrdUOhJ")' }}
                  />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-white bg-gradient-to-br from-[#ee2b4b] to-[#ff4b6b] text-[10px] font-extrabold text-white shadow-sm">
                    +15k
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:block hero-stat-divider" />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm tracking-tight">4.9</span>
                    <div className="flex text-amber-400 gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <StarHalf className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">15,000+ Verified Collectors</span>
                </div>
              </div>

              {/* Trusted Badge */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:block hero-stat-divider" />
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
                    <Award className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">Certified</span>
                    <span className="text-[10px] text-slate-400 font-medium">100% Authentic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Product Showcase ── */}
          <div className="relative h-full min-h-[380px] w-full lg:col-span-6 lg:min-h-[500px] hero-animate-scale-in hero-delay-200">
            <div className="hero-image-wrapper group h-full w-full border border-slate-200/60 bg-white">

              {/* Shoe Image */}
              <div
                className="hero-image-inner absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYW2P81Q-pnNtP915631qcyZ5UPJuNyoPt2hW9jQ4O6u-DsaAAH1lgaUsACy86KVTL8WCWLYcR8Ahtzn-GTEcJ3IsqnRk0xCrkZiWMwxmiGXUX09aX65h0mB1BLL_aTZPpXC-Lb1XZE8qyIa2Zd_E80Y97ngIoQYRVaMxKBfn9Yj4P038w4gDI4wuiK2ZmGv9TkWmL9rvhdRHRwCpTXoXi4l8cTzE6xkxHe-H_s0TAMvWKsBsq0p7hNhNdb3OMz1npxcRgrJfyYA6K")' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent" />
              </div>

              {/* ── Floating Product Info Card ── */}
              <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-auto md:right-6 md:w-[320px] hero-animate-slide-up hero-delay-500">
                <div className="hero-product-card rounded-2xl p-4 hero-animate-pulse-glow" style={{ animationDelay: '2s' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-3 h-3 text-[#ee2b4b]" />
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#ee2b4b]">SPOTLIGHT DROP</span>
                      </div>
                      <h3 className="text-[15px] font-bold text-slate-900 leading-tight">Urban Runner X Edition</h3>
                    </div>

                    <span className="shrink-0 rounded-xl bg-gradient-to-br from-[#ee2b4b] to-[#ff3b5c] px-3 py-1.5 text-xs font-black text-white shadow-lg shadow-[#ee2b4b]/20">
                      Rs 45,000
                    </span>
                  </div>

                  {/* Swatch options */}
                  <div className="mt-3.5 grid grid-cols-4 gap-2">
                    <button className="hero-swatch-btn active aspect-square">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYW2P81Q-pnNtP915631qcyZ5UPJuNyoPt2hW9jQ4O6u-DsaAAH1lgaUsACy86KVTL8WCWLYcR8Ahtzn-GTEcJ3IsqnRk0xCrkZiWMwxmiGXUX09aX65h0mB1BLL_aTZPpXC-Lb1XZE8qyIa2Zd_E80Y97ngIoQYRVaMxKBfn9Yj4P038w4gDI4wuiK2ZmGv9TkWmL9rvhdRHRwCpTXoXi4l8cTzE6xkxHe-H_s0TAMvWKsBsq0p7hNhNdb3OMz1npxcRgrJfyYA6K"
                        alt="Red Urban Runner X"
                        className="object-cover h-full w-full"
                      />
                    </button>
                    <button className="hero-swatch-btn aspect-square">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfAw06J4ob_Kzi3zWFyg_SIyfrrNDW9cttIrZUcd5jul_AkiHP2Ovldz-Zp-wfdj6ZZKebGIiCxpPY7AzhCRL0VvH7p8WWHQ-Il6QAT-l0pTve_zvp7SLph7FjcQf0AwcDQNzn4P87pi2opNovNQ0mTKRQPjsvp6nzra0PsenNNugTAAWgNne3qJbXx3Yl3Y1IAqhe6HQb4PDfB7Izj4hJrtzARdx4pNIq57KIsc8FMN_2_O3JBvN9KwJ0jDyAtIJddUgDlAN6PwvT"
                        alt="Black Urban Runner X"
                        className="object-cover h-full w-full"
                      />
                    </button>
                    <button className="hero-swatch-btn aspect-square">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvMnBiqUEbrRMAaG4zi20WsEWcyUFGDF-nIqBm91x2RwMZRv2DBKxNc4q6wK60r14GFaru8IgCBKgzJ09IQ2lJvQVwzFEEBm0i3EqT6wEF-Ors19_bML_FgapRrmMHipZNJBu_0XVwJDdaYdzSdVAQ2Xuoao4dqNEtv3GBg_rTE2pc_mGNSDdr4XTYe05j18BDP6Un5Ub7Ww4tdtWuIMzTnbBEo7-9pT1_-ZW4K97BR4giGgsVOCKLTpINBsuzF5kjQHv1CVZKEwdh"
                        alt="White Urban Runner X"
                        className="object-cover h-full w-full"
                      />
                    </button>
                    <button className="hero-swatch-btn aspect-square">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-usPSGQKNi79Vx-MA31KL0DHsqukdjr2wMxg4s4zNGa1XRuU5ili2H-VvOEatXsdsMV4MqFr8PvhUkcHh8aP30K0gZyHsYkDEgmYMkUnnGy6qhFDuWr81jjbVj_bybsET38aqcv08nWch6Udirf-Pi5fhRlGQx96V79jSiQrBb8tfRmlzkqrD-CJRvpgNQj0-SJuyfiFYCaOb730hdvxzUvF_yNhgvezYU9MUqaVwrEaRZ12saLmNFLXe6unr5Zj0OADu0OrdUOhJ"
                        alt="Blue Urban Runner X"
                        className="object-cover h-full w-full"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Live Stock Badge ── */}
              <div className="absolute right-5 top-5 flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur-lg px-3.5 py-2 text-xs font-bold text-slate-800 shadow-lg shadow-black/5 border border-white/60 hero-animate-badge-slide hero-delay-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live Stock Low
              </div>

              {/* ── Top-left Brand Watermark ── */}
              <div className="absolute left-5 top-5 hero-animate-badge-slide hero-delay-400">
                <div className="flex items-center gap-2 rounded-xl bg-black/40 backdrop-blur-lg px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/90 border border-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ee2b4b]" />
                  FootStyle
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
