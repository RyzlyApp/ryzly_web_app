"use client";
import { Avatar, Input } from "@heroui/react";

interface Participant {
  id: string;
  name: string;
  avatar: string;
}

const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "Adebayo Nwosu",
    avatar: "/work.jpg",
  },
  {
    id: "2",
    name: "Adaobi Adeyemi",
    avatar: "/work.jpg",
  },
  {
    id: "3",
    name: "Obinna Nwosu",
    avatar: "/work.jpg",
  },
  {
    id: "4",
    name: "Oluwakemi Ogunde",
    avatar: "/work.jpg",
  },
  {
    id: "5",
    name: "Adaobi Nwosu",
    avatar: "/work.jpg",
  },
  {
    id: "6",
    name: "Chukwu Nnamani",
    avatar: "/work.jpg",
  },
  {
    id: "7",
    name: "Adaobi Nwosu",
    avatar: "/work.jpg",
  },
  {
    id: "8",
    name: "Chidi Adebayo",
    avatar: "/work.jpg",
  },
];

const ChallengeParticipants = () => {
  return (
    <div className="">
      <div className="mb-6">
        <Input
          placeholder="Search participants"
          className="w-full rounded-full"
          startContent={
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
        />
      </div>
      <div className="space-y-1">
        {mockParticipants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center gap-3 p-3 bg-white "
          >
            <Avatar
              src={participant.avatar}
              alt={participant.name}
              className="w-10 h-10"
            />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900">
                {participant.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeParticipants;
