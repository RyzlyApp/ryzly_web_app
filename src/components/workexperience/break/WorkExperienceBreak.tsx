"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { RiCupLine, RiCheckLine, RiCalendarLine } from "react-icons/ri";

interface WorkExperienceBreakProps {
  workexperienceId?: string;
}

export default function WorkExperienceBreak({
  workexperienceId: _workexperienceId,
}: WorkExperienceBreakProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleToggleBreak = () => {
    setIsPaused(!isPaused);
    setSuccessMessage(
      !isPaused
        ? "Work experience paused. Deadlines are frozen."
        : "Work experience resumed. Welcome back!"
    );
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1348] tracking-tight">
          Take a Break
        </h1>
        <p className="text-xs sm:text-sm text-[#475467]">
          Manage your schedule, pause upcoming task deadlines, and resume whenever you&apos;re ready.
        </p>
      </div>

      {successMessage && (
        <div className="p-3 bg-[#E8FAF0] border border-[#A6F4C5] rounded-xl text-xs font-semibold text-[#10B981] flex items-center gap-2">
          <RiCheckLine size={16} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Break Card */}
      <div className="w-full bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-xs min-h-[380px]">
        <div className="w-16 h-16 rounded-2xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center text-3xl mb-4 shadow-xs">
          <RiCupLine size={32} />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-[#1D1348] mb-2 tracking-tight">
          {isPaused ? "Work Experience is Currently Paused" : "Need to Pause Your Program?"}
        </h3>
        <p className="text-xs sm:text-sm text-[#475467] max-w-md leading-relaxed mb-6">
          {isPaused
            ? "Your deadlines are frozen and your streak is preserved. Click below when you are ready to resume work."
            : "Life happens! You can pause your deadlines for up to 14 days without penalties. Your progress and points will be completely preserved."}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            type="button"
            onClick={handleToggleBreak}
            className={`rounded-full px-8 py-3 text-xs sm:text-sm font-semibold transition-all shadow-xs h-auto min-h-[42px] ${
              isPaused
                ? "bg-[#10B981] hover:bg-[#10B981]/90 text-white"
                : "bg-[#5160E7] hover:bg-[#5160E7]/90 text-white"
            }`}
          >
            {isPaused ? "Resume Work Experience" : "Pause My Work Experience"}
          </Button>

          <Button
            type="button"
            variant="bordered"
            className="border-[#ECEBF0] bg-white hover:bg-gray-50 text-[#101828] rounded-full px-6 py-3 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[42px]"
            startContent={<RiCalendarLine size={16} className="text-[#64748B]" />}
          >
            Set Custom Break Window
          </Button>
        </div>
      </div>
    </div>
  );
}
