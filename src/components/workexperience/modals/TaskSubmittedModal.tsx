"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal, ModalContent, ModalBody } from "@heroui/react";

interface TaskSubmittedModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workexperienceId?: string;
  onClose?: () => void;
}

export default function TaskSubmittedModal({
  isOpen,
  onOpenChange,
  workexperienceId = "product-design",
  onClose,
}: TaskSubmittedModalProps) {
  const handleClose = () => {
    if (onClose) onClose();
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
        base: "bg-[#F6FEF9] border border-[#A6F4C5] rounded-3xl p-6 sm:p-10 shadow-2xl max-w-md font-inter",
      }}
    >
      <ModalContent>
        {() => (
          <ModalBody className="p-0 flex flex-col items-center text-center">
            {/* 3D Happy Sphere Icon */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center transition-transform hover:scale-105">
              <Image
                src="/icons/happy.png"
                alt="Task Submitted Icon"
                width={88}
                height={88}
                className="object-contain drop-shadow-xs"
                priority
              />
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-2xl sm:text-[26px] font-bold text-[#101828] tracking-tight mt-3">
              Task Submitted
            </h2>
            <p className="text-xs sm:text-sm text-[#475467] max-w-xs mt-2 leading-relaxed">
              Your work has been submitted and is now with your manager for review.
            </p>

            {/* What happens next section */}
            <div className="flex flex-col items-center mt-6">
              <h3 className="text-base font-bold text-[#101828] mb-2.5">
                What happens next?
              </h3>
              <div className="flex flex-col gap-2 text-xs sm:text-sm text-[#3A3A3C] max-w-xs">
                <p>Your manager will assess your submission.</p>
                <p>You&apos;ll receive feedback with next steps.</p>
                <p>Make changes and resubmit, if requested.</p>
              </div>
            </div>

            {/* Bottom Action Button: Back to My Work */}
            <Link
              href={`/dashboard/workexperience/${workexperienceId}/work`}
              onClick={handleClose}
              className="w-full rounded-full border border-[#101828]/25 hover:border-[#101828]/40 bg-transparent hover:bg-black/5 text-[#101828] font-bold text-sm sm:text-base py-3.5 px-6 mt-8 transition-colors text-center inline-flex items-center justify-center cursor-pointer shadow-xs"
            >
              Back to My Work
            </Link>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
