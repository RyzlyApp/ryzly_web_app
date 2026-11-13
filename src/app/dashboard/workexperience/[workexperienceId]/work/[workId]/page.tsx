"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WorkTaskDetails } from "@/components/workexperience";

export default function WorkTaskDetailPage() {
  const params = useParams();
  const workexperienceId = (params?.workexperienceId as string) || "product-design";
  const workId = (params?.workId as string) || "task-1";

  return (
    <WorkTaskDetails
      workexperienceId={workexperienceId}
      workId={workId}
    />
  );
}
