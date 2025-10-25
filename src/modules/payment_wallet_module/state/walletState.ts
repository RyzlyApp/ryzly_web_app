import { atom } from "jotai";
import { WalletModel } from "../models/Wallet-model";

export const WALLET_ATOM = atom<WalletModel | null>(null);
