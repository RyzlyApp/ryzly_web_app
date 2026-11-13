"use client";

import React, { useState, Key } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tabs, Tab, Button } from "@heroui/react";
import {
  RiShieldCheckLine,
  RiBriefcaseLine,
  RiBarChart2Line,
  RiBuilding4Line,
  RiStockLine,
} from "react-icons/ri";
import { ProgramCardItem } from "../types";

export const DEFAULT_PROGRAMS: ProgramCardItem[] = [
  {
    id: "product-design",
    title: "Product Design Work Experience",
    description:
      "Work on real product design tasks, build your portfolio and experience the design workflow in a real company setting.",
    image: "/workexp/track_design.png",
    companiesCount: 2,
    level: "Beginner • Advanced",
    priceText: "Stage 2 of 5",
    status: "ongoing",
  },
  {
    id: "product-management",
    title: "Product Management Work Experience",
    description:
      "Gain end-to-end product management experience, from discovery to delivery, in a real-world setting.",
    image: "/workexp/track_pm.png",
    companiesCount: 2,
    level: "Beginner • Advanced",
    priceText: "Free to Start",
    status: "available",
  },
  {
    id: "data-analytics",
    title: "Data Analytics Work Experience",
    description:
      "Work with real data, solve business problems and build a data analytics portfolio.",
    image: "/workexp/track_analytics.png",
    companiesCount: 2,
    level: "Beginner • Advanced",
    priceText: "Free to Start",
    status: "available",
  },
];

interface WorkExperienceProgramsProps {
  programs?: ProgramCardItem[];
}

export default function WorkExperiencePrograms({
  programs = DEFAULT_PROGRAMS,
}: WorkExperienceProgramsProps) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const filteredPrograms = programs.filter((p) => {
    if (selectedTab === "ongoing") return p.status === "ongoing";
    if (selectedTab === "completed") return p.status === "completed";
    return true;
  });

  return (
    <div className="w-full flex flex-col gap-8 font-inter">
      {/* Header Banner: Title, Subtitle, Feature Badges & 3D Briefcase Illustration */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
        {/* Left Side Info */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D1348] tracking-tight">
            Work Experience
          </h1>
          <p className="text-sm md:text-base text-[#475467] leading-relaxed">
            Gain real, hands-on experience through structured, industry-backed programmes on Ryzly.
          </p>

          {/* 3 Feature Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="bg-white border border-gray-100 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                <RiShieldCheckLine size={17} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#1D1348]">
                Earn a certificate
              </span>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                <RiBriefcaseLine size={17} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#1D1348]">
                Real work, real tasks
              </span>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                <RiBarChart2Line size={17} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#1D1348]">
                Build industry skills
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: 3D Briefcase Illustration */}
        <div className="hidden sm:flex shrink-0 self-center md:self-auto">
          <div className="relative w-48 h-36 md:w-60 md:h-44 lg:w-72 lg:h-52">
            <Image
              src="/image/workexperience.png"
              alt="Work Experience Briefcase"
              fill
              className="object-contain drop-shadow-sm"
              priority
            />
          </div>
        </div>
      </div>

      {/* Tabs Bar using HeroUI Tabs */}
      <div className="w-full border-b border-gray-200">
        <Tabs
          aria-label="Work Experience Program Tabs"
          variant="underlined"
          selectedKey={selectedTab}
          onSelectionChange={(key: Key) => setSelectedTab(key as string)}
          classNames={{
            base: "w-full",
            tabList:
              "gap-6 sm:gap-8 w-full relative rounded-none p-0 border-b border-gray-200 overflow-x-auto no-scrollbar",
            cursor: "w-full bg-[#5160E7]",
            tab: "max-w-fit px-0 h-11",
            tabContent:
              "group-data-[selected=true]:text-[#5160E7] group-data-[selected=true]:font-bold text-xs sm:text-sm p-0 text-[#475467] hover:text-[#1D1348] transition-colors",
          }}
        >
          <Tab key="all" title="All Programs" />
          <Tab key="ongoing" title="Ongoing Programs" />
          <Tab key="completed" title="Completed" />
        </Tabs>
      </div>

      {/* Programs Grid (3 Columns on Desktop) */}
      {filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredPrograms.map((program) => {
            const isOngoing = program.status === "ongoing";
            const detailUrl = isOngoing
              ? `/dashboard/workexperience/${program.id}`
              : `/dashboard/workexperience/${program.id}/onboarding`;

            return (
              <div
                key={program.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Program Cover Image */}
                <div className="relative w-full h-44 sm:h-48 bg-gray-50 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                  {isOngoing && (
                    <div className="absolute top-3 right-3 bg-[#E8FAF0] text-[#10B981] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      Ongoing
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#1D1348] tracking-tight">
                      {program.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475467] leading-relaxed line-clamp-3">
                      {program.description}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 text-xs text-[#64748B] font-medium pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1.5">
                      <RiBuilding4Line size={15} className="text-[#64748B]" />
                      <span>{program.companiesCount || 2} companies</span>
                    </div>

                    <span className="text-gray-300">|</span>

                    <div className="flex items-center gap-1.5">
                      <RiStockLine size={15} className="text-[#64748B]" />
                      <span>{program.level || "Beginner • Advanced"}</span>
                    </div>
                  </div>

                  {/* Footer Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-1.5">
                      {isOngoing && (
                        <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse" />
                      )}
                      <span className="text-xs sm:text-sm font-semibold text-[#475467]">
                        {program.priceText || (isOngoing ? "Ongoing" : "Free to Start")}
                      </span>
                    </div>

                    <Button
                      as={Link}
                      href={detailUrl}
                      size="sm"
                      className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-5 py-2 text-xs sm:text-sm font-semibold shadow-xs transition-colors h-auto min-h-[36px]"
                    >
                      {isOngoing ? "Continue" : "View Program"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full bg-white rounded-2xl border border-gray-100 p-12 text-center text-[#475467] text-sm">
          No programs found for this category.
        </div>
      )}
    </div>
  );
}
