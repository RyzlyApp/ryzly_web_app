"use client";
import {
    AddTasks,
    ChallengeInfo,
    ChatLayout,
    PrizeAndProgress,
} from "@/components/challenges";
import ChallengeInfoNew from "@/components/challenges/challengejoin/ChallengeInfo";
import { Loader } from "@/components/shared";
import { WinnerCardModal } from "@/components/challenges/modals";
import { coachAtom } from "@/helper/atom/coach";
import {
    challengeData,
    loadingChallenge,
} from "@/helper/atom/loadingChallenge";
import { userAtom } from "@/helper/atom/user";
import { IChallenge, ILeadboard } from "@/helper/model/challenge";
import { isDateExpired } from "@/helper/utils/isDateExpired";
import { useFetchData } from "@/hook/useFetchData";
import { Tabs, Tab } from "@heroui/react";
import { useAtom } from "jotai";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, lazy, Suspense, ReactNode } from "react";

// Lazy load tab components
const OverviewTab = lazy(() =>
    import("@/components/challenges").then((module) => ({
        default: module.OverviewTab,
    })),
);
const ReviewTab = lazy(() =>
    import("@/components/challenges").then((module) => ({
        default: module.ReviewTab,
    })),
);
const TaskTab = lazy(() =>
    import("@/components/challenges").then((module) => ({
        default: module.TaskTab,
    })),
);
const ResourceTab = lazy(() =>
    import("@/components/challenges").then((module) => ({
        default: module.ResourceTab,
    })),
);
const LeaderboardTab = lazy(() =>
    import("@/components/challenges").then((module) => ({
        default: module.LeaderboardTab,
    })),
);
const ParticipantTab = lazy(() =>
    import("@/components/challenges").then((module) => ({
        default: module.ParticipantTab,
    })),
);
const CoachTab = lazy(() =>
    import("@/components/challenges").then((module) => ({
        default: module.CoachTab,
    })),
);
const SalesTab = lazy(() =>
    import("@/components/challenges").then((module) => ({
        default: module.SalesTab,
    })),
);
const CouponTab = lazy(() =>
    import("@/components/challenges").then((module) => ({
        default: module.CouponTab,
    })),
);

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: DashboardLayoutProps) {
    const param = useParams();
    const id = param.id;

    const [userState] = useAtom(userAtom);
    const pathname = usePathname();

    const router = useRouter();
    const { data: user } = userState;

    const { data, isLoading, isRefetching } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${id}`,
        name: "challengedetails",
        params: {
            userId: user?._id,
        },
    });


    const tablink = [
        {
            label: "Overview",
            key: "overview",
        },
        {
            label: "Task",
            key: "task",
        },
        {
            label: "Resources",
            key: "resources",
        },
        {
            label: "Reviews",
            key: "reviews",
        },
        {
            label: "Leaderboard",
            key: "leaderboard",
        },
        {
            label: "Participants",
            key: "participants",
        },
        {
            label: data?.creator?.userType === "organization" ? "Host" : "Coaches",
            key: "coaches",
        },
        {
            label: "Sales",
            key: "sales",
        },
        {
            label: "Coupon",
            key: "coupon"
        },
    ];

    const [isCoach, setIsCoach] = useAtom(coachAtom);

    const [loading, setLoading] = useAtom(loadingChallenge);
    const [_, setChallenge] = useAtom(challengeData);

    const isEnded = Boolean(
        data?.IsEnded ||
        data?.isEnded ||
        (data?.endDate && isDateExpired(data.endDate))
    );

    const { data: winners = [] } = useFetchData<ILeadboard[]>({
        endpoint: "/leaderboard/getSystemWideStats",
        name: "leaderboard_winner_" + id,
        params: {
            challengeID: id as string,
        },
        enable: Boolean(id && isEnded),
    });

    const winnerRecord = winners?.find(
        (w) =>
            (user?._id && (w?.userID === user._id || w?._id === user._id)) ||
            (user?.email && (w as any)?.email === user?.email)
    );
    const isCurrentUserWinner = Boolean(winnerRecord);
    const [isWinnerModalOpen, setIsWinnerModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const searchParams = new URLSearchParams(window.location.search);
            if (searchParams.get("shareWin") === "true" || searchParams.get("previewWin") === "true") {
                setIsWinnerModalOpen(true);
                return;
            }
        }
        if (isEnded && isCurrentUserWinner) {
            const hasSeen = sessionStorage.getItem(`winner_card_seen_${id}`);
            if (!hasSeen) {
                setIsWinnerModalOpen(true);
                sessionStorage.setItem(`winner_card_seen_${id}`, "true");
            }
        }
    }, [isEnded, isCurrentUserWinner, id]);

    useEffect(() => {
        setIsCoach(user?._id === data?.creator?._id);
    }, [user?._id, data?.creator?._id, setIsCoach]);

    useEffect(() => {
        setLoading(isLoading);
        setChallenge(data as IChallenge);
    }, [isLoading, data]);

    // useEffect(() => {
    //     if (data && !isLoading) {
    //         const isEnded = data?.IsEnded || data?.isEnded || (data?.endDate && isDateExpired(data.endDate));
    //         if (isEnded) {
    //             router.replace(`/dashboard/challenges/${id}/ended`);
    //         }
    //     }
    // }, [data, isLoading, id, router]);

    const clickHandler = (item: string) => {
        if (!item) {
            router.push(`/dashboard/challenges/${id}/details`);
        } else {
            router.push(`/dashboard/challenges/${id}/details/${item}`);
        }
    };

    return (
        <div className=" w-full lg:h-full flex flex-col lg:overflow-hidden ">
            <Loader loading={isLoading || loading}>
                <div className=" w-full flex lg:flex-row overflow-hidden gap-4 flex-col lg:overflow-y-auto ">
                    <div className=" flex flex-1 lg:h-full flex-col gap-4 overflow-x-hidden  ">
                        {data?.tasks && (
                            <>
                                {data?.tasks?.length === 0 &&
                                    user?._id === data?.creator?._id && (
                                        <AddTasks item={data} />
                                    )}
                            </>
                        )}
                        {/* {(isDateExpired(data?.endDate+"") && data?.joined) && (
                            <CompletedTasks />
                        )} */}
                        {/* Winner Celebration Banner */}
                        {isEnded && isCurrentUserWinner && (
                            <div className="w-full bg-gradient-to-r from-[#4E5EE4] to-[#3B4AB7] rounded-2xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">🏆</span>
                                    <div className="flex flex-col">
                                        <h3 className="font-extrabold text-base sm:text-lg">Congratulations! You won this challenge!</h3>
                                        <p className="text-xs sm:text-sm text-white/80">Share your win card with your network on social media.</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsWinnerModalOpen(true)}
                                    className="px-5 py-2.5 bg-white text-[#4E5EE4] hover:bg-indigo-50 font-bold text-xs sm:text-sm rounded-full shadow-sm transition-all cursor-pointer whitespace-nowrap"
                                >
                                    Share Your Win
                                </button>
                            </div>
                        )}
                        <ChallengeInfoNew
                            refetching={isRefetching}
                            isCoach={data?.creator?._id === user?._id}
                            item={data as IChallenge}
                        />
                        <PrizeAndProgress item={data as IChallenge} />
                        <div className="w-full bg-white rounded-2xl challenge-tabs">
                            {isCoach && (
                                <div className=" w-full flex overflow-x-auto ">
                                    {(data?.joined ||
                                        data?.creator?._id === user?._id) && (
                                            <Tabs
                                                selectedKey={pathname === "/dashboard/challenges/696a314c26bba4871d7d46d7/details" ? "detail" : pathname.replace(`/dashboard/challenges/${id}/details/`, "")}
                                                aria-label="Tabs"
                                                variant={"underlined"}
                                            >
                                                {tablink
                                                    ?.filter(
                                                        (item) =>
                                                            data?.creator?.userType === "organization" ?
                                                                item.key !== "sales" &&
                                                                item?.key !== "coupon" &&
                                                                item?.key !== "coaches" : item.key,
                                                    )?.map((item) => {
                                                        return (
                                                            <Tab
                                                                key={item?.key}
                                                                onClick={() =>
                                                                    clickHandler(
                                                                        item.key,
                                                                    )
                                                                }
                                                                title={item?.label}
                                                            />
                                                        );
                                                    })}
                                            </Tabs>
                                        )}
                                </div>
                            )}
                            {!isCoach && (
                                <div className=" w-full flex overflow-x-auto ">
                                    {(data?.joined ||
                                        data?.creator?._id === user?._id) && (
                                            <Tabs
                                                selectedKey={pathname === "/dashboard/challenges/696a314c26bba4871d7d46d7/details" ? "detail" : pathname.replace(`/dashboard/challenges/${id}/details/`, "")}
                                                aria-label="Tabs"
                                                variant={"underlined"}
                                            >
                                                {tablink
                                                    ?.filter(
                                                        (item) =>
                                                            data?.creator?.userType !== "organization" ?
                                                                item.key !== "sales" &&
                                                                item?.key !== "coupon" :
                                                                item.key !== "sales" &&
                                                                item?.key !== "coupon" &&
                                                                item?.key !== "Coaches",
                                                    )
                                                    ?.map((item) => {
                                                        return (
                                                            <Tab
                                                                key={item?.key}
                                                                onClick={() =>
                                                                    clickHandler(
                                                                        item.key,
                                                                    )
                                                                }
                                                                title={item?.label}
                                                            />
                                                        );
                                                    })}
                                            </Tabs>
                                        )}
                                </div>
                            )}
                            <div className="p-4 ">{children}</div>
                        </div>
                    </div>
                    {(data?.joined || data?.creator?._id === user?._id) && (
                        <div className=" w-full lg:w-[400px] h-fit ">
                            <ChatLayout item={data as IChallenge} />
                        </div>
                    )}
                </div>
            </Loader>

            {data && (
                <WinnerCardModal
                    isOpen={isWinnerModalOpen}
                    onClose={() => setIsWinnerModalOpen(false)}
                    challenge={data as IChallenge}
                    currentUser={user}
                    winnerRecord={winnerRecord}
                />
            )}
        </div>
    );
}
