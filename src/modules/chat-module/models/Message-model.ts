import { IUser } from "@/helper/model/user";

export class MessageModel {
  _id: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  sender: IUser;
  chatId: string;
  message: string;
  messageType: string;
  files: string[];
  fileUrls: string[];
  mentions: IUser[];
  isReply: boolean;
  replyMessage: MessageModel;

  constructor(props: {
    _id: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    senderId: string;
    sender: IUser;
    chatId: string;
    message: string;
    messageType: string;
    files: string[];
    fileUrls: string[];
    mentions: IUser[];
    isReply: boolean;
    replyMessage: MessageModel;
  }) {
    const {
      _id,
      isDeleted,
      createdAt,
      updatedAt,
      senderId,
      sender,
      chatId,
      message,
      messageType,
      files,
      fileUrls,
      mentions,
      isReply,
      replyMessage,
    } = props;
    this._id = _id;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.senderId = senderId;
    this.sender = sender;
    this.chatId = chatId;
    this.message = message;
    this.messageType = messageType;
    this.files = files;
    this.fileUrls = fileUrls;
    this.mentions = mentions;
    this.isReply = isReply;
    this.replyMessage = replyMessage;
  }
}
