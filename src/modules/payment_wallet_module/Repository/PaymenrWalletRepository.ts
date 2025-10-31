import { BaseRepository } from "@/dal";
import { GeneralResponse } from "@/modules/general/General-response";
import { RepositoryPayload } from "@/modules/general/Repository-payload";
import { ENDPOINTS } from "@/modules/general/endpoints";
import { ICreateOrderDto, PAYMENT_STATUS } from "../dto/create-payment-dto";
import { IVerifyPaymentDto } from "../dto/verify-payment-dto";
import { ICreateAccountDto } from "../dto/create-account-dto";
import { WalletModel } from "../models/Wallet-model";
import { PaymentModel } from "../models/PaymentModel";
import { PaystackBankModel } from "../models/PaystackBankModel";
import { AccountModel } from "../models/Account-model";

export class PaymentWalletRepository extends BaseRepository {
  private paymentEndpoints = ENDPOINTS.payment;
  private walletEndpoints = ENDPOINTS.wallet;

  // PAYMENT METHODS
  public async createPayment(
    payload: RepositoryPayload<ICreateOrderDto, null>
  ): Promise<GeneralResponse<PaymentModel>> {
    const response = await this.httpClient.post(
      this.paymentEndpoints.create_order,
      payload.body
    );

    return response.data;
  }

  public async verifyPayment(
    payload: RepositoryPayload<IVerifyPaymentDto, null>
  ): Promise<GeneralResponse<any>> {
    return this.httpClient.post(
      this.paymentEndpoints.verify_payment,
      payload.body
    );
  }

  public async getUserPayments(
    payload: RepositoryPayload<null, { status: PAYMENT_STATUS }>
  ): Promise<GeneralResponse<any>> {
    return this.httpClient.get(this.paymentEndpoints.payment_list, {
      params: {
        status: payload.params?.status,
      },
    });
  }

  public async getPaymentByTypeId(
    payload: RepositoryPayload<null, { typeId: string }>
  ): Promise<GeneralResponse<any>> {
    return this.httpClient.get(
      this.paymentEndpoints.get_payment_by_typeid(
        payload.params?.typeId as string
      ),
      {}
    );
  }

  // WALLET METHODS

  public async getWallet(): Promise<GeneralResponse<WalletModel>> {
    const response = await this.httpClient.get(this.walletEndpoints.get_wallet);
    return response.data;
  }

  public async getBanks(
    payload: RepositoryPayload<null, { cursor?: string }>
  ): Promise<
    GeneralResponse<{
      data: PaystackBankModel[];
      message: string;
      status: boolean;
    }>
  > {
    const response = await this.httpClient.get(
      this.walletEndpoints.get_paystack_bank_list,
      {
        params: {
          cursor: payload.params?.cursor,
        },
      }
    );
    return response.data;
  }

  public async createAccount(
    payload: RepositoryPayload<ICreateAccountDto, null>
  ): Promise<GeneralResponse<AccountModel>> {
    return this.httpClient.post(this.walletEndpoints.create_bank, payload.body);
  }

  public async getAccounts(
    payload: RepositoryPayload<null, null>
  ): Promise<GeneralResponse<AccountModel[]>> {
    const response = await this.httpClient.get(
      this.walletEndpoints.get_user_accounts
    );
    return response.data;
  }

  public async deleteAccount(
    payload: RepositoryPayload<null, { id: string }>
  ): Promise<GeneralResponse<any>> {
    const response = await this.httpClient.delete(
      this.walletEndpoints.delete_account(payload.params?.id as string)
    );
    return response.data;
  }
}

export default new PaymentWalletRepository();
