"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useFetchData } from "@/hook/useFetchData";
import { IChallenge } from "@/helper/model/challenge";
import { ISubmissionPreview } from "@/helper/model/application";
import { LoadingLayout, ModalLayout, ShareBtn } from "@/components/shared";
import { OverviewTab, PreviewWork } from "@/components/challenges";
import { ReportChallengeModal } from "@/components/challenges/modals";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { addToast } from "@heroui/toast";
import httpService from "@/helper/services/httpService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import {
    RiArrowLeftLine,
    RiTimeLine,
    RiHeartLine,
    RiHeartFill,
    RiBookmarkLine,
    RiBookmarkFill,
    RiMore2Fill,
    RiFlagLine,
    RiFileCopyLine,
    RiExternalLinkLine,
} from "react-icons/ri";
import { CustomButton, CustomImage } from "@/components/custom";
import { dateFormat, dateFormatDashboad } from "@/helper/utils/dateFormat";

const DEFAULT_BANNER = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&auto=format&fit=crop&q=80";

const FALLBACK_WINNERS: ISubmissionPreview[] = [
    {
        _id: "w1",
        title: "Mobile Banking App UI Concept",
        description: "A clean, modern mobile banking application interface focusing on user experience, effortless transactions, and seamless financial tracking.",
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80",
        file: "",
        tools: "Figma, Framer, Principle",
        link: "https://figma.com",
        link2: "",
        status: "Graded",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: {
            _id: "u1",
            firstName: "Ngozi",
            lastName: "Oladipo",
            profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
            track: "Product Designer",
            userType: "user",
            email: "ngozi@example.com",
            phone: "",
            address: "",
            country: "Nigeria",
            state: "Lagos",
            city: "Lagos",
            bio: "Product Designer passionate about fintech UX.",
            createdAt: "",
            updatedAt: "",
            __v: 0,
            isEmailVerified: true,
            isPhoneVerified: true,
            skills: ["UI/UX", "Figma", "Fintech"],
        } as any,
        taskID: {} as any,
        challengeID: {} as any,
    },
    {
        _id: "w2",
        title: "Digital Banking Flow & Design System",
        description: "End-to-end banking dashboard and mobile app with comprehensive components and interactive prototypes.",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
        file: "",
        tools: "Figma, Adobe XD",
        link: "https://figma.com",
        link2: "",
        status: "Graded",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: {
            _id: "u2",
            firstName: "Ngozi",
            lastName: "Oladipo",
            profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
            track: "Product Designer",
            userType: "user",
            email: "ngozi2@example.com",
            phone: "",
            address: "",
            country: "Nigeria",
            state: "Lagos",
            city: "Lagos",
            bio: "Product Designer passionate about fintech UX.",
            createdAt: "",
            updatedAt: "",
            __v: 0,
            isEmailVerified: true,
            isPhoneVerified: true,
            skills: ["UI/UX", "Figma", "Design Systems"],
        } as any,
        taskID: {} as any,
        challengeID: {} as any,
    },
    {
        _id: "w3",
        title: "Next-Gen Fintech App UI",
        description: "Personalized finance dashboard with intelligent budget analytics, crypto wallet integration, and card management.",
        url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
        file: "",
        tools: "Figma, Framer",
        link: "https://figma.com",
        link2: "",
        status: "Graded",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: {
            _id: "u3",
            firstName: "Ngozi",
            lastName: "Oladipo",
            profilePicture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
            track: "Product Designer",
            userType: "user",
            email: "ngozi3@example.com",
            phone: "",
            address: "",
            country: "Nigeria",
            state: "Lagos",
            city: "Lagos",
            bio: "Product Designer passionate about fintech UX.",
            createdAt: "",
            updatedAt: "",
            __v: 0,
            isEmailVerified: true,
            isPhoneVerified: true,
            skills: ["UI/UX", "Framer", "Fintech"],
        } as any,
        taskID: {} as any,
        challengeID: {} as any,
    },
    {
        _id: "w4",
        title: "NeoBank Mobile Wallet Experience",
        description: "Sleek dark-mode banking application with biometric authorization and seamless payments.",
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
        file: "",
        tools: "Figma, After Effects",
        link: "https://figma.com",
        link2: "",
        status: "Graded",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: {
            _id: "u4",
            firstName: "Ngozi",
            lastName: "Oladipo",
            profilePicture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
            track: "Product Designer",
            userType: "user",
            email: "ngozi4@example.com",
            phone: "",
            address: "",
            country: "Nigeria",
            state: "Lagos",
            city: "Lagos",
            bio: "Product Designer passionate about fintech UX.",
            createdAt: "",
            updatedAt: "",
            __v: 0,
            isEmailVerified: true,
            isPhoneVerified: true,
            skills: ["UI/UX", "Fintech"],
        } as any,
        taskID: {} as any,
        challengeID: {} as any,
    },
];

