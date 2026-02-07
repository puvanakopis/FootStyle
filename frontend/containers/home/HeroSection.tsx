import { Star, StarHalf, TrendingUp, ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="w-full pt-4">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-[#0f0809] text-white shadow-2xl ring-1 ring-white/10">
        {/* Background Blur Circles */}
        <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] filter" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px] filter" />

        {/* Content Container */}
        <div className="relative z-10 grid grid-cols-1 items-center gap-12 p-6 md:p-12 lg:grid-cols-12 lg:gap-8 lg:p-16">

          {/* Left Content */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/50">
                  New Collection {new Date().getFullYear()}
                </span>

                {/* Added icon for Trending Now */}
                <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Trending Now
                </span>
              </div>

              <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-white md:text-6xl xl:text-7xl">
                NEXT LEVEL <br />
                <span className="text-rose-700">SPEED.</span>
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-gray-300">
                Designed for the unstoppable. Experience ultra-lightweight comfort and superior grip
                with the new Urban Runner X series.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => router.push("/products")}
                className="group relative flex h-14 items-center gap-3 overflow-hidden rounded-full bg-white pl-8 pr-6 text-base font-bold text-black shadow-lg shadow-white/10 transition-all hover:bg-gray-100 hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <span className="z-10">Shop Now</span>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

            </div>

            {/* Ratings */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 border-t border-white/10 pt-6">
              <div className="flex -space-x-4">
                {/* Avatars */}
                <div className="h-12 w-12 rounded-full border-2 border-[#0f0809] bg-gray-800 bg-cover bg-center"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBfAw06J4ob_Kzi3zWFyg_SIyfrrNDW9cttIrZUcd5jul_AkiHP2Ovldz-Zp-wfdj6ZZKebGIiCxpPY7AzhCRL0VvH7p8WWHQ-Il6QAT-l0pTve_zvp7SLph7FjcQf0AwcDQNzn4P87pi2opNovNQ0mTKRQPjsvp6nzra0PsenNNugTAAWgNne3qJbXx3Yl3Y1IAqhe6HQb4PDfB7Izj4hJrtzARdx4pNIq57KIsc8FMN_2_O3JBvN9KwJ0jDyAtIJddUgDlAN6PwvT")' }}
                />
                <div className="h-12 w-12 rounded-full border-2 border-[#0f0809] bg-gray-800 bg-cover bg-center"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvMnBiqUEbrRMAaG4zi20WsEWcyUFGDF-nIqBm91x2RwMZRv2DBKxNc4q6wK60r14GFaru8IgCBKgzJ09IQ2lJvQVwzFEEBm0i3EqT6wEF-Ors19_bML_FgapRrmMHipZNJBu_0XVwJDdaYdzSdVAQ2Xuoao4dqNEtv3GBg_rTE2pc_mGNSDdr4XTYe05j18BDP6Un5Ub7Ww4tdtWuIMzTnbBEo7-9pT1_-ZW4K97BR4giGgsVOCKLTpINBsuzF5kjQHv1CVZKEwdh")' }}
                />
                <div className="h-12 w-12 rounded-full border-2 border-[#0f0809] bg-gray-800 bg-cover bg-center"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-usPSGQKNi79Vx-MA31KL0DHsqukdjr2wMxg4s4zNGa1XRuU5ili2H-VvOEatXsdsMV4MqFr8PvhUkcHh8aP30K0gZyHsYkDEgmYMkUnnGy6qhFDuWr81jjbVj_bybsET38aqcv08nWch6Udirf-Pi5fhRlGQx96V79jSiQrBb8tfRmlzkqrD-CJRvpgNQj0-SJuyfiFYCaOb730hdvxzUvF_yNhgvezYU9MUqaVwrEaRZ12saLmNFLXe6unr5Zj0OADu0OrdUOhJ")' }}
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0f0809] bg-primary text-xs font-bold text-white">
                  +15
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-white">4.9/5</span>
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <StarHalf className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <span className="text-sm text-gray-400">from verified buyers</span>
              </div>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="relative h-full min-h-[400px] w-full lg:col-span-7 lg:min-h-[600px]">
            <div className="group relative h-full w-full overflow-hidden rounded-3xl bg-neutral-800 shadow-2xl ring-1 ring-white/10">

              {/* Main Product Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYW2P81Q-pnNtP915631qcyZ5UPJuNyoPt2hW9jQ4O6u-DsaAAH1lgaUsACy86KVTL8WCWLYcR8Ahtzn-GTEcJ3IsqnRk0xCrkZiWMwxmiGXUX09aX65h0mB1BLL_aTZPpXC-Lb1XZE8qyIa2Zd_E80Y97ngIoQYRVaMxKBfn9Yj4P038w4gDI4wuiK2ZmGv9TkWmL9rvhdRHRwCpTXoXi4l8cTzE6xkxHe-H_s0TAMvWKsBsq0p7hNhNdb3OMz1npxcRgrJfyYA6K")' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Product Card */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 md:bottom-8 md:left-auto md:right-8 md:w-80">
                <div className="rounded-2xl border border-white/20 bg-black/40 p-4 backdrop-blur-xl transition-colors hover:bg-black/60">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">Urban Runner X</h3>
                      <p className="text-sm font-medium text-gray-300">Men&apos;s Running Shoe</p>
                    </div>

                    {/* Updated to LKR */}
                    <span className="rounded-lg bg-white px-2 py-1 text-sm font-bold text-black">
                      Rs 45,000
                    </span>
                  </div>

                  {/* Colors */}
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {/* Red */}
                    <button className="relative aspect-square overflow-hidden rounded-lg border-2 border-primary ring-2 ring-primary/30 transition-transform hover:scale-105">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYW2P81Q-pnNtP915631qcyZ5UPJuNyoPt2hW9jQ4O6u-DsaAAH1lgaUsACy86KVTL8WCWLYcR8Ahtzn-GTEcJ3IsqnRk0xCrkZiWMwxmiGXUX09aX65h0mB1BLL_aTZPpXC-Lb1XZE8qyIa2Zd_E80Y97ngIoQYRVaMxKBfn9Yj4P038w4gDI4wuiK2ZmGv9TkWmL9rvhdRHRwCpTXoXi4l8cTzE6xkxHe-H_s0TAMvWKsBsq0p7hNhNdb3OMz1npxcRgrJfyYA6K"
                        alt="Red Urban Runner X"
                        className="object-cover"
                      />
                    </button>

                    {/* Black */}
                    <button className="relative aspect-square overflow-hidden rounded-lg border border-white/20 opacity-70 transition-all hover:opacity-100 hover:scale-105">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfAw06J4ob_Kzi3zWFyg_SIyfrrNDW9cttIrZUcd5jul_AkiHP2Ovldz-Zp-wfdj6ZZKebGIiCxpPY7AzhCRL0VvH7p8WWHQ-Il6QAT-l0pTve_zvp7SLph7FjcQf0AwcDQNzn4P87pi2opNovNQ0mTKRQPjsvp6nzra0PsenNNugTAAWgNne3qJbXx3Yl3Y1IAqhe6HQb4PDfB7Izj4hJrtzARdx4pNIq57KIsc8FMN_2_O3JBvN9KwJ0jDyAtIJddUgDlAN6PwvT"
                        alt="Black Urban Runner X"
                        className="object-cover"
                      />
                    </button>

                    {/* White */}
                    <button className="relative aspect-square overflow-hidden rounded-lg border border-white/20 opacity-70 transition-all hover:opacity-100 hover:scale-105">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvMnBiqUEbrRMAaG4zi20WsEWcyUFGDF-nIqBm91x2RwMZRv2DBKxNc4q6wK60r14GFaru8IgCBKgzJ09IQ2lJvQVwzFEEBm0i3EqT6wEF-Ors19_bML_FgapRrmMHipZNJBu_0XVwJDdaYdzSdVAQ2Xuoao4dqNEtv3GBg_rTE2pc_mGNSDdr4XTYe05j18BDP6Un5Ub7Ww4tdtWuIMzTnbBEo7-9pT1_-ZW4K97BR4giGgsVOCKLTpINBsuzF5kjQHv1CVZKEwdh"
                        alt="White Urban Runner X"
                        className="object-cover"
                      />
                    </button>

                    {/* Blue */}
                    <button className="relative aspect-square overflow-hidden rounded-lg border border-white/20 opacity-70 transition-all hover:opacity-100 hover:scale-105">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-usPSGQKNi79Vx-MA31KL0DHsqukdjr2wMxg4s4zNGa1XRuU5ili2H-VvOEatXsdsMV4MqFr8PvhUkcHh8aP30K0gZyHsYkDEgmYMkUnnGy6qhFDuWr81jjbVj_bybsET38aqcv08nWch6Udirf-Pi5fhRlGQx96V79jSiQrBb8tfRmlzkqrD-CJRvpgNQj0-SJuyfiFYCaOb730hdvxzUvF_yNhgvezYU9MUqaVwrEaRZ12saLmNFLXe6unr5Zj0OADu0OrdUOhJ"
                        alt="Blue Urban Runner X"
                        className="object-cover"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Selling Fast Badge */}
              <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Selling Fast
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
