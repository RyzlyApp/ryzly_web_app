"use client";

import React from "react";
import Link from "next/link";
import { Avatar, Button, Chip } from "@heroui/react";
import {
  RiCalendarLine,
  RiTimeLine,
  RiFileTextLine,
  RiExternalLinkLine,
} from "react-icons/ri";
import { FaFigma } from "react-icons/fa6";

interface WorkTaskSidebarProps {
  status?: "in_progress" | "completed" | "due" | "needs_improvement";
  statusText?: string;
  dueText?: string;
  estimatedHours?: string;
  workexperienceId?: string;
  workId?: string;
}

export default function WorkTaskSidebar({
  status = "in_progress",
  statusText,
  dueText = "Due in 2 days",
  estimatedHours = "4–6 hours",
  workexperienceId,
}: WorkTaskSidebarProps) {
  const isCompleted = status === "completed";
  const isNeedsImprovement = status === "needs_improvement";
  const displayStatus =
    statusText ||
    (isCompleted
      ? "Completed"
      : isNeedsImprovement
      ? "Needs Improvement"
      : "In Progress");

  const badgeClass = isCompleted
    ? "bg-[#E8FAF0] text-[#10B981]"
    : isNeedsImprovement
    ? "bg-[#FFFBEB] text-[#B54708] border border-[#FEF3C7]"
    : "bg-[#F2F4FF] text-[#5160E7]";

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* 1. Task Status Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 flex flex-col gap-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-semibold text-[#1D1348]">Task Status</h3>
          <Chip
            variant="flat"
            size="sm"
            classNames={{
              base: `${badgeClass} h-6 px-2.5 rounded-full border-none`,
              content: "font-semibold text-xs p-0 leading-none",
            }}
          >
            {displayStatus}
          </Chip>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="bg-[#F2F4FF] rounded-xl p-3 flex items-center gap-2.5 text-xs font-medium text-[#1D1348]">
            <RiCalendarLine size={16} className="text-[#5160E7] shrink-0" />
            <span>{isCompleted || isNeedsImprovement ? "Submitted" : dueText}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#475467] px-1">
            <RiTimeLine size={15} className="text-[#64748B] shrink-0" />
            <span>Estimated time: {estimatedHours}</span>
          </div>
        </div>
      </div>

      {/* 2. Resources Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 flex flex-col gap-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-semibold text-[#1D1348]">Resources</h3>
          <span className="text-xs text-[#64748B] font-medium">3 resources</span>
        </div>

        <div className="flex flex-col divide-y divide-gray-50">
          <a
            href="#user-research"
            className="py-2.5 flex items-center justify-between text-xs sm:text-sm font-medium text-[#1C1C1E] hover:text-[#5160E7] transition-colors group first:pt-0"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                <RiFileTextLine size={14} />
              </div>
              <span className="truncate">User research summary</span>
            </div>
            <RiExternalLinkLine size={14} className="text-[#64748B] group-hover:text-[#5160E7] shrink-0" />
          </a>

          <a
            href="#design-file"
            className="py-2.5 flex items-center justify-between text-xs sm:text-sm font-medium text-[#1C1C1E] hover:text-[#5160E7] transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <FaFigma size={13} />
              </div>
              <span className="truncate">Design file (Figma)</span>
            </div>
            <RiExternalLinkLine size={14} className="text-[#64748B] group-hover:text-[#5160E7] shrink-0" />
          </a>

          <a
            href="#prd"
            className="py-2.5 flex items-center justify-between text-xs sm:text-sm font-medium text-[#1C1C1E] hover:text-[#5160E7] transition-colors group last:pb-0"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                <RiFileTextLine size={14} />
              </div>
              <span className="truncate">Product requirements (PRD)</span>
            </div>
            <RiExternalLinkLine size={14} className="text-[#64748B] group-hover:text-[#5160E7] shrink-0" />
          </a>
        </div>
      </div>

      {/* 3. Team Discussion Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 flex flex-col gap-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-semibold text-[#1D1348]">Team Discussion</h3>
          <Chip
            variant="flat"
            size="sm"
            classNames={{
              base: "bg-[#E8FAF0] text-[#10B981] h-5 px-2.5 rounded-full border-none",
              content: "font-semibold text-[11px] p-0 leading-none",
            }}
          >
            2 new Replies
          </Chip>
        </div>

        <div className="flex flex-col gap-4">
          {/* Member 1 */}
          <div className="flex items-start gap-2.5">
            <Avatar
              name="Daniel O."
              className="size-8 text-[11px] font-bold shrink-0 bg-[#F2F4FF] text-[#5160E7]"
            />
            <div className="flex flex-col gap-0.5 w-full">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#101828]">Daniel O.</span>
                <span className="text-[11px] text-[#3A3A3C]">2h ago</span>
              </div>
              <p className="text-xs text-[#3A3A3C] leading-relaxed">
                I've shared the updated user feedback in Resources. It highlights a few areas we should improve in the next iteration.
              </p>
            </div>
          </div>

          {/* Member 2 */}
          <div className="flex items-start gap-2.5">
            <Avatar
              name="Ada K."
              className="size-8 text-[11px] font-bold shrink-0 bg-[#F2F4FF] text-[#5160E7]"
            />
            <div className="flex flex-col gap-0.5 w-full">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#101828]">Ada K.</span>
                <span className="text-[11px] text-[#3A3A3C]">5h ago</span>
              </div>
              <p className="text-xs text-[#3A3A3C] leading-relaxed">
                Here are two alternative layouts for the dashboard. Let me know which direction feels stronger before I refine further.
              </p>
            </div>
          </div>

          <Button
            as={Link}
            href={`/dashboard/workexperience/${workexperienceId || "product-design"}/messages`}
            variant="bordered"
            className="w-full rounded-full bg-white text-[#1D1348] text-sm font-semibold py-2.5 mt-4 border decoration-none h-auto min-h-[36px]"
          >
            View Discussion
          </Button>
        </div>
      </div>
    </div>
  );
}
