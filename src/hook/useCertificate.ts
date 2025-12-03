"use client"
import { userAtom } from "@/helper/atom/user";
import { ICreateOrderDto, WALLET_TYPE, PAYMENT_FLOW, PAYMENT_SOURCE, PAYMENT_TYPE } from "@/modules/payment_wallet_module/dto/create-payment-dto";
import usePaymentWalletHook from "@/modules/payment_wallet_module/hooks/usePaymentWalletHook";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { usePaystackPayment } from "react-paystack";

const useCertificate = () => {

    const [creatingOrderLoading, setCreatingOrderLoading] = React.useState(false);
    const [canPay, setCanPay] = React.useState(false);

    const queryClient = useQueryClient()


    const user = useAtomValue(userAtom); 
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
            amount: cash,
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
        amount: amount * 100,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
        email: user?.data?.email || "",
    });
    // you can call this function anything
    const onPaymentSuccess = async (ref: string) => {
        try { 
            await verifyPayment(reference);
            
            // onSuccess(reference);
        } catch (error) {
            console.log(error);
            // onFailed();
        } finally { 
            queryClient.invalidateQueries({ queryKey: ["certificate"] })
        }
    };

    // you can call this function anything
    const onClose = () => {
        // onFailed();
    };

    const handleClick = () => {
        try { 
            initializePayment({ onSuccess: onPaymentSuccess, onClose }); 
        } catch (error) {
            console.log(error); 
        }
    };

    useEffect(()=> {
        if(!reference) return 
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
