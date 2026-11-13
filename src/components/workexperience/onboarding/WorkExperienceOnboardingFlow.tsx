"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button, Avatar } from "@heroui/react";
import {
  RiArrowLeftLine,
  RiBuilding4Line,
  RiBriefcaseLine,
  RiUser3Line,
  RiBarChart2Line,
  RiBrushLine,
  RiCompass3Line,
  RiFileTextLine,
  RiComputerLine,
  RiFolderLine,
  RiUserSmileLine,
  RiGiftLine,
  RiCheckLine,
  RiRadioButtonLine,
  RiRecordCircleFill,
  RiFocus3Line,
  RiMessage3Line,
  RiLightbulbLine,
  RiMacbookLine,
  RiArrowRightLine,
} from "react-icons/ri";

export interface WorkExperienceOnboardingFlowProps {
  workexperienceId: string;
  programTitle?: string;
  programDescription?: string;
  companiesCount?: number;
}

export type OnboardingStep = "intro" | "level" | "welcome" | "manager" | "workplace";

export default function WorkExperienceOnboardingFlow({
  workexperienceId = "product-design",
  programTitle = "Product Design Work Experience",
  programDescription = "Gain real product design experience by working on practical tasks, getting feedback from a manager, and building work you can add to your portfolio.",
  companiesCount = 2,
}: WorkExperienceOnboardingFlowProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Derive step from searchParams (default to "intro")
  const rawStep = searchParams.get("step");
  const validSteps: OnboardingStep[] = ["intro", "level", "welcome", "manager", "workplace"];
  const currentStep: OnboardingStep = validSteps.includes(rawStep as OnboardingStep)
    ? (rawStep as OnboardingStep)
    : "intro";

  // Derive level from searchParams (default to "beginner")
  const rawLevel = searchParams.get("level");
  const selectedLevel: "beginner" | "advanced" =
    rawLevel === "advanced" ? "advanced" : "beginner";

  // Destination workspace route
  const workspaceUrl = `/dashboard/workexperience/${workexperienceId}`;

  // Helper to transition steps and append step to the URL searchParams
  const navigateToStep = (step: OnboardingStep, level?: "beginner" | "advanced") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", step);
    if (level) {
      params.set("level", level);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Helper to change level in URL without changing step
  const handleSelectLevel = (level: "beginner" | "advanced") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("level", level);
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Advance to workplace dashboard
  const handleFinishOnboarding = () => {
    router.push(workspaceUrl);
  };

  return (
    <div className="w-full flex flex-col font-inter">
      {/* Dev / QA Step Preview Bar */}
      <div className="w-full flex items-center justify-between pb-6 mb-2 border-b border-gray-100">
        <Link
          href="/dashboard/workexperience"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5160E7] hover:underline"
        >
          <RiArrowLeftLine size={16} />
          <span>Back to Work Experience</span>
        </Link>

        {/* Step Jump Pills for testing */}
        <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-xl text-xs font-medium text-[#475467]">
          <button
            type="button"
            onClick={() => navigateToStep("intro")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              currentStep === "intro"
                ? "bg-white text-[#1D1348] font-bold shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            1. Intro
          </button>
          <button
            type="button"
            onClick={() => navigateToStep("level")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              currentStep === "level"
                ? "bg-white text-[#1D1348] font-bold shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            2. Level
          </button>
          <button
            type="button"
            onClick={() => navigateToStep("welcome")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              currentStep === "welcome"
                ? "bg-white text-[#1D1348] font-bold shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            3. Welcome
          </button>
          <button
            type="button"
            onClick={() => navigateToStep("manager")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              currentStep === "manager"
                ? "bg-white text-[#1D1348] font-bold shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            4. Manager
          </button>
          <button
            type="button"
            onClick={() => navigateToStep("workplace")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              currentStep === "workplace"
                ? "bg-white text-[#1D1348] font-bold shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            5. Workplace
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 0: INITIAL PAGE / PROGRAM INTRO (media_1794246755662_0f888224.jpg) */}
      {/* ========================================================================= */}
      {currentStep === "intro" && (
        <div className="w-full flex flex-col gap-8 pt-2">
          {/* Header Title & Subtitle */}
          <div className="flex flex-col gap-2 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D1348] tracking-tight">
              {programTitle}
            </h1>
            <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
              {programDescription}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm font-semibold text-[#1D1348]">
              <div className="flex items-center gap-1.5">
                <RiBuilding4Line size={17} className="text-[#64748B]" />
                <span>{companiesCount} companies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RiBriefcaseLine size={17} className="text-[#64748B]" />
                <span>Work on real tasks</span>
              </div>
            </div>
          </div>

          {/* 2-Column Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-2">
            {/* Left Column: What you'll work on */}
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1D1348]">
                  What you&apos;ll work on
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] mt-1 leading-relaxed">
                  Take on real-world product design tasks similar to what happens in a real company, including:
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-1">
                {/* 1 */}
                <div className="flex items-center gap-3.5 bg-white border border-gray-100 rounded-2xl p-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                    <RiUser3Line size={18} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#1D1348]">
                    Understand users and their problems
                  </span>
                </div>

                {/* 2 */}
                <div className="flex items-center gap-3.5 bg-white border border-gray-100 rounded-2xl p-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                    <RiBarChart2Line size={18} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#1D1348]">
                    Research and analyse opportunities
                  </span>
                </div>

                {/* 3 */}
                <div className="flex items-center gap-3.5 bg-white border border-gray-100 rounded-2xl p-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                    <RiBrushLine size={18} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#1D1348]">
                    Develop and design solutions
                  </span>
                </div>

                {/* 4 */}
                <div className="flex items-center gap-3.5 bg-white border border-gray-100 rounded-2xl p-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                    <RiCompass3Line size={18} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#1D1348]">
                    Test and improve your designs
                  </span>
                </div>

                {/* 5 */}
                <div className="flex items-center gap-3.5 bg-white border border-gray-100 rounded-2xl p-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                    <RiFileTextLine size={18} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#1D1348]">
                    Present and document your work
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: What you'll gain */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-base sm:text-lg font-bold text-[#1D1348]">
                  What you&apos;ll gain
                </h3>

                {/* 3 Benefit Cards in Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {/* Practical experience */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs flex flex-col gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                      <RiComputerLine size={17} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#1D1348]">
                        Practical experience
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#475467] leading-relaxed">
                        Work on structured tasks that build real product design skills.
                      </p>
                    </div>
                  </div>

                  {/* Portfolio-ready work */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs flex flex-col gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center shrink-0">
                      <RiFolderLine size={17} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#1D1348]">
                        Portfolio-ready work
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#475467] leading-relaxed">
                        Create work you can showcase to employers or clients.
                      </p>
                    </div>
                  </div>

                  {/* Manager feedback */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs flex flex-col gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#E8FAF0] text-[#10B981] flex items-center justify-center shrink-0">
                      <RiUserSmileLine size={17} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#1D1348]">
                        Manager feedback
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#475467] leading-relaxed">
                        Get guidance and constructive feedback as you work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Free Trial Callout Banner */}
              <div className="bg-[#F8F9FF] border border-[#5160E7]/30 rounded-2xl p-5 flex flex-col gap-1.5">
                <h4 className="text-sm font-bold text-[#1D1348]">
                  Try your first two tasks for free
                </h4>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  Start the experience, complete two real tasks, and see if it&apos;s the right fit for you before you decide to continue.
                </p>
              </div>

              {/* Bottom Action Buttons: Continue AND Proceed */}
              <div className="flex items-center justify-end gap-3 pt-4">
                {/* Continue button: Navigates straight to /dashboard/workexperience/[workexperienceId] */}
                <Button
                  as={Link}
                  href={workspaceUrl}
                  variant="bordered"
                  className="border border-[#ECEBF0] bg-white hover:bg-gray-50 text-[#1D1348] font-semibold text-xs sm:text-sm rounded-full px-6 py-2.5 shadow-xs transition-colors h-auto min-h-[42px]"
                >
                  Continue
                </Button>

                {/* Proceed button: Advances to Onboarding Step 1 */}
                <Button
                  onPress={() => navigateToStep("level")}
                  className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white font-semibold text-xs sm:text-sm rounded-full px-7 py-2.5 shadow-xs transition-colors h-auto min-h-[42px]"
                >
                  Proceed
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 1: CHOOSE YOUR EXPERIENCE LEVEL (media_1794246755669_b691848f.jpg)   */}
      {/* ========================================================================= */}
      {currentStep === "level" && (
        <div className="w-full flex flex-col gap-8 pt-2">
          {/* Header */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D1348] tracking-tight">
              Choose your experience level
            </h1>
            <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
              Pick the level that matches your current skills and goals. You can always take another level later.
            </p>
          </div>

          {/* 2 Selectable Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Beginner Card */}
            <div
              onClick={() => handleSelectLevel("beginner")}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer relative ${
                selectedLevel === "beginner"
                  ? "bg-white border-2 border-[#5160E7] shadow-md"
                  : "bg-white border border-gray-200 hover:border-gray-300 shadow-xs"
              }`}
            >
              <div className="flex flex-col gap-5">
                {/* Header row with Radio & Pill */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F2F4FF] text-[#5160E7]">
                    Build a strong foundation
                  </div>
                  <div>
                    {selectedLevel === "beginner" ? (
                      <RiRecordCircleFill size={22} className="text-[#5160E7]" />
                    ) : (
                      <RiRadioButtonLine size={22} className="text-gray-300" />
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1D1348]">
                    Beginner
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    Designed for those new to product design or looking to solidify fundamentals with structured guidance.
                  </p>
                </div>

                {/* Best for */}
                <div className="flex flex-col gap-1 text-xs sm:text-sm">
                  <span className="font-bold text-[#1D1348]">Best for:</span>
                  <span className="text-[#475467]">
                    Career switchers, recent graduates, or self-taught designers with limited portfolio work.
                  </span>
                </div>

                {/* What you'll do */}
                <div className="flex flex-col gap-2.5 pt-1">
                  <span className="text-xs sm:text-sm font-bold text-[#1D1348]">
                    What you&apos;ll do:
                  </span>
                  <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#475467]">
                    <li className="flex items-start gap-2">
                      <RiCheckLine size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                      <span>Conduct guided user interviews and synthesize insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <RiCheckLine size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                      <span>Create user personas, empathy maps, and journey maps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <RiCheckLine size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                      <span>Design wireframes and interactive low-fidelity prototypes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <RiCheckLine size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                      <span>Receive weekly manager reviews and structured feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <RiCheckLine size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                      <span>Build 1 complete end-to-end case study for your portfolio</span>
                    </li>
                  </ul>
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                  <span className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[11px] font-medium text-[#64748B]">
                    Duration: 4 weeks
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[11px] font-medium text-[#64748B]">
                    10–12 hrs/week
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#E8FAF0] text-[#10B981] text-[11px] font-semibold">
                    2 Tasks Free
                  </span>
                </div>
              </div>

              {/* Start for Free CTA */}
              <div className="pt-6 mt-4">
                <Button
                  onPress={() => {
                    navigateToStep("welcome", "beginner");
                  }}
                  className={`w-full rounded-full py-3 font-semibold text-xs sm:text-sm shadow-xs transition-colors h-auto min-h-[44px] ${
                    selectedLevel === "beginner"
                      ? "bg-[#5160E7] hover:bg-[#5160E7]/90 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-[#1D1348]"
                  }`}
                >
                  Start for Free
                </Button>
              </div>
            </div>

            {/* Advanced Card */}
            <div
              onClick={() => handleSelectLevel("advanced")}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer relative ${
                selectedLevel === "advanced"
                  ? "bg-white border-2 border-[#5160E7] shadow-md"
                  : "bg-white border border-gray-200 hover:border-gray-300 shadow-xs"
              }`}
            >
              <div className="flex flex-col gap-5">
                {/* Header row with Radio & Pill */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-[#475467]">
                    Tackle more complex work
                  </div>
                  <div>
                    {selectedLevel === "advanced" ? (
                      <RiRecordCircleFill size={22} className="text-[#5160E7]" />
                    ) : (
                      <RiRadioButtonLine size={22} className="text-gray-300" />
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1D1348]">
                    Advanced
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    For designers with foundational skills ready to solve deeper product challenges and lead design decisions.
                  </p>
                </div>

                {/* Best for */}
                <div className="flex flex-col gap-1 text-xs sm:text-sm">
                  <span className="font-bold text-[#1D1348]">Best for:</span>
                  <span className="text-[#475467]">
                    Designers with prior experience, bootcamp grads, or junior designers wanting to level up.
                  </span>
                </div>

                {/* What you'll do */}
                <div className="flex flex-col gap-2.5 pt-1">
                  <span className="text-xs sm:text-sm font-bold text-[#1D1348]">
                    What you&apos;ll do:
                  </span>
                  <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#475467]">
                    <li className="flex items-start gap-2">
                      <RiCheckLine size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                      <span>Frame complex product problems from business metrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <RiCheckLine size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                      <span>Lead design sprints and cross-functional alignment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <RiCheckLine size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                      <span>High-fidelity component systems and responsive UI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <RiCheckLine size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                      <span>Strategic trade-offs, edge cases, and design QA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <RiCheckLine size={16} className="text-[#10B981] mt-0.5 shrink-0" />
                      <span>Build an advanced case study with measurable impact</span>
                    </li>
                  </ul>
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                  <span className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[11px] font-medium text-[#64748B]">
                    Duration: 6 weeks
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[11px] font-medium text-[#64748B]">
                    12–15 hrs/week
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#E8FAF0] text-[#10B981] text-[11px] font-semibold">
                    2 Tasks Free
                  </span>
                </div>
              </div>

              {/* Start for Free CTA */}
              <div className="pt-6 mt-4">
                <Button
                  onPress={() => {
                    navigateToStep("welcome", "advanced");
                  }}
                  className={`w-full rounded-full py-3 font-semibold text-xs sm:text-sm shadow-xs transition-colors h-auto min-h-[44px] ${
                    selectedLevel === "advanced"
                      ? "bg-[#5160E7] hover:bg-[#5160E7]/90 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-[#1D1348]"
                  }`}
                >
                  Start for Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: WELCOME SCREEN (media_1794246755546_fba2afd7.png)                 */}
      {/* ========================================================================= */}
      {currentStep === "welcome" && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center pt-4">
          {/* Left Column Image: public/images/workexperince-sidecolumn.png */}
          <div className="relative w-full h-[340px] sm:h-[400px] md:h-[480px] rounded-3xl overflow-hidden shadow-sm">
            <Image
              src="/images/workexperince-sidecolumn.png"
              alt="Work experience workspace"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column Content */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D1348] tracking-tight">
                Welcome to your product design work experience.
              </h1>
              <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
                You&apos;re about to step into a simulated product design role, work on real-world tasks and build experience you can add to your portfolio.
              </p>
            </div>

            {/* Selected Level Callout Card */}
            <div className="bg-[#F8F9FF] border border-[#5160E7] rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-white text-[#5160E7] flex items-center justify-center shrink-0 shadow-2xs">
                <RiBarChart2Line size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-[#1D1348] capitalize">
                  {selectedLevel} level
                </h4>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  {selectedLevel === "beginner"
                    ? "A guided, hands-on experience to build your core skills."
                    : "An advanced, hands-on experience to tackle complex challenges."}
                </p>
              </div>
            </div>

            {/* Free Tasks Callout Card */}
            <div className="bg-[#F8F9FF]/70 border border-[#5160E7]/30 rounded-2xl p-4 sm:p-5 flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-white text-[#5160E7] flex items-center justify-center shrink-0 shadow-2xs">
                <RiGiftLine size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-[#1D1348]">
                  Your first two tasks are free
                </h4>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  Get a feel for the experience, the work and how it all works before you decide to continue.
                </p>
              </div>
            </div>

            {/* Next CTA: Meet Your Manager */}
            <div className="flex items-center justify-end pt-4">
              <Button
                onPress={() => navigateToStep("manager")}
                className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white font-semibold text-xs sm:text-sm rounded-full px-8 py-3 shadow-xs transition-colors h-auto min-h-[44px]"
              >
                Meet Your Manager
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: MEET YOUR MANAGER (media_1794246755517_71d35630.png)              */}
      {/* ========================================================================= */}
      {currentStep === "manager" && (
        <div className="w-full flex flex-col gap-8 pt-2">
          {/* Header */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D1348] tracking-tight">
              Meet Your Manager
            </h1>
            <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
              You won&apos;t be doing this alone. You&apos;ll work with an experienced product design manager who will guide you through the experience, review your work and give you feedback.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-2">
            {/* Left Column: Your manager will */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base sm:text-lg font-bold text-[#1D1348]">
                Your manager will:
              </h3>

              <div className="flex flex-col gap-3.5">
                {/* 1 */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                    <RiFocus3Line size={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-[#1D1348]">
                      Set clear, real-world tasks
                    </h4>
                    <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                      You&apos;ll receive briefs that mirror actual workplace assignments, with clear expectations and deadlines.
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                    <RiMessage3Line size={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-[#1D1348]">
                      Review your work and give feedback
                    </h4>
                    <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                      Every task you submit will be reviewed with actionable feedback to help you improve.
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                    <RiLightbulbLine size={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-[#1D1348]">
                      Support your growth and answer questions
                    </h4>
                    <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                      Get guidance through asynchronous check-ins, standups, and direct messaging.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Manager Profile Card */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs flex flex-col gap-5">
                {/* Avatar and Manager Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar
                      src="/images/sussan.jpg"
                      name="Amaka N."
                      className="w-16 h-16 text-large font-bold"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#10B981] border-2 border-white" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-bold text-[#1D1348]">Amaka N.</h4>
                    <p className="text-xs sm:text-sm text-[#475467]">
                      Product Design Manager
                    </p>
                    <span className="inline-flex max-w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F2F4FF] text-[#5160E7] mt-0.5">
                      5+ Years Experience
                    </span>
                  </div>
                </div>

                {/* Quote Callout Box */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-[#475467] italic leading-relaxed">
                  &ldquo;I&apos;m here to push your thinking, help you navigate design decisions, and give you the kind of feedback you&apos;d get on a real design team.&rdquo;
                </div>
              </div>

              {/* Next CTA: Meet Your Workplace */}
              <div className="flex items-center justify-end pt-2">
                <Button
                  onPress={() => navigateToStep("workplace")}
                  className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white font-semibold text-xs sm:text-sm rounded-full px-8 py-3 shadow-xs transition-colors h-auto min-h-[44px]"
                >
                  Meet Your Workplace
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: MEET YOUR WORKPLACE (media_1794246755517_5495525f.png)            */}
      {/* ========================================================================= */}
      {currentStep === "workplace" && (
        <div className="w-full flex flex-col gap-8 pt-2">
          {/* Header */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D1348] tracking-tight">
              Meet Your Workplace
            </h1>
            <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
              Here&apos;s the company you&apos;ll be working with during your Product Design work experience.
            </p>
          </div>

          {/* Workplace Main Card */}
          <div className="w-full bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 min-h-[300px]">
            {/* Left Content */}
            <div className="flex flex-col gap-6 max-w-md">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold text-[#1D1348]">
                  NovaHealth
                </h3>
                <p className="text-xs sm:text-sm text-[#475467]">
                  A healthtech company improving access to quality healthcare.
                </p>
              </div>

              <div className="flex items-start gap-4 pt-2">
                <div className="w-12 h-12 rounded-2xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0 shadow-2xs">
                  <RiMacbookLine size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5160E7]">
                    YOUR ROLE
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#1D1348]">
                    Product Designer
                  </h4>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    Work on real design tasks, solve user problems and contribute to the company&apos;s goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Graphic: NovaHealth Lanyard ID Card */}
            <div className="relative flex flex-col items-center justify-center py-4">
              {/* Lanyard Top Strap */}
              <div className="w-10 h-10 bg-[#5160E7] rounded-b-md flex items-end justify-center pb-1 shadow-xs z-10">
                <div className="w-4 h-2 bg-gray-200 rounded-sm border border-gray-400" />
              </div>

              {/* Lanyard Angled ID Card */}
              <div className="-mt-2 rotate-3 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg w-64 h-44 flex flex-col items-center justify-between transition-transform hover:rotate-0">
                {/* Card Top Punch Hole */}
                <div className="w-8 h-2 rounded-full bg-gray-100 border border-gray-200" />

                {/* Logo & Brand */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-1 text-[#5160E7]">
                    <span className="w-3.5 h-3.5 rounded-tr-full rounded-bl-full bg-[#5160E7] inline-block" />
                    <span className="w-3.5 h-3.5 rounded-tl-full rounded-br-full bg-[#5160E7] inline-block -ml-1" />
                  </div>
                  <span className="font-extrabold text-sm sm:text-base text-[#1D1348] tracking-tight">
                    NovaHealth
                  </span>
                </div>

                {/* Bottom Barcode / ID Line */}
                <div className="w-full flex flex-col items-center gap-1">
                  <div className="w-32 h-1.5 bg-[#EEF0FF] rounded-full" />
                  <div className="w-20 h-1 bg-gray-100 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA: Let's Get to Work */}
          <div className="flex items-center justify-end pt-2">
            <Button
              onPress={handleFinishOnboarding}
              className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white font-semibold text-xs sm:text-sm rounded-full px-8 py-3 shadow-xs transition-colors h-auto min-h-[44px] flex items-center gap-2"
            >
              <span>Let&apos;s Get to Work</span>
              <RiArrowRightLine size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
