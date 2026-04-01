"use client";
import React from "react";
import { Button, Spinner } from "@heroui/react";
import { usePaystackPayment } from "react-paystack";
import { useAtomValue } from "jotai";
import { userAtom } from "@/helper/atom/user";
import usePaymentWalletHook from "../hooks/usePaymentWalletHook";
import { tpuserAtom } from "@/helper/atom/tpuser";
import StorageClass from "@/dal/storage/StorageClass";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";

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


  const email = StorageClass.getValue(STORAGE_KEYS.USER_EMAIL, {
    isJSON: false,
});
  
  // const user = useAtomValue(userAtom);
  // const tpuser = useAtomValue(tpuserAtom);
  const [isLoading, setIsLoading] = React.useState(false);
  const { verifyPayment } = usePaymentWalletHook();

  const initializePayment = usePaystackPayment({
    reference,
    amount: amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    email: email as string,
  });
  // you can call this function anything
  const onPaymentSuccess = async (ref: string) => {
    try {
      setIsLoading(true);
      await verifyPayment(reference);
      onSuccess(reference);
    } catch (error) {
      console.error(error);
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
      console.error(error);
      setIsLoading(true);
    }
  };

  return (
    <Button
      isLoading={isLoading}
      onPress={() => handlePayment()}
      className={`w-[${width}] h-[${height}] mt-2 rounded-full`}
      variant="solid"
      color="primary"
    >
      {/* {isLoading && <Spinner size="sm" />} */}
      {!isLoading && <p>{text}</p>}
    </Button>
  );
}

export default PaystackButton;
