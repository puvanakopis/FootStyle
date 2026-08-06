"use client";

import React, { useState } from "react";
import { MdCreditCard, MdOutlineAccountBalanceWallet, MdOutlinePayments, MdClose } from "react-icons/md";
import { FaPaypal } from "react-icons/fa";
import { SiGooglepay } from "react-icons/si";

import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { showToast } from "@/utils/toast";

export type PaymentType = "card" | "paypal" | "googlepay" | "wallet" | "cod";

interface PaymentPopupProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
    totalAmount: number;
    onPaymentSuccess: () => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({
    isOpen,
    onClose,
    orderId,
    totalAmount,
    onPaymentSuccess,
}) => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentType>("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handlePaymentSubmit = async () => {
        if (paymentMethod === "card") {
            if (!cardDetails.cardholderName.trim()) {
                showToast("error", "Please enter cardholder name");
                return;
            }
            if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ""))) {
                showToast("error", "Please enter a valid 16-digit card number");
                return;
            }
            if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
                showToast("error", "Please enter expiry date in MM/YY format");
                return;
            }
            if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
                showToast("error", "Please enter a valid CVV");
                return;
            }
        }

        setIsProcessing(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            showToast("success", `Payment of ${formatCurrency(totalAmount)} completed successfully!`);
            onPaymentSuccess();
            onClose();
        } catch (error) {
            console.error("Payment error:", error);
            showToast("error", "Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const formatCurrency = (amount: number) =>
        `Rs ${amount?.toLocaleString() || amount}`;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-200/80 p-6 rounded-t-3xl z-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-black text-slate-900">Complete Payment</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            <MdClose className="text-xl text-slate-500" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span>Drop Order ID:</span>
                        <span className="font-mono font-bold text-slate-900">#{orderId.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-semibold text-slate-500">Total Payable:</span>
                        <span className="text-2xl font-black text-[#ee2b4b]">
                            {formatCurrency(totalAmount)}
                        </span>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="p-6">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3">
                        Select Payment Method
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                        {[
                            {
                                id: "card",
                                label: "Card",
                                icon: <MdCreditCard className="text-xl" />,
                            },
                            {
                                id: "paypal",
                                label: "PayPal",
                                icon: <FaPaypal className="text-xl" />,
                            },
                            {
                                id: "googlepay",
                                label: "GPay",
                                icon: <SiGooglepay className="text-xl" />,
                            },
                            {
                                id: "wallet",
                                label: "Wallet",
                                icon: <MdOutlineAccountBalanceWallet className="text-xl" />,
                            },
                            {
                                id: "cod",
                                label: "COD",
                                icon: <MdOutlinePayments className="text-xl" />,
                            },
                        ].map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setPaymentMethod(method.id as PaymentType)}
                                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${paymentMethod === method.id
                                    ? "border-[#ee2b4b] bg-[#ee2b4b]/10 text-[#ee2b4b] font-bold shadow-xs"
                                    : "border-slate-200/80 bg-slate-50 text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {method.icon}
                                <span className="text-[11px] font-bold mt-1">{method.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Payment Details Form */}
                    {paymentMethod === "card" && (
                        <div className="space-y-3.5 mb-6">
                            <Input
                                label="Cardholder Name"
                                placeholder="John Doe"
                                value={cardDetails.cardholderName}
                                onChange={(e) =>
                                    setCardDetails({ ...cardDetails, cardholderName: e.target.value })
                                }
                            />
                            <Input
                                label="Card Number"
                                placeholder="1234 5678 9012 3456"
                                value={cardDetails.cardNumber}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        cardNumber: e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim(),
                                    })
                                }
                                maxLength={19}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Expiry Date"
                                    placeholder="MM/YY"
                                    value={cardDetails.expiryDate}
                                    onChange={(e) =>
                                        setCardDetails({
                                            ...cardDetails,
                                            expiryDate: e.target.value
                                                .replace(/\D/g, "")
                                                .replace(/(\d{2})(\d{0,2})/, "$1/$2")
                                                .substring(0, 5),
                                        })
                                    }
                                    maxLength={5}
                                />
                                <Input
                                    label="CVV"
                                    placeholder="123"
                                    type="password"
                                    value={cardDetails.cvv}
                                    onChange={(e) =>
                                        setCardDetails({
                                            ...cardDetails,
                                            cvv: e.target.value.replace(/\D/g, "").substring(0, 4),
                                        })
                                    }
                                    maxLength={4}
                                />
                            </div>
                        </div>
                    )}

                    {paymentMethod === "paypal" && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                            <p className="text-xs font-semibold text-blue-800">
                                You will be redirected to PayPal to complete your payment securely.
                            </p>
                        </div>
                    )}

                    {paymentMethod === "googlepay" && (
                        <div className="mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                            <p className="text-xs font-semibold text-emerald-800">
                                Google Pay will handle your payment securely. Make sure you are signed in to your Google account.
                            </p>
                        </div>
                    )}

                    {paymentMethod === "wallet" && (
                        <div className="mb-6 space-y-3">
                            <Input
                                label="Phone Number"
                                placeholder="+94 77 123 4567"
                                type="tel"
                            />
                            <Input
                                label="PIN / OTP"
                                placeholder="******"
                                type="password"
                            />
                        </div>
                    )}

                    {paymentMethod === "cod" && (
                        <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                            <p className="text-xs font-semibold text-amber-900">
                                You will pay <span className="font-bold">{formatCurrency(totalAmount)}</span> in cash when your order is delivered.
                            </p>
                        </div>
                    )}

                    {/* Security Info */}
                    <div className="mb-6 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
                            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span>256-Bit Encrypted Payment Protocol</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-slate-200/80 p-6 rounded-b-3xl">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                            disabled={isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handlePaymentSubmit}
                            className="flex-1 bg-[#ee2b4b] hover:bg-[#ff3b5c] text-white"
                            loading={isProcessing}
                        >
                            {isProcessing ? "Processing..." : `Pay ${formatCurrency(totalAmount)}`}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPopup;