"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { RiCheckLine } from "react-icons/ri";

export type TaskFeedbackStatus = "needs_improvement" | "passed";

interface WorkTaskFeedbackProps {
  workexperienceId: string;
  workId: string;
  initialStatus?: TaskFeedbackStatus;
  reviewerName?: string;
  reviewerRole?: string;
}

export default function WorkTaskFeedback({
  workexperienceId,
  workId,
  initialStatus = "passed",
  reviewerName = "Daniel O.",
  reviewerRole = "Product Design Manager",
}: WorkTaskFeedbackProps) {
  const [feedbackStatus, setFeedbackStatus] =
    useState<TaskFeedbackStatus>(initialStatus);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const isNeedsImprovement = feedbackStatus === "needs_improvement";

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* 1. Header Row with Title & Interactive State Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h3 className="text-base sm:text-lg font-bold text-[#1D1348]">
          Task Feedback
        </h3>

        {/* State Preview Switcher */}
        <div className="inline-flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFeedbackStatus("passed")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              !isNeedsImprovement
                ? "bg-white text-gray-900 shadow-xs font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Passed (Image 1)
          </button>
          <button
            type="button"
            onClick={() => setFeedbackStatus("needs_improvement")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              isNeedsImprovement
                ? "bg-white text-gray-900 shadow-xs font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Needs Improvement (Image 5)
          </button>
        </div>
      </div>

      {/* 2. Feedback Status Banner */}
      {isNeedsImprovement ? (
        /* Needs Improvement Banner (Image 5) */
        <div className="bg-[#FFFAEB] border border-[#FFFAEB] rounded-3xl p-5 sm:p-6 flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#EA580C] text-white flex items-center justify-center shrink-0 font-bold text-2xl">
            !
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-base sm:text-lg font-bold text-[#DC6803]">
              Needs Improvement
            </span>
            <span className="text-xs sm:text-sm text-[#3A3A3C] font-normal leading-relaxed mt-0.5">
              Your submission doesn&apos;t fully meet the task requirements. Review
              the feedback below, make the necessary changes, and resubmit.
            </span>
          </div>
        </div>
      ) : (
        /* Passed Green Banner (Image 1) */
        <div className="bg-[#D1FADF] border border-[#D1FADF] rounded-3xl p-5 sm:p-6 flex items-center gap-4 shadow-xs">
          {/* Solid Green Circle with Confetti Accents matching screenshot */}
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#039855]" />
            <span className="absolute -top-1 left-2 w-1 h-1 rounded-full bg-[#039855]" />
            <span className="absolute bottom-0 -left-1 w-1.5 h-1.5 rounded-full bg-[#039855]" />
            <div className="w-11 h-11 rounded-full bg-[#039855] text-white flex items-center justify-center shadow-xs">
              <RiCheckLine size={24} className="stroke-[1.5]" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-lg sm:text-[22px] font-bold text-[#054F31]">
              Passed
            </span>
            <span className="text-xs sm:text-sm text-[#039855] font-medium leading-relaxed mt-1">
              Great work! Your submission meets the requirements for this task.
            </span>
          </div>
        </div>
      )}

      {/* 3. Reviewer Feedback Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-xs flex flex-col gap-4">
        <h4 className="text-sm sm:text-base font-bold text-[#101828]">
          Reviewer Feedback
        </h4>

        <div className="flex items-center gap-3">
          <Avatar
            name={reviewerName}
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            className="w-10 h-10 text-xs font-bold shrink-0 bg-[#F2F4FF] text-[#5160E7]"
          />
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-[#1C1C1E]">
              {reviewerName}
            </span>
            <span className="text-xs text-[#3A3A3C] font-medium">
              {reviewerRole}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
          {isNeedsImprovement
            ? "You've made a good start, but the submission needs a few improvements to fully address the task. See the key areas below and the revision instructions."
            : "You explored the design directions well and provided a clear rationale for each option. Your thinking is user-focused, and the recommendations show good product judgment. The deliverables are well presented and easy to follow."}
        </p>
      </div>

      {/* 4. Dual Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: What you did well */}
        <div className="bg-[#FFFAEB] border border-[#FFFAEB] rounded-3xl p-5 sm:p-6 flex flex-col gap-3">
          <h4 className="text-sm sm:text-base font-bold text-[#1D1348]">
            What you did well
          </h4>

          <div className="flex flex-col gap-2.5">
            {isNeedsImprovement ? (
              <>
                <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
                  Explored multiple design directions.
                </p>
                <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
                  Showed a clear understanding of the problem and user needs.
                </p>
              </>
            ) : (
              <>
                <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
                  Presented two distinct design directions with clear differences.
                </p>
                <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
                  Explained the rationale behind each option.
                </p>
                <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
                  Made a user-centered recommendation and supported it with reasons.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right: What to Improve (Image 5) OR A small suggestion (Image 1) */}
        <div className="bg-[#F2F4FF] border border-[#EEF0FF] rounded-3xl p-5 sm:p-6 flex flex-col gap-3">
          <h4 className="text-sm sm:text-base font-bold text-[#101828]">
            {isNeedsImprovement ? "What to Improve" : "A small suggestion"}
          </h4>

          {isNeedsImprovement ? (
            <div className="flex flex-col gap-2.5">
              <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
                Strengthen the rationale for each design direction.
              </p>
              <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
                Show how each option addresses the core user need (e.g. with a short comparison).
              </p>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
              In future tasks, consider briefly mentioning potential risks or
              trade-offs (e.g. implementation effort, edge cases).
            </p>
          )}
        </div>
      </div>

      {/* 5. Bottom Action CTA */}
      <div className="flex items-center justify-center pt-2 ml-auto">
        {isNeedsImprovement ? (
          <Button
            as={Link}
            href={`/dashboard/workexperience/${workexperienceId}/work/${workId}/resubmit`}
            className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-10 py-3 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[44px]"
          >
            Resubmit Task
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleShare}
            className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-8 py-3 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[44px]"
          >
            {copied ? "Link Copied!" : "Share Feedback with Friends"}
          </Button>
        )}
      </div>
    </div>
  );
}
