"use client";

import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import {
  WorkExperienceOverview,
  StageItem,
  CurrentTask,
  ActivityFeedItem,
  TeamUpdateItem,
} from "@/components/workexperience";

const ACTIVE_STAGES: StageItem[] = [
  { id: 1, name: "Stage 1: Onboarding", status: "completed" },
  { id: 2, name: "Stage 2: Design & Iterate", status: "current" },
  { id: 3, name: "Stage 3: User Testing", status: "upcoming" },
  { id: 4, name: "Stage 4: Final Delivery", status: "upcoming" },
  { id: 5, name: "Stage 5: Wrap Up", status: "upcoming" },
];

const ACTIVE_CURRENT_TASK: CurrentTask = {
  title: "Iterate on the product concept",
  description:
    "Refine the initial design based on team feedback and usability insights.",
  dueText: "Due in 2 days",
};

const ACTIVE_STAGE_DETAILS = {
  title: "Design & Iterate",
  description:
    "Turn insights into improved design solutions. You'll refine your concepts, explore options and prepare a stronger design for testing.",
};

const ACTIVE_RECENT_ACTIVITY: ActivityFeedItem[] = [
  {
    id: "act-1",
    title: "Your submission was reviewed",
    subtitle: "Onboarding flow • Feedback added",
    timeAgo: "2h ago",
  },
  {
    id: "act-2",
    title: "Team standup submitted",
    subtitle: "Team Ember • 5 updates",
    timeAgo: "6h ago",
  },
  {
    id: "act-3",
    title: "New task added",
    subtitle: "User testing plan • Due Nov 14",
    timeAgo: "8h ago",
  },
];

const ACTIVE_TEAM_UPDATES: TeamUpdateItem[] = [
  {
    id: "update-1",
    name: "Daniel O.",
    role: "Product Manager",
    timeAgo: "6h ago",
    message:
      "I've shared the updated user feedback in Resources. It highlights a few areas we should improve in the next iteration.",
  },
  {
    id: "update-2",
    name: "Ada K.",
    role: "Product Designer",
    timeAgo: "1d ago",
    message:
      "Here are two alternative layouts for the dashboard. Let me know which direction feels stronger before I refine further.",
  },
];

export default function WorkExperienceOverviewPage() {
  const [userState] = useAtom(userAtom);
  const user = userState?.data;

  // State toggle for empty vs active state preview
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  // Derive first name, fallback to "Mary" for empty state or "Grace" for active state
  const userFirstName =
    user?.fullName?.split(" ")?.[0] || (isEmpty ? "Mary" : "Grace");

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* Preview State Toggle */}
      <div className="w-full flex items-center justify-end">
        <div className="inline-flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl text-xs font-medium text-gray-600">
          <button
            type="button"
            onClick={() => setIsEmpty(true)}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              isEmpty
                ? "bg-white text-gray-900 shadow-xs font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Empty State
          </button>
          <button
            type="button"
            onClick={() => setIsEmpty(false)}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              !isEmpty
                ? "bg-white text-gray-900 shadow-xs font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Active State
          </button>
        </div>
      </div>

      {/* Tab Content: Overview View */}
      <WorkExperienceOverview
        userName={userFirstName}
        isEmpty={isEmpty}
        points={isEmpty ? 0 : 120}
        streakDays={isEmpty ? 0 : 3}
        overallCompletion={isEmpty ? 0 : 40}
        stages={isEmpty ? [] : ACTIVE_STAGES}
        currentTask={isEmpty ? null : ACTIVE_CURRENT_TASK}
        currentStageDetails={isEmpty ? null : ACTIVE_STAGE_DETAILS}
        recentActivity={isEmpty ? [] : ACTIVE_RECENT_ACTIVITY}
        teamUpdates={isEmpty ? [] : ACTIVE_TEAM_UPDATES}
        onContinueTask={() => console.log("Continue task clicked")}
        onViewTaskDetails={() => console.log("View details clicked")}
        onViewAllTeamUpdates={() => console.log("View all updates clicked")}
      />
    </div>
  );
}