export default function EndedPage() {
    const params = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const id = params?.id as string;

    const [userState] = useAtom(userAtom);
    const currentUser = userState?.data;

    const [activeTab, setActiveTab] = useState<"winners" | "about">("winners");
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [bookmarkedWinners, setBookmarkedWinners] = useState<Record<string, boolean>>({});
    const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
    const [selectedSubmission, setSelectedSubmission] = useState<ISubmissionPreview | null>(null);

    // Fetch challenge details from GET /challenge/single/{id}
    const { data: challenge, isLoading: loadingChallenge } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${id}`,
        name: "challengedetails",
        params: {
            userId: currentUser?._id,
        },
    });

    // Fetch submissions for this challenge
    const { data: rawSubmissions = [] } = useFetchData<ISubmissionPreview[]>({
        endpoint: `/submission`,
        name: "challengeSubmissions" + id,
        params: {
            challengeID: id,
        },
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

    const toggleWinnerBookmark = (winnerId: string) => {
        setBookmarkedWinners((prev) => ({
            ...prev,
            [winnerId]: !prev[winnerId],
        }));
        addToast({
            title: "Success",
            description: bookmarkedWinners[winnerId] ? "Removed submission from bookmarks" : "Submission bookmarked",
            color: "success",
        });
    };

    const copyShareLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            addToast({
                title: "Link copied",
                description: "Challenge link copied to clipboard",
                color: "primary",
            });
        }
    };

    // Calculate dates & duration text
    const durationText = challenge?.startDate && challenge?.endDate
        ? `${moment(challenge.startDate).format("DD MMM")} - ${moment(challenge.endDate).format("DD MMM YYYY")}`
        : challenge?.duration?.startToEnd?.totalDays
            ? `${Math.ceil(challenge.duration.startToEnd.totalDays / 7)} Weeks`
            : "2-3 Weeks";

    const endedDateText = challenge?.endDate
        ? moment(challenge.endDate).format("MMM. DD YYYY")
        : "Sep. 10 2026";

    const hostName =
        challenge?.organization?.name ||
        (challenge?.creator?.firstName
            ? `${challenge.creator.firstName} ${challenge.creator.lastName || ""}`.trim()
            : "Prepfora");

    const hostLogo = challenge?.organization?.profilePicture || challenge?.creator?.profilePicture;

    // Tags list
    const tags = challenge?.tags && challenge.tags.length > 0
        ? challenge.tags
        : ["Figma", "Framer", "UI/UX"];

    // Use live submissions or fallback winners
    const winnersList = rawSubmissions && rawSubmissions.length > 0 ? rawSubmissions : FALLBACK_WINNERS;

    return (
        <LoadingLayout loading={loadingChallenge}>
            <div className="w-full min-h-screen pb-16 flex flex-col items-center">
                <div className="max-w-5xl w-full flex flex-col gap-5 px-3 sm:px-6 py-3 sm:py-6">
                    {/* Top Navigation Bar */}
                    {/* <div className="w-full flex items-center justify-between"> 
                        <div className="sm:hidden px-4 py-1.5 rounded-full bg-[#4E5EE4] text-white text-xs font-semibold shadow-sm">
                            Challenge Ended
                        </div>
                    </div> */}
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

                            {/* Floating Duration Badge (Top Right on Mobile, Top Left/Center on Desktop) */}
                            <div className="absolute top-4 right-4 z-10 sm:left-6 sm:right-auto px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 border border-white/10 shadow-sm">
                                <RiTimeLine size={14} className="text-white/80" />
                                <span>{durationText}</span>
                            </div>
                        </div>

                        {/* Tags Row & Desktop 'Challenge Ended' Badge */}
                        <div className="w-full flex  justify-between gap-3 flex-wrap">
                            {/* <div className="flex items-center gap-2 flex-wrap">
                                {tags.map((tag, idx) => {
                                    const styles = [
                                        "bg-[#FDECE7] text-[#E05338]",
                                        "bg-[#EAEBFE] text-[#4F5AE6]",
                                        "bg-[#EAF8EE] text-[#16A34A]",
                                        "bg-[#F3E8FF] text-[#9333EA]",
                                    ];
                                    const style = styles[idx % styles.length];
                                    return (
                                        <span
                                            key={idx}
                                            className={`text-xs font-semibold px-3 py-1 rounded-full ${style}`}
                                        >
                                            {tag}
                                        </span>
                                    );
                                })}
                            </div> */}
                            <div className="  flex flex-wrap gap-3 ">
                                <div className=" w-fit px-2 text-sm font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100 ">
                                    {challenge?.industry?.name}
                                </div>
                                <div className=" w-fit px-2 text-sm font-medium text-neonblue-900 rounded-3xl flex justify-center items-center h-[22px] bg-neonblue-100 ">
                                    {challenge?.level?.name}
                                </div>
                                <div className=" w-fit px-2 text-sm font-medium text-pear-900 rounded-3xl flex justify-center items-center h-[22px] bg-pear-100 ">
                                    {challenge?.tracks?.[0]?.name}
                                </div>
                            </div>
                        </div>

                        {/* Title & Host */}
                        <div className="w-full flex flex-col gap-2">
                            <div className=" w-full flex justify-between items-center " >
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                                    {challenge?.title || "Mobile Banking App UI"}
                                </h1>

                                {/* Desktop Challenge Ended Badge */}
                                <div className=" hidden lg:flex flex-col items-end justify-end  gap-3 ">
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
                                {/* Decorative star shapes matching design */}
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
                                    ${Number(challenge?.winnerPrice || 200).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </h3>
                            </div>

                            {/* 3 Metric Columns */}
                            <div className=" w-full flex items-center justify-between sm:justify-start sm:gap-10 px-2 sm:px-0 flex-1">
                                <div className="flex flex-col w-full gap-1">
                                    <span className="text-xs text-gray-500 font-medium">Participants</span>
                                    <span className="text-base sm:text-lg font-bold text-neonblue-600">
                                        {challenge?.totalParticipants || challenge?.participants?.length || 200}
                                    </span>
                                </div>

                                <div className="flex flex-col w-full gap-1">
                                    <span className="text-xs text-gray-500 font-medium">Winners</span>
                                    <span className="text-base sm:text-lg font-bold text-neonblue-600">
                                        {challenge?.numberOfWinners || 5}
                                    </span>
                                </div>

                                <div className="flex flex-col w-full gap-1">
                                    <span className="text-xs text-gray-500 font-medium">Ended</span>
                                    <span className="text-base sm:text-lg font-bold text-neonblue-600">
                                        {dateFormatDashboad(challenge?.endDate ?? "")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4  ">
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
                                <h2 className="text-xl font-bold text-gray-900">
                                    Challenge Winners
                                </h2>

                                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    {winnersList.map((winner, index) => {
                                        const winnerName =
                                            winner?.userId?.firstName && winner?.userId?.lastName
                                                ? `${winner.userId.firstName} ${winner.userId.lastName}`
                                                : winner?.userId?.firstName || "Ngozi Oladipo";

                                        const winnerRole =
                                            winner?.userId?.track || (winner?.userId as any)?.role || "Product Designer";

                                        const winnerAvatar = winner?.userId?.profilePicture;
                                        const submissionImage = winner?.url || DEFAULT_BANNER;
                                        const isSaved = !!bookmarkedWinners[winner._id];

                                        return (
                                            <div
                                                key={winner._id || index}
                                                className="w-full flex flex-col gap-3 group"
                                            >
                                                {/* Submission Thumbnail */}
                                                <div
                                                    onClick={() => setSelectedSubmission(winner)}
                                                    className="w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-gray-100 relative cursor-pointer border border-gray-100 shadow-sm"
                                                >
                                                    <img
                                                        src={submissionImage}
                                                        alt={winner.title || "Submission preview"}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>

                                                {/* User Info Row */}
                                                <div className="w-full flex items-center justify-between gap-2 px-0.5">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <Avatar
                                                            src={winnerAvatar}
                                                            name={winnerName}
                                                            size="sm"
                                                            className="w-8 h-8 flex-shrink-0"
                                                        />
                                                        <div className="flex flex-col min-w-0">
                                                            <p className="text-sm font-semibold text-gray-900 truncate">
                                                                {winnerName}
                                                            </p>
                                                            <p className="text-xs text-gray-400 truncate">
                                                                {winnerRole}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Bookmark Button */}
                                                    {/* <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleWinnerBookmark(winner._id);
                                                        }}
                                                        className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
                                                        aria-label="Bookmark submission"
                                                    >
                                                        {isSaved ? (
                                                            <RiBookmarkFill size={18} className="text-neonblue-600" />
                                                        ) : (
                                                            <RiBookmarkLine size={18} />
                                                        )}
                                                    </button> */}
                                                </div>

                                                {/* View Submission Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedSubmission(winner)}
                                                    className="w-full py-2.5 px-4 rounded-full border border-neonblue-600 text-neonblue-600 hover:bg-neonblue-50/70 font-semibold text-sm transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer"
                                                >
                                                    <span>View Submission</span>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Tab Content 2: About Challenge */}
                        {activeTab === "about" && (
                            <div className="w-full bg-white p-3 rounded-2xl flex flex-col">
                                <div className="w-full flex flex-col gap-3 p-4">
                                    <h2 className="text-xl font-semibold">About this Challenge</h2>
                                    <div>
                                        <p>{challenge?.description}</p>
                                    </div>
                                </div>
                                {/* <OverviewTab item={challenge as IChallenge} /> */}
                            </div>
                        )}
                    </div>
                </div>

                {/* Report Challenge Modal */}
                <ReportChallengeModal
                    isOpen={isReportOpen}
                    onClose={() => setIsReportOpen(false)}
                />

                {/* View Submission Preview Modal */}
                {selectedSubmission && (
                    <ModalLayout
                        isOpen={!!selectedSubmission}
                        onClose={() => setSelectedSubmission(null)}
                        size="2xl"
                    >
                        <PreviewWork item={selectedSubmission} />
                    </ModalLayout>
                )}
            </div>
        </LoadingLayout>
    );
}