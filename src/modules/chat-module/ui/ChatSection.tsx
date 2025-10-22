import React, { JSX } from "react";
import useChatHook from "../hooks/useChatHook";
import { uniqBy } from "lodash";
import { Skeleton } from "@heroui/skeleton";
import TextBox from "./TextBox";
import { Socket } from "@/lib/socket-io";
import { MessageModel } from "../models/Message-model";
import { ChatCard } from "@/components/challenges";

function ChatSection({ challengeId }: { challengeId: string }) {
  const [loading, setLoading] = React.useState(false);
  const {
    getChatByChallangeId,
    setChat,
    chat,
    getChatMessages,
    messages,
    setMessages,
    user,
  } = useChatHook();

  React.useEffect(() => {
    Socket.connect();
    const eventRoom = `chat:${chat?._id}`;
    const handler = (item: MessageModel) => {
      console.log("💬 New message received:", item);
      setMessages((prev) => {
        const merged = uniqBy([...prev, item], "_id");
        return merged.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
    };
    if (chat) {
      console.log("SOCKET WAITING", challengeId);
      // Ensure the socket is connected
      if (Socket.connected) {
        Socket.on(eventRoom, (e: MessageModel) => {
          handler(e);
        });
      }
    }

    return () => {
      Socket.off(eventRoom, handler);
      //   Socket.off("chat", handler);
    };
  }, [chat]);

  React.useEffect(() => {
    setLoading(true);
    (async function () {
      const response = await getChatByChallangeId(challengeId);
      setChat(response.data);
    })();
  }, []);

  React.useEffect(() => {
    if (chat?._id) {
      (async function () {
        const response = await getChatMessages(chat?._id);
        console.log(response);
        setMessages(uniqBy([...messages, ...response.data], "_id"));
        setLoading(false);
      })();
    }
  }, [chat]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>

        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>

        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    );
  } else {
    return (
      <div className="flex flex-1 h-full flex-col">
        <div className="flex-1 mb-3 flex flex-col-reverse overflow-y-auto">
          {messages.reduce((acc, item, idx) => {
            const previousDate =
              idx === 0 ? "" : acc[idx - 1].props.item.updatedAt;
            acc.push(
              <ChatCard
                key={item._id}
                item={item}
                previousDate={previousDate}
                self={item.senderId === user?._id}
              />
            );
            return acc;
          }, [] as JSX.Element[])}
        </div>
        <TextBox />
      </div>
    );
  }
}

export default ChatSection;
