"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WorkTaskFeedback } from "@/components/workexperience";

export default function WorkTaskFeedbackPage() {
  const params = useParams();
  const workexperienceId = (params?.workexperienceId as string) || "product-design";
  const workId = (params?.workId as string) || "task-1";

  return (
    <WorkTaskFeedback
      workexperienceId={workexperienceId}
      workId={workId}
    />
  );
}
