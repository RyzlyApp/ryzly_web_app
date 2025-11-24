/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Input,
  Button,
} from "@heroui/react";
import { addToast } from "@heroui/toast";
import usePaymentWalletHook from "../hooks/usePaymentWalletHook";


function RequestPayoutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [amount, setAmount] = React.useState("");
  const { createPayout } =
    usePaymentWalletHook();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    const normalized = amount?.toString().replace(/[,\s]+/g, "");
    const num = Number(normalized);
    if (!normalized || !Number.isFinite(num) || num <= 1000) {
       addToast({
            title: 'Warning',
            description: 'Amount can not be less than NGN1000',
            variant: 'flat',
            color: 'danger',
        });
      return;
    }
    setIsLoading(true);
    try {
      const response = await createPayout({
        amount: num,
      });
      console.log(`PAYOUT CREATED`, response);
      addToast({
            title: 'Success',
            description: 'Payout request sent successfully',
            variant: 'flat',
            color: 'success',
        });
    onClose();
    } catch (error: any) {
        console.log(error);
      addToast({
            title: 'Error',
            description: error?.message ?? 'An error occured while creating your payout',
            variant: 'flat',
            color: 'danger'
        });
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <Modal isOpen={isOpen} size="sm" backdrop="blur" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <ModalBody className="px-5 pt-6">
            <p className="text-lg text-[#404040] text-center font-bold">
              Request Payout
            </p>
            <p className="text-sm text-[#777777] text-center">
              Enter the amount you want to withdraw
            </p>
            <p className="text-gray-400 text-sm mt-2">Amount</p>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
           

            <div className="w-full flex justify-center">
              <Button
                className="mt-2 rounded-full text-xs w-full"
                onPress={() => handleClick()}
                variant="solid"
                color="primary"
                isLoading={isLoading}
              >
                Process Payout
              </Button>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}

export default RequestPayoutModal;
