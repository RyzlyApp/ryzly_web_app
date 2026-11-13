"use client";

import React from "react";
import Link from "next/link";
import { Chip } from "@heroui/react";
import { RiArrowLeftLine } from "react-icons/ri";

interface PerformancePointsViewProps {
  workexperienceId?: string;
  totalPoints?: number;
  stagePoints?: number;
}

const EARN_ACTIVITIES = [
  { title: "Complete tasks", points: "+300 pts" },
  { title: "Join daily standups", points: "+300 pts" },
  { title: "Earn badges and milestones", points: "+300 pts" },
  { title: "Contribute to your team", points: "+300 pts" },
  { title: "Share your work", points: "+300 pts" },
];

const RECENT_ACTIVITIES = [
  {
    title: "Completed task: Design final iteration",
    date: "Oct 29",
    points: "+300 pts",
  },
  {
    title: "Daily standup",
    date: "Oct 28",
    points: "+50 pts",
  },
  {
    title: "Earned badge: Collaboration Pro",
    date: "Oct 24",
    points: "+200 pts",
  },
  {
    title: "Team contribution",
    date: "Oct 22",
    points: "+100 pts",
  },
];

export default function PerformancePointsView({
  workexperienceId = "product-design",
  totalPoints = 2450,
  stagePoints = 350,
}: PerformancePointsViewProps) {
  const backUrl = `/dashboard/workexperience/${workexperienceId}/performance`;

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* 1. Back link */}
      <div>
        <Link
          href={backUrl}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5160E7] hover:underline transition-colors group"
        >
          <RiArrowLeftLine
            size={18}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span>Back to Performance</span>
        </Link>
      </div>

      {/* 2. Title & Large Balance Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[22px] sm:text-[22px] font-medium text-[#1D1348] tracking-tight">
          Your Points Balance
        </h1>

        <div className="flex items-center gap-3 pt-1">
          <span className="text-3xl sm:text-4xl/11 font-bold text-[#1C1C1E]">
            {totalPoints.toLocaleString()}
          </span>
          <Chip
            variant="flat"
            size="sm"
            classNames={{
              base: "bg-[#D1FADF] text-[#039855] h-6 px-3 rounded-full border-none",
              content: "font-semibold text-xs p-0 leading-none",
            }}
          >
            +{stagePoints} in current stage
          </Chip>
        </div>
      </div>

      {/* 3. Two-Column Layout: How to Earn Points vs Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        {/* Left Column: How to Earn Points */}
        <div className="lg:col-span-6 w-full flex flex-col gap-4 bg-white p-7 rounded-3xl">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm sm:text-base font-bold text-[#1D1348]">
              How to Earn Points
            </h3>
            <p className="text-xs text-[#3A3A3C]">
              Complete these activities to earn points.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {EARN_ACTIVITIES.map((activity, idx) => (
              <div
                key={idx}
                className="border border-gray-100 bg-white rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs hover:border-[#5160E7]/20 cursor-pointer transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold text-[#1C1C1E]">
                  {activity.title}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#5160E7]">
                  {activity.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="lg:col-span-6 w-full flex flex-col gap-4 bg-white p-7 rounded-3xl">
          <h3 className="text-sm sm:text-base font-bold text-[#1D1348]">
            Recent Activity
          </h3>

          <div className="flex flex-col gap-4 pt-1">
            {RECENT_ACTIVITIES.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between pb-3.5 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-[#1C1C1E]">
                    {item.title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#3A3A3C] mt-0.5">
                    {item.date}
                  </span>
                </div>

                <Chip
                  variant="flat"
                  size="sm"
                  classNames={{
                    base: "bg-[#D1FADF] text-[#039855] h-6 px-3 rounded-full border-none shrink-0 ml-3",
                    content: "font-semibold text-xs p-0 leading-none",
                  }}
                >
                  {item.points}
                </Chip>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
