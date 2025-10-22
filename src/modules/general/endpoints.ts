export const ENDPOINTS = {
  chats: {
    chat: "/chat",
    get_chat_by_id: (id: string) => `/chat/${id}`,
    get_chat_by_challenge_id: (challengeId: string) =>
      `/chat/challenge/${challengeId}`,
    delete_chat_message: (messageId: string) => `/chat/message/${messageId}`,
    get_chat_messages: (chatId: string) => `/chat/${chatId}/messages/`,
    delete_chat: (chatId: string) => `/chat/${chatId}`,
  },
  fileUploads: {
    upload_file: "/upload/file",
  },
};
