import React from "react";
import PaymentWalletRepository from "../Repository/PaymenrWalletRepository";
import { ICreateAccountDto } from "../dto/create-account-dto";
import { useAtom } from "jotai";
import { ACCOUNTS_ATOM, WALLET_ATOM } from "../state/walletState";
import { ICreateOrderDto } from "../dto/create-payment-dto";
import { uniqBy } from "lodash";

function usePaymentWalletHook() {
  const [wallet, setWallet] = useAtom(WALLET_ATOM);
  const [accounts, setAccounts] = useAtom(ACCOUNTS_ATOM);

  return {
    wallet,
    accounts,
    getWallet: async () => {
      const response = await PaymentWalletRepository.getWallet();
      setWallet(response.data);
      return response;
    },
    createPayment: async (dto: ICreateOrderDto) => {
      const response = await PaymentWalletRepository.createPayment({
        body: dto,
        params: null,
      });
      return response;
    },
    verifyPayment: async (reference: string) => {
      const response = await PaymentWalletRepository.verifyPayment({
        body: { reference },
        params: null,
      });
      return response;
    },
    getUserBanks: async () => {
      const response = await PaymentWalletRepository.getAccounts({
        body: null,
        params: null,
      });
      console.log(response.data);
      return response;
    },
    getPaystackBanks: async (cursor?: string) => {
      const response = await PaymentWalletRepository.getBanks({
        body: null,
        params: { cursor },
      });
      return response.data;
    },
    createAccount: async (dto: ICreateAccountDto) => {
      const response = await PaymentWalletRepository.createAccount({
        body: dto,
        params: null,
      });
      console.log(response);
      setAccounts((prev) => uniqBy([...prev, response.data], "_id"));
      return response;
    },
    getUserAccount: async () => {
      const response = await PaymentWalletRepository.getAccounts({
        body: null,
        params: null,
      });
      console.log(response);
      setAccounts(() => uniqBy([...response.data], "_id"));
      return response;
    },
    deleteAccount: async (id: string) => {
      const response = await PaymentWalletRepository.deleteAccount({
        body: null,
        params: { id },
      });
      setAccounts((prev) => prev.filter((acc) => acc._id !== id));
      return response;
    },
  };
}

export default usePaymentWalletHook;
