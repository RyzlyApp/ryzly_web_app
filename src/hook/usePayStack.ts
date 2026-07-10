import { IOrderCreation } from "@/helper/model/payment";
import httpService from "@/helper/services/httpService";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

const usePayStack = ({ challenge }: { challenge?: boolean }) => {
    const [open, setOpen] = useState(false);
    const [openMobile, setOpenMobile] = useState(false); 
    const [typeId, setTypeId] = useState("");
    const router = useRouter();

    const createCustomOrder = useMutation({
        mutationFn: (data: IOrderCreation) =>
            httpService.post("/payment/order", data),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: (data) => {
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            });

            console.log(data?.data?.data?.reference);
            

            handlePayment({
                publicKey: PAYSTACK_KEY,
                email: data?.data?.data?.user?.email,
                amount: Number(data?.data.data?.amount) * 100, // Convert to kobo
                reference: data?.data?.data?.reference,
            });
        },
    });

    const handlePayment = React.useCallback((config: any) => {
        const initializePayment = usePaystackPayment(config);
        const onSuccess = (reference: any) => {
            payStackMutation.mutate({
                reference: reference.reference,
            });
            console.log(`PAYSTACK REFRENCE`, reference);
        };
        // you can call this function anything
        const onClose = () => {
            console.log("closed");
        };
        // console.log(paystackConfig);
        if (config.amount > 0) {
            initializePayment({
                onSuccess,
                onClose,
            });
        }
    }, []);

    const payStackMutation = useMutation({
        mutationFn: (data: { reference: string }) =>
            httpService.post("/payment/verify", data),
        onSuccess: () => {
            if (challenge) {
                router.push(`/dashboard/challenges/${typeId}/details/overview`);
            }
        },
        onError: () => {
            addToast({
                title: "Error",
                description: "Error Occurred",
                color: "danger",
            });
        },
    });

    return {
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        createCustomOrder,
        typeId,
        setTypeId,
    };
};

export default usePayStack;
