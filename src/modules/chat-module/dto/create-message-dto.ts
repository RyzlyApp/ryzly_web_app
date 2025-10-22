export interface CreateChatMessageDto {
  chatId: string;
  message: string;
  messageType: "TEXT" | "HAS_FILE";
  isReply?: boolean;
  replyTo?: string;
  files?: string[];
  mentions?: string[];
}
