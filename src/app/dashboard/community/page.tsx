"use client";

import { useCommunityChatMessages } from "@/modules/community-chat/hooks/useCommunityChatMessages";
import { MessageFeed } from "@/modules/community-chat/components/MessageFeed";
import { Tabs, Tab } from "@heroui/react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useRef, useState, useEffect, useMemo } from "react";
import { ChatComposer } from "@/components/communities/chats/chatcomposer";
import useCommunity from "@/hook/useCommunities";

export default function CommunityPage() {
  const [userState] = useAtom(userAtom);
  const userId = userState.data?._id ?? "";

  const communities = useCommunity().getCommunities;
  const community = communities.data?.data[5]
  const { data: communityMembersRaw } = useCommunity().getCommunityMembers;
  const communityMembers = useMemo(
    () => communityMembersRaw?.map(cm => cm.member) ?? [],
    [communityMembersRaw]
  );

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
    likeAndUnlikePost,
    likedMessageIds
  } = useCommunityChatMessages({
    communityId: community?._id!,
    groupId: null,
  });

  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
      });
    }
  }, [isLoading, messages.length]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setShowScrollButton(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  };

  const handleSendMessage = async (text: string, file?: File, tag?: string) => {
    // Pass payload straight down into your hook handler
    await sendMessage(text, file);
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
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
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
    onDeleteMessage: undefined as ((id: string) => void) | undefined,
    formatDateLabel,
    likeAndUnlikePost: likeAndUnlikePost as (messageId: string) => void,
    likedMessageIds
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 p-4 gap-4 overflow-hidden">
      {/* Cleaner, encapsulated Responsive Chat Composer */}
      <ChatComposer
        isSending={isSending}
        isUploading={isUploadingFile}
        onSendMessage={handleSendMessage}
      />

      {/* Feed Views Container */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="bg-white rounded-2xl flex flex-col h-full min-h-0 overflow-hidden">
          <Tabs
            aria-label="Feed tabs"
            variant="underlined"
            classNames={{
              base: "w-full px-6 py-3",
              tab: "text-sm font-medium text-gray-400 py-3 w-fit data-[selected=true]:text-[#596AFE]",
              cursor: "bg-[#596AFE] rounded-none",
              tabList: "flex items-start gap-6 w-full p-0 relative bg-white rounded-none border-b border-[#CCD1FF]",
              tabContent: "group-data-[selected=true]:text-[#000]",
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
      </div>
    </div>
  );
}