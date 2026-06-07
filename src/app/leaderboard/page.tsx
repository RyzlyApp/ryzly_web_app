"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Avatar, Input, Spinner } from "@heroui/react";
import { FaSearch } from "react-icons/fa";
import { RiVipDiamondLine } from "react-icons/ri";
import { formatNumberWithK } from "@/helper/utils/formatNumberWithK";
import { useFetchData } from "@/hook/useFetchData";
import Link from "next/link";
import { UnauthorisedLayout } from "@/components/shared";

interface LeaderboardEntry {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    ryzlyPoints: number;
    isCoach?: boolean;
    username?: string;
}

export default function GlobalLeaderboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [displayedCount, setDisplayedCount] = useState(10); // start with 10 extra after top3
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // 1️⃣ Fetch real data
    const { data = [], isLoading: isInitialLoading } = useFetchData<LeaderboardEntry[]>({
        endpoint: "/leaderboard/getGlobalPoints",
        name: "globalLeaderboard",
    });

    // 2️⃣ Filter by search (name)
    const filteredEntries = useMemo(() => {
        let filtered = data.filter(entry => {
            const fullName = `${entry.firstName} ${entry.lastName}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        });
        // Already sorted by points desc from API, but double‑check
        return filtered.sort((a, b) => b.ryzlyPoints - a.ryzlyPoints);
    }, [data, searchTerm]);

    // 3️⃣ Split: top3 + rest
    const top3 = filteredEntries.slice(0, 3);
    const restEntries = filteredEntries.slice(3);
    const displayedRest = restEntries.slice(0, displayedCount);
    const hasMore = displayedRest.length < restEntries.length;

    // 4️⃣ Reset pagination when search changes
    useEffect(() => {
        setDisplayedCount(10);
    }, [searchTerm]);

    // 5️⃣ Infinite scroll observer
    useEffect(() => {
        if (!loaderRef.current || !hasMore || isLoadingMore) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsLoadingMore(true);
                    setTimeout(() => {
                        setDisplayedCount(prev => Math.min(prev + 10, restEntries.length));
                        setIsLoadingMore(false);
                    }, 300);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, restEntries.length]);

    if (isInitialLoading) return <div className="h-screen w-full flex items-center justify-center">
        <Spinner size="lg" color="primary" className="mx-auto my-10" />;
    </div>

    return (
        <UnauthorisedLayout footer>
            <div className="w-full px-4 py-6">
                {/* Header + Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-black">All Talents</h1>
                        {/* <p className="text-sm text-gray-500">{filteredEntries.length} top talents</p> */}
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

                {/* 🥇 Top 3 Podium (exactly as your original component) */}
                <div className="w-full relative flex flex-col lg:flex-row justify-center items-end gap-4 lg:gap-0 bg-[#F5F3FF] rounded-2xl p-6 mb-8">
                    {/* 2nd place */}
                    {top3[1] && (
                        <div className="w-full lg:w-1/3 flex flex-col items-center order-1 lg:order-1">
                            <Link href={`/dashboard/
                            profile/${top3[1]._id}`} key={top3[1]._id}>
                                <div className="relative cursor-pointer w-[75px] h-[67px] mt-auto">
                                    <Avatar
                                        src={top3[1].profilePicture}
                                        name={`${top3[1].firstName} ${top3[1].lastName}`}
                                        className="w-full h-full object-cover"
                                        classNames={{ base: "mask-hexagon overflow-hidden", img: "object-cover" }}
                                    />
                                </div>
                            </Link>
                            <div className="flex flex-col items-center -mt-3 z-10">
                                <div className="w-6 h-6 rounded-full border border-white bg-[#1D1348] text-white text-xs flex items-center justify-center">2</div>
                                <p className="text-xs text-center font-medium mt-1">{top3[1].firstName} {top3[1].lastName}</p>
                                <div className="flex flex-col items-center mt-1">
                                    <RiVipDiamondLine size={12} />
                                    <p className="text-xs text-violet-500 font-medium">{formatNumberWithK(top3[1].ryzlyPoints)} pts</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 1st place */}
                    {top3[0] && (
                        <div className="w-full lg:w-1/3 flex flex-col items-center order-0 lg:order-2">
                            <Link href={`/dashboard/
                            profile/${top3[0]._id}`} key={top3[0]._id}>
                                <div className="relative cursor-pointer w-[166px] h-[130px]">
                                    <Avatar
                                        src={top3[0].profilePicture}
                                        name={`${top3[0].firstName} ${top3[0].lastName}`}
                                        className="w-full h-full object-cover"
                                        classNames={{ base: "mask-hexagon overflow-hidden", img: "object-cover" }}
                                    />
                                </div>
                            </Link>
                            <div className="flex flex-col items-center -mt-7 z-10">
                                <div className="w-10 h-10 rounded-full border border-white bg-[#5160E7] text-white font-bold flex items-center justify-center">1</div>
                                <p className="text-sm font-semibold text-center mt-1">{top3[0].firstName} {top3[0].lastName}</p>
                                <div className="flex flex-col items-center mt-1">
                                    <RiVipDiamondLine size={12} />
                                    <p className="text-xs text-violet-500 font-medium">{formatNumberWithK(top3[0].ryzlyPoints)} pts</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3rd place */}
                    {top3[2] && (
                        <div className="w-full lg:w-1/3 flex flex-col items-center order-2 lg:order-3">
                            <Link href={`/dashboard/
                            profile/${top3[0]._id}`} key={top3[0]._id}>
                                <div className="relative cursor-pointer w-[75px] h-[67px] mt-auto">
                                    <Avatar
                                        src={top3[2].profilePicture}
                                        name={`${top3[2].firstName} ${top3[2].lastName}`}
                                        className="w-full h-full object-cover"
                                        classNames={{ base: "mask-hexagon overflow-hidden", img: "object-cover" }}
                                    />
                                </div>
                            </Link>
                            <div className="flex flex-col items-center -mt-3 z-10">
                                <div className="w-6 h-6 rounded-full border border-white bg-[#E56C4C] text-white text-xs flex items-center justify-center">3</div>
                                <p className="text-xs text-center font-medium mt-1">{top3[2].firstName} {top3[2].lastName}</p>
                                <div className="flex flex-col items-center mt-1">
                                    <RiVipDiamondLine size={12} />
                                    <p className="text-xs text-violet-500 font-medium">{formatNumberWithK(top3[2].ryzlyPoints)} pts</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 🧾 Ranked List (4th → ∞) + Infinite Scroll */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {displayedRest.map((entry, idx) => {
                            const rank = idx + 4; // 4th, 5th, ...
                            return (
                                <Link key={idx} href={`/dashboard/profile/${entry._id}`}>
                                    <div key={entry._id} className="flex items-center justify-between py-3 px-4 hover:bg-gray-50">
                                        <div className="flex items-center gap-4">
                                            <span className="text-violet-400 font-medium w-6">{rank}</span>
                                            <Avatar
                                                src={entry.profilePicture}
                                                name={`${entry.firstName} ${entry.lastName}`}
                                                className="w-9 h-9"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-black">{entry.firstName} {entry.lastName}</p>
                                                {/* {entry.isCoach && <span className="text-xs text-blue-500">Coach</span>} */}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-violet-500">
                                            <RiVipDiamondLine size={14} />
                                            <span className="text-sm font-medium">{formatNumberWithK(entry.ryzlyPoints)} pts</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Infinite scroll trigger */}
                    {hasMore && (
                        <div ref={loaderRef} className="flex justify-center py-4">
                            {isLoadingMore && <Spinner size="sm" color="primary" />}
                        </div>
                    )}
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


