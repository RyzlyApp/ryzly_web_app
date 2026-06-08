"use client";

import useCommunity from "@/hook/useCommunities";
import { Tabs, Tab, Avatar, Button, Skeleton } from "@heroui/react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCommunityChatMessages } from "@/modules/community-chat/hooks/useCommunityChatMessages";
import { MessageFeed } from "@/modules/community-chat/components/MessageFeed";
import { ChatComposer } from "@/components/communities/chats/chatcomposer";
import { UnauthorisedLayout } from "@/components/shared";
import { useQuery } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { IUser } from "@/helper/model/user";
import { cn } from "@/lib/utils";
import { PlusCircle, Users, ChevronRight } from "lucide-react";
import Link from "next/link";
import CreateCommunitieBtn from "@/components/communities/createCommunityBtn";

interface ICommunity {
  _id: string;
  title: string;
  description?: string;
  profilePicture?: string;
  isMember?: boolean;
}

const CommunityPage = () => {
  const router = useRouter();
  const [userState] = useAtom(userAtom);
  const userId = userState.data?._id ?? "";

  // Fetch all communities (the user's communities + discoverable ones)
  const { data: communitiesData, isLoading: isLoadingCommunities } = useCommunity().getCommunities;
  const communities = (communitiesData?.data as ICommunity[]) ?? [];

  // Select the first community as "main" (or you can use a URL param / state)
  const [selectedCommunity, setSelectedCommunity] = useState<ICommunity | null>(null);

  useEffect(() => {
    if (communities.length > 0 && !selectedCommunity) {
      setSelectedCommunity(communities[0]);
    }
  }, [communities]);

  const communityId = selectedCommunity?._id;

  // Fetch community members for mentions
  // const { data: membersRaw, isLoading: isLoadingMembers } = useQuery({
  //   queryKey: ["community-members", communityId],
  //   queryFn: async () => {
  //     const res = await httpService.get(`/community/${communityId}/members`);
  //     // API returns { data: [{ member: IUser, ... }] }
  //     return (res.data.data as { member: IUser }[]).map((item) => item.member);
  //   },
  //   enabled: !!communityId,
  //   staleTime: 5 * 60 * 1000,
  // });

  // const communityMembers = membersRaw ?? [];

  // Chat messages hook
  const {
    messages,
    replies,
    isLoading: isLoadingMessages,
    isSending,
    isUploadingFile,
    loadingReplies,
    likedMessageIds,
    sendMessage,
    sendReply,
    fetchReplies,
    likeAndUnlikePost,
  } = useCommunityChatMessages({
    communityId: communityId ?? "",
    groupId: null,
  });

  // Scroll behaviour
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isInitialScroll = useRef(true);

  useEffect(() => {
    if (!isLoadingMessages && messages.length > 0) {
      if (isInitialScroll.current) {
        requestAnimationFrame(() => {
          scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
        });
        isInitialScroll.current = false;
      } else if (!showScrollButton) {
        // Only snap to bottom if the user is already at the bottom (showScrollButton is false)
        requestAnimationFrame(() => {
          scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        });
      }
    }
  }, [isLoadingMessages, messages.length, showScrollButton]);

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
    isLoading: isLoadingMessages,
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
    onDeleteMessage: undefined,
    formatDateLabel,
    likeAndUnlikePost: likeAndUnlikePost as (messageId: string) => void,
    // members: communityMembers, // for mention pills
  };

  // const handleSendMessage = async (text: string, file?: File, type?: string) => {
  //   await sendMessage(text, type, file);
  //   scrollToBottom();
  // };

  const tabsClassNames = {
    base: "w-full px-2 py-2 sm:px-6 sm:py-4 overflow-x-auto scrollbar-none",
    tab: "text-xs sm:text-sm font-medium text-gray-400 py-3 px-4 sm:py-4 sm:px-6 w-auto data-[selected=true]:text-[#596AFE] whitespace-nowrap min-w-max",
    cursor: "bg-[#596AFE] rounded-none",
    tabList: "flex flex-nowrap items-center gap-2 sm:gap-6 p-0 relative bg-white rounded-none border-b border-[#CCD1FF] w-max min-w-full",
    tabContent: "group-data-[selected=true]:text-[#000]",
    panel: "p-0 flex-1 overflow-y-hidden h-full",
  };

  // ─── Sidebar: Other Communities ──────────────────────────────
  const otherCommunities = communities.filter((c) => c._id !== selectedCommunity?._id);

  if (!userState.data) {
    return <UnauthorisedLayout><></></UnauthorisedLayout>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* MAIN CONTENT (Left side) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with community title */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3 shadow-sm">
          <Avatar
            src={selectedCommunity?.profilePicture || ""}
            name={selectedCommunity?.title?.[0] || "C"}
            className="size-10"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">{selectedCommunity?.title || "Community"}</h1>
            <p className="text-sm text-gray-500 line-clamp-1">{selectedCommunity?.description || "Connect and share with members"}</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
          <ChatComposer
            isSending={isSending}
            isUploading={isUploadingFile}
            // members={communityMembers}
            onSendMessage={sendMessage}
          />
          <div className="flex-1 min-h-0 overflow-hidden">
            {isLoadingMessages ? (
              <div className="flex justify-center items-center h-full">
                <Skeleton className="w-3/4 h-20 rounded-lg" />
              </div>
            ) : (
              <div className="bg-white rounded-2xl flex flex-col h-full min-h-0 overflow-hidden">
                <Tabs aria-label="Feed tabs" variant="underlined" classNames={tabsClassNames} defaultSelectedKey="latest">
                  <Tab key="my" title="My Feeds">
                    <MessageFeed {...feedProps} messages={messages.filter((m) => m.author?._id === userId)} />
                  </Tab>
                  <Tab key="latest" title="Latest Feeds">
                    <MessageFeed {...feedProps} messages={messages} />
                  </Tab>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-y-auto shrink-0">
        <div className="p-4 border-b border-gray-100">
          {/* <Button
            color="primary"
            startContent={<PlusCircle className="size-4" />}
            className="w-full bg-[#5160E7] text-white"
            onPress={() => router.push("/dashboard/communities/create")}
          >
            Create Community
          </Button> */}
          <CreateCommunitieBtn />
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Users className="size-4" />
            Other Communities
          </h3>
          {isLoadingCommunities ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : otherCommunities.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No other communities yet</p>
          ) : (
            <div className="space-y-2">
              {otherCommunities.map((comm) => (
                <button
                  key={comm._id}
                  onClick={() => setSelectedCommunity(comm)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors",
                    "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5160E7]/50"
                  )}
                >
                  <Avatar
                    src={comm.profilePicture || ""}
                    name={comm.title?.[0] || "C"}
                    className="size-10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{comm.title}</p>
                    <p className="text-xs text-gray-400 truncate">{comm.description || "Community"}</p>
                  </div>
                  <ChevronRight className="size-4 text-gray-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default CommunityPage;