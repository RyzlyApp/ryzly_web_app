"use client";

import React from "react";
import { Button } from "@heroui/react";
import {
  RiFileTextLine,
  RiExternalLinkLine,
  RiDownload2Line,
} from "react-icons/ri";
import { FaFigma } from "react-icons/fa6";

interface WorkExperienceResourcesProps {
  workexperienceId?: string;
}

const RESOURCES = [
  {
    title: "Product Requirements Document (PRD)",
    description: "Detailed feature specs, business background, and user flow requirements for Stage 2.",
    type: "pdf",
    size: "2.4 MB",
    link: "#",
  },
  {
    title: "Design System & Figma Component Library",
    description: "Full UI kit containing components, verified color tokens, icons, and type scales.",
    type: "figma",
    size: "Figma File",
    link: "https://figma.com",
  },
  {
    title: "User Research Summary & Personas",
    description: "Synthesized qualitative findings, user pain points, and quote archives from target cohort.",
    type: "pdf",
    size: "1.8 MB",
    link: "#",
  },
  {
    title: "Design Critique & Submission Checklist",
    description: "Step-by-step checklist to ensure your deliverables meet managerial expectations before submission.",
    type: "pdf",
    size: "620 KB",
    link: "#",
  },
];

export default function WorkExperienceResources({
  workexperienceId: _workexperienceId,
}: WorkExperienceResourcesProps) {
  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1348] tracking-tight">
          Program Resources
        </h1>
        <p className="text-xs sm:text-sm text-[#475467]">
          Access guidelines, Figma kits, research documents, and design assets curated for your work experience.
        </p>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESOURCES.map((res, idx) => {
          const isFigma = res.type === "figma";
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col justify-between gap-5 shadow-xs hover:border-[#5160E7]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                    isFigma
                      ? "bg-purple-50 text-purple-600"
                      : "bg-[#F2F4FF] text-[#5160E7]"
                  }`}
                >
                  {isFigma ? <FaFigma size={20} /> : <RiFileTextLine size={24} />}
                </div>

                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base font-bold text-[#101828]">
                    {res.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed mt-1">
                    {res.description}
                  </p>
                  <span className="text-[11px] text-[#64748B] font-medium mt-2">
                    {res.size}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end pt-1">
                {isFigma ? (
                  <Button
                    as="a"
                    href={res.link}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-5 py-2 text-xs font-semibold shadow-xs"
                    endContent={<RiExternalLinkLine size={14} />}
                  >
                    Open in Figma
                  </Button>
                ) : (
                  <Button
                    as="a"
                    href={res.link}
                    variant="bordered"
                    className="border-[#ECEBF0] bg-white hover:bg-gray-50 text-[#101828] rounded-full px-5 py-2 text-xs font-semibold shadow-xs"
                    startContent={<RiDownload2Line size={14} className="text-[#64748B]" />}
                  >
                    Download PDF
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
