"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WorkExperienceResources } from "@/components/workexperience";

export default function ResourcesPage() {
  const params = useParams();
  const workexperienceId = params?.workexperienceId as string;

  return <WorkExperienceResources workexperienceId={workexperienceId} />;
}
