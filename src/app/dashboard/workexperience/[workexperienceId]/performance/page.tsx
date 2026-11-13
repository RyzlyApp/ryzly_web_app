"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WorkExperiencePerformance } from "@/components/workexperience";

export default function PerformancePage() {
  const params = useParams();
  const workexperienceId = params?.workexperienceId as string;

  return <WorkExperiencePerformance workexperienceId={workexperienceId} />;
}
