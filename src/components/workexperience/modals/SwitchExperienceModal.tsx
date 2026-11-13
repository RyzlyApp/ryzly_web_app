"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Chip,
  Progress,
} from "@heroui/react";
import { RiArrowRightLine } from "react-icons/ri";

export interface EnrolledExperience {
  id: string;
  title: string;
  company: string;
  industry: string;
  stageNumber: number;
  totalStages: number;
  progressPercentage: number;
  isCurrent?: boolean;
}

const DEFAULT_EXPERIENCES: EnrolledExperience[] = [
  {
    id: "product-design",
    title: "Product Design Work Experience",
    company: "Company",
    industry: "Industry",
    stageNumber: 2,
    totalStages: 5,
    progressPercentage: 40,
    isCurrent: true,
  },
  {
    id: "product-management",
    title: "Product Management Work Experience",
    company: "Company",
    industry: "Industry",
    stageNumber: 3,
    totalStages: 5,
    progressPercentage: 60,
    isCurrent: false,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Work Experience",
    company: "Company",
    industry: "Industry",
    stageNumber: 1,
    totalStages: 5,
    progressPercentage: 20,
    isCurrent: false,
  },
];

interface SwitchExperienceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentExperienceId?: string;
  experiences?: EnrolledExperience[];
}

export default function SwitchExperienceModal({
  isOpen,
  onOpenChange,
  currentExperienceId = "product-design",
  experiences = DEFAULT_EXPERIENCES,
}: SwitchExperienceModalProps) {
  const router = useRouter();

  const handleSwitch = (expId: string) => {
    onOpenChange(false);
    router.push(`/dashboard/workexperience/${expId}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      size="2xl"
      classNames={{
        base: "bg-white rounded-3xl pb-3 border border-gray-100 shadow-xl max-w-xl font-inter",
        closeButton: "right-8 text-gray-400 hover:text-gray-700 cursor-pointer",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D1348] tracking-tight">
                Switch Work Experience
              </h2>
              <p className="text-xs sm:text-sm text-[#3A3A3C] font-normal">
                Choose another work experiences to continue.
              </p>
            </ModalHeader>

            <ModalBody className="py-2 flex flex-col gap-4">
              {/* Experiences List */}
              <div className="flex flex-col gap-3">
                {experiences.map((exp) => {
                  const isCurrent =
                    exp.isCurrent || exp.id === currentExperienceId;

                  return (
                    <div
                      key={exp.id}
                      className="border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 bg-white shadow-xs hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col gap-0.5">
                          <h3 className="text-sm sm:text-base font-bold text-[#1C1C1E]">
                            {exp.title}
                          </h3>
                          <span className="text-xs text-[#3A3A3C]">
                            {exp.company} • {exp.industry}
                          </span>
                        </div>

                        {isCurrent ? (
                          <Chip
                            variant="flat"
                            size="sm"
                            classNames={{
                              base: "bg-[#E8FAF0] text-[#10B981] h-6 px-3 rounded-full border-none shrink-0",
                              content: "font-semibold text-xs p-0 leading-none",
                            }}
                          >
                            Currently viewing
                          </Chip>
                        ) : (
                          <Button
                            type="button"
                            onClick={() => handleSwitch(exp.id)}
                            className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-5 py-2 text-xs font-semibold h-auto min-h-[34px] shrink-0 transition-colors shadow-xs"
                          >
                            Switch
                          </Button>
                        )}
                      </div>

                      {/* Progress Bar & Stage Indicator */}
                      <div className="flex items-center gap-3 pt-1">
                        <div className="w-40 sm:w-48">
                          <Progress
                            aria-label={`${exp.title} Progress`}
                            value={exp.progressPercentage}
                            size="sm"
                            radius="full"
                            classNames={{
                              base: "w-full",
                              track: "bg-[#EBEBF5] h-1.5",
                              indicator: "bg-[#5160E7] h-1.5",
                            }}
                          />
                        </div>
                        <span className="text-xs text-[#3A3A3C] font-medium whitespace-nowrap">
                          Stage {exp.stageNumber} of {exp.totalStages} •{" "}
                          {exp.progressPercentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Explore Callout */}
              <div className="bg-[#F2F4FF] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#EEF0FF]">
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1C1C1E]">
                    Want another work experience?
                  </h4>
                  <p className="text-xs text-[#3A3A3C]">
                    Explore and enrol in more experiences to grow your skills.
                  </p>
                </div>

                <Link
                  href="/dashboard/workexperience"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5160E7] hover:underline transition-colors shrink-0"
                >
                  <span>Explore Experiences</span>
                  <RiArrowRightLine size={14} />
                </Link>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
