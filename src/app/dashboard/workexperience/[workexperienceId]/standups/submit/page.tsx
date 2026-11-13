"use client";

import React from "react";
import { useParams } from "next/navigation";
import { StandupSubmitForm } from "@/components/workexperience/standups";

export default function StandupSubmitPage() {
  const params = useParams();
  const workexperienceId = (params?.workexperienceId as string) || "product-design";

  return <StandupSubmitForm workexperienceId={workexperienceId} />;
}
