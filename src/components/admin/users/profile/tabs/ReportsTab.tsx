"use client";
import { Avatar } from "@heroui/react";

interface Report {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  description: string;
  date: string;
}

interface ReportsTabProps {
  userId: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    user: {
      name: "Adebayo Nwosu",
      avatar: "/work.jpg",
    },
    description:
      "This user is sending inappropriate or offensive messages in the community.",
    date: "29 Jul 2025",
  },
  {
    id: "2",
    user: {
      name: "Adaobi Adeyemi",
      avatar: "/work.jpg",
    },
    description:
      "This user has been spamming challenges with irrelevant links.",
    date: "29 Jul 2025",
  },
  {
    id: "3",
    user: {
      name: "Chukwu Nnamani",
      avatar: "/work.jpg",
    },
    description: "This account has violated community guidelines.",
    date: "29 Jul 2025",
  },
  {
    id: "4",
    user: {
      name: "Chidi Adebayo",
      avatar: "/work.jpg",
    },
    description:
      "This user's submissions appear plagiarized and not their own work.",
    date: "29 Jul 2025",
  },
  {
    id: "5",
    user: {
      name: "Chidi Adebayo",
      avatar: "/work.jpg",
    },
    description:
      "They are using multiple accounts to game the leaderboard unfairly.",
    date: "29 Jul 2025",
  },
  {
    id: "6",
    user: {
      name: "Chidi Adebayo",
      avatar: "/work.jpg",
    },
    description:
      "The profile information looks suspicious and may be misleading.",
    date: "29 Jul 2025",
  },
];

export default function ReportsTab({ userId }: ReportsTabProps) {
  return (
    <div>
      {/* Reports Count */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {mockReports.length} Reports
        </h3>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {mockReports.map((report) => (
          <div
            key={report.id}
            className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <Avatar
              src={report.user.avatar}
              alt={report.user.name}
              className="w-10 h-10 flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-900">
                  {report.user.name}
                </h4>
                <span className="text-xs text-gray-500">{report.date}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {report.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
          ← Previous
        </button>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-2 text-sm rounded ${
                page === 2
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
          Next →
        </button>
      </div>
    </div>
  );
}
