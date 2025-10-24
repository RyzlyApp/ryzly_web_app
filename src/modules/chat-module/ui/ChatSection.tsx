import React, { JSX, useEffect, useRef, useState } from "react";
import useChatHook from "../hooks/useChatHook";
import { uniqBy } from "lodash";
import { Skeleton } from "@heroui/skeleton";
import { Spinner, Button, addToast } from "@heroui/react";
import { ArrowDown } from "lucide-react";
import TextBox from "./TextBox";
import { Socket } from "@/lib/socket-io";
import { MessageModel } from "../models/Message-model";
import { ChatCard } from "@/components/challenges";
import { isSameDate } from "@/helper/utils/issameDataTime";

function ChatSection({ challengeId }: { challengeId: string }) {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const {
    getChatByChallangeId,
    setChat,
    chat,
    getChatMessages,
    messages,
    setMessages,
    user,
    page,
    setPage,
    total,
  } = useChatHook();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  /** Helper: Format chat date */
  const formatDateLabel = (iso: string) => {
    const d = new Date(iso);
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startOfItem = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const diffDays = Math.floor(
      (startOfToday.getTime() - startOfItem.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /** Handle scroll events */
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const reachedTop = el.scrollTop <= 20;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;

    // Fetch older messages only if not all loaded
    if (reachedTop && !loading && !loadingMore && messages.length < total) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }

    // Show "scroll to bottom" button if user scrolls up
    setShowScrollButton(!atBottom);
  };

  /** SOCKET: Listen for new incoming messages */
  useEffect(() => {
    Socket.connect();
    if (!chat?._id) return;

    const eventRoom = `chat:${chat._id}`;
    const deleteEvent = `delete-message:${chat._id}`;
    const handler = (item: MessageModel) => {
      setMessages((prev) => {
        const merged = uniqBy([...prev, item], "_id");
        return merged.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      // ✅ Scroll to bottom only for new socket messages
      requestAnimationFrame(() => {
        const el = scrollRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });
    };

    Socket.on(eventRoom, handler);
    Socket.on(
      deleteEvent,
      ({ chatId, messageId }: { chatId: string; messageId: string }) => {
        setMessages((prev) => {
          const newMsg = prev.filter((item) => item._id !== messageId);
          return newMsg;
        });
        console.log("delete-message", messageId);
      }
    );

    return () => {
      Socket.off(eventRoom, handler);
    };
  }, [chat]);

  /** INITIAL: Fetch chat info */
  useEffect(() => {
    setLoading(true);
    (async function () {
      const response = await getChatByChallangeId(challengeId);
      setChat(response.data);
    })();
  }, []);

  /** Fetch messages when page changes (load older messages) */
  useEffect(() => {
    if (!chat?._id) return;
    if (messages.length >= total && page > 1) {
      setLoadingMore(false);
      return;
    }

    (async function () {
      const el = scrollRef.current;
      const prevHeight = el?.scrollHeight ?? 0;
      const prevScrollTop = el?.scrollTop ?? 0;

      const response = await getChatMessages(chat._id);
      const newData = response.data;

      const sorted = uniqBy([...newData, ...messages], "_id").sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setMessages(sorted);
      setLoading(false);
      setLoadingMore(false);

      // ✅ Preserve scroll position after loading older messages
      requestAnimationFrame(() => {
        if (el) el.scrollTop = el.scrollHeight - prevHeight + prevScrollTop;
      });
    })();
  }, [chat?._id, page]);

  /** Scroll to bottom when user sends a message */
  const handleMessageSent = () => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  /** Scroll to bottom button click */
  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Skeleton className="rounded-lg w-full">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-full flex-col relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 mb-3 flex flex-col overflow-y-auto px-2"
      >
        {/* Show spinner only if more messages exist */}
        {loadingMore && messages.length < total && (
          <div className="w-full flex justify-center my-2">
            <Spinner size="sm" label="Loading older messages..." />
          </div>
        )}

        {messages.reduce((acc, item, idx) => {
          const nextMsg =
            idx === messages.length - 1 ? null : messages[idx + 1];
          const isFirstItem = idx === 0;
          const showDateChip =
            isFirstItem ||
            !nextMsg ||
            !isSameDate(
              new Date(nextMsg?.createdAt as string),
              new Date(item.createdAt)
            );

          if (showDateChip) {
            acc.push(
              <div
                key={`date-${item._id}-${idx}`}
                className="w-full flex justify-center my-2"
              >
                <span className="px-3 py-1 text-xs bg-gray-200 rounded-full text-gray-700">
                  {formatDateLabel(item.createdAt as string)}
                </span>
              </div>
            );
          }

          acc.push(
            <ChatCard
              key={item._id}
              item={item}
              previousDate={item.createdAt}
              self={item.senderId === user?._id}
            />
          );
          return acc;
        }, [] as JSX.Element[])}
      </div>

      {/* Floating scroll-to-bottom button */}
      {showScrollButton && (
        <Button
          isIconOnly
          className="absolute bottom-20 right-4 bg-blue-600 text-white shadow-lg rounded-full"
          onPress={scrollToBottom}
        >
          <ArrowDown className="w-5 h-5" />
        </Button>
      )}

      {/* Pass message sent handler to TextBox */}
      <TextBox />
    </div>
  );
}

export default ChatSection;
