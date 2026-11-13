"use client";

import React from "react";
import { useParams } from "next/navigation";
import { PerformancePointsView } from "@/components/workexperience/performance";

export default function PerformancePointsPage() {
  const params = useParams();
  const workexperienceId = (params?.workexperienceId as string) || "product-design";

  return <PerformancePointsView workexperienceId={workexperienceId} />;
}
