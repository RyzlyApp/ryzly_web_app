"use client";

import React, { useState } from "react";
import { useAtom } from "jotai";
import { CircleDollarSign, Handshake, Briefcase } from "lucide-react";
import { filtersAtom } from "@/helper/atom/filter";
import { useUnsecureFetchData } from "@/hook/useFetchData";
import { IChallenge } from "@/helper/model/challenge";
import { Award, People } from "iconsax-reactjs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";

export default function OpportunityCards() {
    const [filters, setFilters] = useAtom(filtersAtom);
    const [expanded, setExpanded] = useState<string | null>(null);

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
    const workExperienceCount = data?.filter((c) => c.type === "WorkExperience").length || 0;
    const learningCount = data?.filter((c) => c.type === "Leaning").length || 0;

    const cards = [
        {
            title: "Opportunity",
            value: "Opportunity",
            colorClass: "bg-[#5160E7]",
            textColor: "text-white",
            icon: Award,
            iconColor: "text-white",
            chevronColor: "text-white",
            count: opportunityCount,
            description: "For Skilled talents, earn and win real cash prizes and other  opportunities by completing real world challenges from different organizations get discovered by top organizations.",
            tag: "Earn Real Money",
            tagIcon: CircleDollarSign,
        },
        {
            title: "Work Experience",
            value: "WorkExperience",
            colorClass: "bg-[#C2DE55]",
            textColor: "text-black",
            icon: Briefcase,
            iconColor: "text-[#1C1C36]",
            chevronColor: "text-[#1C1C36]",
            count: workExperienceCount,
            description:"Discover how real work happens by tackling work simulation challenges that also build your soft skills, closely mimicking a real workplace environment.",
            tag: "Work on real projects",
            tagIcon: Handshake,
        },
        {
            title: "Practice",
            value: "Leaning",
            colorClass: "bg-[#DC6803]",
            textColor: "text-white",
            icon: People,
            iconColor: "text-white",
            chevronColor: "text-white",
            count: learningCount,
            description: "Build your Confidence by joining practice challenges designed by community experts to hold your hand on every step of the way.",
            tag: "Gain in-demand skills",
            tagIcon: Handshake,
        },
    ];

    const handleCardClick = (value: string) => {
        setFilters((prev) => ({
            ...prev,
            challengeType: value, // Never unset it as per requirement
        }));
    };

    const toggleExpand = (e: React.MouseEvent, value: string) => {
        e.stopPropagation(); // Prevent the card click event
        setExpanded((prev) => (prev === value ? null : value));
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 w-full items-start">
                {cards.map((card, idx) => {
                    const isSelected = filters.challengeType === card.value;
                    const isExpanded = expanded === card.value;
                    const Icon = card.icon;
                    const TagIcon = card.tagIcon;

                    return (
                        <div
                            key={idx}
                            onClick={() => handleCardClick(card.value)}
                            className={`w-full flex flex-col text-left rounded-[20px] transition-all duration-300 cursor-pointer ${card.colorClass} ${
                                isSelected ? "shadow-lg scale-[1.01] opacity-100" : "opacity-90 hover:opacity-100 shadow-sm"
                            }`}
                        >
                            {/* Header (Pill) */}
                            <div className="flex items-center justify-between px-4 sm:px-5 xl:px-6 py-3 sm:py-4">
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                    <div className="flex-shrink-0">
                                        {card.title === "Work Experience" ? (
                                            <Icon className={card.iconColor} size={24} />
                                        ) : (
                                            // @ts-ignore
                                            <Icon className={card.iconColor} size={24} variant="Bold" />
                                        )}
                                    </div>
                                    <h3 className={`text-[14px] sm:text-[16px] xl:text-[18px] font-bold ${card.textColor} tracking-tight truncate`}>
                                        {card.title}
                                    </h3>
                                </div>
                                
                                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-2">
                                    <div className="bg-[#FEF8F3] text-[#1C1C36] text-[11px] sm:text-[13px] font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full flex items-center justify-center whitespace-nowrap">
                                        <span>{card.count} Active</span>
                                    </div>
                                    <button 
                                        onClick={(e) => toggleExpand(e, card.value)}
                                        className={`focus:outline-none p-1 rounded-full hover:bg-black/5 transition-colors flex-shrink-0 ${card.chevronColor}`}
                                    >
                                        {isExpanded ? (
                                            <RiArrowUpSLine size={24} />
                                        ) : (
                                            <RiArrowDownSLine size={24} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Accordion Body */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 sm:px-5 xl:px-6 pb-5 pt-2">
                                            <p className={`${card.textColor} opacity-90 text-[13px] sm:text-[14px] leading-relaxed`}>
                                                {card.description}
                                            </p>
                                            <div className={`flex items-center gap-2 ${card.textColor} text-xs sm:text-sm font-bold mt-3 sm:mt-4 pt-3 sm:pt-4`}>
                                                <TagIcon className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
                                                <span>{card.tag}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}