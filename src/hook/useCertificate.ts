"use client"
import { userAtom } from "@/helper/atom/user";
import { ICreateOrderDto, WALLET_TYPE, PAYMENT_FLOW, PAYMENT_SOURCE, PAYMENT_TYPE } from "@/modules/payment_wallet_module/dto/create-payment-dto";
import usePaymentWalletHook from "@/modules/payment_wallet_module/hooks/usePaymentWalletHook";
import { addToast } from "@heroui/react";
import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { usePaystackPayment } from "react-paystack";

const useCertificate = () => {

    const [creatingOrderLoading, setCreatingOrderLoading] = React.useState(false);
    const [canPay, setCanPay] = React.useState(false);


    const user = useAtomValue(userAtom);
    const [isLoading, setIsLoading] = React.useState(false);
    const [amount, setAmount] = React.useState(0);
    const { verifyPayment } = usePaymentWalletHook();
    const [reference, setReference] = React.useState<string>("");
    const { wallet, createPayment } =
        usePaymentWalletHook();

    const handlePayment = async (id: string, cash: number) => {
        console.log(wallet);

        setAmount(cash)
        // create order
        const obj: ICreateOrderDto = {
            amount: 5000,
            currencyType: WALLET_TYPE.NGN,
            flow: PAYMENT_FLOW.OUTBOUND,
            source: PAYMENT_SOURCE.PAYSTACK,
            type: PAYMENT_TYPE.CERTIFICATION,
            typeId: id,
            userId: user?.data?._id as string,
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


    const initializePayment = usePaystackPayment({
        reference,
        amount: 5000 * 100,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
        email: user?.data?.email || "",
    });
    // you can call this function anything
    const onPaymentSuccess = async (ref: string) => {
        try {
            setIsLoading(true);
            await verifyPayment(reference);
            // onSuccess(reference);
        } catch (error) {
            console.log(error);
            // onFailed();
        } finally {
            setIsLoading(false);
        }
    };

    // you can call this function anything
    const onClose = () => {
        // onFailed();
    };

    const handleClick = () => {
        try {
            setIsLoading(true);
            initializePayment({ onSuccess: onPaymentSuccess, onClose });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(true);
        }
    };

    useEffect(()=> {
        if(!reference) return

        console.log(reference);
        

        handleClick()

    }, [reference])

    return {
        handlePayment,
        canPay,
        creatingOrderLoading,
        createPayment,
        reference,
        setAmount
    }
}

export default useCertificate
