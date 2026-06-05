// src/components/communities/chats/ChatScreen.tsx
"use client";

import { useCommunityChat } from "@/components/communities/hook/useCommunityChat";
import { useCommunityGroup } from "@/hook/useCommunitiesGroup";
import useCommunity from "@/hook/useCommunities";
import { Avatar, Button, Spinner, Tabs, Tab } from "@heroui/react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useParams, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { RiExpandDiagonalFill, RiCloseLine, RiImageLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useCommunityChatMessages } from "@/modules/community-chat/hooks/useCommunityChatMessages";
import { MessageFeed } from "@/modules/community-chat/components/MessageFeed";
import { Link } from "lucide-react";
import { ChatComposer } from "./chatcomposer";

interface IChatScreenProps {
  showMessages: boolean;
  isMember: boolean;
}

const ChatScreen = ({ showMessages, isMember }: IChatScreenProps) => {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const communityId = params.id;
  const groupId = searchParams.get("group");

  const { isExpanded, toggleChat } = useCommunityChat();
  const { getCommunity } = useCommunity();
  const [userState] = useAtom(userAtom);
  const { groups, currentGroupId, isGeneralView } = useCommunityGroup(
    undefined,
    communityId
  );

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
    <div
      className={cn(
        "hidden relative lg:flex flex-col",
        "bg-white rounded-2xl shadow",
        "overflow-hidden transition-all duration-300",
        "w-2/6 h-screen min-h-0",
        "p-4 sm:p-6"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col min-w-0">
          <h2 className="text-black text-lg sm:text-xl font-bold truncate">
            {isLoading ? <Spinner size="sm" /> : activeTitle}
          </h2>
        </div>
        {isMember && (
          <Button size="sm" variant="light" isIconOnly onPress={toggleChat}>
            <RiExpandDiagonalFill
              className={cn("text-black size-5 transition-transform", isExpanded && "rotate-45")}
            />
          </Button>
        )}
      </div>
      {!isGeneralView ? (
        <div className="flex flex-col h-full min-h-0 mt-2">
          {/* Composer */}
          {showMessages && isMember && (
            <ChatComposer isSending={isSending} isUploading={isUploadingFile} onSendMessage={sendMessage} />
          )}

          {/* Feed */}
          <div className="flex-1 min-h-0 overflow-hidden">
            {!showMessages && !isMember ? (
              <div className="h-full flex flex-col items-center justify-center px-4">
                <h2 className="text-lg font-bold text-black text-center">
                  Private Channel
                </h2>
                <p className="text-[#686184] text-xs text-center mt-2">
                  Join to view the conversation and participate.
                </p>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Spinner size="md" color="primary" />
              </div>
            ) : (
              <div className="bg-white rounded-2xl flex flex-col h-full min-h-0 overflow-hidden">
                <Tabs
                  aria-label="Feed tabs"
                  variant="underlined"
                  classNames={{
                    base: "w-full py-4",
                    tab: "text-sm font-medium text-gray-400 py-4 w-fit data-[selected=true]:text-[#596AFE]",
                    cursor: "bg-[#596AFE] rounded-none",
                    tabList:
                      "flex items-start gap-6 w-full p-0 relative bg-white rounded-none border-b border-[#CCD1FF]",
                    tabContent: "group-data-[selected=true]:text-[#000]",
                    // panel: "p-0 flex-1 overflow-auto",
                    panel: "p-0 flex-1 min-h-0 overflow-y-hidden",
                  }}
                >

                  <Tab key="my" title="My Feeds">
                    <MessageFeed
                      {...feedProps}
                      messages={messages.filter(m => m.author._id === userId)}
                    />
                  </Tab>
                  <Tab key="latest" title="Latest Feeds">
                    <MessageFeed {...feedProps} messages={messages} />
                  </Tab>
                </Tabs>
              </div>

            )}
          </div>
        </div>
      ) : (
        <Tabs
          variant="underlined"
          aria-label="Channel Tabs"
          classNames={{
            base: "w-full flex flex-col min-h-0",
            panel: "flex-1 min-h-0 overflow-hidden",
            cursor: "bg-[#596AFE] rounded-none",
            tabContent: "group-data-[selected=true]:text-[#000]",
          }}
        >
          <Tab
            key="Channel"
            title={`${isGeneralView ? "Community" : "Group"} Channel`}
            className=""
          >
            <div className="flex flex-col h-full min-h-0">
              {/* Composer */}
              {showMessages && isMember && (
                <ChatComposer isSending={isSending} isUploading={isUploadingFile} onSendMessage={sendMessage} />
              )}

              {/* Feed */}
              <div className="flex-1 min-h-0 overflow-hidden">
                {!showMessages && !isMember ? (
                  <div className="h-full flex flex-col items-center justify-center px-4">
                    <h2 className="text-lg font-bold text-black text-center">
                      Private Channel
                    </h2>
                    <p className="text-[#686184] text-xs text-center mt-2">
                      Join to view the conversation and participate.
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Spinner size="md" color="primary" />
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl flex flex-col h-full min-h-0 overflow-hidden">
                    <Tabs
                      aria-label="Feed tabs"
                      variant="underlined"
                      classNames={{
                        base: "w-full py-4",
                        tab: "text-sm font-medium text-gray-400 py-4 w-fit data-[selected=true]:text-[#596AFE]",
                        cursor: "bg-[#596AFE] rounded-none",
                        tabList:
                          "flex items-start gap-6 w-full p-0 relative bg-white rounded-none border-b border-[#CCD1FF]",
                        tabContent: "group-data-[selected=true]:text-[#000]",
                        // panel: "p-0 flex-1 overflow-auto",
                        panel: "p-0 flex-1 min-h-0 overflow-y-hidden",
                      }}
                    >

                      <Tab key="my" title="My Feeds">
                        <MessageFeed
                          {...feedProps}
                          messages={messages.filter(m => m.author._id === userId)}
                        />
                      </Tab>
                      <Tab key="latest" title="Latest Feeds">
                        <MessageFeed {...feedProps} messages={messages} />
                      </Tab>
                    </Tabs>
                  </div>

                )}
              </div>
            </div>
          </Tab>
          {isGeneralView && (
            <Tab key={'liveSession'} title="Live Session">
              <div className="w-full flex h-full flex-col items-center justify-center  gap-2 py-1">
                {/* Implement for Group using the isGeneralView */}
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
            </Tab>
          )}

        </Tabs>
      )}
    </div>
  );
};

export default ChatScreen;