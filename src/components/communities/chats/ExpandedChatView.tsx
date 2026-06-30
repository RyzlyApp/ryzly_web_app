"use client";

import useCommunity from "@/hook/useCommunities";
import { useCommunityGroup } from "@/hook/useCommunitiesGroup";
import { Tabs, Tab } from "@heroui/react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCommunityChatMessages } from "@/modules/community-chat/hooks/useCommunityChatMessages";
import { MessageFeed } from "@/modules/community-chat/components/MessageFeed";
import { Link } from "lucide-react";
import { ChatComposer } from "./chatcomposer";
import httpService from "@/helper/services/httpService";
import { IUser } from "@/helper/model/user";

const ExpandedChatView = () => {
  const { getCommunity } = useCommunity();
  const [userState] = useAtom(userAtom);
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const communityId = params?.id;
  const groupId = searchParams.get("group");

  const { isGeneralView } = useCommunityGroup(undefined, communityId);
  const community = getCommunity?.data;

  const {
    messages, replies, isLoading, isSending,
    isUploadingFile, loadingReplies, likedMessageIds,
    sendMessage, sendReply, fetchReplies, likeAndUnlikePost,
  } = useCommunityChatMessages({ communityId, groupId });

  // ── Fetch community members for @mention ─────────────────────
  const { data: communityMembers = [] } = useQuery<IUser[]>({
    queryKey: ["community-members", communityId],
    queryFn: async () => {
      const res = await httpService.get(`/community/${communityId}/members`);
      return (res.data.data as { member: IUser }[]).map(r => r.member);
    },
    enabled: !!communityId,
    staleTime: 5 * 60 * 1000,
  });

  const userId = userState.data?._id ?? "";

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
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    setShowScrollButton(!atBottom);
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  };

  const formatDateLabel = (iso: string) => {
    const d = new Date(iso);
    const diffDays = Math.floor(
      (new Date().setHours(0, 0, 0, 0) - new Date(d).setHours(0, 0, 0, 0)) / 86400000
    );
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  const feedProps = {
    isLoading,
    isLoadingMore: false,
    userId,
    likedMessageIds,
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
    members: communityMembers,
  };

  const tabsClassNames = {
    base: "w-full px-2 py-2 sm:px-6 sm:py-4 overflow-x-auto scrollbar-none",
    tab: "text-xs sm:text-sm font-medium text-gray-400 py-3 px-4 sm:py-4 sm:px-6 w-auto data-[selected=true]:text-[#596AFE] whitespace-nowrap min-w-max",
    cursor: "bg-[#596AFE] rounded-none",
    tabList: "flex flex-nowrap items-center gap-2 sm:gap-6 p-0 relative bg-white rounded-none border-b border-[#CCD1FF] w-max min-w-full",
    tabContent: "group-data-[selected=true]:text-[#000]",
    panel: "p-0 flex-1 min-h-0 overflow-y-hidden",
  };

  const FeedTabs = () => (
    <div className="bg-white rounded-2xl flex flex-col h-full min-h-0 overflow-hidden">
      <Tabs aria-label="Feed tabs" variant="underlined" classNames={tabsClassNames}>
        <Tab key="my" title="My Feeds">
          <MessageFeed {...feedProps} messages={messages.filter(m => m.author._id === userId)} />
        </Tab>
        <Tab key="latest" title="Latest Feeds">
          <MessageFeed {...feedProps} messages={messages} />
        </Tab>
      </Tabs>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden mb-6 w-full">
      {!isGeneralView ? (
        <div className="flex flex-col h-full min-h-0 mt-2">
          <ChatComposer
            isSending={isSending}
            isUploading={isUploadingFile}
            // members={communityMembers}
            onSendMessage={sendMessage}
          />
          <div className="flex-1 min-h-0 overflow-hidden mt-4">
            <FeedTabs />
          </div>
        </div>
      ) : (
        <Tabs
          variant="underlined"
          aria-label="Channel Tabs"
          classNames={{
            base: "w-full flex flex-col min-h-0 overflow-x-auto scrollbar-none",
            panel: "flex-1 min-h-0 overflow-hidden w-full",
            cursor: "bg-[#596AFE] rounded-none",
            tabContent: "group-data-[selected=true]:text-[#000]",
            tabList: "flex flex-nowrap bg-white rounded-2xl w-max min-w-full border-b border-gray-100",
            tab: "text-xs sm:text-sm whitespace-nowrap min-w-max py-3 px-4",
          }}
        >
          <Tab key="channel" title={`${isGeneralView ? "Community" : "Group"} Channel`}>
            <div className="flex flex-col h-full min-h-0">
              <ChatComposer
                isSending={isSending}
                isUploading={isUploadingFile}
                // members={communityMembers}
                onSendMessage={sendMessage}
              />
              <div className="flex-1 min-h-0 overflow-hidden mt-4">
                <FeedTabs />
              </div>
            </div>
          </Tab>

          <Tab key="liveSession" title="Live Session">
            <div className="bg-white rounded-2xl h-full min-h-[200px]">
              <div className="w-full flex h-full flex-col items-center justify-center gap-2 py-6">
                {community?.meetingLink ? (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={community.meetingLink}
                    className="text-primary font-medium hover:underline"
                  >
                    Join Meeting
                  </a>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Link className="text-gray-400" />
                    <p className="text-sm text-[#686184]">No Meeting Link</p>
                  </div>
                )}
              </div>
            </div>
          </Tab>
        </Tabs>
      )}
    </div>
  );
};

export default ExpandedChatView;