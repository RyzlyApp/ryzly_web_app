// src/modules/community-chat/components/CommunityMessageBubble.tsx
"use client";

import { useState } from "react";
import { Avatar, Button, Spinner } from "@heroui/react";
import { cn } from "@/lib/utils";
import { BiComment } from "react-icons/bi";
import { ICommunityMessage } from "../models/community-chat.model";

interface Props {
    message: ICommunityMessage;
    isSelf: boolean;
    replies?: ICommunityMessage[];
    isLoadingReplies?: boolean;
    replyingTo: ICommunityMessage | null;
    onReply: (message: ICommunityMessage) => void;
    onFetchReplies: (messageId: string) => void;
}

const CommunityMessageBubble = ({
    message,
    isSelf,
    replies,
    isLoadingReplies,
    replyingTo,
    onReply,
    onFetchReplies,
}: Props) => {
    const [showReplies, setShowReplies] = useState(false);
    const authorName = `${message.author.firstName} ${message.author.lastName}`;
    const isReplyingToThis = replyingTo?._id === message._id;

    const handleToggleReplies = () => {
        if (!showReplies && !replies) {
            onFetchReplies(message._id);
        }
        setShowReplies((prev) => !prev);
    };

    if (message.deleted) {
        return (
            <div className={cn("flex gap-2 my-1", isSelf && "flex-row-reverse")}>
                <div className="px-4 py-2 rounded-2xl bg-gray-100 text-xs text-gray-400 italic">
                    Message deleted
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1 my-1">
            {/* ── Main message ── */}
            <div className={cn("flex gap-2 items-end", isSelf && "flex-row-reverse")}>
                {!isSelf && (
                    <Avatar
                        src={message.author.profilePicture || ""}
                        name={`${message.author.firstName?.[0]}${message.author.lastName?.[0]}`}
                        className="size-7 shrink-0"
                    />
                )}

                <div className={cn("flex flex-col gap-0.5 max-w-[70%]", isSelf && "items-end")}>
                    {!isSelf && (
                        <span className="text-xs text-gray-400 ml-1">{authorName}</span>
                    )}

                    {/* Bubble */}
                    <div
                        className={cn(
                            "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                            isSelf
                                ? "bg-[#5160E7] text-white rounded-br-sm"
                                : "bg-[#F0F0F5] text-black rounded-bl-sm",
                            isReplyingToThis && "ring-2 ring-[#5160E7]/50"
                        )}
                    >
                        {message.content}
                    </div>

                    {/* Timestamp + reply action */}
                    <div className={cn("flex items-center gap-2 mx-1", isSelf && "flex-row-reverse")}>
                        <span className="text-[10px] text-gray-300">
                            {new Date(message.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>

                        <button
                            className="text-[10px] text-gray-400 hover:text-[#5160E7] transition-colors"
                            onClick={() => onReply(message)}
                        >
                            Reply
                        </button>

                        {/* Show replies toggle */}
                        {message.repliesCount > 0 && (
                            <button
                                className="flex items-center gap-1 text-[10px] text-[#5160E7] hover:underline"
                                onClick={handleToggleReplies}
                            >
                                <BiComment className="size-3" />
                                {showReplies ? "Hide" : `${message.repliesCount} ${message.repliesCount === 1 ? "reply" : "replies"}`}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Replies ── */}
            {showReplies && (
                <div className={cn("ml-10 flex flex-col gap-1 border-l-2 border-[#E8E7ED] pl-3", isSelf && "ml-0 mr-10")}>
                    {isLoadingReplies ? (
                        <div className="flex items-center gap-1 py-2">
                            <Spinner size="sm" />
                            <span className="text-xs text-gray-400">Loading replies...</span>
                        </div>
                    ) : (
                        replies?.map((reply) => (
                            <div key={reply._id} className="flex gap-2 items-end">
                                <Avatar
                                    src={reply.author.profilePicture || ""}
                                    name={`${reply.author.firstName?.[0]}${reply.author.lastName?.[0]}`}
                                    className="size-5 shrink-0"
                                />
                                <div className="flex flex-col gap-0.5 max-w-[80%]">
                                    <span className="text-[10px] text-gray-400 ml-1">
                                        {reply.author.firstName} {reply.author.lastName}
                                    </span>
                                    <div className="px-3 py-2 rounded-2xl text-xs bg-[#F0F0F5] text-black rounded-bl-sm">
                                        {reply.content}
                                    </div>
                                    <span className="text-[10px] text-gray-300 ml-1">
                                        {new Date(reply.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CommunityMessageBubble;