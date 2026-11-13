"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import {
  RiCheckboxCircleFill,
  RiRecordCircleFill,
  RiRadioButtonLine,
  RiMore2Fill,
  RiLock2Line,
  RiCheckLine,
} from "react-icons/ri";
import { WorkStageDetail, WorkTaskDetail } from "../types";
import { RequestCertificateModal } from "../modals";

const DEFAULT_WORK_STAGES: WorkStageDetail[] = [
  {
    id: 1,
    name: "Onboarding",
    status: "completed",
    description: "Welcome and initial setup to get you familiar with team workflows.",
    tasksCompleted: 3,
    totalTasks: 3,
    tasks: [],
  },
  {
    id: 2,
    name: "Design & Iterate",
    status: "in_progress",
    description:
      "Turn insights into improved design solutions. You'll refine your concepts, explore options and prepare a stronger design for testing.",
    tasksCompleted: 2,
    totalTasks: 4,
    tasks: [
      {
        id: "task-1",
        title: "Analyse feedback and identify key insights",
        description:
          "Review user and stakeholder feedback, then summarise key takeaways.",
        status: "completed",
      },
      {
        id: "task-2",
        title: "Update your design based on insights",
        description:
          "Refine your design to address the feedback and improve the solution.",
        status: "completed",
      },
      {
        id: "task-3",
        title: "Explore alternative design options",
        description:
          "Create 2–3 design directions and explain your approach.",
        status: "in_progress",
      },
      {
        id: "task-4",
        title: "Prepare for user testing",
        description:
          "Finalise the design and create a short testing plan.",
        status: "not_started",
        dueText: "Due in 4 days",
        isLocked: true,
      },
    ],
  },
  {
    id: 3,
    name: "User Testing",
    status: "not_started",
    description: "Validate assumptions with target users and gather observations.",
    tasksCompleted: 0,
    totalTasks: 3,
    tasks: [],
  },
  {
    id: 4,
    name: "Final Delivery",
    status: "not_started",
    description: "Package final deliverables, documentation, and handover specs.",
    tasksCompleted: 0,
    totalTasks: 3,
    tasks: [],
  },
  {
    id: 5,
    name: "Wrap Up",
    status: "not_started",
    description: "Reflect on learnings, update portfolio, and celebrate achievements.",
    tasksCompleted: 0,
    totalTasks: 2,
    tasks: [],
  },
];

interface WorkExperienceWorkProps {
  workexperienceId: string;
  isAllCompleted?: boolean;
}

