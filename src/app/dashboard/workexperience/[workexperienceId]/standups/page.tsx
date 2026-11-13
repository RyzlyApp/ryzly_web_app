"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WorkExperienceStandups } from "@/components/workexperience";

export default function StandupsPage() {
  const params = useParams();
  const workexperienceId = params?.workexperienceId as string;

  return <WorkExperienceStandups workexperienceId={workexperienceId} />;
}
