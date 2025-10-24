import React from "react";
import PaymentWalletRepository from "../Repository/PaymenrWalletRepository";
import { ICreateAccountDto } from "../dto/create-account-dto";

function usePaymentWalletHook() {
  return {
    getWallet: async () => {
      const response = await PaymentWalletRepository.getWallet();
      return response;
    },
  };
}

export default usePaymentWalletHook;
