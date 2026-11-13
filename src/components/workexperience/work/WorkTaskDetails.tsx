"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

interface WorkTaskDetailsProps {
  workexperienceId: string;
  workId: string;
}

export default function WorkTaskDetails({
  workexperienceId,
  workId,
}: WorkTaskDetailsProps) {
  const submissionUrl = `/dashboard/workexperience/${workexperienceId}/work/${workId}/submission`;

  return (
    <div className="w-full flex flex-col gap-8 font-inter bg-white p-5 rounded-3xl shadow-xs">
      {/* 1. Task Overview */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-[#1D1348]">Task Overview</h3>
        <p className="text-xs sm:text-sm text-[#1C1C1E] leading-relaxed">
          Based on the feedback and insights from the previous task, create 2–3 alternative design directions for the product. Explain the thinking behind each option and how it addresses the user needs and feedback.
        </p>
      </div>

      {/* 2. What to do (Numbered steps) */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold text-[#1D1348]">What to do</h3>

        <div className="flex flex-col gap-3.5">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#F2F4FF] text-[#5160E7] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <span className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
              Define 2–3 distinct design directions (e.g. layout, flow, or visual style).
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#F2F4FF] text-[#5160E7] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <span className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
              Create high-fidelity or mid-fidelity screens for each direction.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#F2F4FF] text-[#5160E7] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <span className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
              Write a short rationale for each option (why it works, trade-offs and risks).
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#F2F4FF] text-[#5160E7] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              4
            </span>
            <span className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
              Recommend the direction you think we should move forward with and why.
            </span>
          </div>
        </div>
      </div>

      {/* 3. Expected deliverable Callout */}
      <div className="bg-[#F2F4FF] rounded-2xl p-4 flex flex-col gap-1.5">
        <h4 className="text-sm font-bold text-[#1D1348]">Expected deliverable</h4>
        <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
          A design presentation (PDF or Figma link) with your design options, rationale and recommendation.
        </p>
      </div>

      {/* 4. Action Button */}
      <div className="flex items-center justify-end pt-2">
        <Button
          as={Link}
          href={submissionUrl}
          className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-8 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[42px]"
        >
          Submit Task
        </Button>
      </div>
    </div>
  );
}
