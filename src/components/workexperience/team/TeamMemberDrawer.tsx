"use client";

import React from "react";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Avatar,
  Button,
} from "@heroui/react";
import {
  RiInformationLine,
  RiScales3Line,
  RiFlashlightLine,
  RiTeamLine,
} from "react-icons/ri";
import { TeamMemberData } from "./TeamMemberCard";

interface TeamMemberDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMemberData | null;
  workexperienceId?: string;
}

const DEFAULT_SKILLS = [
  "Product Design",
  "UX Research",
  "Wireframing",
  "Prototyping",
  "User Testing",
  "Design Systems",
];

export default function TeamMemberDrawer({
  isOpen,
  onOpenChange,
  member,
  workexperienceId = "product-design",
}: TeamMemberDrawerProps) {
  if (!member) return null;

  const isManager = member.roleBadge === "Manager";

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="right"
      backdrop="blur"
      size="lg"
      classNames={{
        base: "bg-white p-4 sm:p-6 font-inter shadow-2xl max-w-xl",
        closeButton: "top-5 right-5 text-gray-400 hover:text-gray-700 cursor-pointer",
      }}
    >
      <DrawerContent>
        {() => (
          <>
            {/* Drawer Header */}
            <DrawerHeader className="pb-4 pt-1 px-2 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D1348] tracking-tight">
                {isManager ? "Manager Profile" : "Team Member Profile"}
              </h2>
            </DrawerHeader>

            {/* Drawer Body */}
            <DrawerBody className="py-6 px-2 flex flex-col gap-6 overflow-y-auto">
              {/* 1. Profile Header Row: Avatar, Info & Send Message */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Avatar with Online Status Dot */}
                  <div className="relative shrink-0">
                    <Avatar
                      name={member.name}
                      src={member.avatarUrl}
                      className="w-16 h-16 sm:w-20 sm:h-20 text-lg font-bold bg-[#F2F4FF] text-[#5160E7]"
                    />
                    {member.isOnline && (
                      <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#10B981] ring-2 ring-white" />
                    )}
                  </div>

                  {/* Name, Role & Experience Pill */}
                  <div className="flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1D1348]">
                      {member.name}
                    </h3>
                    <span className="text-xs sm:text-sm text-[#475467] mt-0.5">
                      {isManager ? "Product Designer Manager" : member.role}
                    </span>

                    {isManager && (
                      <span className="inline-flex items-center bg-[#F2F4FF] text-[#5160E7] text-xs font-semibold px-3 py-1 rounded-full mt-2 w-fit">
                        5 Years Experience
                      </span>
                    )}
                  </div>
                </div>

                {/* Send Message CTA Button */}
                <Button
                  as={Link}
                  href={`/dashboard/workexperience/${workexperienceId}/messages`}
                  onClick={() => onOpenChange(false)}
                  className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[38px] shrink-0"
                >
                  Send Message
                </Button>
              </div>

              {/* 2. About Section */}
              <div className="flex flex-col gap-2 pt-2">
                <h4 className="text-sm sm:text-base font-bold text-[#1D1348]">
                  About
                </h4>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  Product designer focused on creating simple, user-centred
                  experiences that solve real problems. I enjoy turning ideas
                  into usable, impactful products and collaborating with
                  cross-functional teams.
                </p>
              </div>

              {/* 3. Skills & Ryzly Points Section */}
              {isManager ? (
                /* Manager: Full-width Skills Section */
                <div className="flex flex-col gap-2.5 pt-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#1D1348]">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {DEFAULT_SKILLS.map((skill) => (
                      <span
                        key={skill}
                        className="bg-[#F2F4F7] text-[#3A3A3C] text-xs font-medium px-3.5 py-1.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                /* Team Member: Side-by-side Skills & Ryzly Points */
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2 items-start">
                  {/* Left Column: Skills */}
                  <div className="sm:col-span-7 flex flex-col gap-2.5">
                    <h4 className="text-sm sm:text-base font-bold text-[#1D1348]">
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {DEFAULT_SKILLS.map((skill) => (
                        <span
                          key={skill}
                          className="bg-[#F2F4F7] text-[#3A3A3C] text-xs font-medium px-3.5 py-1.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Ryzly Points */}
                  <div className="sm:col-span-5 flex flex-col gap-2.5">
                    <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#1D1348]">
                      <span>Ryzly Points</span>
                      <RiInformationLine
                        size={15}
                        className="text-[#64748B] cursor-pointer"
                        title="Points earned through tasks and active collaboration"
                      />
                    </div>

                    <div className="bg-[#F4F6FE] rounded-2xl p-4 sm:p-5 flex flex-col">
                      <span className="text-2xl sm:text-3xl font-bold text-[#1C1C1E]">
                        2,450
                      </span>
                      <span className="text-xs text-[#475467] mt-1">
                        Total points earned
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Current Work Experience Box (for Team Members) */}
              {!isManager && (
                <div className="border border-gray-100 rounded-2xl p-4 sm:p-5 flex items-center justify-between bg-white shadow-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs sm:text-sm font-bold text-[#1C1C1E]">
                      Current Work Experience
                    </span>
                    <span className="text-xs text-[#475467]">
                      Product Design — Technology
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-[#5160E7] shrink-0">
                    Stage 2
                  </span>
                </div>
              )}

              {/* 5. Achievements Section (for Team Members) */}
              {!isManager && (
                <div className="flex flex-col gap-3 pt-1">
                  <h4 className="text-sm sm:text-base font-bold text-[#1D1348]">
                    Achievements
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Badge 1: Challenge Winner */}
                    <div className="border border-gray-100 rounded-2xl p-4 flex flex-col items-start gap-1 bg-white shadow-xs">
                      <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center shrink-0">
                        <RiScales3Line size={18} />
                      </div>
                      <span className="text-xs font-bold text-[#101828] mt-1.5">
                        Challenge Winner
                      </span>
                      <span className="text-[11px] text-[#475467]">
                        1 win
                      </span>
                    </div>

                    {/* Badge 2: Active Collaborator */}
                    <div className="border border-gray-100 rounded-2xl p-4 flex flex-col items-start gap-1 bg-white shadow-xs">
                      <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center shrink-0">
                        <RiFlashlightLine size={18} />
                      </div>
                      <span className="text-xs font-bold text-[#101828] mt-1.5">
                        Active Collaborator
                      </span>
                      <span className="text-[11px] text-[#475467]">
                        5+ team contributions
                      </span>
                    </div>

                    {/* Badge 3: Team Player */}
                    <div className="border border-gray-100 rounded-2xl p-4 flex flex-col items-start gap-1 bg-white shadow-xs">
                      <div className="w-8 h-8 rounded-xl bg-[#FFF7ED] text-[#F97316] flex items-center justify-center shrink-0">
                        <RiTeamLine size={18} />
                      </div>
                      <span className="text-xs font-bold text-[#101828] mt-1.5">
                        Team Player
                      </span>
                      <span className="text-[11px] text-[#475467]">
                        Completed 3 team tasks
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
