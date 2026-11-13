"use client";

import React, { Suspense } from "react";
import { WorkExperienceOnboardingFlow } from "@/components/workexperience";

export default function WorkExperienceGlobalOnboardingPage() {
  return (
    <div className="w-full pt-6 px-4 sm:px-6 lg:px-[28px] pb-16 font-inter">
      <Suspense
        fallback={
          <div className="w-full min-h-[400px] flex items-center justify-center font-inter text-[#475467] text-sm">
            Loading onboarding...
          </div>
        }
      >
        <WorkExperienceOnboardingFlow
          workexperienceId="product-design"
          programTitle="Product Design Work Experience"
          programDescription="Gain real product design experience by working on practical tasks, getting feedback from a manager, and building work you can add to your portfolio."
          companiesCount={2}
        />
      </Suspense>
    </div>
  );
}
