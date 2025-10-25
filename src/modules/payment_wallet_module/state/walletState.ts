import { atom } from "jotai";
import { WalletModel } from "../models/Wallet-model";
import { PaystackBankModel } from "../models/PaystackBankModel";
import { AccountModel } from "../models/Account-model";

export const WALLET_ATOM = atom<WalletModel | null>(null);
export const BANKS_ATOM = atom<PaystackBankModel[]>([]);
export const ACCOUNTS_ATOM = atom<AccountModel[]>([]);
