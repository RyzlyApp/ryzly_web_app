export enum NOTIFICATION_TYPE {
  CHAT = "chat",
  MENTION = "mention",
  CHALLENGE = "challenge",
  QUESTION = "question",
  PAYOUT = "payout",
}

export interface INotificationModel {
  userId: string;
  message: string;
  read: boolean;
  notificationType: NOTIFICATION_TYPE;
  typeId: string;
  createdAt: string;
  updatedAt: string;
  isForAdmin: boolean;
  title: string;
  _id: string;
}
