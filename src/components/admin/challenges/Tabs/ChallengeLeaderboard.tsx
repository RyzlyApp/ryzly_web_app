"use client";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import CustomButton from "@/components/custom/customButton";
import { RiDownloadLine, RiFilePdfLine, RiFileTextLine } from "react-icons/ri";

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  score: number;
  tasksCompleted: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    rank: 1,
    name: "Oluwaseun Obioma",
    avatar: "/work.jpg",
    score: 65,
    tasksCompleted: 4,
  },
  {
    id: "2",
    rank: 2,
    name: "Oluwaseun Obioma",
    avatar: "/work.jpg",
    score: 65,
    tasksCompleted: 4,
  },
  {
    id: "3",
    rank: 3,
    name: "Oluwaseun Obioma",
    avatar: "/work.jpg",
    score: 65,
    tasksCompleted: 4,
  },
  {
    id: "4",
    rank: 4,
    name: "Oluwaseun Obioma",
    avatar: "/work.jpg",
    score: 65,
    tasksCompleted: 4,
  },
  {
    id: "5",
    rank: 5,
    name: "Adebola Ogunde",
    avatar: "/work.jpg",
    score: 50,
    tasksCompleted: 4,
  },
  {
    id: "6",
    rank: 6,
    name: "Folake Adebayo",
    avatar: "/work.jpg",
    score: 48,
    tasksCompleted: 4,
  },
  {
    id: "7",
    rank: 7,
    name: "Oluwadamilare Adeyemi",
    avatar: "/work.jpg",
    score: 45,
    tasksCompleted: 4,
  },
  {
    id: "8",
    rank: 8,
    name: "Babatunde Oludare",
    avatar: "/work.jpg",
    score: 30,
    tasksCompleted: 4,
  },
  {
    id: "9",
    rank: 9,
    name: "Folake Adekunle",
    avatar: "/work.jpg",
    score: 29,
    tasksCompleted: 4,
  },
  {
    id: "10",
    rank: 10,
    name: "Adaobi Ogunde",
    avatar: "/work.jpg",
    score: 20,
    tasksCompleted: 4,
  },
];

const ChallengeLeaderboard = () => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-600";
    if (rank === 2) return "text-gray-500";
    if (rank === 3) return "text-amber-600";
    return "text-gray-700";
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Leaderboard</h2>
        <Dropdown>
          <DropdownTrigger>
            <button className="p-3">
              <RiDownloadLine size={20} color="#5160E7" />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Download options">
            <DropdownItem
              key="pdf"
              startContent={<RiFilePdfLine className="w-4 h-4 text-red-500" />}
            >
              PDF
            </DropdownItem>
            <DropdownItem
              key="csv"
              startContent={
                <RiFileTextLine className="w-4 h-4 text-green-500" />
              }
            >
              CSV
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="space-y-3">
        {mockLeaderboard.map((entry) => (
          <div key={entry.id} className="flex items-center gap-4 py-2 bg-white">
            <div className="flex-shrink-0">
              <span className={`text-sm`}>{entry.rank}</span>
            </div>

            <div className="flex-shrink-0 ms-3">
              <Avatar
                src={entry.avatar}
                alt={entry.name}
                className="w-12 h-12"
              />
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900">
                {entry.name}
              </h4>

              <p className="text-xs text-gray-900 mt-1">
                {entry.score}% total score
              </p>
            </div>

            <div className="flex-shrink-0 text-right"></div>
            <div className="flex-shrink-0 text-right">
              <p className="text-sm font-semibold text-gray-900">
                {entry.tasksCompleted}
              </p>
              <p className="text-xs text-gray-600">Task done</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeLeaderboard;
