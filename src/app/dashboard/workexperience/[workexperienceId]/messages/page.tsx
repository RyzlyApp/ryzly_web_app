"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WorkExperienceMessages } from "@/components/workexperience";

export default function MessagesPage() {
  const params = useParams();
  const workexperienceId = params?.workexperienceId as string;

  return <WorkExperienceMessages workexperienceId={workexperienceId} />;
}
