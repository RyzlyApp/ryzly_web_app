
export interface IPayment {
    "_id": string,
    "isDeleted": boolean,
    "type": string,
    "source": string,
    "flow": string,
    "typeId": string,
    "reference": string,
    "amount": number,
    "senderId": string,
    "currencyType": string,
    "status": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": 0
}
export interface IOrderCreation{
    type: "DEPOSIT" | "WITHDRAW" | "CHALLENGE" | "CERTIFICATION" | "COMMUNITY" | "PRICE",
    typeId: string,
    userId: string, 
    creatorType: "USER",
    amount: number,
    currencyType: "NGN" | "USD",
    source: "PAYSTACK" | "STRIPE" | "WALLET",
    flow: "INBOUND" | "OUTBOUND", 
}