"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Accordion, AccordionItem } from "@heroui/react";
import {
  RiArrowLeftLine,
  RiBriefcaseLine,
  RiMicLine,
  RiLightbulbLine,
  RiCheckLine,
} from "react-icons/ri";
import StandupAudioPlayer from "./StandupAudioPlayer";
import { StandupRecordModal } from "../modals";

interface StandupSubmitFormProps {
  workexperienceId?: string;
  stageName?: string;
}

export default function StandupSubmitForm({
  workexperienceId = "product-design",
  stageName = "Stage 2: Design & Iterate",
}: StandupSubmitFormProps) {
  const router = useRouter();

  const [workedOn, setWorkedOn] = useState("");
  const [workingOnNext, setWorkingOnNext] = useState("");
  const [isBlocked, setIsBlocked] = useState<"no" | "yes">("no");

  // Audio recording state (true = recorded state; false = unrecorded state)
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [recordedDuration, setRecordedDuration] = useState("0:40");
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage("Standup submitted successfully!");
    setTimeout(() => {
      router.push(`/dashboard/workexperience/${workexperienceId}/standups`);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* 1. Top Navigation: Back to Standups link */}
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/workexperience/${workexperienceId}/standups`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5160E7] hover:underline transition-colors group"
        >
          <RiArrowLeftLine
            size={18}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span>Back to Standups</span>
        </Link>

        {/* State Preview Switcher */}
        <div className="inline-flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-medium shrink-0">
          <button
            type="button"
            onClick={() => setHasVoiceNote(true)}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              hasVoiceNote
                ? "bg-white text-gray-900 shadow-xs font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Voice Recorded
          </button>
          <button
            type="button"
            onClick={() => setHasVoiceNote(false)}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              !hasVoiceNote
                ? "bg-white text-gray-900 shadow-xs font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Voice Unrecorded
          </button>
          <button
            type="button"
            onClick={() => setIsRecordModalOpen(true)}
            className="px-3 py-1 rounded-lg transition-all cursor-pointer bg-[#5160E7] text-white hover:bg-[#5160E7]/90 font-semibold"
          >
            Record Modal
          </button>
        </div>
      </div>

      {/* 2. Header: Title, Description & Stage Pill */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1348] tracking-tight">
          Submit Standup
        </h1>
        <p className="text-xs sm:text-sm text-[#3A3A3C]">
          Share a quick update on your progress, next steps, and any blockers. You
          can also just record a voice note
        </p>

        <div className="pt-1">
          <span className="inline-flex items-center gap-1.5 bg-[#F2F4FF] text-[#5160E7] text-xs font-semibold px-3 py-1 rounded-full border border-[#EEF0FF]">
            <RiBriefcaseLine size={13} />
            <span>{stageName}</span>
          </span>
        </div>
      </div>

      {/* Success banner if submitted */}
      {submittedMessage && (
        <div className="p-3 bg-[#E8FAF0] border border-[#A6F4C5] rounded-xl text-xs font-semibold text-[#10B981] flex items-center gap-2">
          <RiCheckLine size={16} />
          <span>{submittedMessage}</span>
        </div>
      )}

      {/* 3. Main Two-Column Layout */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2"
      >
        {/* Left Column: Form Card */}
        <div className="lg:col-span-8 w-full bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 flex flex-col gap-7 shadow-xs">
          {/* Question 1: What did you work on? */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full border-2 border-[#5160E7] text-[#5160E7] flex items-center justify-center font-bold text-sm shrink-0">
                1
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#1C1C1E]">
                What did you work on?
              </h3>
            </div>

            <textarea
              rows={4}
              value={workedOn}
              onChange={(e) => setWorkedOn(e.target.value)}
              placeholder="This is a test project"
              className="w-full border border-gray-200 rounded-2xl p-4 text-xs sm:text-sm text-[#1C1C1E] placeholder-gray-400 focus:outline-none focus:border-[#5160E7] focus:ring-1 focus:ring-[#5160E7] transition-all resize-y"
            />
          </div>

          {/* Question 2: What are you working on next? */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full border-2 border-[#5160E7] text-[#5160E7] flex items-center justify-center font-bold text-sm shrink-0">
                2
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#1C1C1E]">
                What are you working on next?
              </h3>
            </div>

            <textarea
              rows={4}
              value={workingOnNext}
              onChange={(e) => setWorkingOnNext(e.target.value)}
              placeholder="This is a test project"
              className="w-full border border-gray-200 rounded-2xl p-4 text-xs sm:text-sm text-[#1C1C1E] placeholder-gray-400 focus:outline-none focus:border-[#5160E7] focus:ring-1 focus:ring-[#5160E7] transition-all resize-y"
            />
          </div>

          {/* Question 3: Are you facing any blockers? */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full border-2 border-[#5160E7] text-[#5160E7] flex items-center justify-center font-bold text-sm shrink-0">
                3
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#1C1C1E]">
                Are you facing any blockers?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Option A: No blockers */}
              <button
                type="button"
                onClick={() => setIsBlocked("no")}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                  isBlocked === "no"
                    ? "border-[#5160E7] bg-[#F2F4FF]/50 shadow-xs"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isBlocked === "no"
                      ? "border-[#5160E7] bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isBlocked === "no" && (
                    <div className="w-2 h-2 rounded-full bg-[#5160E7]" />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#1C1C1E]">
                  No blockers
                </span>
              </button>

              {/* Option B: Yes, I'm blocked */}
              <button
                type="button"
                onClick={() => setIsBlocked("yes")}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                  isBlocked === "yes"
                    ? "border-[#5160E7] bg-[#F2F4FF]/50 shadow-xs"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isBlocked === "yes"
                      ? "border-[#5160E7] bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isBlocked === "yes" && (
                    <div className="w-2 h-2 rounded-full bg-[#5160E7]" />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#1C1C1E]">
                  Yes, I&apos;m blocked
                </span>
              </button>
            </div>
          </div>

          {/* Voice Note Section */}
          <div className="pt-1">
            {hasVoiceNote ? (
              /* Recorded Voice Note State */
              <StandupAudioPlayer
                duration={recordedDuration}
                onDelete={() => setHasVoiceNote(false)}
              />
            ) : (
              /* Unrecorded Voice Note State */
              <div
                onClick={() => setIsRecordModalOpen(true)}
                className="border-2 border-dashed border-[#5160E7] rounded-2xl p-7 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-white hover:bg-[#F2F4FF]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                  <RiMicLine size={24} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1C1C1E]">
                  Or record a voice note
                </span>
                <span className="text-[11px] sm:text-xs text-[#3A3A3C] mt-0.5">
                  Record standup (up to 3 minutes)
                </span>
              </div>
            )}
          </div>

          {/* Action CTA: Submit Standup */}
          <div className="flex items-center ml-auto pt-2">
            <Button
              type="submit"
              className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-10 py-3 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[44px]"
            >
              Submit Standup
            </Button>
          </div>
        </div>

        {/* Right Column: Tips & Example Standup */}
        <aside className="lg:col-span-4 w-full flex flex-col gap-6">
          {/* Card 1: Standup tips */}
          <div className="bg-[#F2F4FF] rounded-3xl border border-[#5160E7] p-6 flex flex-col gap-3.5 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="text-[#5160E7]">
                <RiLightbulbLine size={20} />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#1C1C1E]">
                Standup tips
              </h4>
            </div>

            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
              <p>Keep it short (2–3 minutes or a few lines).</p>
              <p>Focus on progress, next steps, and blockers.</p>
              <p>Use a voice note if that&apos;s faster.</p>
            </div>
          </div>

          {/* Card 2: Example standup (Collapsible Accordion) */}
          <Accordion
            showDivider={false}
            className="p-0"
            defaultExpandedKeys={["example-standup"]}
            itemClasses={{
              base: "bg-white rounded-3xl border border-gray-100 p-6 shadow-xs",
              trigger:
                "p-0 flex items-center justify-between w-full text-left cursor-pointer",
              title: "text-sm sm:text-base font-bold text-[#1C1C1E]",
              indicator: "text-[#64748B]",
              content: "pt-3.5 pb-0 px-0",
            }}
          >
            <AccordionItem
              key="example-standup"
              aria-label="Example standup"
              title="Example standup"
            >
              <div className="bg-[#F8F9FC] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 border border-gray-100/80">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-[#10B981] tracking-wide">
                    Worked on
                  </span>
                  <p className="text-xs text-[#3A3A3C] leading-relaxed">
                    Reviewed feedback and updated the design rationale.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-[#5160E7] tracking-wide">
                    Next
                  </span>
                  <p className="text-xs text-[#3A3A3C] leading-relaxed">
                    Incorporate final changes and prepare for resubmission.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-[#F59E0B] tracking-wide">
                    Blockers
                  </span>
                  <p className="text-xs text-[#3A3A3C] leading-relaxed">
                    Waiting for clarification on the target user segment.
                  </p>
                </div>
              </div>
            </AccordionItem>
          </Accordion>
        </aside>
      </form>

      {/* Standup Voice Recording Modal */}
      <StandupRecordModal
        isOpen={isRecordModalOpen}
        onOpenChange={setIsRecordModalOpen}
        onSaveVoiceNote={(duration) => {
          setRecordedDuration(duration);
          setHasVoiceNote(true);
        }}
      />
    </div>
  );
}
