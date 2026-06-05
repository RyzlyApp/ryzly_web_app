// src/modules/community-chat/components/MessageFeed.tsx
"use client";

import { JSX } from "react";
import { Button, Spinner } from "@heroui/react";
import { ArrowDown } from "lucide-react";
import { isSameDate } from "@/helper/utils/issameDataTime";
import { ICommunityMessage } from "../models/community-chat.model";
import { PostCard } from "./PostCard";
import { PostSkeleton } from "./PostSkeleton";
import { cn } from "@/lib/utils";

interface MessageFeedProps {
    messages: ICommunityMessage[];
    isLoading: boolean;
    isLoadingMore: boolean;
    userId: string;
    replies: Record<string, ICommunityMessage[]>;
    loadingReplies: Record<string, boolean>;
    isSending: boolean;
    scrollRef: React.MutableRefObject<HTMLDivElement | null>;
    showScrollButton: boolean;
    onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
    onScrollToBottom: () => void;
    onFetchReplies: (id: string) => void;
    onSendReply: (messageId: string, content: string) => Promise<void>;
    onDeleteMessage?: (id: string) => void;
    formatDateLabel: (iso: string) => string;
    className?: string; // ← Add this prop
}

export const MessageFeed = ({
    messages,
    isLoading,
    isLoadingMore,
    userId,
    replies,
    loadingReplies,
    isSending,
    scrollRef,
    showScrollButton,
    onScroll,
    onScrollToBottom,
    onFetchReplies,
    onSendReply,
    onDeleteMessage,
    formatDateLabel,
    className,
}: MessageFeedProps) => {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-3 p-4">
                {[1, 2, 3].map(i => <PostSkeleton key={i} />)}
            </div>
        );
    }

    const visibleMessages = messages.filter(m => !m.deleted);

    if (!visibleMessages.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
                <p className="text-gray-400 text-sm">No posts yet</p>
                <p className="text-gray-300 text-xs">Be the first to share something</p>
            </div>
        );
    }

    return (
        // ✅ Outer container: NO overflow, just flex layout
        <div className={cn("relative flex flex-col h-full min-h-0", className)}>
            {/* ✅ ONLY this div scrolls vertically */}
            <div
                ref={scrollRef}
                onScroll={onScroll}
                className="flex-1 overflow-y-auto min-h-0 pr-1 px-1.5"
            >
                {isLoadingMore && (
                    <div className="w-full flex justify-center py-3 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
                        <Spinner size="sm" label="Loading more..." />
                    </div>
                )}

                {visibleMessages.reduce((acc, item, idx) => {
                    const prevMsg = idx === 0 ? null : visibleMessages[idx - 1];
                    const showDate =
                        idx === 0 ||
                        !prevMsg ||
                        !isSameDate(new Date(prevMsg.createdAt), new Date(item.createdAt));

                    if (showDate) {
                        acc.push(
                            <div key={`date-${item._id}`} className="w-full flex justify-center py-1 sticky top-0 bg-white/90 z-10">
                                <span className="px-3 py-1 text-xs bg-gray-100 rounded-full text-gray-500">
                                    {formatDateLabel(item.createdAt)}
                                </span>
                            </div>
                        );
                    }

                    acc.push(
                        <PostCard
                            key={item._id}
                            message={item}
                            isSelf={item.author._id === userId}
                            userId={userId}
                            replies={replies[item._id]}
                            isLoadingReplies={loadingReplies[item._id]}
                            isSending={isSending}
                            onDelete={onDeleteMessage}
                            onFetchReplies={onFetchReplies}
                            onSendReply={onSendReply}
                        />
                    );

                    return acc;
                }, [] as JSX.Element[])}
            </div>

            {showScrollButton && (
                <Button
                    isIconOnly
                    className="absolute bottom-4 right-4 bg-[#5160E7] text-white shadow-lg rounded-full z-20"
                    onPress={onScrollToBottom}
                >
                    <ArrowDown className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
};