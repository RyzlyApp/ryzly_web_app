"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
} from "@heroui/react";
import {
  RiLightbulbLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import StandupAudioPlayer from "./StandupAudioPlayer";

export type StandupSubTab = "my" | "team";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  isOnline?: boolean;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "daniel",
    name: "Daniel O.",
    role: "Product Designer",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    isOnline: true,
  },
  {
    id: "amaka",
    name: "Amaka N.",
    role: "Product Manager",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    isOnline: true,
  },
  {
    id: "tolu",
    name: "Tolu A.",
    role: "UX Researcher",
    avatarUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80",
    isOnline: true,
  },
  {
    id: "zainab",
    name: "Zainab K.",
    role: "Content Designer",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    isOnline: true,
  },
  {
    id: "emeka",
    name: "Emeka S.",
    role: "Frontend Developer",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    isOnline: true,
  },
];

interface WorkExperienceStandupsProps {
  workexperienceId?: string;
  initialTab?: StandupSubTab;
}

export default function WorkExperienceStandups({
  workexperienceId = "product-design",
  initialTab = "my",
}: WorkExperienceStandupsProps) {
  const [subTab, setSubTab] = useState<StandupSubTab>(initialTab);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("daniel");

  const submitUrl = `/dashboard/workexperience/${workexperienceId}/standups/submit`;

  // Circular gauge values for 2/3 progress
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = 2 / 3;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* 1. Header: Title, Sub-tabs Switcher & Submit CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-4 sm:gap-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1348] tracking-tight">
            Standups
          </h1>

          {/* Sub-Tab Pills (My Standups vs Team Standups) */}
          <Tabs
            aria-label="Standups views"
            selectedKey={subTab}
            onSelectionChange={(key) => setSubTab(key as StandupSubTab)}
            radius="full"
            variant="light"
            classNames={{
              base: "p-0",
              tabList: "bg-white p-0 gap-1",
              cursor: "bg-[#1D1348] rounded-full shadow-xs",
              tab: "rounded-full px-5 py-2 h-auto text-xs font-semibold data-[selected=true]:text-white",
              tabContent:
                "group-data-[selected=true]:text-white text-[#475467] group-data-[hover=true]:text-[#1D1348] group-data-[selected=true]:font-semibold",
            }}
          >
            <Tab key="my" title="My Standups" />
            <Tab key="team" title="Team Standups" />
          </Tabs>
        </div>

        {/* Submit Standup Button */}
        <Button
          as={Link}
          href={submitUrl}
          className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[40px] shrink-0"
        >
          Submit Standup
        </Button>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* Left Column (Stage / Goal / Tips OR Team List) */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          {subTab === "my" ? (
            /* MY STANDUPS LEFT SIDEBAR (Image 4) */
            <>
              {/* Card 1: Stage & Goal with 2/3 Circular Ring */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-[#1D1348]">
                    Stage 2: Design &amp; Iterate
                  </h3>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button
                        variant="light"
                        size="sm"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#64748B] hover:text-[#1D1348] transition-colors p-0 h-auto min-w-0 bg-transparent data-[hover=true]:bg-transparent"
                        endContent={<RiArrowDownSLine size={16} />}
                      >
                        Stage 2
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Select stage">
                      <DropdownItem key="stage-1">Stage 1: Onboarding</DropdownItem>
                      <DropdownItem key="stage-2">Stage 2: Design &amp; Iterate</DropdownItem>
                      <DropdownItem key="stage-3">Stage 3: User Testing</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-[#3A3A3C] font-medium">
                      Standup goal
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E]">
                        3
                      </span>
                      <span className="text-xs sm:text-sm text-[#3A3A3C]">
                        standups required
                      </span>
                    </div>
                  </div>

                  {/* Circular Progress Gauge */}
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
                    <svg
                      className="w-full h-full -rotate-90 transform"
                      viewBox="0 0 72 72"
                    >
                      {/* Background track */}
                      <circle
                        cx="36"
                        cy="36"
                        r={radius}
                        className="stroke-[#EBEBF5]"
                        strokeWidth="6"
                        fill="transparent"
                      />
                      {/* Active progress arc */}
                      <circle
                        cx="36"
                        cy="36"
                        r={radius}
                        className="stroke-[#5160E7] transition-all duration-700 ease-out"
                        strokeWidth="6"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                        2/3
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Standup tips */}
              <div className="bg-[#F2F4FF] rounded-3xl border border-[#5160E7]/30 p-6 flex flex-col gap-3.5 shadow-xs">
                <div className="flex items-center gap-2 text-[#5160E7]">
                  <RiLightbulbLine size={20} />
                  <h4 className="text-sm sm:text-sm font-bold text-[#1C1C1E]">
                    Standup tips
                  </h4>
                </div>

                <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
                  <p>Keep it short (2–3 minutes or a few lines).</p>
                  <p>Focus on progress, next steps, and blockers.</p>
                  <p>Use a voice note if that&apos;s faster.</p>
                </div>
              </div>
            </>
          ) : (
            /* TEAM STANDUPS LEFT SIDEBAR (Image 3) */
            <>
              {/* Card 1: Stage Info */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-[#1D1348]">
                    Stage 2: Design &amp; Iterate
                  </h3>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button
                        variant="light"
                        size="sm"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#64748B] hover:text-[#1D1348] transition-colors p-0 h-auto min-w-0 bg-transparent data-[hover=true]:bg-transparent"
                        endContent={<RiArrowDownSLine size={16} />}
                      >
                        Stage 2
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Select stage">
                      <DropdownItem key="stage-1">Stage 1: Onboarding</DropdownItem>
                      <DropdownItem key="stage-2">Stage 2: Design &amp; Iterate</DropdownItem>
                      <DropdownItem key="stage-3">Stage 3: User Testing</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <span className="text-xs font-semibold text-[#1C1C1E]">
                    Team Standups
                  </span>
                  <p className="text-xs text-[#3A3A3C] leading-relaxed">
                    Keep up with your team&apos;s progress and identify ways to
                    collaborate.
                  </p>
                </div>
              </div>

              {/* Card 2: Team Members List */}
              <div className="bg-white rounded-3xl border border-gray-100 p-5 flex flex-col gap-1.5 shadow-xs">
                <h4 className="text-sm font-bold text-[#1C1C1E] mb-2 px-2">
                  Team (5)
                </h4>

                <div className="flex flex-col gap-1">
                  {TEAM_MEMBERS.map((member) => {
                    const isSelected = selectedMemberId === member.id;
                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => setSelectedMemberId(member.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left cursor-pointer ${
                          isSelected
                            ? "bg-[#F2F4FF] shadow-xs"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="relative shrink-0">
                          <Avatar
                            name={member.name}
                            src={member.avatarUrl}
                            className="w-10 h-10 text-xs font-bold bg-[#F2F4FF] text-[#5160E7]"
                          />
                          {member.isOnline && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-white" />
                          )}
                        </div>

                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs sm:text-sm font-bold text-[#1C1C1E] truncate">
                            {member.name}
                          </span>
                          <span className="text-[11px] sm:text-xs text-[#3A3A3C] truncate">
                            {member.role}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Standup Entries Feed (Oct 30, 2026 & Oct 28, 2026) */}
        <div className="lg:col-span-7 w-full flex flex-col gap-6">
          {/* Entry 1: Oct 30, 2026 */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs sm:text-sm font-bold text-[#1C1C1E]">
              Oct 30, 2026
            </span>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-5 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {/* Worked on */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-bold text-[#10B981]">
                    Worked on
                  </span>
                  <p className="text-xs text-[#3A3A3C] leading-relaxed">
                    Explored two design directions and developed low-fidelity
                    wires.
                  </p>
                </div>

                {/* Next */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-bold text-[#5160E7]">
                    Next
                  </span>
                  <p className="text-xs text-[#3A3A3C] leading-relaxed">
                    Refine the chosen direction and create high-fidelity designs.
                  </p>
                </div>

                {/* Blockers */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-bold text-[#F59E0B]">
                    Blockers
                  </span>
                  <p className="text-xs text-[#3A3A3C] leading-relaxed">
                    None at the moment.
                  </p>
                </div>
              </div>

              {/* Audio player */}
              <StandupAudioPlayer duration="0:42" />
            </div>
          </div>

          {/* Entry 2: Oct 28, 2026 */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs sm:text-sm font-bold text-[#1C1C1E]">
              Oct 28, 2026
            </span>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-5 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {/* Worked on */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-bold text-[#10B981]">
                    Worked on
                  </span>
                  <p className="text-xs text-[#3A3A3C] leading-relaxed">
                    Reviewed feedback and updated the design rationale.
                  </p>
                </div>

                {/* Next */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-bold text-[#5160E7]">
                    Next
                  </span>
                  <p className="text-xs text-[#3A3A3C] leading-relaxed">
                    Incorporate final changes and prepare for resubmission.
                  </p>
                </div>

                {/* Blockers */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-bold text-[#F59E0B]">
                    Blockers
                  </span>
                  <p className="text-xs text-[#3A3A3C] leading-relaxed">
                    Waiting for clarification on the target user segment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
