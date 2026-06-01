"use client";

import { useState } from "react";
import { Avatar } from "@heroui/react";
import { BiComment } from "react-icons/bi";
import { HiOutlineFire } from "react-icons/hi";
import { BsBookmark } from "react-icons/bs";
import { Trash2 } from "lucide-react";
import { RiMoreLine } from "react-icons/ri";
import { ICommunityMessage } from "../models/community-chat.model";
import { CommunityMessageModal } from "@/components/communities/modals/communityMessageModal";
// import { CommunityMessageModal } from "./CommunityMessageModal";

interface PostCardProps {
    message: ICommunityMessage;
    isSelf: boolean;
    userId: string;
    replies?: ICommunityMessage[];
    isLoadingReplies?: boolean;
    isSending: boolean;
    onDelete?: (id: string) => void;
    onFetchReplies: (id: string) => void;
    onSendReply: (messageId: string, content: string) => Promise<void>;
}

const IMAGE_RE = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
const VIDEO_RE = /^https?:\/\/.+\.(mp4|mov|webm|ogg)(\?.*)?$/i;

const parseContent = (content: string) => {
    const lines = content.split("\n").map(l => l.trim()).filter(Boolean);
    const imageUrls: string[] = [];
    const videoUrls: string[] = [];
    const textLines: string[] = [];
    lines.forEach(line => {
        if (IMAGE_RE.test(line)) imageUrls.push(line);
        else if (VIDEO_RE.test(line)) videoUrls.push(line);
        else textLines.push(line);
    });
    return { imageUrls, videoUrls, text: textLines.join("\n") };
};

const MediaBlock = ({ content }: { content: string }) => {
    const { imageUrls, videoUrls } = parseContent(content);
    if (!imageUrls.length && !videoUrls.length) return null;
    return (
        <div className="w-full overflow-hidden">
            {imageUrls.map((url, i) => (
                <img key={i} src={url} alt="attachment" className="w-full max-h-[400px] object-cover" />
            ))}
            {videoUrls.map((url, i) => (
                <video key={i} src={url} controls className="w-full max-h-[400px] object-cover" />
            ))}
        </div>
    );
};

export const PostCard = ({
    message,
    isSelf,
    userId,
    replies,
    isLoadingReplies,
    isSending,
    onDelete,
    onFetchReplies,
    onSendReply,
}: PostCardProps) => {
    const [showModal, setShowModal] = useState(false);
    const [active, setActive] = useState(false);

    const { text } = parseContent(message.content);
    const hasMedia = IMAGE_RE.test(message.content) || VIDEO_RE.test(message.content);
    const authorName = `${message.author.firstName} ${message.author.lastName}`;
    const repliesCount = message.repliesCount ?? 0;

    const handleOpenComments = () => {
        if (!replies) onFetchReplies(message._id);
        setShowModal(true);
    };

    if (message.deleted) return null;

    return (
        <>
            <div
                className="bg-white rounded-2xl overflow-hidden"
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
            >
                {/* Header */}
                <div className="px-4 pt-4 pb-0 flex items-start justify-between">
                    <div className="flex gap-3 items-start">
                        <Avatar
                            src={message.author.profilePicture || ""}
                            name={`${message.author.firstName?.[0]}${message.author.lastName?.[0]}`}
                            className="size-10 shrink-0"
                        />
                        <div>
                            <span className="text-sm font-semibold text-black block leading-tight">
                                {authorName}
                            </span>
                            <span className="text-[11px] text-gray-400">
                                {new Date(message.createdAt).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        {isSelf && active && onDelete && (
                            <button
                                onClick={() => onDelete(message._id)}
                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        )}
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                            <RiMoreLine className="size-4" />
                        </button>
                    </div>
                </div>

                {/* Text */}
                {text && (
                    <div className="px-4 pt-3 pb-2">
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{text}</p>
                    </div>
                )}

                {/* Full-width media */}
                {hasMedia && (
                    <div className="mt-2">
                        <MediaBlock content={message.content} />
                    </div>
                )}

                {/* Action bar */}
                <div className="px-2 py-1 border-t border-[#F0F0F0] mt-2 flex items-center justify-between">
                    <button className="flex items-center justify-center gap-2 py-2 px-2 text-sm text-gray-500 hover:bg-[#F5F5F5] rounded-lg transition-colors">
                        <BsBookmark className="size-3.5" />
                        {/* <span>Save</span> */}
                    </button>
                    <div className="flex gap-2 items-center">
                        <button className="flex items-center justify-center gap-2 py-2 px-2 text-sm text-gray-500 transition-colors">
                            <HiOutlineFire className="size-4 text-gray-500 hover:bg-[#F5F5F5] rounded-lg transition-colors" size={24} />
                            <span>
                                {message.likes >= 1000
                                    ? `${(message.likes / 1000).toFixed(1)}K`
                                    : message.likes ?? 0}
                            </span>
                        </button>
                        <div className="flex gap-1 items-center">
                            <button
                                className="flex items-center justify-center gap-2 py-2 p-2 text-sm text-gray-500 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                                onClick={handleOpenComments}
                            >
                                <BiComment className="size-4" />
                                {/* <span>Comment</span> */}
                            </button>
                            {/* Comment count */}
                            {repliesCount > 0 && (
                                <div className="pr-2">
                                    <button
                                        className="text-xs text-gray-400"
                                    // onClick={handleOpenComments}
                                    >
                                        {repliesCount} comment{repliesCount !== 1 ? "s" : ""}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments modal */}
            <CommunityMessageModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                message={message}
                replies={replies ?? []}
                isLoadingReplies={isLoadingReplies ?? false}
                isSending={isSending}
                userId={userId}
                onSendReply={async (content) => {
                    await onSendReply(message._id, content);
                }}
            />
        </>
    );
};