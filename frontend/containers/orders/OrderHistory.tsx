"use client";

import React from "react";

type OrderStatus = "processing" | "delivered" | "cancelled";

interface OrderItemDetail {
  title: string;
  description: string;
  image: string;
}

interface OrderItem {
  id: string;
  date: string;
  total: string;
  orderNo: string;
  status: OrderStatus;
  items: OrderItemDetail[];
}

const orders: OrderItem[] = [
  {
    id: "1",
    date: "October 24, 2023",
    total: "Rs 145.00",
    orderNo: "#FS-883291",
    status: "processing",
    items: [
      {
        title: "Speed Runner Pro",
        description:
          "Basketball Sneaker • Size: 9.5 • Color: Red • Estimated delivery by Oct 30",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDWMS3ZqlSHblgEuSBl3H9KrESpT45jiSsQqEz9Ze9KRzDTS6_-lZ9R4lCY3W4D408RHuqvwJVSiQVMwCTzuqUYub1KXrK1ZJpqPDa_YYXiEir-Q3qxY7biH9j2DxJ73sTTKHHOFHdy3Wtc8Z3RPYaXCm_WeQeFISZcpJWDw2E_7q-3sNYBcQ7enMV4evbL5BhYRTh-1muqmNPNpZvHtBqhnPqvTWjt0_IlyPSbP702UReH4BZoCicxpPPoLkqOzo8DVBZeu9oOLChJ",
      },
      {
        title: "Speed Runner Pro",
        description:
          "Basketball Sneaker • Size: 9.5 • Color: Red • Estimated delivery by Oct 30",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDWMS3ZqlSHblgEuSBl3H9KrESpT45jiSsQqEz9Ze9KRzDTS6_-lZ9R4lCY3W4D408RHuqvwJVSiQVMwCTzuqUYub1KXrK1ZJpqPDa_YYXiEir-Q3qxY7biH9j2DxJ73sTTKHHOFHdy3Wtc8Z3RPYaXCm_WeQeFISZcpJWDw2E_7q-3sNYBcQ7enMV4evbL5BhYRTh-1muqmNPNpZvHtBqhnPqvTWjt0_IlyPSbP702UReH4BZoCicxpPPoLkqOzo8DVBZeu9oOLChJ",
      },
      {
        title: "Speed Runner Pro",
        description:
          "Basketball Sneaker • Size: 9.5 • Color: Red • Estimated delivery by Oct 30",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDWMS3ZqlSHblgEuSBl3H9KrESpT45jiSsQqEz9Ze9KRzDTS6_-lZ9R4lCY3W4D408RHuqvwJVSiQVMwCTzuqUYub1KXrK1ZJpqPDa_YYXiEir-Q3qxY7biH9j2DxJ73sTTKHHOFHdy3Wtc8Z3RPYaXCm_WeQeFISZcpJWDw2E_7q-3sNYBcQ7enMV4evbL5BhYRTh-1muqmNPNpZvHtBqhnPqvTWjt0_IlyPSbP702UReH4BZoCicxpPPoLkqOzo8DVBZeu9oOLChJ",
      },
    ],
  },
  {
    id: "2",
    date: "September 12, 2023",
    total: "Rs 280.00",
    orderNo: "#FS-772104",
    status: "delivered",
    items: [
      {
        title: "Urban Trekker Low",
        description: "Delivered on Sep 15, 2023",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAq9OXD6c-16MG8_MrQwWygSdWLPjNwsk1r8kbz_ggrS_AOpQgI6I-fC_Q8yiBjxOPcICG_Jcz2TYE4AHr7GzLZIgVR-aP04pt9C8-f4aElFBHx8y4YotmyWFfUVDyXMG9_3_BNyn_BndEzLr4huI9UiqorMVJMSOmQe--7IGP_Y1vt0x0GAE6nf50R71pfmeW5_Hb8zILXYoAvvRvyhQGvSAUVndB98MEXstuSi1Io6ILhqObcDtmHS_MOMv8NHUcneC5VijBuUBhz",
      },
      {
        title: "Another Item",
        description: "Delivered on Sep 15, 2023",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDAk78r_VH9KmyTZ5k6Kri-zxpTb3ITYmX5C6f8dN26fJHIc6zSUU7_aniKs6-inddn0UOJLaPLczD4ysP81KHvByuAcXAoY3Q5TcctF6LRU9JhcTM2QBLakAcTp27xwE_ni9FTR39P_cgO_ntQ8qSuxYZSZiaLVOcpZAUpIVbnlPh77MdvAtgkSbX38y_4RIYcvLSxr4T4dGNo4z9DIIusqujCgwUuy0HAILTyu3_qxuTCFt9UMTk-8Z1OknI1I1v_9Ii4TOjMB5Lr",
      },
    ],
  },
];

const statusStyles = {
  processing: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-neutral-100 text-neutral-600",
};

const OrderHistory = () => {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="group bg-white rounded-2xl shadow-sm border border-neutral-100 hover:border-[#ee2b4b]/20 overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#edf0f5ff]/20 flex flex-wrap gap-4 justify-between items-center bg-neutral-50">
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <Info label="Order Placed" value={order.date} />
              <Info label="Total Amount" value={order.total} />
              <Info label="Order Number" value={order.orderNo} />
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[order.status]}`}
            >
              {order.status}
            </span>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 flex flex-col gap-6">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-6 items-center sm:items-start"
              >
                {/* Image */}
                <div
                  className={`w-24 h-24 rounded-lg bg-cover bg-center ${
                    order.status === "cancelled" ? "grayscale" : ""
                  }`}
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-row sm:flex-col gap-3">
                  {order.status !== "cancelled" && index === 0 && (
                    <button className="px-5 py-2.5 bg-[#ee2b4b] text-white rounded-lg text-sm font-bold hover:bg-red-600 transition">
                      {order.status === "processing" ? "Track Order" : "Buy Again"}
                    </button>
                  )}
          
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-semibold text-neutral-500 uppercase">{label}</p>
    <p className="text-sm font-medium text-neutral-900 mt-1">{value}</p>
  </div>
);

export default OrderHistory;