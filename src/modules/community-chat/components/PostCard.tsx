"use client";

import { useState, useMemo } from "react"; // moved useMemo to top
import { Avatar } from "@heroui/react";
import { BiComment } from "react-icons/bi";
import { HiOutlineFire } from "react-icons/hi";
import { Trash2 } from "lucide-react";
import { RiMoreLine } from "react-icons/ri";
import { ICommunityMessage } from "../models/community-chat.model";
import { CommunityMessageModal } from "@/components/communities/modals/communityMessageModal";

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

const parseContent = (content: string, image?: string) => {
    // If message has dedicated image field, just return content as text
    if (image) {
        return { text: content, imageUrls: [], videoUrls: [] };
    }

    // Legacy — parse URLs out of content
    const lines = content.split("\n").map(l => l.trim()).filter(Boolean);
    const imageUrls: string[] = [];
    const videoUrls: string[] = [];
    const textLines: string[] = [];

    lines.forEach(line => {
        if (IMAGE_RE.test(line)) imageUrls.push(line);
        else if (VIDEO_RE.test(line)) videoUrls.push(line);
        else textLines.push(line);
    });

    return { text: textLines.join("\n"), imageUrls, videoUrls };
};

interface MediaItem {
    url: string;
    type: "image" | "video";
}

const MediaBlock = ({ message }: { message: ICommunityMessage }) => {
    const mediaItems = useMemo<MediaItem[]>(() => {
        const items: MediaItem[] = [];

        // 1. Dedicated image/video field (new messages)
        if (message.image) {
            const type = VIDEO_RE.test(message.image) ? "video" : "image";
            items.push({ url: message.image, type });
            return items;
        }

        // 2. Legacy: parse URLs from content
        if (message.content) {
            const lines = message.content.split("\n");
            for (const line of lines) {
                const trimmed = line.trim();
                if (IMAGE_RE.test(trimmed)) {
                    items.push({ url: trimmed, type: "image" });
                } else if (VIDEO_RE.test(trimmed)) {
                    items.push({ url: trimmed, type: "video" });
                }
            }
        }

        return items;
    }, [message.image, message.content]);

    if (mediaItems.length === 0) return null;

    return (
        <div className="w-full overflow-hidden rounded-lg">
            {mediaItems.map((item, idx) =>
                item.type === "video" ? (
                    <video
                        key={idx}
                        src={item.url}
                        controls
                        className="w-full max-h-[400px] object-cover"
                        controlsList="nodownload"
                    />
                ) : (
                    <img
                        key={idx}
                        src={item.url}
                        alt="Media attachment"
                        className="w-full max-h-[400px] object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                )
            )}
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

    const { text } = parseContent(message.content, message.image);
    
    // FIXED: Check both dedicated image field and legacy URLs in content
    const hasMedia = !!message.image || IMAGE_RE.test(message.content) || VIDEO_RE.test(message.content);
    
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
                        <MediaBlock message={message} />
                    </div>
                )}

                {/* REMOVED: stray <img src={imageUrls}/> */}

                {/* Action bar */}
                <div className="px-2 py-1 border-t border-[#F0F0F0] mt-2 flex items-center justify-between">
                    <div className="flex gap-2 items-center w-full justify-end">
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
                            </button>
                            {repliesCount > 0 && (
                                <div className="pr-2">
                                    <button
                                        className="text-xs text-gray-400"
                                        onClick={handleOpenComments}
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