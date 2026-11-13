"use client";

import React, { ReactNode, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import {
  WorkExperienceHeader,
  WorkExperienceTabs,
  DEFAULT_PROGRAMS,
  SwitchExperienceModal,
  ChangeIndustryModal,
} from "@/components/workexperience";

interface WorkExperienceDetailLayoutProps {
  children: ReactNode;
}

export default function WorkExperienceDetailLayout({
  children,
}: WorkExperienceDetailLayoutProps) {
  const params = useParams();
  const pathname = usePathname();
  const workexperienceId = params?.workexperienceId as string;

  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [isChangeIndustryOpen, setIsChangeIndustryOpen] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState("Technology");

  // Resolve matching program title or fallback
  const matchedProgram = DEFAULT_PROGRAMS.find((p) => p.id === workexperienceId);
  const experienceTitle =
    matchedProgram?.title || "Product Design Work Experience";

  // Check if we are inside a specific task route e.g. /work/[workId] or standalone submit / detail sub-pages
  const isTaskView =
    pathname.includes("/work/") &&
    Boolean(pathname.split("/work/")[1]?.split("/")[0]);
  const isStandupSubmit = pathname.includes("/standups/submit");
  const isPerformanceSubPage =
    pathname.includes("/performance/points") ||
    pathname.includes("/performance/salary");
  const isOnboarding = pathname.includes("/onboarding");

  if (isTaskView || isStandupSubmit || isPerformanceSubPage || isOnboarding) {
    return (
      <div className="w-full flex flex-col font-inter pt-6 px-4 sm:px-6 lg:px-[28px] pb-16">
        {children}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 font-inter pt-[36px] px-[28px] pb-16">
      {/* Persistent Header Banner */}
      <WorkExperienceHeader
        title={experienceTitle}
        companyName="Company Name"
        industryName={currentIndustry}
        isActive={true}
        currentStageNumber={2}
        totalStages={5}
        progressPercentage={40}
        onSwitchExperience={() => setIsSwitchModalOpen(true)}
        onChangeIndustry={() => setIsChangeIndustryOpen(true)}
      />

      {/* Persistent Sub-Navigation Tabs with Route Navigation */}
      <WorkExperienceTabs workexperienceId={workexperienceId} />

      {/* Dynamic Tab Page Content */}
      <div className="w-full pt-2">{children}</div>

      {/* Switch Experience Modal */}
      <SwitchExperienceModal
        isOpen={isSwitchModalOpen}
        onOpenChange={setIsSwitchModalOpen}
        currentExperienceId={workexperienceId}
      />

      {/* Change Industry Modal with Nested Payment Step */}
      <ChangeIndustryModal
        isOpen={isChangeIndustryOpen}
        onOpenChange={setIsChangeIndustryOpen}
        workExperienceName={experienceTitle.replace(" Work Experience", "")}
        currentIndustryId={currentIndustry.toLowerCase()}
        onPaymentSuccess={(newIndustry) => setCurrentIndustry(newIndustry)}
      />
    </div>
  );
}
