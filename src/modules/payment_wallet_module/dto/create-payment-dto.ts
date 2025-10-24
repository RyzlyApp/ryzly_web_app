export enum PAYMENT_TYPE {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  CHALLENGE = "CHALLENGE",
  CERTIFICATION = "CERTIFICATION",
}

export enum PAYMENT_STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum WALLET_TYPE {
  NGN = "NGN",
  USD = "USD",
}

export interface ICreateOrderDto {
  type: PAYMENT_TYPE;
  typeId: string;
  userId: string;
  amount: number;
  currencyType: WALLET_TYPE;
}
