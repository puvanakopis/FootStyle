"use client";

import React, { useState } from "react";
import { MdCreditCard, MdOutlineAccountBalanceWallet, MdOutlinePayments, MdClose, } from "react-icons/md";
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
        // Validation based on payment method
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
        new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 0,
        }).format(amount);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-neutral-100 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-neutral-900">Complete Payment</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                        >
                            <MdClose className="text-2xl text-neutral-500" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Order ID:</span>
                        <span className="font-semibold text-neutral-900">{orderId}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-neutral-600">Total Amount:</span>
                        <span className="text-2xl font-bold text-red-500">
                            {formatCurrency(totalAmount)}
                        </span>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                        Select Payment Method
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        {[
                            {
                                id: "card",
                                label: "Card",
                                icon: <MdCreditCard className="text-2xl" />,
                            },
                            {
                                id: "paypal",
                                label: "PayPal",
                                icon: <FaPaypal className="text-2xl" />,
                            },
                            {
                                id: "googlepay",
                                label: "Google Pay",
                                icon: <SiGooglepay className="text-2xl" />,
                            },
                            {
                                id: "wallet",
                                label: "Wallet",
                                icon: <MdOutlineAccountBalanceWallet className="text-2xl" />,
                            },
                            {
                                id: "cod",
                                label: "COD",
                                icon: <MdOutlinePayments className="text-2xl" />,
                            },
                        ].map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setPaymentMethod(method.id as PaymentType)}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === method.id
                                    ? "border-red-500 bg-red-50 text-red-500"
                                    : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                                    }`}
                            >
                                {method.icon}
                                <span className="text-sm font-semibold mt-2">{method.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Payment Details */}
                    {paymentMethod === "card" && (
                        <div className="space-y-4 mb-6">
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
                            <div className="grid grid-cols-2 gap-4">
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
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-sm text-blue-800">
                                You will be redirected to PayPal to complete your payment securely.
                            </p>
                        </div>
                    )}

                    {paymentMethod === "googlepay" && (
                        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
                            <p className="text-sm text-green-800">
                                Google Pay will handle your payment securely. Make sure you are signed in to your Google account.
                            </p>
                        </div>
                    )}

                    {paymentMethod === "wallet" && (
                        <div className="mb-6 space-y-4">
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
                        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                            <p className="text-sm text-yellow-800">
                                You wll pay <span className="font-bold">{formatCurrency(totalAmount)}</span> in cash when your order is delivered.
                            </p>
                            <p className="text-xs text-yellow-600 mt-2">
                                Note: A small processing fee may apply.
                            </p>
                        </div>
                    )}

                    {/* Security Info */}
                    <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span>Your payment is secure and encrypted</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-neutral-100 p-6 rounded-b-2xl">
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
                            className="flex-1 bg-red-500 hover:bg-red-600"
                            loading={isProcessing}
                        >
                            {isProcessing ? "Processing..." : `Pay ${formatCurrency(totalAmount)}`}
                        </Button>
                    </div>
                    <p className="text-xs text-center text-neutral-500 mt-3">
                        By clicking Pay, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentPopup;