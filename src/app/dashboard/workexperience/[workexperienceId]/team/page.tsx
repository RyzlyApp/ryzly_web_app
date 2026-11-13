"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WorkExperienceTeam } from "@/components/workexperience";

export default function TeamPage() {
  const params = useParams();
  const workexperienceId = params?.workexperienceId as string;

  return <WorkExperienceTeam workexperienceId={workexperienceId} />;
}
