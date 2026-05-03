"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import useChatHook from "../hooks/useChatHook";
import { uniqBy } from "lodash";
import { Skeleton } from "@heroui/skeleton";
import { Spinner, Button } from "@heroui/react";
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
    const fetchingRef = useRef(false);

    /** Format date label */
    const formatDateLabel = (iso: string) => {
        const d = new Date(iso);
        const today = new Date();

        const startOfToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
        );
        const startOfItem = new Date(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
        );

        const diffDays = Math.floor(
            (startOfToday.getTime() - startOfItem.getTime()) /
                (1000 * 60 * 60 * 24),
        );

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";

        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    /** Scroll handler */
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;

        const reachedTop = el.scrollTop <= 20;
        const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;

        if (
            reachedTop &&
            !loadingMore &&
            !fetchingRef.current &&
            messages.length < total
        ) {
            fetchingRef.current = true;
            setLoadingMore(true);
            setPage((prev) => prev + 1);
        }

        setShowScrollButton(!atBottom);
    };

    /** SOCKET */
    useEffect(() => {
        if (!chat?._id) return;

        Socket.connect();

        const messageEvent = `chat:${chat._id}`;
        const deleteEvent = `delete-message:${chat._id}`;

        const handleNewMessage = (item: MessageModel) => {
            setMessages((prev) => {
                const merged = uniqBy([...prev, item], "_id");

                return merged.sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime(),
                );
            });

            const el = scrollRef.current;
            if (!el) return;

            const isNearBottom =
                el.scrollHeight - el.scrollTop - el.clientHeight < 100;

            if (isNearBottom) {
                requestAnimationFrame(() => {
                    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
                });
            }
        };

        const handleDeleteMessage = ({
            messageId,
        }: {
            chatId: string;
            messageId: string;
        }) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg._id === messageId ? { ...msg, isDeleted: true } : msg,
                ),
            );
        };

        Socket.on(messageEvent, handleNewMessage);
        Socket.on(deleteEvent, handleDeleteMessage);

        return () => {
            Socket.off(messageEvent, handleNewMessage);
            Socket.off(deleteEvent, handleDeleteMessage);
            Socket.disconnect();
        };
    }, [chat?._id]);

    /** INITIAL CHAT LOAD */
    useEffect(() => {
        if (!challengeId) return;

        setLoading(true);

        (async () => {
            const response = await getChatByChallangeId(challengeId);
            setChat(response.data);
            setLoading(false);
        })();
    }, [challengeId]);

    /** RESET WHEN CHAT CHANGES */
    useEffect(() => {
        setMessages([]);
        setPage(1);
    }, [chat?._id]);

    /** FETCH MESSAGES */
    useEffect(() => {
        if (!chat?._id) return;

        if (messages.length >= total && page > 1) {
            setLoadingMore(false);
            fetchingRef.current = false;
            return;
        }

        (async () => {
            const el = scrollRef.current;

            const prevHeight = el?.scrollHeight ?? 0;
            const prevScrollTop = el?.scrollTop ?? 0;

            const response = await getChatMessages(chat._id);
            const newData = response.data;

            setMessages((prev) => {
                const map = new Map();

                [...newData, ...prev].forEach((msg) => {
                    const existing = map.get(msg._id);

                    map.set(
                        msg._id,
                        existing?.isDeleted ? { ...msg, isDeleted: true } : msg,
                    );
                });

                return Array.from(map.values()).sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime(),
                );
            });

            setLoading(false);
            setLoadingMore(false);
            fetchingRef.current = false;

            requestAnimationFrame(() => {
                if (!el) return;
                el.scrollTop = el.scrollHeight - prevHeight + prevScrollTop;
            });
        })();
    }, [chat?._id, page]);

    /** Scroll to bottom */
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

//     return (
//         <div className="flex flex-1 h-full flex-col relative">
//             <div
//                 ref={scrollRef}
//                 onScroll={handleScroll}
//                 className="flex-1 mb-3 flex flex-col overflow-y-auto px-2"
//             >
//                 {loadingMore && messages.length < total && (
//                     <div className="w-full flex justify-center my-2">
//                         <Spinner size="sm" label="Loading older messages..." />
//                     </div>
//                 )}

//                 {messages.reduce((acc, item, idx) => {
//                     const prevMsg = idx === 0 ? null : messages[idx - 1];

//                     const showDate =
//                         !prevMsg ||
//                         !isSameDate(
//                             new Date(prevMsg.createdAt),
//                             new Date(item.createdAt),
//                         );

//                     if (showDate) {
//                         acc.push(
//                             <div
//                                 key={`date-${item._id}-${idx}`}
//                                 className="w-full flex justify-center my-2"
//                             >
//                                 <span className="px-3 py-1 text-xs bg-gray-200 rounded-full text-gray-700">
//                                     {formatDateLabel(item.createdAt)}
//                                 </span>
//                             </div>,
//                         );
//                     }

//                     acc.push(
//                         <ChatCard
//                             key={item._id}
//                             item={item}
//                             previousDate={item.createdAt}
//                             self={item.senderId === user?._id}
//                         />,
//                     );

//                     return acc;
//                 }, [] as JSX.Element[])}
//             </div>

//             {showScrollButton && (
//                 <Button
//                     isIconOnly
//                     className="absolute bottom-20 right-4 bg-blue-600 text-white shadow-lg rounded-full"
//                     onPress={scrollToBottom}
//                 >
//                     <ArrowDown className="w-5 h-5" />
//                 </Button>
//             )}

//             <TextBox />
//         </div>
//     );
//   }

  return (
    <div className="flex flex-1 h-full flex-col relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 mb-3 flex flex-col overflow-y-auto px-2"
      >
        {loadingMore && messages.length < total && (
          <div className="w-full flex justify-center my-2">
            <Spinner size="sm" label="Loading older messages..." />
          </div>
        )}

        {messages.reduce((acc, item, idx) => {
          const prevMsg = idx === 0 ? null : messages[idx - 1];
          const isFirstItem = idx === 0;
          const showDateChip =
            isFirstItem ||
            !prevMsg ||
            !isSameDate(
              new Date(prevMsg?.createdAt as string),
              new Date(item.createdAt)
            );

          if (showDateChip) {
            acc.push(
              <div
                key={`date-${item?._id}-${idx}`}
                className="w-full flex justify-center my-2"
              >
                <span className="px-3 py-1 text-xs bg-gray-200 rounded-full text-gray-700">
                  {formatDateLabel(item?.createdAt as string)}
                </span>
              </div>
            );
          }

          acc.push(
            <ChatCard
              key={item?._id}
              item={item}
              previousDate={item?.createdAt}
              self={item?.senderId === user?._id}
            />
          );
          return acc;
        }, [] as JSX.Element[])}
      </div>

      {showScrollButton && (
        <Button
          isIconOnly
          className="absolute bottom-20 right-4 bg-blue-600 text-white shadow-lg rounded-full"
          onPress={scrollToBottom}
        >
          <ArrowDown className="w-5 h-5" />
        </Button>
      )}

      <TextBox />
    </div>
  );
}

export default ChatSection;
