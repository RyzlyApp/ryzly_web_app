"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WorkTaskSubmission } from "@/components/workexperience";

export default function WorkTaskSubmissionPage() {
  const params = useParams();
  const workexperienceId = (params?.workexperienceId as string) || "product-design";
  const workId = (params?.workId as string) || "task-1";

  return (
    <WorkTaskSubmission
      workexperienceId={workexperienceId}
      workId={workId}
      isResubmit={false}
    />
  );
}
