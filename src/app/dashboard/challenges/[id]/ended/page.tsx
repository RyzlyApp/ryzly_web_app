"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useFetchData } from "@/hook/useFetchData";
import { IChallenge, ILeadboard } from "@/helper/model/challenge";
import { LoadingLayout } from "@/components/shared";
import { OverviewTab } from "@/components/challenges";
import { ReportChallengeModal } from "@/components/challenges/modals";
import { Avatar } from "@heroui/react";
import { addToast } from "@heroui/toast";
import httpService from "@/helper/services/httpService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import {
    RiTimeLine,
    RiHeartLine,
    RiHeartFill,
} from "react-icons/ri";
import { CustomButton, CustomImage } from "@/components/custom";
import { dateFormatDashboad } from "@/helper/utils/dateFormat";
import { formatNumber } from "@/helper/utils/numberFormat";

const DEFAULT_BANNER = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&auto=format&fit=crop&q=80";

export default function EndedPage() {
    const params = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const id = params?.id as string;

    const [userState] = useAtom(userAtom);
    const currentUser = userState?.data;

    const [activeTab, setActiveTab] = useState<"winners" | "about">("winners");
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

    // Fetch challenge details from GET /challenge/single/{id}
    const { data: challenge, isLoading: loadingChallenge } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${id}`,
        name: "challengedetails",
        params: {
            userId: currentUser?._id,
        },
    });

    // Fetch leaderboard winners
    const { data: winners = [], isLoading: loadingWinners } = useFetchData<ILeadboard[]>({
        endpoint: (challenge?._id || id)
            ? "/leaderboard/getSystemWideStats"
            : currentUser?.userType === "organization"
                ? "/leaderboard/getSystemWideStats"
                : `/leaderboard/getSystemWideStats`,
        name: "leaderboard" + (currentUser?._id || ""),
        params: (challenge?._id || id)
            ? {
                challengeID: challenge?._id || id,
            }
            : currentUser?.userType === "organization"
                ? {
                    creator: currentUser?._id,
                }
                : {},
    });

    useEffect(() => {
        if (challenge) {
            setIsBookmarked(!!challenge.bookmarked);
        }
    }, [challenge?.bookmarked]);

    // Bookmark challenge mutation
    const bookmarkMutation = useMutation({
        mutationFn: (targetId: string) => httpService.post(`/challenge/bookmark/${targetId}`),
        onSuccess: (res) => {
            setIsBookmarked((prev) => !prev);
            addToast({
                title: "Success",
                description: res?.data?.message || (isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"),
                color: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["challenge"] });
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] });
        },
    });

    const handleBookmarkToggle = () => {
        if (!id) return;
        bookmarkMutation.mutate(id);
    };

    // Calculate dates & duration text
    const durationText = challenge?.startDate && challenge?.endDate
        ? `${moment(challenge.startDate).format("DD MMM")} - ${moment(challenge.endDate).format("DD MMM YYYY")}`
        : challenge?.duration?.startToEnd?.totalDays
            ? `${Math.ceil(challenge.duration.startToEnd.totalDays / 7)} Weeks`
            : "2-3 Weeks";

    const hostName =
        challenge?.organization?.name ||
        (challenge?.creator?.firstName
            ? `${challenge.creator.firstName} ${challenge.creator.lastName || ""}`.trim()
            : "Prepfora");

    const hostLogo = challenge?.organization?.profilePicture || challenge?.creator?.profilePicture;

    return (
        <LoadingLayout loading={loadingChallenge}>
            <div className="w-full min-h-screen pb-16 flex flex-col items-center">
                <div className="max-w-5xl w-full flex flex-col gap-5 px-3 sm:px-6 py-3 sm:py-6">
                    <div className=" lg:hidden ml-auto flex flex-col items-end justify-end  gap-3 ">
                        <div className=" sm:inline-flex px-3 w-fit py-1.5 rounded-full border-[#ECEBF0] border text-[#161972] text-xs font-semibold shadow-sm">
                            Challenge Ended
                        </div>
                        <CustomButton
                            onClick={() => router.replace(`/dashboard/challenges/${id}/details`)}
                        >
                            Visit Challenge Room
                        </CustomButton>
                    </div>

                    {/* Main Content Container Card */}
                    <div className="w-full bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
                        {/* Hero Image Banner */}
                        <div className="w-full h-[220px] sm:h-[300px] md:h-[380px] rounded-2xl md:rounded-3xl relative overflow-hidden bg-gray-900 shadow-inner group">
                            {challenge?.url?.includes("http") && (
                                <CustomImage
                                    src={challenge?.url}
                                    alt={challenge?.title || "Challenge Banner"}
                                    fillContainer
                                    style={{ borderRadius: "8px" }}
                                />
                            )}

                            {/* Floating Heart / Bookmark Button (Top Left on Mobile & Desktop) */}
                            <button
                                type="button"
                                onClick={handleBookmarkToggle}
                                className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-sm"
                                aria-label="Bookmark challenge"
                            >
                                {isBookmarked ? (
                                    <RiHeartFill size={18} className="text-red-500" />
                                ) : (
                                    <RiHeartLine size={18} />
                                )}
                            </button>

                            {/* Floating Duration Badge */}
                            <div className="absolute top-4 right-4 z-10 sm:left-6 sm:right-auto px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 border border-white/10 shadow-sm">
                                <RiTimeLine size={14} className="text-white/80" />
                                <span>{durationText}</span>
                            </div>
                        </div>

                        {/* Tags Row */}
                        <div className="w-full flex justify-between gap-3 flex-wrap">
                            <div className="flex flex-wrap gap-3">
                                {challenge?.industry?.name && (
                                    <div className="w-fit px-2 text-sm font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100">
                                        {challenge?.industry?.name}
                                    </div>
                                )}
                                {challenge?.level?.name && (
                                    <div className="w-fit px-2 text-sm font-medium text-neonblue-900 rounded-3xl flex justify-center items-center h-[22px] bg-neonblue-100">
                                        {challenge?.level?.name}
                                    </div>
                                )}
                                {challenge?.tracks?.[0]?.name && (
                                    <div className="w-fit px-2 text-sm font-medium text-pear-900 rounded-3xl flex justify-center items-center h-[22px] bg-pear-100">
                                        {challenge?.tracks?.[0]?.name}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Title & Host */}
                        <div className="w-full flex flex-col gap-2">
                            <div className="w-full flex justify-between items-center">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                                    {challenge?.title || "Challenge"}
                                </h1>

                                {/* Desktop Challenge Ended Badge */}
                                <div className="hidden lg:flex flex-col items-end justify-end gap-3">
                                    <div className="hidden sm:inline-flex px-3 w-fit py-1.5 rounded-full border-[#ECEBF0] border text-[#161972] text-xs font-semibold shadow-sm">
                                        Challenge Ended
                                    </div>
                                    <CustomButton
                                        onClick={() => router.replace(`/dashboard/challenges/${id}/details`)}
                                        fullWidth
                                    >
                                        Visit Challenge Room
                                    </CustomButton>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>Hosted by</span>
                                <div className="flex items-center gap-1.5">
                                    {hostLogo ? (
                                        <Avatar
                                            src={hostLogo}
                                            name={hostName}
                                            size="sm"
                                            className="w-6 h-6"
                                        />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                                            {hostName?.charAt(0)?.toUpperCase() || "P"}
                                        </div>
                                    )}
                                    <span className="font-bold text-gray-900 text-sm sm:text-base">
                                        {hostName}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Row: Winning Prize Banner + 3 Metric Columns */}
                        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8 pt-1 pb-2">
                            {/* Winning Prize Card */}
                            <div
                                style={{ background: "linear-gradient(135deg, #4E5EE4 0%, #3B4AB7 100%)" }}
                                className="relative overflow-hidden rounded-2xl p-4 sm:p-5 text-white w-full sm:w-[260px] md:w-[290px] flex flex-col justify-center shadow-sm"
                            >
                                <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none">
                                    <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </div>
                                <div className="absolute right-12 top-2 opacity-20 pointer-events-none">
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </div>

                                <p className="text-xs text-white/80 font-medium z-10">Winning Prize</p>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight z-10 mt-1">
                                    {formatNumber(Number(challenge?.winnerPrice))}
                                </h3>
                            </div>

                            {/* 3 Metric Columns */}
                            <div className="w-full flex items-center justify-between sm:justify-start sm:gap-10 px-2 sm:px-0 flex-1">
                                <div className="flex flex-col w-full gap-1">
                                    <span className="text-xs text-gray-500 font-medium">Participants</span>
                                    <span className="text-base sm:text-lg font-bold text-neonblue-600">
                                        {challenge?.totalParticipants || challenge?.participants?.length || 0}
                                    </span>
                                </div>

                                <div className="flex flex-col w-full gap-1">
                                    <span className="text-xs text-gray-500 font-medium">Winners</span>
                                    <span className="text-base sm:text-lg font-bold text-neonblue-600">
                                        {challenge?.numberOfWinners || 0}
                                    </span>
                                </div>

                                <div className="flex flex-col w-full gap-1">
                                    <span className="text-xs text-gray-500 font-medium">Ended</span>
                                    <span className="text-base sm:text-lg font-bold text-neonblue-600">
                                        {challenge?.endDate ? dateFormatDashboad(challenge.endDate) : "Ended"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                        {/* Navigation Tabs */}
                        <div className="flex items-center gap-8 bg-white border-b border-gray-200 w-full pt-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab("winners")}
                                className={`pb-3 text-sm px-3 font-semibold transition-all relative ${activeTab === "winners"
                                    ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4E5EE4]"
                                    : "text-gray-400 hover:text-gray-700"
                                    }`}
                            >
                                Winners
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("about")}
                                className={`pb-3 text-sm font-semibold transition-all relative ${activeTab === "about"
                                    ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4E5EE4]"
                                    : "text-gray-400 hover:text-gray-700"
                                    }`}
                            >
                                About Challenge
                            </button>
                        </div>

                        {/* Tab Content 1: Winners */}
                        {activeTab === "winners" && (
                            <div className="w-full flex flex-col gap-4 pt-1">
                                <LoadingLayout loading={loadingWinners} lenght={winners?.length} text="No winners recorded yet for this challenge.">
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {winners?.map((winner, index) => {
                                            const winnerName =
                                                winner?.fullName ||
                                                winner?.userFullname ||
                                                (winner?.firstName && winner?.lastName
                                                    ? `${winner.firstName} ${winner.lastName}`
                                                    : winner?.firstName || "Winner");

                                            const winnerRole =
                                                (winner as any)?.track ||
                                                (winner as any)?.role ||
                                                challenge?.tracks?.[0]?.name ||
                                                "Product Designer";

                                            const winnerAvatar = winner?.profilePicture;

                                            return (
                                                <div
                                                    key={winner?._id || winner?.userID || index}
                                                    onClick={() => router.push(`/dashboard/profile/${winner?.userID || winner?._id}`)}
                                                    className="w-full flex flex-col gap-3 group cursor-pointer"
                                                >
                                                    {/* Card Image */}
                                                    <div className="w-full aspect-[4/3] rounded-[22px] overflow-hidden bg-gray-100 relative shadow-sm border border-gray-100/80">
                                                        <img
                                                            src={winnerAvatar}
                                                            alt={winnerName}
                                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    </div>

                                                    {/* User Avatar + Info */}
                                                    <div className="w-full flex items-center gap-3 px-0.5">
                                                        <div className="flex flex-col min-w-0">
                                                            <h4 className="text-base font-bold text-gray-900 truncate leading-tight">
                                                                {winnerName}
                                                            </h4>
                                                            <p className="text-sm text-gray-400 truncate leading-tight mt-1">
                                                                {winnerRole}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </LoadingLayout>
                            </div>
                        )}

                        {/* Tab Content 2: About Challenge */}
                        {activeTab === "about" && (
                            <div className="w-full bg-white p-3 rounded-2xl flex flex-col">
                                <div className="w-full flex flex-col gap-3 p-4">
                                    <h2 className="text-xl font-semibold">About this Challenge</h2>
                                    <div>
                                        <p className="text-gray-700 leading-relaxed">{challenge?.description}</p>
                                    </div>
                                </div>
                                {challenge?.overview && <OverviewTab item={challenge as IChallenge} />}
                            </div>
                        )}
                    </div>
                </div>

                {/* Report Challenge Modal */}
                <ReportChallengeModal
                    isOpen={isReportOpen}
                    onClose={() => setIsReportOpen(false)}
                />
            </div>
        </LoadingLayout>
    );
}