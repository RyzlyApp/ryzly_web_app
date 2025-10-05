import { IUser } from "./user"


export interface ICreateChat {
    "chatType": "ONE_TO_ONE",
    "typeId": string,
    "participantIds": string[],
    "challengeId": string
}

export interface IChatMessage {
    "chatId": string,
    "message": string,
    "messageType": string,
    "files"?: string[]
}

export interface IChatDetail {
    "_id": string,
    "isDeleted": boolean,
    "createdAt": string,
    "updatedAt": string,
    "senderId": string,
    "challengeId": string,
    "chatType": string,
    "typeId": string,
    "participantIds": string[], 
}

export interface IMessages {
    "_id": string,
    "isDeleted": boolean,
    "createdAt": string,
    "updatedAt": string,
    "senderId": string,
    sender: IUser,
    "chatId": string,
    "message": string,
    "messageType": string,
    "files": string[], 
    "fileUrls": string[]
}