"use client";

import React from "react";
import { useParams } from "next/navigation";
import { PerformanceSalaryView } from "@/components/workexperience/performance";

export default function PerformanceSalaryPage() {
  const params = useParams();
  const workexperienceId = (params?.workexperienceId as string) || "product-design";

  return <PerformanceSalaryView workexperienceId={workexperienceId} />;
}
