import {
  PAYMENT_FLOW,
  PAYMENT_SOURCE,
  PAYMENT_STATUS,
  PAYMENT_TYPE,
  WALLET_TYPE,
} from "../dto/create-payment-dto";

export interface PaymentModel {
  isDeleted: boolean;
  type: PAYMENT_TYPE;
  source: PAYMENT_SOURCE;
  flow: PAYMENT_FLOW;
  typeId: string;
  reference: string;
  amount: number;
  senderId: string;
  currencyType: WALLET_TYPE;
  status: PAYMENT_STATUS;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
