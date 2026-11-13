"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Avatar, Button, Chip } from "@heroui/react";
import { RiChat3Line, RiUser3Line } from "react-icons/ri";
import TeamMemberDrawer from "./TeamMemberDrawer";

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  roleBadge: "Manager" | "Member";
  avatarUrl: string;
  isOnline?: boolean;
}

interface TeamMemberCardProps {
  member: TeamMemberData;
  workexperienceId?: string;
}

export default function TeamMemberCard({
  member,
  workexperienceId = "product-design",
}: TeamMemberCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isManager = member.roleBadge === "Manager";

  return (
    <>
      <div className="border border-gray-100 rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-5 bg-white shadow-xs hover:border-gray-200 transition-all">
        {/* Top: Avatar & Info */}
        <div className="flex items-center gap-3.5">
          {/* Avatar with Online Status Dot */}
          <div className="relative shrink-0">
            <Avatar
              name={member.name}
              src={member.avatarUrl}
              className="w-12 h-12 text-sm font-bold bg-[#F2F4FF] text-[#5160E7]"
            />
            {member.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10B981] ring-2 ring-white" />
            )}
          </div>

          {/* Name, Badge & Role */}
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-[#1C1C1E] truncate">
                {member.name}
              </span>

              {isManager ? (
                <Chip
                  variant="flat"
                  size="sm"
                  classNames={{
                    base: "bg-[#E8FAF0] text-[#10B981] h-5 px-2 rounded-full border-none",
                    content: "font-semibold text-[11px] p-0 leading-none",
                  }}
                >
                  Manager
                </Chip>
              ) : (
                <Chip
                  variant="flat"
                  size="sm"
                  classNames={{
                    base: "bg-[#FFFBEB] text-[#D97706] h-5 px-2 rounded-full border-none",
                    content: "font-semibold text-[11px] p-0 leading-none",
                  }}
                >
                  Member
                </Chip>
              )}
            </div>

            <span className="text-xs sm:text-sm text-[#3A3A3C] font-medium mt-0.5 truncate">
              {member.role}
            </span>
          </div>
        </div>

        {/* Bottom Actions: Message & View Profile */}
        <div className="flex items-center gap-2.5 pt-1">
          <Button
            as={Link}
            href={`/dashboard/workexperience/${workexperienceId}/messages`}
            className="bg-[#F2F4FF] hover:bg-[#EEF0FF] text-[#5160E7] rounded-full px-4 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors flex-1 h-auto min-h-[36px]"
          >
            <RiChat3Line size={15} />
            <span>Message</span>
          </Button>

          <Button
            type="button"
            onClick={() => setIsOpen(true)}
            variant="bordered"
            className="border-[#ECEBF0] bg-white hover:bg-gray-50 text-[#1C1C1E] rounded-full px-4 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors flex-1 h-auto min-h-[36px] shadow-xs"
          >
            <RiUser3Line size={15} className="text-[#3A3A3C]" />
            <span>View Profile</span>
          </Button>
        </div>
      </div>

      {/* HeroUI Accessible Slide-over Drawer */}
      <TeamMemberDrawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        member={member}
        workexperienceId={workexperienceId}
      />
    </>
  );
}
