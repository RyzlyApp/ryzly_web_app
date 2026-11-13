"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Chip, Progress } from "@heroui/react";
import {
  RiArrowLeftLine,
  RiBankCardLine,
  RiCheckLine,
  RiArrowUpLine,
} from "react-icons/ri";
import { SalaryRaiseModal, RaiseStatus } from "../modals";

interface PerformanceSalaryViewProps {
  workexperienceId?: string;
  currentSalary?: number;
  totalEarned?: number;
  currentStage?: number;
}

export default function PerformanceSalaryView({
  workexperienceId = "product-design",
  currentSalary = 120000,
  totalEarned = 220000,
  currentStage = 2,
}: PerformanceSalaryViewProps) {
  const backUrl = `/dashboard/workexperience/${workexperienceId}/performance`;
  const [salary, setSalary] = useState(currentSalary);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<RaiseStatus>("submitted");

  const handleOpenStatus = (status: RaiseStatus) => {
    setModalStatus(status);
    setIsModalOpen(true);
  };

  const handleRequestRaise = () => {
    handleOpenStatus("submitted");
  };

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* 1. Back Link & QA Preview Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Link
          href={backUrl}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5160E7] hover:underline transition-colors group"
        >
          <RiArrowLeftLine
            size={18}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span>Back to Performance</span>
        </Link>

        {/* Modal State Preview Switcher */}
        <div className="inline-flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto shrink-0">
          <span className="text-[11px] text-[#64748B] px-1.5 font-semibold">Preview:</span>
          <button
            type="button"
            onClick={() => handleOpenStatus("submitted")}
            className="px-2.5 py-1 rounded-lg bg-white text-[#101828] font-semibold shadow-xs hover:bg-gray-50 cursor-pointer"
          >
            Submitted
          </button>
          <button
            type="button"
            onClick={() => handleOpenStatus("approved")}
            className="px-2.5 py-1 rounded-lg bg-white text-[#10B981] font-semibold shadow-xs hover:bg-gray-50 cursor-pointer"
          >
            Approved
          </button>
          <button
            type="button"
            onClick={() => handleOpenStatus("declined")}
            className="px-2.5 py-1 rounded-lg bg-white text-[#F04438] font-semibold shadow-xs hover:bg-gray-50 cursor-pointer"
          >
            Declined
          </button>
        </div>
      </div>

      {/* 2. Header Title & Description */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1348] tracking-tight">
          Simulated Salary
        </h1>
        <p className="text-xs sm:text-sm text-[#3A3A3C]">
          Track your simulated earnings, see your salary history and request a raise
          as you grow.
        </p>
      </div>

      {/* 3. Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Salary Metrics & History Table */}
        <div className="lg:col-span-7 w-full flex flex-col gap-6">
          {/* Card 1: Salary Overview */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 bg-white rounded-3xl p-6 shadow-xs">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#5160E7] text-white flex items-center justify-center text-2xl shadow-xs shrink-0">
                <RiBankCardLine size={26} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[#1C1C1E] font-medium">
                  Current Monthly Salary
                </span>
                <span className="text-4xl sm:text-4xl font-medium text-[#1C1C1E] mt-0.5">
                  ₦{salary.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4  ">
              <div className="flex flex-col bg-white rounded-3xl px-6 py-4 shadow-xs">
                <span className="text-xs text-[#3A3A3C] font-medium">
                  Total Earned (So Far)
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#1C1C1E] mt-1">
                  ₦{totalEarned.toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col bg-white rounded-3xl px-6 py-4 shadow-xs">
                <span className="text-xs text-[#3A3A3C] font-medium">
                  Current Stage
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#1C1C1E] mt-1">
                  Stage {currentStage}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Salary History */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4 shadow-xs">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm sm:text-base font-bold text-[#1D1348]">
                Salary History
              </h3>
              <span className="text-xs text-[#3A3A3C]">
                Your simulated salary over time.
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              {/* Table Header */}
              <div className="bg-[#F2F4FF] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1C1C1E] flex items-center justify-between">
                <span className="w-1/3">Period</span>
                <span className="w-1/3 text-center">Amount</span>
                <span className="w-1/3 text-right">Change</span>
              </div>

              {/* Row 1: Stage 2 */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 text-xs sm:text-sm">
                <div className="w-1/3 flex flex-col">
                  <span className="font-bold text-[#1C1C1E]">Stage 2 (Current)</span>
                  <span className="text-[11px] text-[#3A3A3C]">Oct 1 – Oct 31</span>
                </div>
                <span className="w-1/3 text-center font-bold text-[#1C1C1E]">
                  ₦120,000
                </span>
                <div className="w-1/3 flex justify-end">
                  <Chip
                    variant="flat"
                    size="sm"
                    startContent={<RiArrowUpLine size={13} />}
                    classNames={{
                      base: "bg-[#E8FAF0] text-[#10B981] h-6 px-2.5 rounded-full border-none",
                      content: "font-semibold text-xs p-0 leading-none",
                    }}
                  >
                    ₦20,000
                  </Chip>
                </div>
              </div>

              {/* Row 2: Stage 1 */}
              <div className="px-4 py-3 flex items-center justify-between text-xs sm:text-sm">
                <div className="w-1/3 flex flex-col">
                  <span className="font-bold text-[#1C1C1E]">Stage 1</span>
                  <span className="text-[11px] text-[#3A3A3C]">Sep 1 – Sep 30</span>
                </div>
                <span className="w-1/3 text-center font-bold text-[#1C1C1E]">
                  ₦100,000
                </span>
                <span className="w-1/3 text-right text-[#3A3A3C] font-medium">
                  —
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: About, Request Raise & Milestone */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          {/* Card 1: About Your Salary */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-3.5 shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-[#1D1348]">
              About Your Salary
            </h3>
            <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
              This is a simulated salary that reflects your performance,
              contribution and growth in the work experience. This is not real
              money that you can withdraw
            </p>

            <div className="flex flex-col gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#3A3A3C]">
                <div className="w-4 h-4 rounded-full bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                  <RiCheckLine size={12} className="stroke-[1.5]" />
                </div>
                <span>Increases as you meet performance goals</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#3A3A3C]">
                <div className="w-4 h-4 rounded-full bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                  <RiCheckLine size={12} className="stroke-[1.5]" />
                </div>
                <span>Based on task quality, consistency and impact</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#3A3A3C]">
                <div className="w-4 h-4 rounded-full bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                  <RiCheckLine size={12} className="stroke-[1.5]" />
                </div>
                <span>Helps you build a track record for your CV</span>
              </div>
            </div>
          </div>

          {/* Card 2: Request a Raise */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-3 shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-[#1D1348]">
              Request a Raise
            </h3>
            <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
              Think you&apos;ve taken on more responsibility or delivered extra
              value? You can request a salary review.
            </p>

            <div className="pt-1">
              <Button
                type="button"
                onClick={handleRequestRaise}
                className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[40px] cursor-pointer"
              >
                Request a Raise
              </Button>
            </div>
          </div>

          {/* Card 3: Next Salary Milestone */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-3 shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-[#1D1348]">
              Next Salary Milestone
            </h3>
            <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
              Maintain at least 90% task completion and positive feedback to be
              eligible for a raise.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <Progress
                aria-label="Next salary milestone progress"
                value={86}
                size="sm"
                radius="full"
                classNames={{
                  base: "w-full",
                  track: "bg-[#EBEBF5] h-2.5",
                  indicator: "bg-[#5160E7] h-2.5",
                }}
              />
              <span className="text-xs sm:text-sm font-bold text-[#1C1C1E] shrink-0">
                86%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Raise Modal (Submitted, Approved, Declined) */}
      <SalaryRaiseModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        status={modalStatus}
        currentSalary={salary}
        requestedSalary={140000}
        workexperienceId={workexperienceId}
        onConfirmApproved={() => setSalary(140000)}
      />
    </div>
  );
}
