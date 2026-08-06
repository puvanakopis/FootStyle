"use client";

import React from "react";
import { Order } from "@/interfaces/orderInterface";
import { PackageCheck, Clock, Truck, CheckCircle2, XCircle } from "lucide-react";

interface OrderHistoryProps {
  orders: Order[];
  formatDate: (date?: string) => string;
  formatCurrency: (amount: number) => string;
  getPrimaryImage: (product: any) => string;
}

const statusStyles: Record<string, { style: string; icon: React.ReactNode }> = {
  pending: { style: "bg-amber-100 text-amber-800 border-amber-300", icon: <Clock className="w-3.5 h-3.5 text-amber-600" /> },
  processing: { style: "bg-blue-100 text-blue-800 border-blue-300", icon: <PackageCheck className="w-3.5 h-3.5 text-blue-600" /> },
  shipped: { style: "bg-purple-100 text-purple-800 border-purple-300", icon: <Truck className="w-3.5 h-3.5 text-purple-600" /> },
  delivered: { style: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> },
  cancelled: { style: "bg-red-100 text-red-800 border-red-300", icon: <XCircle className="w-3.5 h-3.5 text-red-600" /> },
  returned: { style: "bg-slate-100 text-slate-700 border-slate-300", icon: <XCircle className="w-3.5 h-3.5 text-slate-500" /> },
};

const OrderHistory: React.FC<OrderHistoryProps> = ({
  orders,
  formatDate,
  formatCurrency,
  getPrimaryImage,
}) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-16 px-6 rounded-3xl border border-slate-200/80 bg-white backdrop-blur-xl shadow-xs">
        <PackageCheck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-900 mb-1">No Orders Found</h3>
        <p className="text-xs text-slate-500 font-medium">You haven&apos;t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const statusConfig = statusStyles[order.status?.toLowerCase()] || statusStyles.pending;

        return (
          <div
            key={order._id}
            className="group rounded-3xl border border-slate-200/80 bg-white backdrop-blur-xl overflow-hidden shadow-sm hover:shadow-md"
          >
            {/* Order Card Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200/80 flex flex-wrap gap-4 justify-between items-center bg-slate-50/50">
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    Order Placed
                  </span>
                  <span className="font-bold text-slate-900 mt-0.5 block">
                    {formatDate(order.createdAt)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    Total Amount
                  </span>
                  <span className="font-black text-[#ee2b4b] mt-0.5 block">
                    {formatCurrency(order.total)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    Drop ID
                  </span>
                  <span className="font-bold text-slate-700 mt-0.5 block font-mono">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border ${statusConfig.style}`}
              >
                {statusConfig.icon}
                {order.status}
              </span>
            </div>

            {/* Order Items Body */}
            <div className="p-5 flex flex-col gap-4">
              {order.items.map((item, index) => {
                const product =
                  typeof item.product === "string" ? null : item.product;

                return (
                  <div
                    key={`${order._id}-${index}`}
                    className="flex flex-col sm:flex-row gap-4 items-center sm:items-start p-3 rounded-2xl bg-slate-50 border border-slate-200/80/60"
                  >
                    <div
                      className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0 border border-slate-200/80"
                      style={{
                        backgroundImage: `url(${getPrimaryImage(product)})`,
                      }}
                    />

                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-sm font-bold text-slate-900">
                        {product?.title || product?.name || `Sneaker Drop #${index + 1}`}
                      </h3>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1.5 text-xs text-slate-600 font-semibold">
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-slate-900 font-bold text-[10px]">
                          US {item.size}
                        </span>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;