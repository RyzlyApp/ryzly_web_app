"use client";

import React, { use, Suspense } from "react";
import {
  WorkExperienceOnboardingFlow,
  DEFAULT_PROGRAMS,
} from "@/components/workexperience";

interface WorkExperienceOnboardingPageProps {
  params: Promise<{
    workexperienceId: string;
  }>;
}

export default function WorkExperienceOnboardingPage({
  params,
}: WorkExperienceOnboardingPageProps) {
  const resolvedParams = use(params);
  const workexperienceId = resolvedParams.workexperienceId;

  // Resolve matching program information
  const matchedProgram = DEFAULT_PROGRAMS.find((p) => p.id === workexperienceId);
  const programTitle = matchedProgram?.title || "Product Design Work Experience";
  const programDescription =
    matchedProgram?.description ||
    "Gain real product design experience by working on practical tasks, getting feedback from a manager, and building work you can add to your portfolio.";
  const companiesCount = matchedProgram?.companiesCount || 2;

  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="w-full min-h-[400px] flex items-center justify-center font-inter text-[#475467] text-sm">
            Loading onboarding...
          </div>
        }
      >
        <WorkExperienceOnboardingFlow
          workexperienceId={workexperienceId}
          programTitle={programTitle}
          programDescription={programDescription}
          companiesCount={companiesCount}
        />
      </Suspense>
    </div>
  );
}
