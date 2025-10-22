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
import { useAtom } from "jotai";
import { Socket } from "@/lib/socket-io";
import React from "react";
import { CHAT_MESSAGE } from "@/helper/atom/chat";

// dynamically import the components
const ChatSection = React.lazy(
  () => import("@/modules/chat-module/ui/ChatSection")
);
const HelpSection = React.lazy(
  () => import("@/modules/chat-module/ui/HelpSection")
);
const CoachesSection = React.lazy(
  () => import("@/modules/chat-module/ui/Coaches")
);
const AnnouncementSection = React.lazy(
  () => import("@/modules/chat-module/ui/AnnouncementSection")
);

// CHAT MESSAGE ATOM

export default function ChatLayout({ item }: { item: IChallenge }) {
  const [tab, setTab] = useState("chat");
  const tablink = [
    { label: "Messages", key: "chat" },
    { label: "Announcements", key: "announcement" },
    { label: "Help", key: "help" },
    { label: "Coaches", key: "coaches" },
  ];

  const { formik, isLoading, chatId, user, setChatId } = useChat();
  const [dataChat, setDataChat] = useAtom<IMessages[]>(CHAT_MESSAGE);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full flex flex-col h-full p-4 rounded-2xl bg-white">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <p className="font-bold">{item.title}</p>
      </div>

      {/* Tabs and Messages */}
      <div className="w-full flex flex-col h-[75vh] overflow-y-hidden">
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
        {tab === "chat" && (
          <React.Suspense
            fallback={
              <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                Loading…
              </div>
            }
          >
            <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
              <ChatSection challengeId={item._id} />
            </div>
          </React.Suspense>
        )}

        {/* Announcements List */}
        {tab === "announcement" && (
          <React.Suspense
            fallback={
              <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                <Spinner />
              </div>
            }
          >
            <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
              <AnnouncementSection challengeId={item._id} />
            </div>
          </React.Suspense>
        )}

        {tab === "help" && (
          <React.Suspense
            fallback={
              <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                <Spinner />
              </div>
            }
          >
            <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
              <HelpSection challengeId={item._id} />
            </div>
          </React.Suspense>
        )}

        {tab === "coaches" && (
          <React.Suspense
            fallback={
              <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
                <Spinner />
              </div>
            }
          >
            <div className="w-full flex flex-col-reverse h-full overflow-y-auto gap-2 py-1">
              <CoachesSection challengeId={item._id} />
            </div>
          </React.Suspense>
        )}
      </div>
    </div>
  );
}
