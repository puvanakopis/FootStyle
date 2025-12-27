"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MdCreditCard,
  MdOutlineAccountBalanceWallet,
  MdOutlineLocalShipping,
  MdOutlinePayments,
} from "react-icons/md";

import Input from "@/components/UI/Input";

type PaymentType = "card" | "paypal" | "googlepay" | "wallet";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>("card");

  return (
    <div className="lg:col-span-8 space-y-8">
      {/* Payment Method Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <MdCreditCard className="text-red-500 text-2xl" />
          Payment Method
        </h2>

        {/* Payment Options */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { id: "card", label: "Card", icon: <MdCreditCard /> },
            { id: "paypal", label: "PayPal", icon: <MdOutlineAccountBalanceWallet /> },
            { id: "googlepay", label: "Google Pay", icon: <MdOutlinePayments /> },
            { id: "wallet", label: "Wallet", icon: <MdOutlineAccountBalanceWallet /> },
          ].map((item) => (
            <label key={item.id} className="cursor-pointer">
              <input
                type="radio"
                name="payment_method"
                checked={paymentMethod === item.id}
                onChange={() => setPaymentMethod(item.id as PaymentType)}
                className="peer sr-only"
              />
              <div className="h-full flex flex-col items-center justify-center p-4 rounded-xl border-2 border-neutral-200 bg-neutral-50 hover:bg-neutral-100 peer-checked:border-red-500 peer-checked:bg-white transition-all">
                <span className="text-3xl mb-2 text-neutral-600 peer-checked:text-red-500">
                  {item.icon}
                </span>
                <span className="text-sm font-semibold text-neutral-900">
                  {item.label}
                </span>
              </div>
            </label>
          ))}
        </div>

        {/* Dynamic Payment Details */}
        {paymentMethod === "card" && (
          <div className="space-y-6">
            <Input label="Cardholder Name" placeholder="Puvanakopis" />
            <Input label="Card Number" placeholder="0000 0000 0000 0000" />
            <div className="grid grid-cols-2 gap-6">
              <Input label="Expiration Date" placeholder="MM/YY" />
              <Input label="CVV / CVC" placeholder="123" />
            </div>
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="space-y-6">
            <Input label="PayPal Email" placeholder="user@paypal.com" />
            <p className="text-sm text-neutral-500">
              You will be redirected to PayPal to complete payment.
            </p>
          </div>
        )}

        {paymentMethod === "googlepay" && (
          <div className="space-y-6">
            <Input label="Google Account Email" placeholder="user@gmail.com" />
            <p className="text-sm text-neutral-500">
              Google Pay will handle your payment securely.
            </p>
          </div>
        )}

        {paymentMethod === "wallet" && (
          <div className="space-y-6">
            <Input label="Wallet ID / Phone Number" placeholder="+94 77 123 4567" />
            <Input label="PIN / OTP" placeholder="******" />
          </div>
        )}
      </div>

      {/* Delivery Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <MdOutlineLocalShipping className="text-neutral-400 text-xl" />
              Delivering to
            </h2>
            <p className="text-neutral-600">Puvanakopis</p>
            <p className="text-neutral-600">12/5 Galle Road</p>
            <p className="text-neutral-600">Colombo 03, Sri Lanka</p>
          </div>

          <Link
            href="/delivery-address"
            className="text-sm font-semibold text-red-500 hover:text-red-600"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;