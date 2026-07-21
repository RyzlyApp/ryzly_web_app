import { IOrderCreation } from "@/helper/model/payment";
import httpService from "@/helper/services/httpService";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";

const PAYSTACK_KEY =
  process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

const usePayStack = ({ challenge }: { challenge?: boolean }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [typeId, setTypeId] = useState("");

  const initializePayment = usePaystackPayment({
    publicKey: PAYSTACK_KEY,
  });

  const payStackMutation = useMutation({
    mutationFn: (data: { reference: string }) =>
      httpService.post("/payment/verify", data),

    onSuccess: () => {
      if (challenge && typeId) {
        router.push(
          `/dashboard/challenges/${typeId}/details/overview`
        );
      }
    },

    onError: () => {
      addToast({
        title: "Error",
        description: "Error occurred while verifying payment.",
        color: "danger",
      });
    },
  });

  const handlePayment = ({
    email,
    amount,
    reference,
    challengeId,
  }: {
    email: string;
    amount: number;
    reference: string;
    challengeId: string;
  }) => {
    initializePayment({
      config: {
        reference,
        email,
        amount,
      },
      onSuccess: ({ reference }) => {
        payStackMutation.mutate({
          reference,
        });
      },
      onClose: () => {
        addToast({
          title: "Error",
          description: "challenge creation was not successful, kindly try again",
          color: "danger",
        });
  
        
        router.push(
          `/dashboard/challenges`
        );
      },
    });
  };

  const createCustomOrder = useMutation({
    mutationFn: (data: IOrderCreation) =>
      httpService.post("/payment/order", data),

    onSuccess: ({ data }, second) => {
      addToast({
        title: "Success",
        description: data.message,
        color: "success",
      });

      console.log(second);
      

      const order = data.data;

      handlePayment({
        email: order.user.email,
        amount: Number(order.amount) * 100,
        reference: order.reference,
        challengeId: order.challengeId, // <-- returned from your API
      });
    },

    onError: (error: AxiosError) => {
      handleError(error);
    },
  });

  return {
    open,
    setOpen,
    openMobile,
    setOpenMobile,

    typeId,
    setTypeId,

    createCustomOrder,
    payStackMutation,
  };
};

export default usePayStack;