"use client";
import React from "react";
import { Button, Spinner } from "@heroui/react";
import { usePaystackPayment } from "react-paystack";
import { useAtomValue } from "jotai";
import { userAtom } from "@/helper/atom/user";
import usePaymentWalletHook from "../hooks/usePaymentWalletHook";

function PaystackButton({
  reference,
  amount,
  width = "100%",
  height = "40px",
  onSuccess,
  onFailed,
  text = "Pay",
}: {
  reference: string;
  amount: number;
  width?: string;
  height?: string;
  text?: string;
  onSuccess: (reference: string) => void;
  onFailed: () => void;
}) {
  const user = useAtomValue(userAtom);
  const [isLoading, setIsLoading] = React.useState(false);
  const { verifyPayment } = usePaymentWalletHook();

  const initializePayment = usePaystackPayment({
    reference,
    amount: amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    email: user?.data?.email || "",
  });
  // you can call this function anything
  const onPaymentSuccess = async (ref: string) => {
    try {
      setIsLoading(true);
      await verifyPayment(reference);
      onSuccess(reference);
    } catch (error) {
      console.log(error);
      onFailed();
    } finally {
      setIsLoading(false);
    }
  };

  // you can call this function anything
  const onClose = () => {
    onFailed();
  };

  const handlePayment = () => {
    try {
      setIsLoading(true);
      initializePayment({ onSuccess: onPaymentSuccess, onClose });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };

  return (
    <Button
      isLoading={isLoading}
      onPress={() => handlePayment()}
      className={`w-[${width}] h-[${height}] mt-2 rounded-full`}
      variant="solid"
    >
      {/* {isLoading && <Spinner size="sm" />} */}
      {!isLoading && <p>{text}</p>}
    </Button>
  );
}

export default PaystackButton;
