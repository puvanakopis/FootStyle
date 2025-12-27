"use client";

import { CiLock } from "react-icons/ci";

const OrderSummary = () => {
    return (
        <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">
                    Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {/* Item 1 */}
                    <div className="flex gap-4">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAq9OXD6c-16MG8_MrQwWygSdWLPjNwsk1r8kbz_ggrS_AOpQgI6I-fC_Q8yiBjxOPcICG_Jcz2TYE4AHr7GzLZIgVR-aP04pt9C8-f4aElFBHx8y4YotmyWFfUVDyXMG9_3_BNyn_BndEzLr4huI9UiqorMVJMSOmQe--7IGP_Y1vt0x0GAE6nf50R71pfmeW5_Hb8zILXYoAvvRvyhQGvSAUVndB98MEXstuSi1Io6ILhqObcDtmHS_MOMv8NHUcneC5VijBuUBhz")',
                                }}
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                            <h3 className="text-sm font-semibold text-neutral-900">
                                Urban Trekker Low
                            </h3>
                            <p className="text-xs text-neutral-500">Qty: 1</p>
                        </div>
                        <div className="flex flex-col justify-center text-right">
                            <span className="text-sm font-bold text-neutral-900">Rs 120.00</span>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex gap-4">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWMS3ZqlSHblgEuSBl3H9KrESpT45jiSsQqEz9Ze9KRzDTS6_-lZ9R4lCY3W4D408RHuqvwJVSiQVMwCTzuqUYub1KXrK1ZJpqPDa_YYXiEir-Q3qxY7biH9j2DxJ73sTTKHHOFHdy3Wtc8Z3RPYaXCm_WeQeFISZcpJWDw2E_7q-3sNYBcQ7enMV4evbL5BhYRTh-1muqmNPNpZvHtBqhnPqvTWjt0_IlyPSbP702UReH4BZoCicxpPPoLkqOzo8DVBZeu9oOLChJ")',
                                }}
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                            <h3 className="text-sm font-semibold text-neutral-900">
                                Speed Runner Pro
                            </h3>
                            <p className="text-xs text-neutral-500">Qty: 1</p>
                        </div>
                        <div className="flex flex-col justify-center text-right">
                            <span className="text-sm font-bold text-neutral-900">Rs 145.00</span>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex gap-4">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAk78r_VH9KmyTZ5k6Kri-zxpTb3ITYmX5C6f8dN26fJHIc6zSUU7_aniKs6-inddn0UOJLaPLczD4ysP81KHvByuAcXAoY3Q5TcctF6LRU9JhcTM2QBLakAcTp27xwE_ni9FTR39P_cgO_ntQ8qSuxYZSZiaLVOcpZAUpIVbnlPh77MdvAtgkSbX38y_4RIYcvLSxr4T4tGNo4z9DIIusqujCgwUuy0HAILTyu3_qxuTCFt9UMTk-8Z1OknI1I1v_9Ii4TOjMB5Lr")',
                                }}
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                            <h3 className="text-sm font-semibold text-neutral-900">
                                Air Pulse 90
                            </h3>
                            <p className="text-xs text-neutral-500">Qty: 1</p>
                        </div>
                        <div className="flex flex-col justify-center text-right">
                            <span className="text-sm font-bold text-neutral-900">Rs 160.00</span>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="space-y-4 border-t border-neutral-100 pt-6 mb-6">
                    <div className="flex justify-between">
                        <span className="text-sm text-neutral-500 font-medium">Subtotal</span>
                        <span className="font-bold text-neutral-900">Rs 425.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-neutral-500 font-medium">Shipping</span>
                        <span className="text-green-600 font-bold text-sm">Free</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-neutral-500 font-medium">Tax</span>
                        <span className="font-bold text-neutral-900">Rs 34.00</span>
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-end border-t border-neutral-100 pt-6 mb-8">
                    <span className="text-lg font-bold text-neutral-900">
                        Total Amount
                    </span>
                    <div className="text-right">
                        <span className="block text-3xl font-extrabold text-neutral-900">
                            Rs 459.00
                        </span>
                        <span className="text-xs text-neutral-400">LKR</span>
                    </div>
                </div>

                {/* Button */}
                <button className="w-full bg-[#ee2b4b] hover:bg-[#d4203e] text-white font-bold text-lg h-14 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                    Place Order
                </button>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-neutral-400 mb-2">
                        By placing your order, you agree to our{" "}
                        <a href="#" className="underline hover:text-neutral-600">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-neutral-600">
                            Privacy Policy
                        </a>
                        .
                    </p>
                    <div className="flex items-center justify-center gap-2 text-neutral-400">
                        <span className="material-symbols-outlined text-[16px]"><CiLock /></span>
                        <span className="text-xs font-medium">SSL Secure Payment</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;