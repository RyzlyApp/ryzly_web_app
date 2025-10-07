"use client";
import { useState } from "react";
import { CustomButton } from "@/components/custom";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { IoAtCircleOutline } from "react-icons/io5";
import { BiCheck, BiCircle } from "react-icons/bi";

interface Badge {
  id: string;
  title: string;
  points: number;
  icon: string;
  milestones: string[];
  isUnlocked: boolean;
}

interface BadgesTabProps {
  userId: string;
}

const mockBadges: Badge[] = [
  {
    id: "1",
    title: "Rookie Rhyzer",
    points: 150,
    icon: "🛡️",
    milestones: [
      "Joined first challenge",
      "Submitted 1 task to a challenge",
      "Gave 2 peer helpful feedback",
    ],
    isUnlocked: true,
  },
  {
    id: "2",
    title: "Champ",
    points: 300,
    icon: "🏆",
    milestones: [
      "Completed 5 challenges",
      "Won 2 challenges",
      "Helped 10+ participants",
    ],
    isUnlocked: false,
  },
  {
    id: "3",
    title: "Active Rhyzer",
    points: 200,
    icon: "👑",
    milestones: [
      "Participated in 3 consecutive challenges",
      "Maintained 80% completion rate",
      "Active for 30+ days",
    ],
    isUnlocked: false,
  },
  {
    id: "4",
    title: "Mentor",
    points: 500,
    icon: "🎓",
    milestones: [
      "Became a coach",
      "Mentored 5+ participants",
      "Received 4.5+ star rating",
    ],
    isUnlocked: false,
  },
];

export default function BadgesTab({ userId }: BadgesTabProps) {
  const [expandedBadges, setExpandedBadges] = useState<string[]>([]);

  const toggleExpanded = (badgeId: string) => {
    setExpandedBadges((prev) =>
      prev.includes(badgeId)
        ? prev.filter((id) => id !== badgeId)
        : [...prev, badgeId]
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockBadges.map((badge) => (
          <div key={badge.id} className="bg-gray-50 rounded-lg p-4 h-fit">
            <div className="flex items-center gap-4">
              {/* Badge Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                  {badge.icon}
                </div>
              </div>

              {/* Badge Details */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-gray-600">{badge.points} points</p>
              </div>
            </div>

            <div
              className={`mt-4 p-3 ${
                expandedBadges.includes(badge.id) && "bg-[#EEF0FF]"
              } rounded-lg`}
            >
              <button
                onClick={() => toggleExpanded(badge.id)}
                className={`flex items-center justify-between w-full text-left `}
              >
                <span className="text-xs font-medium">
                  {badge.isUnlocked
                    ? "Milestones unlocked"
                    : "Milestones unlock"}
                </span>
                {expandedBadges.includes(badge.id) ? (
                  <RiArrowUpSLine size={16} className="text-gray-500" />
                ) : (
                  <RiArrowDownSLine size={16} className="text-gray-500" />
                )}
              </button>
              {expandedBadges.includes(badge.id) && (
                <div className="mt-3 space-y-2">
                  {badge.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-500"
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center `}
                      >
                        {badge.isUnlocked ? (
                          <span className="text-xs">
                            <BiCheck />
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">
                            <BiCircle />
                          </span>
                        )}
                      </div>
                      <span className={`text-xs `}>{milestone}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
