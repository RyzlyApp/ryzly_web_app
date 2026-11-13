"use client";

import React, { Key, useState, useEffect } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
import { Tabs, Tab } from "@heroui/react";

export const WORK_EXPERIENCE_TABS = [
  "Overview",
  "My Work",
  "Standups",
  "Messages",
  "Performance",
  "Team",
  "Take a Break",
  "Resources",
] as const;

export type WorkExperienceTab = (typeof WORK_EXPERIENCE_TABS)[number];

interface WorkExperienceTabsProps {
  activeTab?: WorkExperienceTab | string;
  workexperienceId?: string;
  onTabChange?: (tab: WorkExperienceTab) => void;
}

export const getTabRoute = (experienceId: string, tab: WorkExperienceTab): string => {
  const base = `/dashboard/workexperience/${experienceId}`;
  switch (tab) {
    case "My Work":
      return `${base}/work`;
    case "Standups":
      return `${base}/standups`;
    case "Messages":
      return `${base}/messages`;
    case "Performance":
      return `${base}/performance`;
    case "Team":
      return `${base}/team`;
    case "Take a Break":
      return `${base}/break`;
    case "Resources":
      return `${base}/resources`;
    case "Overview":
    default:
      return base;
  }
};

export default function WorkExperienceTabs({
  activeTab,
  workexperienceId,
  onTabChange,
}: WorkExperienceTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const id = workexperienceId || (params?.workexperienceId as string) || "product-design";

  // Derive current tab accurately from the route path without colliding with "/workexperience"
  const detectActiveTab = (): WorkExperienceTab => {
    if (activeTab) return activeTab as WorkExperienceTab;
    if (!pathname) return "Overview";

    // Match exact tab segments after /dashboard/workexperience/[id]
    if (pathname.endsWith("/work") || pathname.includes("/work/")) return "My Work";
    if (pathname.endsWith("/standups") || pathname.includes("/standups/")) return "Standups";
    if (pathname.endsWith("/messages") || pathname.includes("/messages/")) return "Messages";
    if (pathname.endsWith("/performance") || pathname.includes("/performance/")) return "Performance";
    if (pathname.endsWith("/team") || pathname.includes("/team/")) return "Team";
    if (pathname.endsWith("/break") || pathname.includes("/break/")) return "Take a Break";
    if (pathname.endsWith("/resources") || pathname.includes("/resources/")) return "Resources";
    return "Overview";
  };

  const [selectedTab, setSelectedTab] = useState<WorkExperienceTab>(detectActiveTab());

  // Keep state in sync whenever pathname or activeTab prop updates
  useEffect(() => {
    setSelectedTab(detectActiveTab());
  }, [pathname, activeTab]);

  const handleSelectionChange = (key: Key) => {
    const selected = key as WorkExperienceTab;
    // Provide instant local feedback so the cursor moves immediately on click
    setSelectedTab(selected);
    onTabChange?.(selected);

    // Route to sub-page
    const targetUrl = getTabRoute(id, selected);
    router.push(targetUrl);
  };

  return (
    <div className="w-full font-inter">
      <Tabs
        aria-label="Work Experience Navigation Tabs"
        variant="underlined"
        selectedKey={selectedTab}
        onSelectionChange={handleSelectionChange}
        classNames={{
          base: "w-full bg-white rounded-full px-4",
          tabList:
            "gap-12 sm:gap-12.5 w-full relative rounded-none p-0 border-b border-gray-200 overflow-x-auto no-scrollbar",
          cursor: "w-full bg-[#5160E7]",
          tab: "max-w-fit px-0 h-11",
          tabContent:
            "group-data-[selected=true]:text-[#5160E7] group-data-[selected=true]:font-semibold text-xs sm:text-sm p-0 text-[#475467] hover:text-[#1D1348] transition-colors",
        }}
      >
        {WORK_EXPERIENCE_TABS.map((tab) => (
          <Tab key={tab} id={tab} title={tab} />
        ))}
      </Tabs>
    </div>
  );
}
