"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WorkExperienceBreak } from "@/components/workexperience";

export default function BreakPage() {
  const params = useParams();
  const workexperienceId = params?.workexperienceId as string;

  return <WorkExperienceBreak workexperienceId={workexperienceId} />;
}
