import React from "react";
import { CreateChatDto } from "../dto/Create-chat-dto";
import chatRepository from "@/modules/chat-module/Repository/chat-respository";
import { CreateChatMessageDto } from "../dto/create-message-dto";
import { useAtom } from "jotai";
import {
  ACTIVE_CHAT_ATOM,
  ACTIVE_CHAT_ID_ATOM,
  ACTIVE_CHAT_MESSAGES_ATOM,
  LIMIT_ATOM,
  PAGE_ATOM,
  REPLY_ATOM,
  TOTAL_ATOM,
} from "../state/active-chat";
import { addToast } from "@heroui/react";
import { Socket } from "@/lib/socket-io";
import { userAtom } from "@/helper/atom/user";
import { MessageModel } from "../models/Message-model";

function useChatHook() {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = useAtom(ACTIVE_CHAT_MESSAGES_ATOM);
  const [chat, setChat] = useAtom(ACTIVE_CHAT_ATOM);
  const [page, setPage] = useAtom(PAGE_ATOM);
  const [limit, setLimit] = useAtom(LIMIT_ATOM);
  const [total, setTotal] = useAtom(TOTAL_ATOM);
  const [selectedFile, setSelectedFile] = React.useState<File[]>([]);
  const [userState] = useAtom(userAtom);
  const [reply, setReply] = useAtom(REPLY_ATOM);
  const { data: user } = userState;
  const [, setActiveChatId] = useAtom(ACTIVE_CHAT_ID_ATOM);

  return {
    message,
    setMessage,
    chat,
    setChat,
    selectedFile,
    setSelectedFile,
    messages,
    setMessages,
    reply,
    setReply,
    user,
    setPage,
    page,
    limit,
    setLimit,
    total,
    setTotal,
    // Reset all chat-related state to initial defaults
    resetChatState: () => {
      setMessage("");
      setSelectedFile([]);
      setReply(null);
      setMessages([]);
      setChat(null);
      setActiveChatId(null);
      setPage(1);
      setLimit(10);
      setTotal(0);
    },
    createChat: async (dto: CreateChatDto) => {
      const response = await chatRepository.createChat({
        body: dto,
        params: null,
      });
      return response;
    },
    getUserChats: async () => {
      const response = await chatRepository.getUserChats();
      return response;
    },
    sendMessage: async () => {
      // use socket here
      // check for files
      const regex = /(@[a-zA-Z0-9_]+)/g;
      const mentions = message.match(regex) || [];
      const composedMessage: CreateChatMessageDto = {
        chatId: chat?._id as string,
        message: message !== "" ? message : "",
        messageType: "TEXT",
        isReply: reply !== null,
        replyTo: reply ? reply?._id : undefined,
        mentions: mentions.map((mention) => mention.slice(1)),
      };
      if (selectedFile.length > 0) {
        const formData = new FormData();
        formData.append("file", selectedFile[0]);
        const response = await chatRepository.uploadImage({
          body: formData,
          params: undefined,
        });
        composedMessage.files = [response?.data?.url];
        composedMessage.messageType = "HAS_FILE";
        console.log("MESSAGE OBJECT IMAGE", composedMessage);
        Socket.emit("chat", { ...composedMessage, user });

        // clean up
        setMessage("");
        setSelectedFile([]);
        setReply(null);
      } else {
        console.log("MESSAGE OBJECT TEXT ONLY", composedMessage);
        Socket.emit("chat", { ...composedMessage, user });

        // clean up
        setMessage("");
        setSelectedFile([]);
        setReply(null);
      }
    },
    getChatMessages: async (chatId: string) => {
      const response = await chatRepository.getChatMessages({
        body: null,
        params: { chatId, page, limit },
      });
      // Try to extract total from common response shapes
      const respAny = response as unknown as {
        total?: number;
        count?: number;
        pagination?: { total?: number };
        meta?: { total?: number };
      };
      const possibleTotal =
        respAny?.total ??
        respAny?.count ??
        respAny?.pagination?.total ??
        respAny?.meta?.total;
      if (typeof possibleTotal === "number") {
        setTotal(possibleTotal);
      }
      return response;
    },
    getChatByChallangeId: async (challengeId: string) => {
      const response = await chatRepository.getChatByChallengeId({
        body: null,
        params: { challengeId },
      });
      return response;
    },
    deleteChatById: async (id: string) => {
      const response = await chatRepository.deleteChat({
        body: null,
        params: { messageId: id },
      });
      console.log(response.data);
      setMessages(messages.filter((item) => item._id !== id));
    },
  };
}

export default useChatHook;
