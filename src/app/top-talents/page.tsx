"use client";

import { useState, useEffect, useMemo } from "react";
import { Avatar, Spinner, Button, Input } from "@heroui/react";
import { RiVipDiamondLine } from "react-icons/ri";
import { formatNumberWithK } from "@/helper/utils/formatNumberWithK";
import { useFetchData } from "@/hook/useFetchData";
import Link from "next/link";
import { UnauthorisedLayout } from "@/components/shared";
import { FaSearch } from "react-icons/fa";

interface LeaderboardEntry {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    ryzlyPoints: number;
    isCoach?: boolean;
    username?: string;
}

const PAGE_SIZE = 20; // large enough to show all on first load

export default function GlobalLeaderboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { data = [], isLoading: isInitialLoading } = useFetchData<LeaderboardEntry[]>({
        endpoint: "/leaderboard/getGlobalPoints",
        name: "globalLeaderboard",
    });

    const filteredEntries = useMemo(() => {
        let filtered = data.filter(entry => {
            const fullName = `${entry.firstName} ${entry.lastName}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        });
        return filtered.sort((a, b) => b.ryzlyPoints - a.ryzlyPoints);
    }, [data, searchTerm]);

    // Desktop: top3 + rest (from index 3)
    const desktopTop3 = filteredEntries.slice(0, 3);
    const desktopRest = filteredEntries.slice(3);

    // Mobile: top1 + rest (from index 1)
    const mobileTop1 = filteredEntries.slice(0, 1);
    const mobileRest = filteredEntries.slice(1);

    const displayedRestDesktop = desktopRest.slice(0, visibleCount);
    const displayedRestMobile = mobileRest.slice(0, visibleCount);
    const hasMoreDesktop = visibleCount < desktopRest.length;
    const hasMoreMobile = visibleCount < mobileRest.length;

    // Reset visible count when search changes
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [searchTerm]);

    const loadMore = () => {
        if (isLoadingMore) return;
        setIsLoadingMore(true);
        setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + PAGE_SIZE, desktopRest.length));
            setIsLoadingMore(false);
        }, 300);
    };

    if (isInitialLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    // ──────────────────────────────────────────────────────────
    // Desktop podium (3 places)
    // ──────────────────────────────────────────────────────────
    const DesktopPodium = () => (
        <div className="relative flex flex-row justify-center items-end gap-0 bg-[#F5F3FF] rounded-2xl p-6 mb-8">
            {desktopTop3[1] && (
                <div className="w-1/3 flex flex-col items-center order-1">
                    <Link href={`/dashboard/profile/${desktopTop3[1]._id}`}>
                        <div className="relative cursor-pointer w-[75px] h-[67px] mt-auto">
                            <Avatar
                                src={desktopTop3[1].profilePicture}
                                name={`${desktopTop3[1].firstName} ${desktopTop3[1].lastName}`}
                                className="w-full h-full object-cover"
                                classNames={{ base: "mask-hexagon overflow-hidden", img: "object-cover" }}
                            />
                        </div>
                    </Link>
                    <div className="flex flex-col items-center -mt-3 z-10">
                        <div className="w-6 h-6 rounded-full border border-white bg-[#1D1348] text-white text-xs flex items-center justify-center">2</div>
                        <p className="text-xs text-center font-medium mt-1">{desktopTop3[1].firstName} {desktopTop3[1].lastName}</p>
                        <div className="flex flex-col items-center mt-1">
                            <RiVipDiamondLine size={12} />
                            <p className="text-xs text-violet-500 font-medium">{formatNumberWithK(desktopTop3[1].ryzlyPoints)} pts</p>
                        </div>
                    </div>
                </div>
            )}
            {desktopTop3[0] && (
                <div className="w-1/3 flex flex-col items-center order-2">
                    <Link href={`/dashboard/profile/${desktopTop3[0]._id}`}>
                        <div className="relative cursor-pointer w-[166px] h-[130px]">
                            <Avatar
                                src={desktopTop3[0].profilePicture}
                                name={`${desktopTop3[0].firstName} ${desktopTop3[0].lastName}`}
                                className="w-full h-full object-cover"
                                classNames={{ base: "mask-hexagon overflow-hidden", img: "object-cover" }}
                            />
                        </div>
                    </Link>
                    <div className="flex flex-col items-center -mt-7 z-10">
                        <div className="w-10 h-10 rounded-full border border-white bg-[#5160E7] text-white font-bold flex items-center justify-center">1</div>
                        <p className="text-sm font-semibold text-center mt-1">{desktopTop3[0].firstName} {desktopTop3[0].lastName}</p>
                        <div className="flex flex-col items-center mt-1">
                            <RiVipDiamondLine size={12} />
                            <p className="text-xs text-violet-500 font-medium">{formatNumberWithK(desktopTop3[0].ryzlyPoints)} pts</p>
                        </div>
                    </div>
                </div>
            )}
            {desktopTop3[2] && (
                <div className="w-1/3 flex flex-col items-center order-3">
                    <Link href={`/dashboard/profile/${desktopTop3[2]._id}`}>
                        <div className="relative cursor-pointer w-[75px] h-[67px] mt-auto">
                            <Avatar
                                src={desktopTop3[2].profilePicture}
                                name={`${desktopTop3[2].firstName} ${desktopTop3[2].lastName}`}
                                className="w-full h-full object-cover"
                                classNames={{ base: "mask-hexagon overflow-hidden", img: "object-cover" }}
                            />
                        </div>
                    </Link>
                    <div className="flex flex-col items-center -mt-3 z-10">
                        <div className="w-6 h-6 rounded-full border border-white bg-[#E56C4C] text-white text-xs flex items-center justify-center">3</div>
                        <p className="text-xs text-center font-medium mt-1">{desktopTop3[2].firstName} {desktopTop3[2].lastName}</p>
                        <div className="flex flex-col items-center mt-1">
                            <RiVipDiamondLine size={12} />
                            <p className="text-xs text-violet-500 font-medium">{formatNumberWithK(desktopTop3[2].ryzlyPoints)} pts</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    // ──────────────────────────────────────────────────────────
    // Mobile podium (only 1st place)
    // ──────────────────────────────────────────────────────────
    const MobilePodium = () => (
        <div className="flex justify-center items-center bg-[#F5F3FF] rounded-2xl p-6 mb-8">
            {mobileTop1[0] && (
                <div className="flex flex-col items-center">
                    <Link href={`/dashboard/profile/${mobileTop1[0]._id}`}>
                        <div className="relative cursor-pointer w-[166px] h-[130px]">
                            <Avatar
                                src={mobileTop1[0].profilePicture}
                                name={`${mobileTop1[0].firstName} ${mobileTop1[0].lastName}`}
                                className="w-full h-full object-cover"
                                classNames={{ base: "mask-hexagon overflow-hidden", img: "object-cover" }}
                            />
                        </div>
                    </Link>
                    <div className="flex flex-col items-center -mt-7 z-10">
                        <div className="w-10 h-10 rounded-full border border-white bg-[#5160E7] text-white font-bold flex items-center justify-center">1</div>
                        <p className="text-sm font-semibold text-center mt-1">{mobileTop1[0].firstName} {mobileTop1[0].lastName}</p>
                        <div className="flex flex-col items-center mt-1">
                            <RiVipDiamondLine size={12} />
                            <p className="text-xs text-violet-500 font-medium">{formatNumberWithK(mobileTop1[0].ryzlyPoints)} pts</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    // ──────────────────────────────────────────────────────────
    // Ranked list component (accepts entries and startRank)
    // ──────────────────────────────────────────────────────────

    const RankedList = ({ entries, startRank, hasMore }: {
        entries: LeaderboardEntry[];
        startRank: number;
        hasMore: boolean;
    }) => (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100">
                {entries.map((entry, idx) => (
                    <Link key={entry._id} href={`/dashboard/profile/${entry._id}`}>
                        <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                                <span className="text-violet-400 font-medium w-6">{startRank + idx}</span>
                                <Avatar
                                    src={entry.profilePicture}
                                    name={`${entry.firstName} ${entry.lastName}`}
                                    className="w-9 h-9"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-black">{entry.firstName} {entry.lastName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-violet-500">
                                <RiVipDiamondLine size={14} />
                                <span className="text-sm font-medium">{formatNumberWithK(entry.ryzlyPoints)} pts</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {hasMore && (
                <div className="flex justify-center py-4">
                    <Button
                        onPress={loadMore}
                        isLoading={isLoadingMore}
                        className="bg-[#5160E7] text-white px-6 rounded-full"
                    >
                        Load more
                    </Button>
                </div>
            )}
        </div>
    );


    return (
        <UnauthorisedLayout footer>
            <div className="w-[90%] mx-auto lg:px-4 py-6">
                {/* Header + Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-black">All Talents</h1>
                    </div>
                    <Input
                        placeholder="Search by name..."
                        startContent={<FaSearch className="text-gray-400" />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        classNames={{ inputWrapper: "bg-white border border-gray-200 rounded-xl" }}
                        className="w-full md:w-72"
                    />
                </div>

                {/* Desktop view */}
                <div className="hidden lg:block">
                    <DesktopPodium />
                    <RankedList entries={displayedRestDesktop} startRank={4} hasMore={hasMoreDesktop} />
                </div>

                {/* Mobile view */}
                <div className="block lg:hidden">
                    <MobilePodium />
                    <RankedList entries={displayedRestMobile} startRank={2} hasMore={hasMoreMobile} />
                </div>

                {filteredEntries.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        No talents match your search.
                    </div>
                )}
            </div>
        </UnauthorisedLayout>
    );
}