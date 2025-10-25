import React from "react";
import PaymentWalletRepository from "../Repository/PaymenrWalletRepository";
import { ICreateAccountDto } from "../dto/create-account-dto";
import { useAtom } from "jotai";
import { WALLET_ATOM } from "../state/walletState";
import { ICreateOrderDto } from "../dto/create-payment-dto";

function usePaymentWalletHook() {
  const [wallet, setWallet] = useAtom(WALLET_ATOM);

  return {
    wallet,
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
      return response;
    },
    getPaystackBanks: async (cursor?: string) => {
      const response = await PaymentWalletRepository.getBanks({
        body: null,
        params: { cursor },
      });
      return response;
    },
    createAccount: async (dto: ICreateAccountDto) => {
      const response = await PaymentWalletRepository.createAccount({
        body: dto,
        params: null,
      });
      return response;
    },
  };
}

export default usePaymentWalletHook;
