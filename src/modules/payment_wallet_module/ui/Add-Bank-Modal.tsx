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
  Select,
  SelectItem,
} from "@heroui/react";
import usePaymentWalletHook from "../hooks/usePaymentWalletHook";
import { useAtomValue } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { ICreateAccountDto } from "../dto/create-account-dto";
import { WALLET_TYPE } from "../dto/create-payment-dto";

function AddBankModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [accountNumber, setAccountNumber] = React.useState("");
  const { getPaystackBanks, createAccount, getUserBanks } =
    usePaymentWalletHook();
  const [banks, setBanks] = React.useState<{ key: string; label: string }[]>(
    []
  );
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      const response = await getPaystackBanks();
      console.log(response);
      const transfromedBanks = response?.data.map((bank) => ({
        key: bank.code,
        label: bank.name,
      }));
      setBanks(transfromedBanks || []);
    })();
  }, []);

  const handleClick = async () => {
    try {
      if (
        accountNumber === "" ||
        accountNumber.length < 10 ||
        accountNumber.length > 10
      ) {
        addToast({
          title: "Account number must be 10 digits",
          severity: "danger",
          color: "warning",
        });
        return;
      }
      if (value === "") {
        addToast({
          title: "Please select a bank",
          severity: "danger",
          color: "danger",
        });
        return;
      }
      const bank = banks.find((bank) => bank.key === value);
      const payload: ICreateAccountDto = {
        accountNumber,
        bankCode: bank?.key as string,
        bankName: bank?.label as string,
        accountType: WALLET_TYPE.NGN,
      };
      setIsLoading(true);
      const response = await createAccount(payload);
      console.log(response);
      await getUserBanks();
      setIsLoading(false);
      addToast({
        title: "Account created",
        severity: "success",
        color: "success",
      });
      onClose();
    } catch (error) {
      console.log(error);
      addToast({
        title: "An Error occured while creating account",
        severity: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: string) => {
    console.log(e);
    setValue(e);
  };

  return (
    <Modal isOpen={isOpen} size="sm" backdrop="blur" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <ModalBody className="px-5 pt-6">
            <p className="text-lg text-[#404040] text-center font-bold">
              Add Bank account
            </p>
            <p className="text-sm text-[#777777] text-center">
              You can select bank accounts you add for funds deposits
            </p>
            <p className="text-gray-400 text-sm mt-2">Account Number</p>
            <Input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <p className="text-gray-400 text-sm mt-2">Bank</p>
            <Select
              selectedKeys={[value]}
              onChange={(val) => handleChange(val.target.value)}
            >
              {banks.map((bank) => (
                <SelectItem key={bank.key}>{bank.label}</SelectItem>
              ))}
            </Select>

            <div className="w-full flex justify-center">
              <Button
                className="mt-2 rounded-full text-xs w-full"
                onPress={() => handleClick()}
                variant="solid"
                color="primary"
                isLoading={isLoading}
              >
                Add account
              </Button>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddBankModal;
