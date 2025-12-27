import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

const YourOrder = () => {
  return (
    <div className="lg:col-span-4 lg:sticky lg:top-24">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Your Order
        </h2>

        {/* Items */}
        <div className="space-y-4 mb-6">
          {[
            {
              name: "Urban Trekker Low",
              price: "Rs 120.00",
              details: "Size: 10 • Qty: 1",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAq9OXD6c-16MG8_MrQwWygSdWLPjNwsk1r8kbz_ggrS_AOpQgI6I-fC_Q8yiBjxOPcICG_Jcz2TYE4AHr7GzLZIgVR-aP04pt9C8-f4aElFBHx8y4YotmyWFfUVDyXMG9_3_BNyn_BndEzLr4huI9UiqorMVJMSOmQe--7IGP_Y1vt0x0GAE6nf50R71pfmeW5_Hb8zILXYoAvvRvyhQGvSAUVndB98MEXstuSi1Io6ILhqObcDtmHS_MOMv8NHUcneC5VijBuUBhz",
            },
            {
              name: "Speed Runner Pro",
              price: "Rs 145.00",
              details: "Size: 9.5 • Qty: 1",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWMS3ZqlSHblgEuSBl3H9KrESpT45jiSsQqEz9Ze9KRzDTS6_-lZ9R4lCY3W4D408RHuqvwJVSiQVMwCTzuqUYub1KXrK1ZJpqPDa_YYXiEir-Q3qxY7biH9j2DxJ73sTTKHHOFHdy3Wtc8Z3RPYaXCm_WeQeFISZcpJWDw2E_7q-3sNYBcQ7enMV4evbL5BhYRTh-1muqmNPNpZvHtBqhnPqvTWjt0_IlyPSbP702UReH4BZoCicxpPPoLkqOzo8DVBZeu9oOLChJ",
            },
            {
              name: "Air Pulse 90",
              price: "Rs 160.00",
              details: "Size: 11 • Qty: 1",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAk78r_VH9KmyTZ5k6Kri-zxpTb3ITYmX5C6f8dN26fJHIc6zSUU7_aniKs6-inddn0UOJLaPLczD4ysP81KHvByuAcXAoY3Q5TcctF6LRU9JhcTM2QBLakAcTp27xwE_ni9FTR39P_cgO_ntQ8qSuxYZSZiaLVOcpZAUpIVbnlPh77MdvAtgkSbX38y_4RIYcvLSxr4T4tGNo4z9DIIusqujCgwUuy0HAILTyu3_qxuTCFt9UMTk-8Z1OknI1I1v_9Ii4TOjMB5Lr",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-16 h-16 rounded-lg bg-neutral-100 overflow-hidden shrink-0">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(Rs {item.img})` }}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">
                  {item.name}
                </h4>
                <p className="text-xs text-neutral-500">{item.details}</p>
                <p className="text-sm font-semibold mt-1">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-3 border-t border-neutral-100 pt-6 mb-6">
          <div className="flex justify-between">
            <span className="text-sm text-neutral-500">Subtotal</span>
            <span className="font-bold">Rs 425.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-500">Tax</span>
            <span className="font-bold">Rs 34.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-500">Shipping</span>
            <span className="text-green-600 font-bold text-sm">
              Free
            </span>
          </div>
        </div>

        <div className="flex justify-between items-end mb-8 border-t  border-neutral-100 pt-6">
          <span className="text-lg font-bold">Total</span>
          <span className="text-2xl font-extrabold">Rs 459.00</span>
        </div>

        <Link
          href="/payment"
          className="w-full bg-[#ee2b4b] hover:bg-[#d4203e] text-white font-bold text-lg h-14 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          Continue to Payment
          <span className="group-hover:translate-x-1 transition-transform">
            <IoArrowForwardOutline />
          </span>
        </Link>

      </div>
    </div>
  );
};

export default YourOrder;