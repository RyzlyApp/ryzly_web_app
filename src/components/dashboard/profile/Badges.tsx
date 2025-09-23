import React, { useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";
import { FaAngleUp, FaAngleDown, FaCheck } from "react-icons/fa6";

interface BadgeData {
  id: number;
  title: string;
  points: number;
  icon: string;
  description: string;
  unlocked: boolean;
  milestones: string[];
}

interface BadgeProps {
  data: BadgeData;
}

const Badge: React.FC<BadgeProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`border border-gray-300 rounded-lg p-4 w-full `}>
      <div className="flex gap-3 items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">{data.icon}</span>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold">{data.title}</h4>
          <p className="text-xs text-gray-600">{data.points} points</p>
        </div>
        <div className="ms-auto">
          <button className="bg-[#5160E7] cursor-pointer rounded-full px-4 py-2 text-xs text-white hover:bg-[#4451c9] transition-colors">
            Share
          </button>
        </div>
      </div>

      <div
        className={`mt-4 ${isExpanded ? "bg-[#EEF0FF]" : ""} p-3 rounded-md`}
      >
        <button
          className="flex items-center w-full text-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>Milestones you unlocked</span>
          {isExpanded ? (
            <FaAngleUp className="ms-auto" />
          ) : (
            <FaAngleDown className="ms-auto" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-1 space-y-1">
            {data.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center p-1 rounded-lg">
                <FaCheck className="mr-2" />
                <span className="text-xs">{milestone}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Badges = () => {
  const badges = [
    {
      id: 1,
      title: "Rookie Rhyzler",
      points: 150,
      icon: "R",
      description: "Awarded for completing your first 10 tasks",
      unlocked: true,
      milestones: [
        "Completed first task",
        "Reached 50 points",
        "Completed 5 tasks in a row",
        "First week active on platform",
      ],
    },
    {
      id: 2,
      title: "Community Champion",
      points: 300,
      icon: "C",
      description: "For active participation in the community",
      unlocked: true,
      milestones: [
        "Posted first comment",
        "Received 10 upvotes",
        "Helped 5 community members",
        "Posted valuable content",
      ],
    },
    {
      id: 3,
      title: "Learning Explorer",
      points: 500,
      icon: "L",
      description: "For completing various learning paths",
      unlocked: false,
      milestones: [
        "Completed beginner course",
        "Finished intermediate level",
        "Mastered advanced concepts",
        "Became a subject expert",
      ],
    },
    {
      id: 4,
      title: "Consistency Master",
      points: 750,
      icon: "M",
      description: "Awarded for consistent activity over time",
      unlocked: true,
      milestones: [
        "7-day streak achieved",
        "30-day streak achieved",
        "90-day streak achieved",
        "Perfect attendance month",
      ],
    },
    {
      id: 5,
      title: "Innovation Guru",
      points: 1000,
      icon: "I",
      description: "For creative problem solving and innovation",
      unlocked: false,
      milestones: [
        "Submitted first solution",
        "Received innovation recognition",
        "Solved complex challenge",
        "Created unique approach",
      ],
    },
  ]
 

  const sortedBadges = [...badges].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    return b.points - a.points;
  });

  return (
    <div className="p-4">
      <div className="flex flex-col gap-5">
        {sortedBadges.map((badge) => (
          <div
            key={badge.id}
            className={`${!badge.unlocked ? "opacity-60" : ""}`}
          >
            <Badge data={badge} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
