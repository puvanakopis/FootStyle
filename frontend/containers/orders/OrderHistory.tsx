"use client";

import React from "react";
import { Order } from "@/interfaces/orderInterface";

interface OrderHistoryProps {
  orders: Order[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  getPrimaryImage: (product: any) => string;
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  returned: "bg-neutral-100 text-neutral-600",
};

const OrderHistory: React.FC<OrderHistoryProps> = ({
  orders,
  formatDate,
  formatCurrency,
  getPrimaryImage,
}) => {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="group bg-white rounded-2xl shadow-sm border border-neutral-100 hover:border-[#ee2b4b]/20 overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-neutral-100 flex flex-wrap gap-4 justify-between items-center bg-neutral-50">
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase">
                  Order Placed
                </p>
                <p className="text-sm font-medium text-neutral-900 mt-1">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase">
                  Total Amount
                </p>
                <p className="text-sm font-medium text-neutral-900 mt-1">
                  {formatCurrency(order.total)}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase">
                  Order Number
                </p>
                <p className="text-sm font-medium text-neutral-900 mt-1">
                  {order._id}
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize 
                                ${statusStyles[order.status.toLowerCase()] || statusStyles.pending}`}
            >
              {order.status}
            </span>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 flex flex-col gap-6">
            {order.items.map((item, index) => {
              const product =
                typeof item.product === "string" ? null : item.product;

              return (
                <div
                  key={`${order._id}-${index}`}
                  className="flex flex-col sm:flex-row gap-6 items-center sm:items-start"
                >
                  {/* Image */}
                  <div
                    className={`w-24 h-24 rounded-lg bg-cover bg-center 
                                            ${order.status.toLowerCase() === "cancelled" ? "grayscale" : ""}`}
                    style={{
                      backgroundImage: `url(${getPrimaryImage(product)})`,
                      backgroundColor: "#f5f5f5",
                    }}
                  />

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900">
                      {product?.title || `Product ${index + 1}`}
                    </h3>

                    <p className="text-sm text-neutral-500 mt-1">
                      Size: {item.size} • Quantity: {item.quantity}
                    </p>

                    <p className="text-sm text-neutral-500 mt-1">
                      Status: {order.status} • Estimated delivery by{" "}
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;