export default function WorkExperienceWork({
  workexperienceId,
  isAllCompleted = false,
}: WorkExperienceWorkProps) {
  const router = useRouter();
  // Allow toggling between in-progress (Image 2) and completed (Image 1) for demo/QA
  const [completedView, setCompletedView] = useState<boolean>(isAllCompleted);
  const [activeStageId, setActiveStageId] = useState<number>(completedView ? 5 : 2);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const stages = DEFAULT_WORK_STAGES;
  const currentStage =
    stages.find((s) => s.id === activeStageId) || stages[1];

  // Tasks to display based on state
  const tasksToDisplay = currentStage.tasks.length > 0
    ? currentStage.tasks
    : stages[1].tasks;

  return (
    <div className="w-full flex flex-col gap-8 font-inter">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1D1348] tracking-tight">
            My Work
          </h2>
          <p className="text-xs sm:text-sm text-[#475467]">
            Complete staged, real-world tasks to build your experience and skills.
          </p>
        </div>

        {/* Demo/QA State Switcher between Image 1 (Completed) & Image 2 (In-Progress) */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl text-xs font-medium text-gray-600 w-fit">
          <button
            type="button"
            onClick={() => {
              setCompletedView(false);
              setActiveStageId(2);
            }}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              !completedView
                ? "bg-white text-gray-900 shadow-xs font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            In Progress (Image 2)
          </button>
          <button
            type="button"
            onClick={() => {
              setCompletedView(true);
              setActiveStageId(5);
            }}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              completedView
                ? "bg-white text-gray-900 shadow-xs font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Completed (Image 1)
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN: Work Stages Stepper ================= */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 p-6 flex flex-col shadow-xs">
          <div className="flex flex-col mb-6">
            <h3 className="text-base font-bold text-[#1D1348]">Work Stages</h3>
            <span className="text-xs text-[#475467] mt-0.5">5 stages • Self-paced</span>
          </div>

          <div className="flex flex-col">
            {stages.map((stage, idx) => {
              const isSelected = stage.id === activeStageId;
              const isStageCompleted = completedView || stage.status === "completed";
              const isStageInProgress = !completedView && stage.status === "in_progress";
              const isLast = idx === stages.length - 1;

              return (
                <div key={stage.id} className="flex flex-col">
                  <div
                    onClick={() => setActiveStageId(stage.id)}
                    className={`flex items-center justify-between gap-3 p-2 rounded-xl transition-all cursor-pointer ${
                      isSelected ? "bg-[#F2F4FF]/50" : "hover:bg-gray-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isStageCompleted ? (
                        <RiCheckboxCircleFill size={20} className="text-[#10B981] shrink-0" />
                      ) : isStageInProgress ? (
                        <RiRecordCircleFill size={20} className="text-[#5160E7] shrink-0" />
                      ) : (
                        <RiRadioButtonLine size={20} className="text-[#3A3A3C] shrink-0" />
                      )}

                      <span
                        className={`text-xs sm:text-sm ${
                          isSelected
                            ? "font-bold text-[#5160E7]"
                            : isStageCompleted
                            ? "font-medium text-[#1C1C1E]"
                            : "text-[#3A3A3C]"
                        }`}
                      >
                        {stage.name}
                      </span>
                    </div>

                    {/* Status Pill */}
                    {isStageCompleted ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8FAF0] text-[#10B981]">
                        Completed
                      </span>
                    ) : isStageInProgress ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F2F4FF] text-[#5160E7]">
                        In progress
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-[#64748B]">
                        Not started
                      </span>
                    )}
                  </div>

                  {/* Vertical connecting line */}
                  {!isLast && (
                    <div className="w-0.5 h-6 bg-gray-200 ml-4.5 my-0.5" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Stage Tasks & Completion Banner ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Completed Success Banner (Image 1) */}
          {completedView ? (
            <div className="bg-[#E8FAF0]/60 border border-[#A6F4C5] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-[#10B981] text-white flex items-center justify-center text-3xl shrink-0 shadow-sm">
                <RiCheckLine size={32} />
              </div>

              <div className="flex flex-col gap-2 w-full text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1348]">
                  Work Experience Completed! 🎉
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed max-w-xl">
                  You've successfully completed all stages and tasks for this work experience.
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                  <Button
                    variant="bordered"
                    className="bg-white border border-[#ECEBF0] text-[#1D1348] rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors shadow-xs h-auto min-h-[40px]"
                  >
                    Share with Friends
                  </Button>

                  <Button
                    type="button"
                    onClick={() => setIsCertModalOpen(true)}
                    className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[40px] cursor-pointer"
                  >
                    Request Certificate
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* In-Progress Stage Header & Progress (Image 2) */
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-2">
              <div className="flex flex-col gap-1.5 max-w-lg">
                <h3 className="text-xl font-bold text-[#1D1348] tracking-tight">
                  {currentStage.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  {currentStage.description}
                </p>
              </div>

              <div className="flex flex-col gap-1 sm:w-56 shrink-0">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1D1348]">
                  <span>2 of 4 tasks completed</span>
                  <span>50%</span>
                </div>
                <div className="w-full h-2 bg-[#EBEBF5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5160E7] rounded-full transition-all duration-300"
                    style={{ width: "50%" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tasks in this Stage */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold text-[#1D1348]">
              Tasks in this stage
            </h4>

            <div className="flex flex-col gap-3">
              {tasksToDisplay.map((task) => {
                const isTaskCompleted = completedView || task.status === "completed";
                const isTaskInProgress = !completedView && task.status === "in_progress";
                const isDueTask = !isTaskCompleted && Boolean(task.dueText || task.status === "locked");
                const taskUrl = `/dashboard/workexperience/${workexperienceId}/work/${task.id}`;

                // Popover action options based on task status
                const getActionItems = () => {
                  if (isTaskCompleted) {
                    return [
                      { key: "view_submission", label: "View Submission", href: `${taskUrl}/submission` },
                    ];
                  }
                  if (isDueTask) {
                    return [
                      { key: "view_submission", label: "View Submission", href: `${taskUrl}/submission` },
                      { key: "resubmit_task", label: "Resubmit Task", href: `${taskUrl}/resubmit` },
                    ];
                  }
                  if (isTaskInProgress) {
                    return [
                      { key: "view_details", label: "View Details", href: taskUrl },
                    ];
                  }
                  return [
                    { key: "view_details", label: "View Details", href: taskUrl },
                  ];
                };

                const actionItems = getActionItems();

                return (
                  <div
                    key={task.id}
                    className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between gap-4 shadow-xs hover:border-gray-200 transition-all"
                  >
                    {/* Task Info */}
                    <Link href={taskUrl} className="flex flex-col gap-1 flex-1 group">
                      <span className="text-sm sm:text-base font-bold text-[#101828] group-hover:text-[#5160E7] transition-colors">
                        {task.title}
                      </span>
                      <span className="text-xs sm:text-sm text-[#475467] line-clamp-2">
                        {task.description}
                      </span>
                    </Link>

                    {/* Task Status & Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                      {isTaskCompleted ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#DCF8E5] text-[#039855]">
                          Completed
                        </span>
                      ) : isTaskInProgress ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F2F4FF] text-[#5160E7]">
                          In Progress
                        </span>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          {task.dueText && (
                            <span className="text-[#DC6803] bg-[#FFFAEB] text-xs font-semibold">
                              {task.dueText}
                            </span>
                          )}
                          {task.isLocked && (
                              <RiLock2Line size={20} />
                          )}
                        </div>
                      )}

                      {/* HeroUI Popover for Task More Options */}
                      <Popover placement="bottom-end" offset={6} showArrow={false}>
                        <PopoverTrigger>
                          <button
                            type="button"
                            aria-label="More task options"
                            className="p-1.5 text-gray-400 hover:text-[#1D1348] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <RiMore2Fill size={18} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="p-1.5 min-w-[160px] bg-white rounded-xl border border-gray-100 shadow-md">
                          <div className="flex flex-col w-full py-0.5">
                            {actionItems.map((action) => (
                              <button
                                key={action.key}
                                type="button"
                                onClick={() => router.push(action.href)}
                                className="w-full text-left px-3 py-2 text-xs sm:text-sm font-medium text-[#1D1348] hover:text-[#5160E7] hover:bg-[#F2F4FF] rounded-lg transition-colors cursor-pointer"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Help Box: "Need help with this stage?" */}
          <div className="rounded-2xl border border-[#5160E7] bg-[#F2F4FF] p-5 sm:p-6 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h5 className="font-bold text-sm sm:text-base text-[#1D1348]">
                Need help with this stage?
              </h5>
              <p className="text-xs sm:text-sm text-[#475467]">
                Check the resources, review examples or ask your team in Messages.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Button
                as={Link}
                href={`/dashboard/workexperience/${workexperienceId}/resources`}
                variant="bordered"
                className="bg-white border border-[#ECEBF0] text-[#1D1348] rounded-full px-5 py-2 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors shadow-xs h-auto min-h-[38px]"
              >
                View Resources
              </Button>

              <Button
                as={Link}
                href={`/dashboard/workexperience/${workexperienceId}/messages`}
                variant="bordered"
                className="bg-white border border-[#ECEBF0] text-[#1D1348] rounded-full px-5 py-2 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors shadow-xs h-auto min-h-[38px]"
              >
                Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Request Certificate Modal */}
      <RequestCertificateModal
        isOpen={isCertModalOpen}
        onOpenChange={setIsCertModalOpen}
        details={{
          workExperience: "Product Design",
          industry: "Technology",
          experienceLevel: "Beginner",
          completedOn: "Oct 10, 2025",
          duration: "2 weeks",
          issuanceFee: "₦5,000",
        }}
      />
    </div>
  );
}
