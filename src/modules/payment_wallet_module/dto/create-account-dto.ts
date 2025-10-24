import { WALLET_TYPE } from "./create-payment-dto";

export interface ICreateAccountDto {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountType?: WALLET_TYPE;
}
