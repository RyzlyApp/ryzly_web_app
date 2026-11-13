"use client";

import React, { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Tabs, Tab, Button } from "@heroui/react";
import { RiArrowLeftLine } from "react-icons/ri";
import { WorkTaskSidebar } from "@/components/workexperience";

interface WorkTaskLayoutProps {
  children: ReactNode;
}

export default function WorkTaskLayout({ children }: WorkTaskLayoutProps) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const workexperienceId = (params?.workexperienceId as string) || "product-design";
  const workId = (params?.workId as string) || "task-1";

  const basePath = `/dashboard/workexperience/${workexperienceId}/work/${workId}`;

  // Determine active tab based on pathname
  const computeActiveKey = () => {
    if (pathname.endsWith("/feedback")) return "feedback";
    if (pathname.endsWith("/submission") || pathname.endsWith("/resubmit")) {
      return "submission";
    }
    return "details";
  };

  const [selectedTab, setSelectedTab] = useState<string>(computeActiveKey);

  useEffect(() => {
    setSelectedTab(computeActiveKey());
  }, [pathname]);

  const handleTabChange = (key: string) => {
    setSelectedTab(key);
    if (key === "feedback") {
      router.push(`${basePath}/feedback`);
    } else if (key === "submission") {
      router.push(`${basePath}/submission`);
    } else {
      router.push(basePath);
    }
  };

  const isFeedback = selectedTab === "feedback";
  const isResubmit = pathname.endsWith("/resubmit");

  const sidebarStatus = isResubmit
    ? "needs_improvement"
    : isFeedback
    ? "completed"
    : "in_progress";

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* 1. Top Navigation Bar: Back link & Prev/Next actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          href={`/dashboard/workexperience/${workexperienceId}/work`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5160E7] hover:underline transition-colors group"
        >
          <RiArrowLeftLine
            size={18}
            className="group-hover:-translate-x-0.5 transition-transform text-[#5160E7]"
          />
          <span>Back to My Work</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            as={Link}
            href={`/dashboard/workexperience/${workexperienceId}/work`}
            variant="bordered"
            className="border-[#ECEBF0] bg-white text-[#101828] hover:bg-gray-50 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-colors h-auto min-h-[38px]"
          >
            Previous Task
          </Button>

          <Button
            as={Link}
            href={`/dashboard/workexperience/${workexperienceId}/work`}
            className="bg-[#1D1348] hover:bg-[#101828] text-white rounded-full px-6 py-2 text-xs sm:text-sm font-semibold transition-colors h-auto min-h-[38px]"
          >
            Next Task
          </Button>
        </div>
      </div>

      {/* 2. Task Stage Breadcrumb & Header Title */}
      <div className="flex flex-col gap-1">
        <span className="text-xs sm:text-xs font-semibold text-[#64748B]">
          Design & Iterate
        </span>
        <h1 className="text-2xl sm:text-2xl font-bold text-[#1D1348] tracking-tight">
          Explore alternative design options
        </h1>
        <p className="text-xs sm:text-sm text-[#3A3A3C] mt-0.5">
          Create 2–3 design directions and explain your approach.
        </p>
      </div>

      {/* 3. Sub-Navigation Tabs */}
      <div className="w-full">
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => handleTabChange(String(key))}
          variant="underlined"
          aria-label="Task Sub-Navigation"
          classNames={{
            tabList: "gap-12 w-full p-0 px-6 rounded-3xl relative bg-white",
            cursor: "w-full bg-[#5160E7] h-0.5",
            tab: "max-w-fit px-0 py-3.5 h-auto text-xs sm:text-sm font-medium",
            tabContent:
              "group-data-[selected=true]:font-bold group-data-[selected=true]:text-[#101828] text-[#475467]",
          }}
        >
          <Tab key="details" title="Task Details" />
          <Tab key="submission" title="Submission" />
          <Tab key="feedback" title="Feedback" />
        </Tabs>
      </div>

      {/* 4. Two-Column Layout: Left Content + Right Persistent Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* Main Content Area */}
        <div className="lg:col-span-8 w-full">{children}</div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 w-full">
          <WorkTaskSidebar
            status={sidebarStatus}
            workexperienceId={workexperienceId}
            workId={workId}
          />
        </aside>
      </div>
    </div>
  );
}
