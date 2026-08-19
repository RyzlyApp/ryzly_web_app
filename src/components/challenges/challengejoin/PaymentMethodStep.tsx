import { formatNumber } from "@/helper/utils/numberFormat";
import PaystackButton from "@/modules/payment_wallet_module/ui/PaystackButton";
import { CustomButton } from "@/components/custom";
import { PaymentMethod } from "./useChallengePayment";

interface PaymentMethodStepProps {
    showWalletOption: boolean;
    walletBalance: number;
    paymentType: PaymentMethod;
    setPaymentType: (type: PaymentMethod) => void;
    canPay: boolean;
    isPaying: boolean;
    onPay: () => void;
    reference: string;
    amount: number;
    onPaystackFailed: () => void;
    onPaystackSuccess: () => void;
}

export default function PaymentMethodStep({
    showWalletOption,
    walletBalance,
    paymentType,
    setPaymentType,
    canPay,
    isPaying,
    onPay,
    reference,
    amount,
    onPaystackFailed,
    onPaystackSuccess,
}: PaymentMethodStepProps) {
    return (
        <div className=" w-full flex flex-col items-center gap-4 ">
            <p className=" text-lg font-semibold ">Payment method</p>

            {showWalletOption && (
                <div
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${
                        paymentType === "WALLET"
                            ? "border-neonblue-500 bg-neonblue-50"
                            : "border-gray-200 bg-white"
                    }`}
                    onClick={() => setPaymentType("WALLET")}
                >
                    <input
                        type="radio"
                        name="paymentType"
                        checked={paymentType === "WALLET"}
                        onChange={() => setPaymentType("WALLET")}
                        className="w-4 h-4 text-neonblue-600"
                    />
                    <div className="flex flex-col text-base">
                        <p className="font-semibold">Wallet</p>
                        <p className="font-medium text-violet-300">
                            {formatNumber(walletBalance, "₦")}
                        </p>
                    </div>
                </div>
            )}

            <div
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentType === "PAYSTACK"
                        ? "border-neonblue-500 bg-neonblue-50"
                        : "border-gray-200 bg-white"
                }`}
                onClick={() => setPaymentType("PAYSTACK")}
            >
                <input
                    type="radio"
                    name="paymentType"
                    checked={paymentType === "PAYSTACK"}
                    onChange={() => setPaymentType("PAYSTACK")}
                    className="w-4 h-4 text-neonblue-600"
                />
                <div className="flex flex-col text-base">
                    <p className="font-semibold">Paystack</p>
                </div>
            </div>

            <div className=" w-full flex justify-end ">
                {!canPay && (
                    <CustomButton onClick={onPay} isLoading={isPaying}>
                        Pay
                    </CustomButton>
                )}
                {canPay && (
                    <PaystackButton
                        text="Make Payment"
                        height="40px"
                        width="auto"
                        reference={reference}
                        amount={amount}
                        onFailed={onPaystackFailed}
                        onSuccess={onPaystackSuccess}
                    />
                )}
            </div>
        </div>
    );
}
