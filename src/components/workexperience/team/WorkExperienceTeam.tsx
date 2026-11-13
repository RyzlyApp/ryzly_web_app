"use client";

import React from "react";
import TeamMemberCard, { TeamMemberData } from "./TeamMemberCard";

const TEAM_MEMBERS: TeamMemberData[] = [
  {
    id: "daniel",
    name: "Daniel O.",
    role: "Product Designer (Manager)",
    roleBadge: "Manager",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    isOnline: true,
  },
  {
    id: "amaka",
    name: "Amaka N.",
    role: "Product Designer",
    roleBadge: "Member",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    isOnline: true,
  },
  {
    id: "tolu",
    name: "Tolu A.",
    role: "UX Researcher",
    roleBadge: "Member",
    avatarUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&auto=format&fit=crop&q=80",
    isOnline: true,
  },
  {
    id: "zainab",
    name: "Zainab K.",
    role: "Content Designer",
    roleBadge: "Member",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    isOnline: false,
  },
  {
    id: "emeka",
    name: "Emeka S.",
    role: "Frontend Developer",
    roleBadge: "Member",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    isOnline: false,
  },
  {
    id: "chidera",
    name: "Chidera M.",
    role: "Product Designer",
    roleBadge: "Member",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    isOnline: false,
  },
];

interface WorkExperienceTeamProps {
  workexperienceId?: string;
}

export default function WorkExperienceTeam({
  workexperienceId = "product-design",
}: WorkExperienceTeamProps) {
  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* Page Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1348] tracking-tight">
          Team Members
        </h1>
      </div>

      {/* Main White Card Container with 3-Column Grid */}
      <div className="w-full bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              workexperienceId={workexperienceId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
