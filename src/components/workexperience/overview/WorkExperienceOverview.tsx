"use client";

import React from "react";
import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import {
  RiRouteLine,
  RiStarFill,
  RiFireFill,
  RiCheckboxLine,
  RiFlagLine,
  RiTimeLine,
  RiGroupLine,
  RiCheckboxCircleFill,
  RiRecordCircleFill,
  RiRadioButtonLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { StageItem, CurrentTask, ActivityFeedItem, TeamUpdateItem } from "../types";

interface WorkExperienceOverviewProps {
  userName?: string;
  isEmpty?: boolean;
  points?: number;
  streakDays?: number;
  overallCompletion?: number;
  stages?: StageItem[];
  currentTask?: CurrentTask | null;
  currentStageDetails?: {
    title: string;
    description: string;
  } | null;
  recentActivity?: ActivityFeedItem[];
  teamUpdates?: TeamUpdateItem[];
  onContinueTask?: () => void;
  onViewTaskDetails?: () => void;
  onViewAllTeamUpdates?: () => void;
}

export default function WorkExperienceOverview({
  userName = "Mary",
  isEmpty = true,
  points = 0,
  streakDays = 0,
  overallCompletion = 0,
  stages = [],
  currentTask = null,
  currentStageDetails = null,
  recentActivity = [],
  teamUpdates = [],
  onContinueTask,
  onViewTaskDetails,
  onViewAllTeamUpdates,
}: WorkExperienceOverviewProps) {
  // SVG circular completion calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallCompletion / 100) * circumference;

  return (
    <div className="w-full flex flex-col gap-8 font-inter">
      {/* Welcome Greeting */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl md:text-[22px] font-bold text-[#1D1348] tracking-tight flex items-center gap-2">
          <span>{isEmpty ? `Welcome, ${userName}` : `Welcome back, ${userName}`}</span>
          <span>👋</span>
        </h2>
        <p className="text-xs md:text-sm text-[#3A3A3C]">
          {isEmpty
            ? "Your workspace is ready. Start an experience to bring it to life."
            : "Keep building real experience, shipping work and growing your skills."}
        </p>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* ================= CARD 1: Your Progress ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col shadow-xs min-h-[260px]">
          <h3 className="text-base font-semibold text-[#1D1348] mb-4">Your Progress</h3>

          {isEmpty ? (
            <div className="my-auto flex flex-col items-center justify-center text-center py-4">
              <div className="w-12 h-12 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center text-xl shadow-xs">
                <RiRouteLine size={24} />
              </div>
              <h4 className="font-semibold text-[#1D1348] text-sm md:text-base mt-4 mb-1">
                Your journey is waiting
              </h4>
              <p className="text-[#475467] text-xs md:text-sm max-w-xs leading-relaxed">
                Start an experience to unlock your stages and track your progress.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-6 my-auto py-2">
              {/* Circular Gauge */}
              <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-[#EBEBF5]"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-[#5160E7] transition-all duration-700 ease-out"
                    strokeWidth="9"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-[#1D1348] leading-none">
                    {overallCompletion}%
                  </span>
                  <span className="text-[11px] text-[#3A3A3C] mt-1 leading-tight max-w-[70px]">
                    Overall Completion
                  </span>
                </div>
              </div>

              {/* Stage Checklist */}
              <div className="flex flex-col gap-2.5 w-full">
                {stages.map((stage) => {
                  const isCompleted = stage.status === "completed";
                  const isCurrent = stage.status === "current";

                  return (
                    <div key={stage.id} className="flex items-center gap-2 text-xs sm:text-sm">
                      {isCompleted ? (
                        <RiCheckboxCircleFill size={18} className="text-[#10B981] shrink-0" />
                      ) : isCurrent ? (
                        <RiRecordCircleFill size={18} className="text-[#4F46E5] shrink-0" />
                      ) : (
                        <RiRadioButtonLine size={18} className="text-[#3A3A3C] shrink-0" />
                      )}

                      <span
                        className={`truncate ${
                          isCompleted
                            ? "text-[#1C1C1E] font-medium"
                            : isCurrent
                            ? "text-[#1C1C1E] font-semibold"
                            : "text-[#3A3A3C]"
                        }`}
                      >
                        {stage.name}
                      </span>

                      {isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-xl text-[11px] font-medium bg-[#F2F4FF] text-[#5160E7] shrink-0 ml-auto sm:ml-2">
                          Current
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ================= CARD 2: Stay Consistent ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col shadow-xs h-fit">
          <h3 className="text-base font-semibold text-[#1D1348] mb-4">Stay Consistent</h3>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 my-auto">
            {/* Points Tile */}
            <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] text-[#FBBF24]  flex items-center justify-center shrink-0">
                <RiStarFill size={20} className="stroke-1 stroke-[#F59E0B]"/>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold text-[#0F172A] leading-tight">
                  {points}
                </span>
                <span className="text-xs text-[#64748B]">points</span>
              </div>
            </div>

            {/* Streak Tile */}
            <div className="bg-[#FEF3F2] border border-[#FEE4E2]/70 rounded-xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FEE4E2] text-[#F04438] flex items-center justify-center shrink-0">
                <RiFireFill size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                  {streakDays}-day
                </span>
                <span className="text-xs text-gray-500">streak</span>
              </div>
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#3a3a3c] mt-4">
            {isEmpty
              ? "Complete your first task to earn points and start a streak."
              : "Keep going! Consistency helps you build real skills."}
          </p>
        </div>

        {/* ================= CARD 3: Your Current Focus ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col shadow-xs min-h-[260px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#1D1348]">Your Current Focus</h3>
            {!isEmpty && currentTask?.dueText && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F2F4FF] text-[#5160E7]">
                {currentTask.dueText}
              </span>
            )}
          </div>

          {isEmpty || !currentTask ? (
            <div className="my-auto flex flex-col items-center justify-center text-center py-4">
              <div className="w-12 h-12 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center text-xl shadow-xs">
                <RiCheckboxLine size={24} />
              </div>
              <h4 className="font-semibold text-[#1D1348] text-sm md:text-base mt-4 mb-1">
                No tasks yet
              </h4>
              <p className="text-[#475467] text-xs md:text-sm max-w-xs leading-relaxed">
                Your first task will appear here once you start an experience.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-1.5 my-2">
                <h4 className="font-bold text-base text-[#101828]">{currentTask.title}</h4>
                <p className="text-xs md:text-sm text-[#475467] leading-relaxed">
                  {currentTask.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <Button
                  type="button"
                  onClick={onContinueTask}
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-white bg-[#5160E7] hover:bg-[#5160E7] transition-colors cursor-pointer shadow-xs h-auto min-h-[40px]"
                >
                  Continue Task
                </Button>
                <Button
                  type="button"
                  onClick={onViewTaskDetails}
                  variant="bordered"
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#1D1348] bg-white border border-[#ECEBF0] hover:bg-white/95 transition-colors cursor-pointer shadow-xs h-auto min-h-[40px]"
                >
                  View Details
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* ================= CARD 4: Current Stage ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col shadow-xs min-h-[260px]">
          <h3 className="text-base font-bold text-[#101828] mb-4">Current Stage</h3>

          {isEmpty || !currentStageDetails ? (
            <div className="my-auto flex flex-col items-center justify-center text-center py-4">
              <div className="w-12 h-12 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center text-xl shadow-xs">
                <RiFlagLine size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm md:text-base mt-4 mb-1">
                No stage started
              </h4>
              <p className="text-gray-500 text-xs md:text-sm max-w-xs leading-relaxed">
                Choose an experience to unlock your first stage.
              </p>
            </div>
          ) : (
            <div className="my-auto bg-[#F2F4FF] rounded-2xl p-5 border border-[#EEF0FF]/80 flex flex-col gap-2">
              <h4 className="font-bold text-base text-[#101828]">{currentStageDetails.title}</h4>
              <p className="text-xs md:text-sm text-[#475467] leading-relaxed">
                {currentStageDetails.description}
              </p>
            </div>
          )}
        </div>

        {/* ================= CARD 5: Recent Activity ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col shadow-xs min-h-[260px]">
          <h3 className="text-base font-semibold text-[#1D1348] mb-4">Recent Activity</h3>

          {isEmpty || recentActivity.length === 0 ? (
            <div className="my-auto flex flex-col items-center justify-center text-center py-4">
              <div className="w-12 h-12 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center text-xl shadow-xs">
                <RiTimeLine size={24} />
              </div>
              <h4 className="font-semibold text-[#1D1348] text-sm md:text-base mt-4 mb-1">
                No activity yet
              </h4>
              <p className="text-[#475467] text-xs md:text-sm max-w-xs leading-relaxed">
                Your tasks, submissions and feedback will show up here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-100 my-auto">
              {recentActivity.map((item) => (
                <div key={item.id} className="py-3 flex items-start justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs sm:text-sm font-medium text-[#101828]">
                      {item.title}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#475467]">
                      {item.subtitle}
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs text-[#64748B] shrink-0">
                    {item.timeAgo}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= CARD 6: Team Updates ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col shadow-xs min-h-[260px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#1D1348]">Team Updates</h3>
            {!isEmpty && teamUpdates.length > 0 && (
              <button
                type="button"
                onClick={onViewAllTeamUpdates}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#5160E7] hover:underline cursor-pointer"
              >
                <span>View All</span>
                <RiArrowRightSLine size={16} />
              </button>
            )}
          </div>

          {isEmpty || teamUpdates.length === 0 ? (
            <div className="my-auto flex flex-col items-center justify-center text-center py-4">
              <div className="w-12 h-12 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center text-xl shadow-xs">
                <RiGroupLine size={24} />
              </div>
              <h4 className="font-semibold text-[#1D1348] text-sm md:text-base mt-4 mb-1">
                No updates yet
              </h4>
              <p className="text-[#475467] text-xs md:text-sm max-w-xs leading-relaxed">
                Updates from your team will appear here when there's something new.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 my-auto">
              {teamUpdates.map((update) => (
                <div key={update.id} className="flex items-start gap-3">
                  <Avatar
                    src={update.avatarUrl}
                    name={update.name}
                    className="w-9 h-9 shrink-0 text-xs font-semibold bg-[#F2F4FF] text-[#5160E7]"
                  />

                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-[#101828]">
                        {update.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F2F4FF] text-[#5160E7]">
                        {update.role}
                      </span>
                      <span className="text-[11px] text-[#64748B] ml-auto">
                        {update.timeAgo}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                      {update.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
