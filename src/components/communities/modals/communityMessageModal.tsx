"use client";

import { useState, useMemo } from "react";
import {
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@heroui/react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { ICommunityMessage } from "@/modules/community-chat/models/community-chat.model";
import Link from "next/link";
import { IUser } from "@/helper/model/user";
import { cn } from "@/lib/utils";

const IMAGE_RE = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
const VIDEO_RE = /^https?:\/\/.+\.(mp4|mov|webm|ogg)(\?.*)?$/i;

const parseContent = (content: string, image?: string) => {
  if (image) return { text: content, imageUrls: [], videoUrls: [] };
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

interface MediaItem { url: string; type: "image" | "video"; }

const MediaBlock = ({ message }: { message: ICommunityMessage }) => {
  const mediaItems = useMemo<MediaItem[]>(() => {
    const items: MediaItem[] = [];
    if (message.image) {
      items.push({ url: message.image, type: VIDEO_RE.test(message.image) ? "video" : "image" });
      return items;
    }
    if (message.content) {
      for (const line of message.content.split("\n")) {
        const t = line.trim();
        if (IMAGE_RE.test(t)) items.push({ url: t, type: "image" });
        else if (VIDEO_RE.test(t)) items.push({ url: t, type: "video" });
      }
    }
    return items;
  }, [message.image, message.content]);

  if (mediaItems.length === 0) return null;
  return (
    <div className="mt-2 rounded-xl overflow-hidden">
      {mediaItems.map((item, idx) =>
        item.type === "video" ? (
          <video key={idx} src={item.url} controls className="w-full max-h-36 object-contain rounded-xl" controlsList="nodownload" />
        ) : (
          <img key={idx} src={item.url} alt="attachment" className="max-h-36 object-contain rounded-xl"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        )
      )}
    </div>
  );
};

const MENTION_RE = /(@[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+)/g;

function renderWithMentions(
  inputText: string,
  userIdByName: Map<string, string>
): React.ReactNode {
  if (!inputText) return null;
  const segments = inputText.split(MENTION_RE);
  return (
    <>
      {segments.map((seg, i) => {
        if (!seg.startsWith("@")) {
          return <span key={i} className="text-gray-700 whitespace-pre-wrap break-words">{seg}</span>;
        }
        const name = seg.slice(1);
        const uid = userIdByName.get(name.toLowerCase());
        const href = uid ? `/dashboard/profile/${uid}` : "#";
        return (
          <Link
            key={i}
            href={href}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center bg-[#5160E7]/10 text-[#5160E7] hover:bg-[#5160E7]/20 rounded-full px-2 py-0.5 text-[13px] font-semibold transition-colors mx-0.5 leading-snug break-words"
          >
            {seg}
          </Link>
        );
      })}
    </>
  );
}

// Component for truncated text with "Show more" button
const TruncatedMessage = ({ text, userIdByName }: { text: string; userIdByName: Map<string, string> }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 200; // adjust threshold as needed

  if (!isLong) {
    return <div className="text-sm leading-relaxed break-words">{renderWithMentions(text, userIdByName)}</div>;
  }

  return (
    <div>
      <div className={`text-sm leading-relaxed break-words ${!expanded ? 'line-clamp-3' : ''}`}>
        {renderWithMentions(text, userIdByName)}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs text-[#5160E7] hover:underline mt-1"
      >
        {expanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
};

interface CommunityMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: ICommunityMessage;
  replies: ICommunityMessage[];
  isLoadingReplies: boolean;
  isSending: boolean;
  userId: string;
  members?: IUser[];
  onSendReply: (content: string) => Promise<void>;
}

export const CommunityMessageModal = ({
  isOpen,
  onClose,
  message,
  replies,
  isLoadingReplies,
  isSending,
  userId,
  members = [],
  onSendReply,
}: CommunityMessageModalProps) => {
  const [replyText, setReplyText] = useState("");
  const { text } = parseContent(message.content, message.image);

  const userIdByName = useMemo(() => {
    const map = new Map<string, string>();
    const seen = new Set<string>();
    members.forEach(u => {
      if (seen.has(u._id)) return;
      seen.add(u._id);
      map.set(`${u.firstName} ${u.lastName}`.toLowerCase(), u._id);
    });
    return map;
  }, [members]);

  const handleSend = async () => {
    if (!replyText.trim()) return;
    const content = replyText;
    setReplyText("");
    await onSendReply(content);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      // classNames={{ base: "h-[600px] max-h-[80vh]" }}
      scrollBehavior="inside"
      classNames={{
        base: "h-[85vh] max-h-[80vh]",
        header: "border-b border-[#E8E7ED] pb-3",
        body: "p-0",
        footer: "border-t border-[#E8E7ED] pt-3",
      }}
    >
      <ModalContent>
        <ModalHeader>
          <span className="text-base font-semibold text-black">Comments</span>
        </ModalHeader>

        <ModalBody className="relative overflow-hidden">
          {/* Parent message */}
          <div className="sticky top-0 w-full px-4 pt-4 pb-4 border-b border-[#E8E7ED] bg-white">
            <div className="flex gap-3">
              <Avatar
                src={message.author.profilePicture || ""}
                name={`${message.author.firstName?.[0]}${message.author.lastName?.[0]}`}
                className="size-10 shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-black">
                    {message.author.firstName} {message.author.lastName}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    · {new Date(message.createdAt).toLocaleDateString(undefined, {
                      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>
                {text && <TruncatedMessage text={text} userIdByName={userIdByName} />}
                <MediaBlock message={message} />
              </div>
            </div>
          </div>

          {/* Replies list */}
          <div className="flex flex-col overflow-auto h-[400px]">
            {isLoadingReplies ? (
              <div className="flex justify-center py-8">
                <Spinner size="sm" label="Loading comments..." />
              </div>
            ) : replies.length ? (
              replies.map(reply => {
                const rp = parseContent(reply.content, reply.image);
                return (
                  <div key={reply._id} className="px-4 py-3 flex gap-3 border-b border-[#F5F5F5] last:border-0">
                    <Avatar
                      src={reply.author.profilePicture || ""}
                      name={`${reply.author.firstName?.[0]}${reply.author.lastName?.[0]}`}
                      className="size-8 shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-[#F5F5F5] rounded-2xl rounded-tl-none px-3 py-2">
                        <span className="text-xs font-semibold text-black block mb-0.5">
                          {reply.author.firstName} {reply.author.lastName}
                        </span>
                        {rp.text && <TruncatedMessage text={rp.text} userIdByName={userIdByName} />}
                        <MediaBlock message={reply} />
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 ml-1 block">
                        {new Date(reply.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-10 gap-1">
                <p className="text-sm text-gray-400">No comments yet</p>
                <p className="text-xs text-gray-300">Be the first to comment</p>
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="flex gap-3 w-full items-center">
            <div className="relative flex-1">
              <input
                className="w-full px-4 py-2.5 rounded-full bg-[#F5F5F5] border border-transparent focus:outline-none focus:border-[#5160E7] text-sm pr-12"
                placeholder="Write a comment..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
                }}
              />
              <Button
                size="sm"
                variant="flat"
                isIconOnly
                isLoading={isSending}
                isDisabled={!replyText.trim()}
                onPress={handleSend}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#5160E7] text-white size-8 rounded-full"
              >
                {!isSending && <RiSendPlane2Fill className="text-white size-4" />}
              </Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};