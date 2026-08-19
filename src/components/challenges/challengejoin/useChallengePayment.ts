/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { addToast } from "@heroui/toast";
import usePaymentWalletHook from "@/modules/payment_wallet_module/hooks/usePaymentWalletHook";
import {
    ICreateOrderDto,
    PAYMENT_FLOW,
    PAYMENT_SOURCE,
    PAYMENT_TYPE,
    WALLET_TYPE,
} from "@/modules/payment_wallet_module/dto/create-payment-dto";
import { IChallenge } from "@/helper/model/challenge";

export type PaymentMethod = "PAYSTACK" | "WALLET";

interface UseChallengePaymentArgs {
    item: IChallenge;
    noauth?: boolean;
    discount?: number | null;
    userId?: string;
    /** Called once payment succeeds (or immediately for free challenges) */
    onJoin: () => void;
}

/**
 * Encapsulates all wallet/paystack payment state + logic that used to live
 * inline inside ChallengeInfo. Nothing here changes behaviour, it just
 * gives it a name and a home.
 */
export default function useChallengePayment({
    item,
    noauth,
    discount,
    userId,
    onJoin,
}: UseChallengePaymentArgs) {
    const { wallet, getWallet, createPayment } = usePaymentWalletHook();

    const [paymentType, setPaymentType] = useState<PaymentMethod>("WALLET");
    const [showPaymentTypeSelector, setShowPaymentTypeSelector] =
        useState(false);
    const [creatingOrderLoading, setCreatingOrderLoading] = useState(false);
    const [canPay, setCanPay] = useState(false);
    const [fee, setFee] = useState(0);
    const [reference, setReference] = useState("");
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if (!wallet && !noauth) {
            getWallet();
        }
    }, [wallet]);

    useEffect(() => {
        if (discount) {
            const discountAmount = (discount / 100) * item?.participationFee;
            setFee(item?.participationFee - discountAmount);
        } else {
            setFee(item?.participationFee);
        }
    }, [discount, item?.participationFee]);

    const resetPaymentState = () => {
        setShowPaymentTypeSelector(false);
        setCanPay(false);
        setReference("");
        setAmount(0);
    };

    const stopOrderLoading = () => setCreatingOrderLoading(false);

    const buildOrderPayload = (source: PAYMENT_SOURCE): ICreateOrderDto => ({
        amount: fee,
        currencyType: WALLET_TYPE.NGN,
        flow: PAYMENT_FLOW.OUTBOUND,
        source,
        type: PAYMENT_TYPE.CHALLENGE,
        creatorType: "USER",
        organizationId: "",
        typeId: item?._id,
        userId: userId as string,
    });

    const notifyPaymentError = (error: any) => {
        addToast({
            title: "An error occured",
            description:
                error?.message || "An error occured while creating payment",
            color: "danger",
        });
    };

    const payWithWallet = async () => {
        if ((wallet?.balance as number) < fee) {
            addToast({ title: "Insufficient balance", color: "danger" });
            return;
        }
        try {
            setCreatingOrderLoading(true);
            await createPayment(buildOrderPayload(PAYMENT_SOURCE.WALLET));
            onJoin();
        } catch (error: any) {
            notifyPaymentError(error);
        } finally {
            setCreatingOrderLoading(false);
        }
    };

    const payWithPaystack = async () => {
        try {
            setCreatingOrderLoading(true);
            const res = await createPayment(
                buildOrderPayload(PAYMENT_SOURCE.PAYSTACK),
            );
            setReference(res?.data?.reference as string);
            setAmount(res?.data?.amount);
            setCanPay(true);
        } catch (error: any) {
            notifyPaymentError(error);
        } finally {
            setCreatingOrderLoading(false);
        }
    };

    const handlePayment = async () => {
        if (fee === 0) {
            onJoin();
            return;
        }
        if (paymentType === "WALLET") {
            await payWithWallet();
        } else {
            await payWithPaystack();
        }
    };

    return {
        wallet,
        paymentType,
        setPaymentType,
        showPaymentTypeSelector,
        setShowPaymentTypeSelector,
        creatingOrderLoading,
        stopOrderLoading,
        canPay,
        setCanPay,
        fee,
        reference,
        amount,
        handlePayment,
        resetPaymentState,
    };
}
