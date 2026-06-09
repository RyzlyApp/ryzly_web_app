"use client";

import useCommunity from "@/hook/useCommunities";
import { Avatar, Skeleton, Button } from "@heroui/react";
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
import { IUser } from "@/helper/model/user";
import { CustomImage } from "@/components/custom";
import StorageClass from "@/dal/storage/StorageClass";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";

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
  const hasHydratedAuth = useRef(false);
  const [isHydratingAuth, setIsHydratingAuth] = useState(false);
  const userId = userState.data?._id ?? "";
  const isAuth = !!userState.data?._id;

  useEffect(() => {
    if (hasHydratedAuth.current || userState.data?._id) return;

    const token = StorageClass.getValue<string>(STORAGE_KEYS.TOKEN, {
      isJSON: false,
    });

    if (!token) return;

    hasHydratedAuth.current = true;
    setIsHydratingAuth(true);

    void dispatchUser({ type: "fetch" }).finally(() => {
      setIsHydratingAuth(false);
    });
  }, [dispatchUser, userState.data?._id]);

  // ── Show toast helper ─────────────────────────────────────
  const showAuthToast = useCallback(() => {
    addToast({
      title: "Sign in required",
      description: "Create a free account or sign in to like, comment, and post.",
      color: "warning",
      timeout: 5000,
      endContent: (
        <div className="ms-11 my-2 flex gap-x-2">
          <Button
            color="primary"
            size="sm"
            variant="bordered"
            onPress={() => router.push("/auth")}
          >
            Sign In
          </Button>
        </div>
      ),
    });
  }, [router]);

  // ── Guard function ────────────────────────────────────────
  const authGuard = useCallback(async (action: () => void | Promise<void>) => {
    if (!isAuth) {
      showAuthToast();
      return false;
    }
    await action();
    return true;
  }, [isAuth, showAuthToast]);

  // ── Communities ─────────────────────────────────────────────
  const { data: communitiesData } = useCommunity().getCommunities;

  const [selectedCommunity, setSelectedCommunity] = useState<ICommunity | null>(null);
  useEffect(() => {
    const firstCommunity = (communitiesData?.data as ICommunity[] | undefined)?.[0];

    if (firstCommunity && !selectedCommunity) {
      setSelectedCommunity(firstCommunity);
    }
  }, [communitiesData, selectedCommunity]);

  // ── Challenges ─────────────────────────────────────────────
  const { data: challengesData, isLoading: isLoadingChallenges } = useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const response = await httpService.get(`/challenge`);
      return response?.data?.data as IChallenge[];
    },
  });
  const challenges = challengesData ?? [];

  // ── Timeline messages ─────────────────────────────────────
  const {
    messages,
    replies,
    isLoading: isLoadingMessages,
    isSending,
    loadingReplies,
    likedMessageIds,
    sendReply,
    fetchReplies,
    likeAndUnlikePost,
    isUploadingFile,
    sendMessage,
  } = useTimelineMessages();

  // ── Scroll ────────────────────────────────────────────────
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

  // ── Auth-gated action wrappers ────────────────────────────
  const guardedLike = (messageId: string) => {
    void authGuard(() => {
      likeAndUnlikePost(messageId);
    });
  };

  const guardedSendMessage = async (text: string, file?: File, type?: string) => {
    await authGuard(async () => {
      await sendMessage(text, file, type);
    });
  };

  const guardedReply = async (messageId: string, content: string) => {
    await authGuard(async () => {
      await sendReply(messageId, content);
    });
  };

  const guardedFetchReplies = (messageId: string) => {
    void authGuard(() => {
      fetchReplies(messageId);
    });
  };

  const guardedNavigateToChallenge = (challengeId: string) => {
    void authGuard(() => {
      router.push(`/challenges/${challengeId}`);
    });
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
    onFetchReplies: guardedFetchReplies,
    onSendReply: guardedReply,
    onDeleteMessage: undefined,
    formatDateLabel,
    likeAndUnlikePost: guardedLike,
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F7F8FC]">
      {/* Header */}
      <div className="relative justify-between bg-white overflow-hidden border-b border-gray-200 px-6 py-5 flex items-center gap-4 shrink-0 shadow-sm">
        <CustomImage
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={40}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        <div className="relative z-10 flex items-center gap-3 shrink-0">
          {isHydratingAuth ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
          ) : !isAuth ? (
            <button
              onClick={() => router.push("/auth")}
              className="flex items-center gap-2 text-sm font-bold text-[#5160E7] bg-white px-4 py-2.5 rounded-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all shadow-sm border border-gray-200"
            >
              <LogIn className="size-4" />
              Sign in to post
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Welcome, {userState.data?.firstName}</span>
              <Avatar
                src={userState.data?.profilePicture || ""}
                name={`${userState.data?.firstName?.[0]}${userState.data?.lastName?.[0]}`}
                className="size-8"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Main Feed */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-4 gap-0 bg-transparent">
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
              <div className="bg-white rounded-2xl flex flex-col h-full min-h-0 overflow-hidden border border-gray-100">
                <ChatComposer
                  isSending={isSending}
                  isUploading={isUploadingFile}
                  onSendMessage={guardedSendMessage}
                  // members={communityMembers}
                />
                <MessageFeed {...feedProps} messages={messages} />
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 bg-white border-l border-gray-100 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2.5 mb-4 py-4">
              <div className="p-1.5 bg-amber-100 rounded-lg shadow-sm">
                <Trophy className="size-4 text-amber-500" />
              </div>
              Trending Challenges
            </h3>

            {isLoadingChallenges ? (
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse flex flex-col gap-1.5">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-2 bg-gray-50 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : challenges.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No challenges right now</p>
            ) : (
              <div className="flex flex-col gap-3">
                {challenges.slice(0, 6).map((ch: IChallenge) => (
                  <button
                    key={ch._id}
                    onClick={() => guardedNavigateToChallenge(ch._id)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-[#5160E7]/30 hover:shadow-sm transition-all text-left group w-full"
                  >
                    <div className="size-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                      {ch.url ? (
                        <img src={ch.url} alt={ch.title} className="w-full h-full object-cover" />
                      ) : (
                        <Trophy className="size-5 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate group-hover:text-[#5160E7] transition-colors leading-tight">
                        {ch.title}
                      </p>
                    </div>
                    <ChevronRight className="size-3.5 text-gray-200 group-hover:text-[#5160E7] transition-colors mt-0.5 shrink-0" />
                  </button>
                ))}

                <button
                  onClick={() => guardedNavigateToChallenge("all")}
                  className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-400 hover:text-[#5160E7] transition-colors mt-2 py-2"
                >
                  View all challenges <ArrowRight className="size-3" />
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CommunityPage;
