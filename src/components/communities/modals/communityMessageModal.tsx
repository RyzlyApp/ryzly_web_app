"use client";

import { useState } from "react";
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
    <div className="mt-2 rounded-xl overflow-hidden">
      {imageUrls.map((url, i) => (
        <img key={i} src={url} alt="attachment" className="w-full max-h-72 object-cover rounded-xl" />
      ))}
      {videoUrls.map((url, i) => (
        <video key={i} src={url} controls className="w-full max-h-72 rounded-xl" />
      ))}
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
  onSendReply,
}: CommunityMessageModalProps) => {
  const [replyText, setReplyText] = useState("");
  const { text } = parseContent(message.content);

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
      size="lg"
      scrollBehavior="inside"
      classNames={{
        base: "max-h-[90vh]",
        header: "border-b border-[#E8E7ED] pb-3",
        body: "p-0",
        footer: "border-t border-[#E8E7ED] pt-3",
      }}
    >
      <ModalContent>
        <ModalHeader>
          <span className="text-base font-semibold text-black">
            Comments
          </span>
        </ModalHeader>

        <ModalBody className="relative overflow-hidden">
          {/* Parent message */}
          <div className="sticky top-0 left-0 w-full px-4 pt-4 pb-4 border-b border-[#E8E7ED]">
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
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {text && (
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {text}
                  </p>
                )}
                <MediaBlock content={message.content} />
              </div>
            </div>
          </div>

          {/* Comments list */}
          <div className="flex flex-col overflow-auto h-[400px]">
            {isLoadingReplies ? (
              <div className="flex justify-center py-8">
                <Spinner size="sm" label="Loading comments..." />
              </div>
            ) : replies.length ? (
              replies.map(reply => {
                const replyParsed = parseContent(reply.content);
                return (
                  <div
                    key={reply._id}
                    className="px-4 py-3 flex gap-3 border-b border-[#F5F5F5] last:border-0"
                  >
                    <Avatar
                      src={reply.author.profilePicture || ""}
                      name={`${reply.author.firstName?.[0]}${reply.author.lastName?.[0]}`}
                      className="size-8 shrink-0"
                    />
                    <div className="flex-1">
                      {/* Comment bubble */}
                      <div className="bg-[#F5F5F5] rounded-2xl rounded-tl-none px-3 py-2">
                        <span className="text-xs font-semibold text-black block mb-0.5">
                          {reply.author.firstName} {reply.author.lastName}
                        </span>
                        {replyParsed.text && (
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {replyParsed.text}
                          </p>
                        )}
                        <MediaBlock content={reply.content} />
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 ml-1 block">
                        {new Date(reply.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
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
            {/* <Avatar
              src=""
              name={userId?.[0]?.toUpperCase() ?? "U"}
              className="size-8 shrink-0"
            /> */}
            <div className="relative flex-1">
              <input
                className="w-full px-4 py-2.5 rounded-full bg-[#F5F5F5] border border-transparent focus:outline-none focus:border-[#5160E7] text-sm pr-12"
                placeholder="Write a comment..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
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