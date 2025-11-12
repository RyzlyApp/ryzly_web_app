"use client" 
import { ICreateOrderDto, WALLET_TYPE, PAYMENT_FLOW, PAYMENT_SOURCE, PAYMENT_TYPE } from "@/modules/payment_wallet_module/dto/create-payment-dto";
import usePaymentWalletHook from "@/modules/payment_wallet_module/hooks/usePaymentWalletHook";
import { addToast } from "@heroui/react"; 
import React from "react";

const useCertificate = () => {
 
    const [creatingOrderLoading, setCreatingOrderLoading] = React.useState(false);
    const [canPay, setCanPay] = React.useState(false);
    const [reference, setReference] = React.useState<string>("");
    const { wallet, createPayment } =
        usePaymentWalletHook();

    const handlePayment = async (id: string) => {
        console.log(wallet);
        // create order
        const obj: ICreateOrderDto = {
            amount: 5000,
            currencyType: WALLET_TYPE.NGN,
            flow: PAYMENT_FLOW.OUTBOUND,
            source: PAYMENT_SOURCE.PAYSTACK,
            type: PAYMENT_TYPE.CERTIFICATION,
            typeId: id,
            userId: wallet?.userId as string,
        };
        try {
            setCreatingOrderLoading(true);
            const res = await createPayment(obj);
            setReference(res?.data?.reference as string);
            setCanPay(true);
            setCreatingOrderLoading(false);
        } catch (error: any) {
            addToast({
                title: "An error occured",
                description:
                    error?.message || "An error occured while creating payment",
                color: "danger",
            });
            setCreatingOrderLoading(false);
        }
    };

    return {
        handlePayment,
        canPay,
        creatingOrderLoading,
        createPayment,
        reference
    }
}

export default useCertificate
