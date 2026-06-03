// src/components/communities/chats/ExpandedChatView.tsx
"use client";

import useCommunity from "@/hook/useCommunities";
import { useCommunityGroup } from "@/hook/useCommunitiesGroup";
import {
  Avatar,
  Button,
  Tabs,
  Tab,
  useDisclosure,
} from "@heroui/react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useParams, useSearchParams } from "next/navigation";
import {
  RiCloseLine,
  RiImageLine,
} from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useCommunityChatMessages } from "@/modules/community-chat/hooks/useCommunityChatMessages";
import { Socket } from "@/lib/socket-io";
import { MessageFeed } from "@/modules/community-chat/components/MessageFeed";
import { Link } from "lucide-react";

const ExpandedChatView = () => {
  const { getCommunity, uploadImage, isUploading } = useCommunity();
  const [userState] = useAtom(userAtom);
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const groupId = searchParams.get("group");
  const communityId = params.id;

  const { groups, currentGroupId, setActiveGroup, isGeneralView } =
    useCommunityGroup(undefined, communityId);
  const community = getCommunity?.data;

  const activeTitle = isGeneralView
    ? community?.title
    : groups.find(g => g._id === currentGroupId)?.title ?? community?.title;

  const {
    messages,
    replies,
    isLoading,
    isSending,
    isUploadingFile,
    loadingReplies,
    sendMessage,
    sendReply,
    fetchReplies,
  } = useCommunityChatMessages({ communityId, groupId });
  const userId = userState.data?._id ?? "";

  const [composerText, setComposerText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on first load
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
      });
    }
  }, [isLoading]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    setShowScrollButton(!atBottom);
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePost = async () => {
    const text = composerText.trim();
    const file = selectedFile;
    if (!text && !file) return;
    await sendMessage(text, file ?? undefined);
    setComposerText("");
    handleRemoveFile();
    scrollToBottom();
  };

  const formatDateLabel = (iso: string) => {
    const d = new Date(iso);
    const diffDays = Math.floor(
      (new Date().setHours(0, 0, 0, 0) - new Date(d).setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24)
    );
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const feedProps = {
    isLoading,
    isLoadingMore: false,
    userId,
    replies,
    loadingReplies,
    isSending,
    scrollRef,
    showScrollButton,
    onScroll: handleScroll,
    onScrollToBottom: scrollToBottom,
    onFetchReplies: fetchReplies,
    onSendReply: sendReply,
    // Only creator can delete — passed down to PostCard via isSelf check
    onDeleteMessage: undefined as ((id: string) => void) | undefined,
    formatDateLabel,
  };
  return (
    <div className="flex-1 flex flex-col overflow-hidden mb-6">
      {!isGeneralView
        ?
        (
          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            {/* ── Composer ── */}
            <div className="bg-white rounded-2xl p-4 border border-[#5160E7]/30 shrink-0">
              <div className="flex gap-3 items-start">
                <Avatar
                  src={userState.data?.profilePicture || ""}
                  name={`${userState.data?.firstName?.[0] ?? ""}${userState.data?.lastName?.[0] ?? ""}`}
                  className="shrink-0 size-10"
                />
                <div className="flex-1 flex flex-col gap-2">
                  <textarea
                    rows={2}
                    className="w-full text-sm text-gray-700 bg-transparent border-none outline-none placeholder:text-gray-400 resize-none"
                    placeholder="What do you want to talk about?"
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                  />

                  {/* Image preview */}
                  {previewUrl && (
                    <div className="relative w-fit">
                      <img
                        src={previewUrl}
                        alt="preview"
                        className="h-24 rounded-xl object-cover"
                      />
                      <button
                        onClick={handleRemoveFile}
                        className="absolute -top-1.5 -right-1.5 bg-black/60 text-white rounded-full p-0.5"
                      >
                        <RiCloseLine className="size-3" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-[#E8E7ED]">
                    <div className="flex gap-4">
                      {/* Image/Video upload */}
                      <button
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <RiImageLine className="size-4 text-[#5160E7]" />
                        Image/Video
                      </button>
                    </div>

                    <Button
                      size="sm"
                      className="bg-[#5160E7] text-white rounded-full px-4"
                      isLoading={isSending || isUploading}
                      isDisabled={!composerText.trim() && !selectedFile}
                      onPress={handlePost}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFilePick}
              />
            </div>

            {/* ── Feed tabs + messages ── */}
            <div className="bg-white rounded-2xl px-4 overflow-hidden shrink-0">
              <Tabs
                aria-label="Feed tabs"
                variant="underlined"
                classNames={{
                  base: "w-full px-6 py-4",
                  tab: "text-sm font-medium text-gray-400 py-4 px-6  w-fit full data-[selected=true]:text-[#596AFE]",
                  cursor: "bg-[#596AFE] rounded-none",
                  tabList: "flex items-start gap-6 w-full p-0 relative bg-white rounded-none border-b border-[#CCD1FF] ",
                  tabContent: "group-data-[selected=true]:text-[#000]",
                  panel: 'px-6 py-6'
                }}
              >
                {/* My Feeds — messages from current user */}
                <Tab key="my" title="My Feeds">
                  <MessageFeed
                    {...feedProps}
                    messages={messages.filter(m => m.author._id === userId)}
                  />
                </Tab>

                {/* Latest Feeds — all messages */}
                <Tab key="latest" title="Latest Feeds">
                  <MessageFeed
                    {...feedProps}
                    messages={messages}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        ) : (
          <Tabs
            variant="underlined"
            aria-label="Channel Tabs"
            classNames={{
              base: "flex flex-col min-h-0",
              panel: "flex-1 min-h-0 overflow-hidden",
              cursor: "bg-[#596AFE] rounded-none",
              tabContent: "group-data-[selected=true]:text-[#000]",
              tabList: "bg-white rounded-2xl"
            }}
          >
            <Tab key={"channel"}
              title={`${isGeneralView ? "Community" : "Group"} Channel`}
            >
              <div className="flex-1 overflow-y-auto flex flex-col gap-4">
                {/* ── Composer ── */}
                <div className="bg-white rounded-2xl p-4 border border-[#5160E7]/30 shrink-0">
                  <div className="flex gap-3 items-start">
                    <Avatar
                      src={userState.data?.profilePicture || ""}
                      name={`${userState.data?.firstName?.[0] ?? ""}${userState.data?.lastName?.[0] ?? ""}`}
                      className="shrink-0 size-10"
                    />
                    <div className="flex-1 flex flex-col gap-2">
                      <textarea
                        rows={2}
                        className="w-full text-sm text-gray-700 bg-transparent border-none outline-none placeholder:text-gray-400 resize-none"
                        placeholder="What do you want to talk about?"
                        value={composerText}
                        onChange={(e) => setComposerText(e.target.value)}
                      />

                      {/* Image preview */}
                      {previewUrl && (
                        <div className="relative w-fit">
                          <img
                            src={previewUrl}
                            alt="preview"
                            className="h-24 rounded-xl object-cover"
                          />
                          <button
                            onClick={handleRemoveFile}
                            className="absolute -top-1.5 -right-1.5 bg-black/60 text-white rounded-full p-0.5"
                          >
                            <RiCloseLine className="size-3" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-[#E8E7ED]">
                        <div className="flex gap-4">
                          {/* Image/Video upload */}
                          <button
                            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <RiImageLine className="size-4 text-[#5160E7]" />
                            Image/Video
                          </button>
                        </div>

                        <Button
                          size="sm"
                          className="bg-[#5160E7] text-white rounded-full px-4"
                          isLoading={isSending || isUploading}
                          isDisabled={!composerText.trim() && !selectedFile}
                          onPress={handlePost}
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFilePick}
                  />
                </div>

                {/* ── Feed tabs + messages ── */}
                <div className="bg-white rounded-2xl px-4 overflow-hidden shrink-0">
                  <Tabs
                    aria-label="Feed tabs"
                    variant="underlined"
                    classNames={{
                      base: "w-full px-6 py-4",
                      tab: "text-sm font-medium text-gray-400 py-4 px-6  w-fit full data-[selected=true]:text-[#596AFE]",
                      cursor: "bg-[#596AFE] rounded-none",
                      tabList: "flex items-start gap-6 w-full p-0 relative bg-white rounded-none border-b border-[#CCD1FF] ",
                      tabContent: "group-data-[selected=true]:text-[#000]",
                      panel: 'px-6 py-6'
                    }}
                  >
                    {/* My Feeds — messages from current user */}
                    <Tab key="my" title="My Feeds">
                      <MessageFeed
                        {...feedProps}
                        messages={messages.filter(m => m.author._id === userId)}
                      />
                    </Tab>

                    {/* Latest Feeds — all messages */}
                    <Tab key="latest" title="Latest Feeds">
                      <MessageFeed
                        {...feedProps}
                        messages={messages}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Tab>
            <Tab key={"liveSession"} title="Live Session">
              <div className="bg-white rounded-2xl h-full">
                <div className="w-full flex h-full flex-col items-center justify-center  gap-2 py-1">
                  {community?.meetingLink ? (
                    <a target="_blank" href={community?.meetingLink} className=" text-primary ">
                      Join Meeting
                    </a>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Link />
                      <p className="text-sm text-[#686184] flex items-center gap-4">No Meeting Link</p>
                    </div>
                  )}
                </div>
              </div>
            </Tab>
          </Tabs>
        )}
      {/* ── Feed area ── */}


    </div>
  );
};


export default ExpandedChatView;