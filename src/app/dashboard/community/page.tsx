"use client";

import useCommunity from "@/hook/useCommunities";
import { Avatar, Skeleton, Button, Tabs, Tab } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { useAtom, useSetAtom } from "jotai";
import { userActionsAtom, userAtom } from "@/helper/atom/user";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MessageFeed } from "@/modules/community-chat/components/MessageFeed";
import { useQuery } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { ChevronRight, Trophy, ArrowRight, LogIn } from "lucide-react";
import { useTimelineMessages } from "@/modules/community-chat/hooks/useTimelineMessages";
import { IChallenge } from "@/helper/model/challenge";
import { ChatComposer } from "@/components/communities/chats/chatcomposer";
import { CustomImage } from "@/components/custom";
import StorageClass from "@/dal/storage/StorageClass";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import { ActivityLog } from "@/components/shared/activityLog";

interface ICommunity {
  _id: string;
  title: string;
  description?: string;
  profilePicture?: string;
  isMember?: boolean;
}

// ────────────────────────────────────────────────────────────
const CommunityPage = () => {
  const router = useRouter();
  const [userState] = useAtom(userAtom);
  const dispatchUser = useSetAtom(userActionsAtom);

  // ── Auth hydration ────────────────────────────────────────
  const hasHydratedAuth = useRef(false);
  const [isHydratingAuth, setIsHydratingAuth] = useState(false);

  useEffect(() => {
    if (hasHydratedAuth.current || userState.data?._id) return;
    const token = StorageClass.getValue<string>(STORAGE_KEYS.TOKEN, { isJSON: false });
    if (!token) return;
    hasHydratedAuth.current = true;
    setIsHydratingAuth(true);
    void dispatchUser({ type: "fetch" }).finally(() => setIsHydratingAuth(false));
  }, [dispatchUser, userState.data?._id]);

  const userId = userState.data?._id ?? "";
  const isAuth = !!userState.data?._id;

  console.log(isAuth)

  // ── Auth toast ────────────────────────────────────────────
  const showAuthToast = useCallback(() => {
    addToast({
      title: "Sign in required",
      description: "Create a free account or sign in to like, comment, and post.",
      color: "warning",
      timeout: 5000,
      endContent: (
        <div className="ms-11 my-2 flex gap-x-2">
          <Button color="primary" size="sm" variant="bordered" onPress={() => router.push("/auth")}>
            Sign In
          </Button>
        </div>
      ),
    });
  }, [router]);

  const authGuard = useCallback(
    async (action: () => void | Promise<void>) => {
      if (!isAuth) { showAuthToast(); return false; }
      await action();
      return true;
    },
    [isAuth, showAuthToast]
  );

  // ── Communities ───────────────────────────────────────────
  const { data: communitiesData } = useCommunity().getCommunities;
  const [selectedCommunity, setSelectedCommunity] = useState<ICommunity | null>(null);

  useEffect(() => {
    const first = (communitiesData?.data as ICommunity[] | undefined)?.[0];
    if (first && !selectedCommunity) setSelectedCommunity(first);
  }, [communitiesData, selectedCommunity]);

  // ── Challenges ────────────────────────────────────────────
  const { data: challengesData, isLoading: isLoadingChallenges } = useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const res = await httpService.get("/challenge");
      return res?.data?.data as IChallenge[];
    },
  });
  const challenges = challengesData ?? [];

  // ── Members for @mention ──────────────────────────────────
  const communityId = selectedCommunity?._id ?? "";
  // const { data: communityMembers = [] } = useQuery({ ... });

  // ── Timeline messages ─────────────────────────────────────
  const {
    messages, replies, isLoading: isLoadingMessages,
    isSending, isUploadingFile, loadingReplies,
    likedMessageIds, sendMessage, sendReply,
    fetchReplies, likeAndUnlikePost,
  } = useTimelineMessages();

  // ── Scroll ────────────────────────────────────────────────
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollRefMy = useRef<HTMLDivElement | null>(null);
  const scrollRefLatest = useRef<HTMLDivElement | null>(null);
  const hasScrolled = useRef(false);

  useEffect(() => {
    if (!isLoadingMessages && messages.length > 0 && !hasScrolled.current) {
      hasScrolled.current = true;
      requestAnimationFrame(() => {
        scrollRefLatest.current?.scrollTo({ top: scrollRefLatest.current.scrollHeight });
        scrollRefMy.current?.scrollTo({ top: scrollRefMy.current.scrollHeight });
      });
    }
  }, [isLoadingMessages, messages.length]);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>) =>
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      setShowScrollButton(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
    };

  const scrollToBottom = (ref: React.RefObject<HTMLDivElement | null>) => () => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
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

  // ── Auth-gated wrappers ───────────────────────────────────
  const guardedLike = (messageId: string) => {
    void authGuard(() => likeAndUnlikePost(messageId));
  };

  const guardedSendMessage = async (text: string, file?: File, type?: string) => {
    await authGuard(async () => {
      await sendMessage(text, file, type);
      setTimeout(() => scrollToBottom(scrollRefLatest)(), 120);
    });
  };

  const guardedReply = async (messageId: string, content: string) => {
    return new Promise<void>((resolve, reject) => {
      void authGuard(async () => {
        await sendReply(messageId, content).then(resolve).catch(reject);
      }).then(allowed => { if (!allowed) resolve(); });
    });
  };

  const guardedFetchReplies = (messageId: string) => {
    void authGuard(() => fetchReplies(messageId));
  };

  const baseFeedProps = {
    isLoading: isLoadingMessages,
    isLoadingMore: false,
    userId,
    likedMessageIds,
    replies,
    loadingReplies,
    isSending,
    showScrollButton,
    onFetchReplies: guardedFetchReplies,
    onSendReply: guardedReply,
    onDeleteMessage: undefined as ((id: string) => void) | undefined,
    formatDateLabel,
    likeAndUnlikePost: guardedLike,
  };

  const tabsClassNames = {
    base: "w-full px-5",
    tab: "text-sm font-medium text-gray-400 py-3.5 w-fit data-[selected=true]:text-[#5160E7] whitespace-nowrap",
    cursor: "bg-[#5160E7] rounded-none",
    tabList: "flex items-start gap-6 w-full p-0 relative bg-white rounded-none border-b border-gray-100",
    tabContent: "group-data-[selected=true]:text-[#000]",
    panel: "p-0 flex-1 min-h-0 overflow-y-hidden",
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F7F8FC]">
      {/* ── Body ────────────────────────────────────────────── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">

        {/* ── Main feed ──────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden py-4 px-0 lg:px4 gap-3">

            {/* Composer — only shown to authenticated users */}
            {isAuth && (
              <div className="shrink-0">
                <ChatComposer
                  isSending={isSending}
                  isUploading={isUploadingFile}
                  onSendMessage={guardedSendMessage}
                />
              </div>
            )}

            {/* Feed */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {isLoadingMessages ? (
                <div className="bg-white rounded-2xl h-full flex flex-col gap-4 p-5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3 animate-pulse">
                      <div className="size-10 rounded-full bg-gray-100 shrink-0" />
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="h-3 bg-gray-100 rounded w-1/4" />
                        <div className="h-3 bg-gray-100 rounded w-full" />
                        <div className="h-3 bg-gray-100 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl flex flex-col h-full min-h-0 overflow-hidden border border-gray-100 scrollbar-hide">
                  <Tabs
                    aria-label="Feed tabs"
                    variant="underlined"
                    classNames={tabsClassNames}
                    defaultSelectedKey="latest"
                  >
                    <Tab key="my" title="My Feeds">
                      <MessageFeed
                        {...baseFeedProps}
                        messages={messages.filter(m => m.author?._id === userId)}
                        scrollRef={scrollRefMy}
                        onScroll={handleScroll(scrollRefMy)}
                        onScrollToBottom={scrollToBottom(scrollRefMy)}
                      />
                    </Tab>
                    <Tab key="latest" title="Latest Feeds">
                      <MessageFeed
                        {...baseFeedProps}
                        messages={messages}
                        scrollRef={scrollRefLatest}
                        onScroll={handleScroll(scrollRefLatest)}
                        onScrollToBottom={scrollToBottom(scrollRefLatest)}
                      />
                    </Tab>
                  </Tabs>
                </div>
              )}
            </div>
            {isAuth && (
              <div className="lg:hidden mt-4 px-1 rounded-2xl shadow-xs">
                <div className="bg-gray-50 rounded-xl p-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Your Activity Logs
                  </h3>
                  <ActivityLog userId={userId} compact />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right sidebar ───────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 bg-white border-l border-gray-100 overflow-y-auto">

          {/* Challenges section */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <Trophy className="size-3.5 text-amber-500" />
              </div>
              Trending Challenges
            </h3>

            {isLoadingChallenges ? (
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse flex gap-3">
                    <div className="size-12 rounded-lg bg-gray-100 shrink-0" />
                    <div className="flex-1 flex flex-col gap-1.5 justify-center">
                      <div className="h-3 bg-gray-100 rounded w-3/4" />
                      <div className="h-2 bg-gray-50  rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : challenges.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No challenges right now</p>
            ) : (
              <div className="flex flex-col gap-2">
                {challenges.slice(0, 4).map((ch: IChallenge) => (
                  <button
                    key={ch._id}
                    onClick={() => void authGuard(() => router.push(`/challenges/${ch._id}`))}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-[#5160E7]/30 hover:shadow-sm transition-all text-left group w-full"
                  >
                    <div className="size-11 rounded-lg bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                      {ch.url ? (
                        <img src={ch.url} alt={ch.title} className="w-full h-full object-cover" />
                      ) : (
                        <Trophy className="size-4 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate group-hover:text-[#5160E7] transition-colors leading-tight">
                        {ch.title}
                      </p>
                    </div>
                    <ChevronRight className="size-3.5 text-gray-200 group-hover:text-[#5160E7] transition-colors shrink-0" />
                  </button>
                ))}

                <button
                  onClick={() => void authGuard(() => router.push("/dashboard/challenges"))}
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400 hover:text-[#5160E7] transition-colors mt-1 py-2"
                >
                  View all challenges <ArrowRight className="size-3" />
                </button>
              </div>
            )}
          </div>
          {/* Activity log — authenticated users only */}
          {isAuth && (
            <div className="w-full mt-4 px-4">   {/* Only visible on mobile */}
              <ActivityLog userId={userId} compact={false} />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default CommunityPage;