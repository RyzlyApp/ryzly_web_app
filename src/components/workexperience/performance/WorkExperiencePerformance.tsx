"use client";

import React from "react";
import Link from "next/link";
import { Button, Progress } from "@heroui/react";
import { RiArrowRightSLine } from "react-icons/ri";

interface WorkExperiencePerformanceProps {
  workexperienceId?: string;
  totalPoints?: number;
  monthlySalary?: number;
}

export default function WorkExperiencePerformance({
  workexperienceId = "product-design",
  totalPoints = 2450,
  monthlySalary = 120000,
}: WorkExperiencePerformanceProps) {
  const pointsUrl = `/dashboard/workexperience/${workexperienceId}/performance/points`;
  const salaryUrl = `/dashboard/workexperience/${workexperienceId}/performance/salary`;
  const workUrl = `/dashboard/workexperience/${workexperienceId}/work`;

  // 68% progress ring gauge
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = 0.68;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* 1. Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1348] tracking-tight">
          Performance
        </h1>
        <p className="text-xs sm:text-sm text-[#3A3A3C]">
          Track your progress, achievements and growth in your work experience.
        </p>
      </div>

      {/* 2. Top Grid: Overall Progress vs Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Overall Progress Card */}
        <div className="lg:col-span-8 w-full bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-sm sm:text-base font-bold text-[#1D1348]">
              Overall Progress
            </h3>
            <span className="text-xs text-[#3A3A3C]">
              You&apos;re doing great! Keep going.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Circular Progress Gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shrink-0">
                <svg
                  className="w-full h-full -rotate-90 transform"
                  viewBox="0 0 96 96"
                >
                  {/* Track */}
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    className="stroke-[#EBEBF5]"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Active 68% Arc */}
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    className="stroke-[#5160E7] transition-all duration-700 ease-out"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E]">
                    68%
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#3A3A3C] font-medium leading-none mt-0.5">
                    Overall
                    <br />
                    progress
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Linear Progress Bars using HeroUI Progress */}
            <div className="md:col-span-7 flex flex-col gap-4">
              {/* Metric 1 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-[#1C1C1E]">
                    Tasks completed
                  </span>
                  <span className="text-[#3A3A3C]">8 of 10</span>
                </div>
                <Progress
                  aria-label="Tasks completed"
                  value={80}
                  size="sm"
                  radius="full"
                  classNames={{
                    base: "w-full",
                    track: "bg-[#EBEBF5] h-2",
                    indicator: "bg-[#5160E7] h-2",
                  }}
                />
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-[#1C1C1E]">
                    Competencies demonstrated
                  </span>
                  <span className="text-[#3A3A3C]">4 of 5</span>
                </div>
                <Progress
                  aria-label="Competencies demonstrated"
                  value={80}
                  size="sm"
                  radius="full"
                  classNames={{
                    base: "w-full",
                    track: "bg-[#EBEBF5] h-2",
                    indicator: "bg-[#5160E7] h-2",
                  }}
                />
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-[#1C1C1E]">Milestones</span>
                  <span className="text-[#3A3A3C]">2 of 3</span>
                </div>
                <Progress
                  aria-label="Milestones completed"
                  value={66.6}
                  size="sm"
                  radius="full"
                  classNames={{
                    base: "w-full",
                    track: "bg-[#EBEBF5] h-2",
                    indicator: "bg-[#5160E7] h-2",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Callout Link: Competencies Demonstrated */}
          <div className="bg-[#F2F4FF] rounded-2xl p-4 sm:p-4.5 flex items-center justify-between border border-[#EEF0FF] cursor-pointer hover:bg-[#EEF0FF]/80 transition-colors">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-[#1D1348]">
                Competencies Demonstrated
              </span>
              <span className="text-xs text-[#3A3A3C] mt-0.5">
                View the skills you&apos;ve shown and get more details.
              </span>
            </div>
            <RiArrowRightSLine size={20} className="text-[#64748B] shrink-0" />
          </div>
        </div>

        {/* Right: Metric Summary Cards */}
        <div className="lg:col-span-4 w-full flex flex-col gap-6">
          {/* Card 1: Total Points */}
          <Link
            href={pointsUrl}
            className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-2 shadow-xs hover:border-[#5160E7]/40 transition-all group"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-[#1D1348] group-hover:text-[#5160E7] transition-colors">
                Total Points
              </h3>
              <RiArrowRightSLine
                size={18}
                className="text-[#64748B] group-hover:text-[#5160E7] group-hover:translate-x-0.5 transition-all"
              />
            </div>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl sm:text-4xl font-medium text-[#1D1348]">
                {totalPoints.toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm text-[#3A3A3C]">
                Points Earned
              </span>
            </div>
          </Link>

          {/* Card 2: Simulated Salary */}
          <Link
            href={salaryUrl}
            className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-2 shadow-xs hover:border-[#5160E7]/40 transition-all group"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-[#1D1348] group-hover:text-[#5160E7] transition-colors">
                Simulated Salary
              </h3>
              <RiArrowRightSLine
                size={18}
                className="text-[#64748B] group-hover:text-[#5160E7] group-hover:translate-x-0.5 transition-all"
              />
            </div>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl sm:text-4xl font-medium text-[#1D1348]">
                ₦{monthlySalary.toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm text-[#3A3A3C]">
                Current monthly salary
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. Middle Section: Recent Achievements */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 flex flex-col gap-5 shadow-xs">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm sm:text-base font-bold text-[#1D1348]">
            Recent Achievements
          </h3>
          <span className="text-xs text-[#3A3A3C]">
            Your latest wins and milestones.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Achievement 1 */}
          <div className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-1 hover:border-gray-200 transition-colors">
            <span className="text-xs font-bold text-[#1C1C1E]">
              Task Completed
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#3A3A3C]">
              User Research
            </span>
            <span className="text-[11px] text-[#3A3A3C] mt-1">
              Oct 20, 2025
            </span>
          </div>

          {/* Achievement 2 */}
          <div className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-1 hover:border-gray-200 transition-colors">
            <span className="text-xs font-bold text-[#1C1C1E]">Competency</span>
            <span className="text-xs sm:text-sm font-semibold text-[#3A3A3C]">
              Design Thinking
            </span>
            <span className="text-[11px] text-[#3A3A3C] mt-1">
              Oct 18, 2025
            </span>
          </div>

          {/* Achievement 3 */}
          <div className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-1 hover:border-gray-200 transition-colors">
            <span className="text-xs font-bold text-[#1C1C1E]">Milestone</span>
            <span className="text-xs sm:text-sm font-semibold text-[#3A3A3C]">
              Stage 2
            </span>
            <span className="text-[11px] text-[#3A3A3C] mt-1">
              Oct 15, 2025
            </span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: What to focus on next */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm sm:text-base font-bold text-[#1D1348]">
            What to focus on next
          </h3>
          <p className="text-xs sm:text-sm text-[#3A3A3C]">
            Complete the final design iteration and present your work to the team.
          </p>
        </div>

        <Button
          as={Link}
          href={workUrl}
          className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[40px] shrink-0"
        >
          View My Work
        </Button>
      </div>
    </div>
  );
}
