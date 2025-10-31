"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Input,
  addToast,
  Button,
  Spinner,
} from "@heroui/react";
import dynamic from "next/dynamic";
// Dynamically import PaystackButton to avoid SSR evaluating a browser-only dependency
const PaystackButton = dynamic(() => import("./PaystackButton"), {
  ssr: false,
  loading: () => (
    <Button className="mt-2 rounded-full" variant="solid" isDisabled>
      <Spinner size="sm" />
    </Button>
  ),
});
import usePaymentWalletHook from "../hooks/usePaymentWalletHook";
import {
  PAYMENT_SOURCE,
  PAYMENT_TYPE,
  WALLET_TYPE,
} from "../dto/create-payment-dto";
import { PAYMENT_FLOW } from "../dto/create-payment-dto";
import { useAtomValue } from "jotai";
import { userAtom } from "@/helper/atom/user";

function AddMoneyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { onOpenChange } = useDisclosure();
  const [canpay, setCanpay] = React.useState(false);
  const [reference, setReference] = React.useState<string | null>(null);
  const [amount, setAmount] = React.useState("0");
  const user = useAtomValue(userAtom);
  const { createPayment, wallet, getWallet } = usePaymentWalletHook();

  React.useEffect(() => {
    (async function () {
      if (!wallet) {
        await getWallet();
      }
    })();

    return () => {
      setReference("");
      setCanpay(false);
      setAmount("");
    };
  }, []);

  const handleCreatePayment = async () => {
    try {
      if (Number(amount) < 1000) {
        addToast({
          title: "Minimum deposit amount is 1000",
          severity: "danger",
          variant: "solid",
        });
        return;
      }
      const response = await createPayment({
        amount: Number(amount),
        currencyType: WALLET_TYPE.NGN,
        flow: PAYMENT_FLOW.INBOUND,
        source: PAYMENT_SOURCE.PAYSTACK,
        type: PAYMENT_TYPE.DEPOSIT,
        typeId: wallet?._id || "",
        userId: user?.data?._id || "",
      });
      console.log(response.data);
      setReference(response.data?.reference || null);
      setCanpay(true);
    } catch (error) {
      addToast({
        title: "An Error occured while creating payment",
        severity: "danger",
      });
    }
  };
  return (
    <Modal isOpen={isOpen} size="sm" backdrop="blur" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <ModalBody className="px-5 pt-6">
            <p className="text-sm text-[#777777] text-center">
              Enter the amount you want to deposit
            </p>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimium deposit amount 1000
            </p>
            <div className="w-full flex justify-end">
              {!canpay && (
                <Button
                  className="mt-2 rounded-full text-xs"
                  onClick={() => handleCreatePayment()}
                  variant="solid"
                  color="primary"
                >
                  Create Payment
                </Button>
              )}
              {canpay && (
                <PaystackButton
                  reference={reference || ""}
                  amount={Number(amount)}
                  onSuccess={async (reference) => {
                    addToast({
                      title: "Payment successful",
                      severity: "success",
                    });
                    onClose();
                    await getWallet();
                    setReference(null);
                    setAmount("");
                    setCanpay(false);
                  }}
                  onFailed={() =>
                    addToast({
                      title: "Payment failed",
                      severity: "danger",
                    })
                  }
                  text="Make Payment"
                  width="170px"
                />
              )}
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddMoneyModal;
