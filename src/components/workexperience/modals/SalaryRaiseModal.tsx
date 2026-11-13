"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal, ModalContent, ModalBody } from "@heroui/react";

export type RaiseStatus = "submitted" | "approved" | "declined";

interface SalaryRaiseModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  status?: RaiseStatus;
  currentSalary?: number;
  requestedSalary?: number;
  workexperienceId?: string;
  onConfirmApproved?: () => void;
}

export default function SalaryRaiseModal({
  isOpen,
  onOpenChange,
  status = "submitted",
  currentSalary = 120000,
  requestedSalary = 140000,
  workexperienceId = "data-analytics",
  onConfirmApproved,
}: SalaryRaiseModalProps) {
  const isDeclined = status === "declined";

  const handleClose = () => {
    if (status === "approved" && onConfirmApproved) {
      onConfirmApproved();
    }
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      size="md"
      hideCloseButton
      classNames={{
        base: `${
          isDeclined
            ? "bg-[#FFF5F5] border border-[#FECDCA]"
            : "bg-[#F6FEF9] border border-[#A6F4C5]"
        } rounded-3xl p-6 sm:p-10 shadow-2xl max-w-md font-inter`,
      }}
    >
      <ModalContent>
        {() => (
          <ModalBody className="p-0 flex flex-col items-center text-center">
            {/* 3D Sphere Icon (Happy or Sad) */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center transition-transform hover:scale-105">
              <Image
                src={isDeclined ? "/icons/sad.png" : "/icons/happy.png"}
                alt={isDeclined ? "Sad face icon" : "Happy face icon"}
                width={88}
                height={88}
                className="object-contain drop-shadow-xs"
                priority
              />
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-[26px] font-bold text-[#101828] tracking-tight mt-4">
              {status === "submitted" && "Raise Request Submitted!"}
              {status === "approved" && "Raise Request Approved!"}
              {status === "declined" && "Raise Request Declined"}
            </h2>

            {/* Description Body based on status */}
            {status === "submitted" && (
              <p className="text-xs sm:text-sm text-[#475467] max-w-sm mx-auto mt-3 leading-relaxed">
                Your request to increase your salary from{" "}
                <strong className="font-bold text-[#101828]">
                  ₦{currentSalary.toLocaleString()}
                </strong>{" "}
                to{" "}
                <strong className="font-bold text-[#101828]">
                  ₦{requestedSalary.toLocaleString()}
                </strong>{" "}
                has been sent to your manager for review. You&apos;ll get a
                notification once your manager reviews your request, usually
                within 2–3 working days.
              </p>
            )}

            {status === "approved" && (
              <p className="text-xs sm:text-sm text-[#475467] max-w-sm mx-auto mt-3 leading-relaxed">
                Great news! Your salary has been increased to{" "}
                <strong className="font-bold text-[#101828]">
                  ₦{requestedSalary.toLocaleString()}
                </strong>
                .
              </p>
            )}

            {status === "declined" && (
              <>
                <p className="text-xs sm:text-sm text-[#475467] mt-2">
                  Your raise request wasn&apos;t approved at this time.
                </p>

                {/* Manager's Feedback Box */}
                <div className="w-full bg-[#FCE8E6] border border-[#FECDCA]/60 rounded-2xl p-4 sm:p-5 mt-5 text-left">
                  <h4 className="text-sm sm:text-base font-bold text-[#101828] mb-1.5">
                    Manager&apos;s Feedback
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
                    “You’re making good progress. Work on completing the remaining
                    tasks for this stage and let&apos;s revisit your request at the
                    next review.”
                  </p>
                </div>
              </>
            )}

            {/* Action Buttons */}
            {status === "declined" ? (
              <div className="w-full flex flex-col gap-3 mt-6">
                <Link
                  href={`/dashboard/workexperience/${workexperienceId}/messages`}
                  onClick={() => onOpenChange(false)}
                  className="w-full rounded-full border border-[#101828]/25 hover:border-[#101828]/40 bg-transparent hover:bg-black/5 text-[#101828] font-bold text-sm sm:text-base py-3.5 px-6 transition-colors text-center inline-flex items-center justify-center cursor-pointer"
                >
                  Message Manager
                </Link>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full rounded-full bg-[#1D1348] hover:bg-[#101828] text-white font-bold text-sm sm:text-base py-3.5 px-6 transition-colors text-center inline-flex items-center justify-center cursor-pointer shadow-xs"
                >
                  Back to Salary
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="w-full rounded-full border border-[#101828]/25 hover:border-[#101828]/40 bg-transparent hover:bg-black/5 text-[#101828] font-bold text-sm sm:text-base py-3.5 px-6 mt-8 transition-colors text-center inline-flex items-center justify-center cursor-pointer shadow-xs"
              >
                Back to Salary
              </button>
            )}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
