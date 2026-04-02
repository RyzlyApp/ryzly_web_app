import React from "react";
import PaymentWalletRepository from "../Repository/PaymenrWalletRepository";
import { ICreateAccountDto } from "../dto/create-account-dto";
import { useAtom } from "jotai";
import { ACCOUNTS_ATOM, WALLET_ATOM } from "../state/walletState";
import { ICreateOrderDto } from "../dto/create-payment-dto";
import { uniqBy } from "lodash";
import { useParams } from "next/navigation";
import StorageClass from "@/dal/storage/StorageClass";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";

function usePaymentWalletHook() {


const { organisationId } = useParams();
  const [wallet, setWallet] = useAtom(WALLET_ATOM);
  const [accounts, setAccounts] = useAtom(ACCOUNTS_ATOM);

  const tptoken = StorageClass.getValue(STORAGE_KEYS.TP_TOKEN, {
    isJSON: false,
  });

  return {
    wallet,
    accounts,
    getWallet: async () => {
      const response = await PaymentWalletRepository.getWallet(organisationId+"");
      setWallet(response.data);
      return response;
    },
    createPayment: async (dto: ICreateOrderDto) => {
      const response = await PaymentWalletRepository.createPayment({
        body: dto,
        params: null,
      }, tptoken ? tptoken+"" : "");
      return response;
    },
    verifyPayment: async (reference: string) => {
      const response = await PaymentWalletRepository.verifyPayment({
        body: { reference },
        params: null,
      }, tptoken ? tptoken+"" : "");
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
      return response.data;
    },
    createAccount: async (dto: ICreateAccountDto) => {
      const response = await PaymentWalletRepository.createAccount({
        body: dto,
        params: null,
      },
      organisationId+""
    ); 
      setAccounts((prev) => uniqBy([...prev, response.data], "_id"));
      return response;
    },
    getUserAccount: async () => {
      const response = await PaymentWalletRepository.getAccounts({
        body: null,
        params: null,
      }, organisationId+""); 
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
    createPayout: async (dto: { amount: number }) => {
      const response = await PaymentWalletRepository.createPayout({
        body: dto,
        params: null
      }, 
      organisationId+""
    );
      return response;
    },
    getPayouts: async (params: { page: number; limit: number; userId: string; status?: 'PENDING'|'SUCCESS'|'FAILED' }) => {
      const response = await PaymentWalletRepository.getPayouts({
        body: null,
        params,
      }, organisationId+"");
      return response;
    },
  };
}

export default usePaymentWalletHook;
