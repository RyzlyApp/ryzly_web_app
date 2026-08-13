"use client";

import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { CircleDollarSign, Handshake } from "lucide-react";
import { filtersAtom } from "@/helper/atom/filter";
import { useUnsecureFetchData } from "@/hook/useFetchData";
import { IChallenge } from "@/helper/model/challenge";
import { Award, People } from "iconsax-reactjs";

export default function OpportunityCards() {
    const [filters, setFilters] = useAtom(filtersAtom);

    // Set default active challenge type to "Opportunity" on mount if none is set
    useEffect(() => {
        if (!filters.challengeType) {
            setFilters((prev) => ({
                ...prev,
                challengeType: "Opportunity",
            }));
        }
    }, []);

    // Fetch all public and approved challenges to calculate correct counts for each category
    const { data } = useUnsecureFetchData<IChallenge[]>({
        endpoint: "/challenge",
        name: "challenge-counts",
        params: {
            isApproved: "true",
            isPublic: "true",
        },
    });

    const opportunityCount = data?.filter((c) => c.type === "Opportunity").length || 0;
    const learningCount = data?.filter((c) => c.type === "Leaning").length || 0;

    const cards = [
        {
            title: "Opportunity",
            value: "Opportunity",
            colorClass: "bg-[#5160E7]",
            ringClass: "ring-[#4E61EC]/40",
            icon: Award,
            description: "For Skilled talents, earn and win real cash prizes and other opportunities by completing real world challenges from different organizations get discovered by top organizations.",
            tag: "Earn Real Money",
            tagIcon: CircleDollarSign,
        },
        {
            title: "Practice Challenge",
            value: "Leaning", // Matches backend DB value "Leaning"
            colorClass: "bg-[#DC6803]",
            ringClass: "ring-[#D76900]/40",
            icon: People,
            description: "Build your Confidence by joining practice challenges designed by community experts to hold your hand on every step of the way.",
            tag: "Gain in-demand skills",
            tagIcon: Handshake,
        },
    ];

    const handleCardClick = (value: string) => {
        setFilters((prev) => ({
            ...prev,
            challengeType: prev.challengeType === value ? "" : value,
        }));
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {cards.map((card, idx) => {
                    const isSelected = filters.challengeType === card.value;
                    const Icon = card.icon;
                    const TagIcon = card.tagIcon;
                    const activeCount = card.value === "Opportunity" ? opportunityCount : learningCount;

                    return (
                        <div
                            key={idx}
                            onClick={() => handleCardClick(card.value)}
                            className={`w-full  flex flex-col justify-between text-left p-4 lg:p-6 rounded-[20px] transition-all duration-300 cursor-pointer ${card.colorClass} ${
                                isSelected
                                    ? "ring-1 ring-offset-1 scale-[1.002] shadow-sm " + card.ringClass
                                    : "opacity-95 hover:opacity-100 shadow-xs"
                            }`}
                        >
                            <div>
                                {/* Header Row: Icon + Active Count */}
                                <div className="flex items-start justify-between w-full mb-6">
                                    <Icon  className="text-white" size={56}/>
                                    
                                    <div className="bg-white text-[#161925] text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span>{activeCount} Active</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
                                    {card.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                    {card.description}
                                </p>
                            </div>

                            {/* Footer Row: Tag with Icon */}
                            <div className="flex items-center gap-2 text-white text-xs md:text-sm font-bold mt-8 border-t border-white/10 pt-4">
                                <TagIcon className="w-5 h-5 text-white/90" />
                                <span>{card.tag}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}