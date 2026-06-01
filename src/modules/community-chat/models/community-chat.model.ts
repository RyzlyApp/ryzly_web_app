// src/modules/community-chat/models/community-message.model.ts
import { IUser } from "@/helper/model/user";

export interface ICommunityMessage {
    _id: string;
    community?: string;
    group?: string;
    author: IUser;
    content: string;
    parentMessage: string | null;
    repliesCount: number;
    likes: number;
    edited: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ICommunityMessageResponse {
    success: boolean;
    message: string;
    data: ICommunityMessage | ICommunityMessage[];
    page?: number;
    total?: number;
    limit?: number;
}

// src/modules/community-chat/types/chat.types.ts

export type ChatMessageType = 'TEXT' | 'IMAGE' | 'FILE';

// export interface ISenderProfile {
//     _id: string;
//     email: string;
//     userType: string;
//     isCoach: boolean;
//     firstName: string;
//     lastName: string;
//     phone?: string;
//     profilePicture: string | null;
//     country?: string;
// }

export interface IChatMessage {
    _id: string;
    chatId: string;
    content: string; // Unified rendering content text field 
    messageType: ChatMessageType;
    senderId: string;
    sender: IUser | null;
    files: string[];
    mentions: string[];
    isReply: boolean;
    replyTo: string | null;
    repliesCount: number;
    createdAt: string;
    updatedAt: string;
    deleted?: boolean;
}

export interface ISendMessagePayload {
    chatId: string;
    message: string;
    messageType: ChatMessageType;
    isReply: boolean;
    replyTo?: string | null;
    files?: string[];
    mentions?: string[];
}