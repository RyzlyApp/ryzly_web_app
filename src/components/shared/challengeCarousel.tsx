// components/shared/challengeCarousel.tsx
"use client";

import { Trophy, ArrowRight, ChevronRight } from "lucide-react";
import { Skeleton } from "@heroui/react";
import { IChallenge } from "@/helper/model/challenge";

interface ChallengesCarouselProps {
    challenges: IChallenge[];
    isLoading?: boolean;
    onNavigate: (challengeId: string) => void | Promise<boolean>;
    onViewAll: () => void | Promise<boolean>;
    /**
     * "scroll"  — horizontal scroll cards (mobile, or anywhere compact)
     * "list"    — vertical stacked list  (desktop sidebar)
     * Default: "scroll"
     */
    variant?: "scroll" | "list";
}

// ── Shared thumbnail ─────────────────────────────────────────
const Thumb = ({ url, title }: { url?: string; title: string }) => (
    <div className="rounded-lg bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center size-11">
        {url ? (
            <img src={url} alt={title} className="w-full h-full object-cover" />
        ) : (
            <Trophy className="size-4 text-gray-300" />
        )}
    </div>
);

// ── Loading skeletons ────────────────────────────────────────
const ListSkeleton = () => (
    <div className="flex flex-col gap-3">
        {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse flex gap-3">
                <Skeleton className="size-11 rounded-lg shrink-0" />
                <div className="flex-1 flex flex-col gap-1.5 justify-center">
                    <Skeleton className="h-3 w-3/4 rounded" />
                    <Skeleton className="h-2 w-1/2 rounded" />
                </div>
            </div>
        ))}
    </div>
);

const ScrollSkeleton = () => (
    <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3].map(i => (
            <Skeleton key={i} className="flex-shrink-0 w-36 h-24 rounded-xl" />
        ))}
    </div>
);

// ────────────────────────────────────────────────────────────
export const ChallengesCarousel = ({
    challenges,
    isLoading = false,
    onNavigate,
    onViewAll,
    variant = "scroll",
}: ChallengesCarouselProps) => {

    // ── List variant (desktop sidebar) ───────────────────────
    if (variant === "list") {
        return (
            <div className="flex flex-col gap-2">
                {isLoading ? (
                    <ListSkeleton />
                ) : challenges.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4">No challenges right now</p>
                ) : (
                    <>
                        {challenges.slice(0, 4).map(ch => (
                            <button
                                key={ch._id}
                                onClick={() => onNavigate(ch._id)}
                                className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-[#5160E7]/30 hover:shadow-sm transition-all text-left group w-full"
                            >
                                <Thumb url={ch.url} title={ch.title} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate group-hover:text-[#5160E7] transition-colors leading-tight">
                                        {ch.title}
                                    </p>
                                </div>
                                <ChevronRight className="size-3.5 text-gray-200 group-hover:text-[#5160E7] transition-colors shrink-0" />
                            </button>
                        ))}
                        <button
                            onClick={onViewAll}
                            className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400 hover:text-[#5160E7] transition-colors mt-1 py-2"
                        >
                            View all challenges <ArrowRight className="size-3" />
                        </button>
                    </>
                )}
            </div>
        );
    }

    // ── Scroll variant (mobile / horizontal cards) ────────────
    return (
        <div className="flex flex-col gap-2">
            {isLoading ? (
                <ScrollSkeleton />
            ) : challenges.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No challenges right now</p>
            ) : (
                <>
                    <div className="overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
                        <div className="flex gap-3">
                            {challenges.slice(0, 6).map(ch => (
                                <button
                                    key={ch._id}
                                    onClick={() => onNavigate(ch._id)}
                                    className="flex-shrink-0 w-36 rounded-xl border border-gray-100 bg-white p-3 text-left hover:border-[#5160E7]/30 hover:shadow-sm transition-all group"
                                >
                                    <div className="size-11 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center mb-2 w-full">
                                        {ch.url ? (
                                            <img src={ch.url} alt={ch.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <Trophy className="size-5 text-gray-300" />
                                        )}
                                    </div>
                                    <p className="text-xs font-medium text-gray-800 line-clamp-2 group-hover:text-[#5160E7] transition-colors leading-snug">
                                        {ch.title}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={onViewAll}
                        className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-[#5160E7] transition-colors self-end"
                    >
                        View all <ArrowRight className="size-3" />
                    </button>
                </>
            )}
        </div>
    );
};