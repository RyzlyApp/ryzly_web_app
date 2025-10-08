"use client";

import { CustomInput } from "@/components/custom";
import { IChallenge } from "@/helper/model/challenge";
import useChat from "@/hook/useChat";
import { Tabs, Tab, Spinner } from "@heroui/react";
import { FormikProvider } from "formik";
import { useEffect, useRef, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import ChatCard from "./chatCard";
import { useFetchData } from "@/hook/useFetchData";
import { IChatDetail, IMessages } from "@/helper/model/chat";
import { ImagePicker, LoadingLayout } from "@/components/shared";
import { uniqBy } from "lodash";
import { atom, useAtom } from "jotai";
import { Socket } from "@/lib/socket-io";
import React from "react";
import { CHAT_MESSAGE } from "@/helper/atom/chat";

// CHAT MESSAGE ATOM

export default function ChatLayout({ item }: { item: IChallenge }) {
  const [tab, setTab] = useState("");
  const tablink = [
    { label: "Messages", key: "" },
    { label: "Announcements", key: "task" },
    { label: "Help", key: "resources" },
    { label: "Coaches", key: "reviews" },
  ];

  const { formik, isLoading, chatId, user, setChatId } = useChat();
  const [dataChat, setDataChat] = useAtom<IMessages[]>(CHAT_MESSAGE);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDataChat([]);
  }, []);

  // Fetch chat details
  const { data: chatdata, isLoading: loadingChat } = useFetchData<IChatDetail>({
    endpoint: `/chat/challenge/${item?._id}`,
    name: "chat" + user?._id,
  });

  useEffect(() => {
    if (chatdata?._id) {
      setChatId(chatdata);
    }
  }, [chatdata?._id, setChatId]);

  // Fetch initial messages
  const { data = [], isLoading: loading } = useFetchData<IMessages[]>({
    endpoint: `/chat/${chatId?._id}/messages?limit=100`,
    name: "chatmessage" + user?._id,
    enable: !!chatId?._id,
  });

  // Merge and sort messages when fetched
  useEffect(() => {
    if (data && data.length) {
      setDataChat((prev) => {
        const merged = uniqBy([...prev, ...data], "_id");
        return merged.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
    }
  }, [data, setDataChat]);

  useEffect(() => {
    Socket.connect();

    if (!chatdata?._id) return;
    console.log("SOCKET WAITING", chatdata?._id);

    const eventRoom = `chat:${chatdata._id}`;

    const handler = (item: IMessages) => {
      console.log("💬 New message received:", item);
      setDataChat((prev) => {
        const merged = uniqBy([item, ...prev], "_id");
        return merged.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
    };

    // Ensure the socket is connected
    if (!Socket.connected) {
    }
    Socket.on(eventRoom, handler);

    // return () => {
    //   Socket.off(eventRoom, handler);
    //   Socket.off("chat", handler);
    // };
  }, [chatdata?._id]);

  return (
    <FormikProvider value={formik}>
      <div className="w-full flex flex-col h-full p-4 rounded-2xl bg-white">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <p className="font-bold">Finlytics Forum</p>
        </div>

        {/* Tabs and Messages */}
        <div className="w-full flex flex-col h-[75vh]">
          <Tabs selectedKey={tab || ""} aria-label="Tabs" variant="underlined">
            {tablink.map((item) => (
              <Tab
                key={item.key}
                onClick={() => setTab(item.key)}
                title={item.label}
              />
            ))}
          </Tabs>

          {/* Message List */}
          <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
            <LoadingLayout loading={loading}>
              {dataChat?.map((item, index) => (
                <ChatCard
                  key={item._id || `${item.senderId}-${index}`}
                  item={item}
                  self={item.senderId === user?._id}
                  previousDate={dataChat[index - 1]?.updatedAt}
                />
              ))}
              {/* 👇 invisible div used for scroll target */}
              <div ref={endOfMessagesRef} />
            </LoadingLayout>
          </div>

          {/* Input Field */}
          <form onSubmit={formik.handleSubmit} className="w-full flex pt-2">
            <CustomInput
              startContent={<ImagePicker type="chat" />}
              disabled={!chatId?._id}
              rounded="999px"
              placeholder="Write a message"
              name="message"
              endContent={
                <button
                  disabled={!formik.values?.message}
                  className="w-8 h-8 disabled:bg-neonblue-100 rounded-full flex justify-center items-center bg-neonblue-600"
                >
                  {!isLoading ? (
                    <RiSendPlane2Fill size="16px" color="white" />
                  ) : (
                    <Spinner size="sm" color="white" />
                  )}
                </button>
              }
            />
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}
