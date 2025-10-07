"use client";
import { Avatar } from "@heroui/react";

interface Coach {
  id: string;
  name: string;
  avatar: string;
}

const mockCoaches: Coach[] = [
  {
    id: "1",
    name: "Oluwakemi Ogunde",
    avatar: "/work.jpg",
  },
  {
    id: "2",
    name: "Adaobi Nwosu",
    avatar: "/work.jpg",
  },
  {
    id: "3",
    name: "Chidi Adebayo",
    avatar: "/work.jpg",
  },
  {
    id: "4",
    name: "Chidi Adebayo",
    avatar: "/work.jpg",
  },
];

const ChallengeCoaches = () => {
  return (
    <div className="">
      <div className="space-y-3">
        {mockCoaches.map((coach) => (
          <div key={coach.id} className="flex items-center gap-3 p-3">
            <Avatar src={coach.avatar} alt={coach.name} className="w-10 h-10" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900">
                {coach.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeCoaches;
