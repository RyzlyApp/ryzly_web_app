// components/communities/ActivityLog.tsx
"use client";

import { useMemo } from "react";
import { Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { ICommunityMessage } from "@/modules/community-chat/models/community-chat.model";

interface IActivityLogProps {
    userId: string;
}

const DAYS = [
    { label: "M", jsDay: 1 },
    { label: "T", jsDay: 2 },
    { label: "W", jsDay: 3 },
    { label: "T", jsDay: 4 },
    { label: "F", jsDay: 5 },
    { label: "S", jsDay: 6 },
    { label: "S", jsDay: 0 },
];

function getMondayOfThisWeek(): Date {
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    return monday;
}

export const ActivityLog = ({ userId }: IActivityLogProps) => {

    // ── Own fetch so stats reflect the moment a post is sent ──
    const { data, isLoading } = useQuery<ICommunityMessage[]>({
        queryKey: ["activity-log", userId],
        queryFn: async () => {
            const res = await httpService.get("/time-line/message");
            const all = res.data.data as ICommunityMessage[];
            // Filter server-side if endpoint supports ?author=, otherwise filter here
            return all.filter(m => m.author?._id === userId);
        },
        enabled: !!userId,
        staleTime: 0,           // always consider stale — refetch on every mount
        refetchOnWindowFocus: true,
    });

    const messages = data ?? [];

    // ── Stats ─────────────────────────────────────────────────
    const stats = useMemo(() => ({
        worksShared: messages.filter(m => m.type === "share-work").length,
        feedbackAsked: messages.filter(m => m.type === "ask-feedback").length,
        progressLogged: messages.filter(m => m.type === "post-progress").length,
        winsShared: messages.filter(m => m.type === "share-win").length,
        total: messages.length,
    }), [messages]);

    // ── Weekly streak ─────────────────────────────────────────
    const { postedDays, weeklyCount } = useMemo(() => {
        const monday = getMondayOfThisWeek();
        const now = new Date();
        const posted = new Set<number>();
        let count = 0;
        messages.forEach(m => {
            const d = new Date(m.createdAt);
            if (d >= monday && d <= now) {
                posted.add(d.getDay());
                count++;
            }
        });
        return { postedDays: posted, weeklyCount: count };
    }, [messages]);

    const STAT_CARDS = [
        { count: stats.worksShared, label: "Works shared", emoji: "📌" },
        { count: stats.feedbackAsked, label: "Feedback asked", emoji: "🧠" },
        { count: stats.progressLogged, label: "Progress logged", emoji: "📈" },
        { count: stats.winsShared, label: "Wins shared", emoji: "🏆" },
    ];

    return (
        <div className="rounded-2xl bg-[#F9F8F4] border border-[#EEECE6] p-4 flex flex-col gap-4">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="size-4 rounded border border-gray-400 flex items-center justify-center shrink-0">
                        <span className="size-2 rounded-sm bg-gray-400" />
                    </span>
                    <span className="text-sm font-semibold text-gray-800">Your activity log</span>
                </div>
                {isLoading ? (
                    <Skeleton className="h-3 w-20 rounded" />
                ) : (
                    <span className="text-xs text-gray-400">{stats.total} posts total</span>
                )}
            </div>

            {/* Stat cards */}
            {isLoading ? (
                <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2">
                    {STAT_CARDS.map(({ count, label, emoji }) => (
                        <div
                            key={label}
                            className="bg-white rounded-xl border border-gray-100 px-3 py-3 flex flex-col items-center text-center gap-1"
                        >
                            <span className="text-2xl font-bold text-gray-900 leading-none">{count}</span>
                            <span className="text-[11px] text-gray-500 leading-tight">{emoji} {label}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Weekly streak */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                    <span className="size-4 rounded border border-orange-400 shrink-0" />
                    <span className="text-xs font-medium text-gray-700">Weekly streak</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                    {DAYS.map(({ label, jsDay }, idx) => (
                        <span
                            key={idx}
                            className={`size-7 rounded-lg text-[11px] font-semibold flex items-center justify-center select-none transition-colors
                ${postedDays.has(jsDay)
                                    ? "bg-[#5160E7] text-white border border-[#5160E7]"
                                    : "bg-white text-gray-400 border border-gray-200"
                                }`}
                        >
                            {label}
                        </span>
                    ))}
                    <span className="text-[11px] text-gray-400 ml-0.5 whitespace-nowrap">
                        {weeklyCount} day{weeklyCount !== 1 ? "s" : ""} this week
                    </span>
                </div>
            </div>
        </div>
    );
};