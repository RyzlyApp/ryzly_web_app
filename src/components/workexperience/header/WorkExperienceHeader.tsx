"use client";

import React from "react";
import Link from "next/link";
import { Button, Chip, Progress } from "@heroui/react";
import {
  RiArrowLeftLine,
  RiBuilding4Line,
  RiComputerLine,
  RiRepeatLine,
  RiApps2Line,
} from "react-icons/ri";

interface WorkExperienceHeaderProps {
  title?: string;
  companyName?: string;
  industryName?: string;
  isActive?: boolean;
  currentStageNumber?: number;
  totalStages?: number;
  progressPercentage?: number;
  onSwitchExperience?: () => void;
  onChangeIndustry?: () => void;
}

export default function WorkExperienceHeader({
  title = "Product Design Work Experience",
  companyName = "Company Name",
  industryName = "Industry Name",
  isActive = true,
  currentStageNumber = 0,
  totalStages = 5,
  progressPercentage = 0,
  onSwitchExperience,
  onChangeIndustry,
}: WorkExperienceHeaderProps) {
  return (
    <div className="w-full flex flex-col gap-4 font-inter">
      {/* Top Back Link */}
      <Link
        href="/dashboard/workexperience"
        className="inline-flex items-center gap-2 text-[#5160E7] text-sm font-semibold hover:underline w-fit transition-colors"
      >
        <RiArrowLeftLine size={18} />
        <span>Back to Work Experience</span>
      </Link>

      {/* Hero Card */}
      <div className="w-full rounded-3xl md:rounded-3xl bg-[#5160E7] p-6 md:p-8 text-white shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Column: Title & Metadata */}
        <div className="flex flex-col gap-3">
          <h1 className="text-xl md:text-2xl lg:text-[26px] font-bold text-white tracking-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-white/90">
            <div className="flex items-center gap-1.5">
              <RiBuilding4Line size={16} className="text-white/80" />
              <span>{companyName}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <RiComputerLine size={16} className="text-white/80" />
              <span>{industryName}</span>
            </div>

            {isActive && (
              <Chip
                variant="flat"
                size="sm"
                classNames={{
                  base: "bg-white/20 text-white backdrop-blur-xs border border-white/10 h-6 px-2.5",
                  content: "flex items-center gap-1.5 text-xs font-medium text-white",
                }}
                startContent={<span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />}
              >
                Active
              </Chip>
            )}
          </div>
        </div>

        {/* Right Column: Stage Progress & Actions */}
        <div className="flex flex-col gap-4 w-full lg:w-[380px]">
          {/* Progress Header */}
          <div>
            <div className="flex items-center justify-between text-xs md:text-sm font-medium text-white/95 mb-1.5">
              <span>
                Stage {currentStageNumber} of {totalStages}
              </span>
              <span>{progressPercentage}%</span>
            </div>

            {/* Progress Bar Track using HeroUI Progress */}
            <Progress
              aria-label={`Stage ${currentStageNumber} of ${totalStages} Progress`}
              value={progressPercentage}
              size="sm"
              radius="full"
              classNames={{
                base: "w-full",
                track: "bg-white/25 h-1.5",
                indicator: "bg-white h-1.5",
              }}
            />
          </div>

          {/* Action Buttons using HeroUI Button */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Button
              type="button"
              onClick={onSwitchExperience}
              size="sm"
              variant="bordered"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium text-white border border-white/30 bg-white/10 hover:bg-white/20 transition-all cursor-pointer shadow-xs whitespace-nowrap h-auto min-h-[38px]"
              startContent={<RiRepeatLine size={16} />}
            >
              Switch Experience
            </Button>

            <Button
              type="button"
              onClick={onChangeIndustry}
              size="sm"
              variant="bordered"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium text-white border border-white/30 bg-white/10 hover:bg-white/20 transition-all cursor-pointer shadow-xs whitespace-nowrap h-auto min-h-[38px]"
              startContent={<RiApps2Line size={16} />}
            >
              Change Industry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
