"use client";
import { useState } from "react";
import Image from "next/image";
import { Tabs, Tab } from "@heroui/react";

interface Community {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  members: number;
  createdBy: string;
  status: "Active" | "Pending" | "Banned";
  createdAt: string;
  category: string;
}

interface CommunityReport {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
}

interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  role: "Admin" | "Moderator" | "Member";
  joinedAt: string;
}

const mockReports: CommunityReport[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Adebayo Nwosu",
    userAvatar: "/avatars/user1.jpg",
    content: "Plagiarized or copied material",
    date: "29 Jul 2025",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Adaobi Adeyemi",
    content:
      "This challenge description is misleading. The tasks don't match what was advertised.",
    userAvatar: "/avatars/user2.jpg",
    date: "29 Jul 2025",
  },
  {
    id: "3",
    userId: "user3",
    userName: "Oluwakemi Ogunde",
    userAvatar: "/avatars/user3.jpg",
    content:
      "The coach has not been responsive, and resources promised in the challenge are missing",
    date: "29 Jul 2025",
  },
];

// Mock data for Members
const mockMembers: CommunityMember[] = [
  {
    id: "1",
    name: "Ngozi Nnamani",
    avatar: "/avatars/ngozi.jpg",
    role: "Admin",
    joinedAt: "25 Jun 2025",
  },
  {
    id: "2",
    name: "Chidi Adebayo",
    avatar: "/avatars/chidi.jpg",
    role: "Moderator",
    joinedAt: "28 Jun 2025",
  },
  {
    id: "3",
    name: "Eleanor Pena",
    avatar: "/avatars/eleanor.jpg",
    role: "Member",
    joinedAt: "30 Jun 2025",
  },
];

interface CommunityDetailProps {
  community: Community;
  onClose: () => void;
}

export default function CommunityDetail({
  community,
  onClose,
}: CommunityDetailProps) {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div className="bg-white z-50 overflow-y-auto">
      <div className="relative">
        {/* Header Image */}
        <div className="h-48 w-full relative">
          <Image
            src={community.thumbnail}
            alt={community.name}
            fill
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 p-2 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Community Info */}
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">{community.name}</h1>
          <p className="text-gray-600 mt-2">{community.description}</p>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Created by</span>
              <span className="text-sm font-medium">{community.createdBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Members</span>
              <span className="text-sm font-medium">{community.members}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
          >
            <Tab key="General" title="General">
              <div className="py-4">
                <h3 className="font-medium mb-4">About Community</h3>
                <p className="text-gray-600">{community.description}</p>
              </div>
            </Tab>
            <Tab key="Reports" title="Reports">
              <div className="py-4">
                <ReportsList communityId={community.id} />
              </div>
            </Tab>
            <Tab key="Members" title="Members">
              <div className="py-4">
                <MembersList communityId={community.id} />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Update the placeholder components with real UI
function ReportsList({ communityId }: { communityId: string }) {
  return (
    <div className="space-y-4">
      {mockReports.map((report) => (
        <div key={report.id} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Image
              src={report.userAvatar}
              alt={report.userName}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{report.userName}</p>
              <p className="text-xs text-gray-500">{report.date}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">{report.content}</p>
        </div>
      ))}
    </div>
  );
}

function MembersList({ communityId }: { communityId: string }) {
  return (
    <div className="space-y-4">
      {mockMembers.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <Image
              src={member.avatar}
              alt={member.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs text-gray-500">Joined {member.joinedAt}</p>
            </div>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              member.role === "Admin"
                ? "bg-blue-100 text-blue-800"
                : member.role === "Moderator"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {member.role}
          </span>
        </div>
      ))}
    </div>
  );
}
