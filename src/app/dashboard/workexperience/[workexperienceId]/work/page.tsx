"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WorkExperienceWork } from "@/components/workexperience";

export default function WorkExperienceWorkPage() {
  const params = useParams();
  const workexperienceId = params?.workexperienceId as string;

  return (
    <div className="w-full font-inter">
      <WorkExperienceWork workexperienceId={workexperienceId} />
    </div>
  );
}
