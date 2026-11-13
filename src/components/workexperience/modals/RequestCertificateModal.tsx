"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import { RiCheckLine } from "react-icons/ri";

export interface CertificateDetails {
  workExperience: string;
  industry: string;
  experienceLevel: string;
  completedOn: string;
  duration: string;
  issuanceFee: string;
}

const DEFAULT_CERTIFICATE_DETAILS: CertificateDetails = {
  workExperience: "Product Design",
  industry: "Technology",
  experienceLevel: "Beginner",
  completedOn: "Oct 10, 2025",
  duration: "2 weeks",
  issuanceFee: "₦5,000",
};

interface RequestCertificateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  details?: Partial<CertificateDetails>;
  onRequestSuccess?: () => void;
}

export default function RequestCertificateModal({
  isOpen,
  onOpenChange,
  details,
  onRequestSuccess,
}: RequestCertificateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const certData: CertificateDetails = {
    ...DEFAULT_CERTIFICATE_DETAILS,
    ...details,
  };

  const handleRequest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onRequestSuccess) {
        onRequestSuccess();
      }
      setTimeout(() => {
        setIsSuccess(false);
        onOpenChange(false);
      }, 1500);
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      placement="center"
      backdrop="blur"
      size="lg"
      classNames={{
        base: "bg-white rounded-3xl py-2.5 border border-gray-100 shadow-xl max-w-lg font-inter",
        closeButton: "right-5 text-gray-400 hover:text-gray-700 cursor-pointer",
      }}
    >
      <ModalContent>
        {() => (
          <>
            {/* Modal Header */}
            <ModalHeader className="flex flex-col gap-1 pb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D1348] tracking-tight">
                Your Certificate Is Ready!
              </h2>
              <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed">
                You&apos;ve successfully completed your work experience and can now
                request your certificate.
              </p>
            </ModalHeader>

            {/* Modal Body */}
            <ModalBody className="py-2 flex flex-col gap-4">
              {/* Success Banner */}
              {isSuccess && (
                <div className="p-3 bg-[#E8FAF0] border border-[#A6F4C5] rounded-xl text-xs font-semibold text-[#10B981] flex items-center justify-center gap-2">
                  <RiCheckLine size={16} />
                  <span>Certificate requested successfully! Check your email.</span>
                </div>
              )}

              {/* 1. Certificate Details Summary Card */}
              <div className="bg-[#F8F9FC] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 border border-gray-100/80">
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1C1E]">
                  Certificate Details
                </h4>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-[#475467]">Work Experience</span>
                    <span className="font-bold text-[#1C1C1E]">
                      {certData.workExperience}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-[#475467]">Industry</span>
                    <span className="font-bold text-[#1C1C1E]">
                      {certData.industry}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-[#475467]">Experience Level</span>
                    <span className="font-bold text-[#1C1C1E]">
                      {certData.experienceLevel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-[#475467]">Completed On</span>
                    <span className="font-bold text-[#1C1C1E]">
                      {certData.completedOn}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-[#475467]">Duration</span>
                    <span className="font-bold text-[#1C1C1E]">
                      {certData.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Certificate Issuance Fee Card */}
              <div className="rounded-2xl border border-[#5160E7]/40 bg-[#F2F4FF]/30 p-4 sm:p-5 flex items-center justify-between shadow-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs sm:text-sm font-bold text-[#1C1C1E]">
                    Certificate Issuance Fee
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#475467]">
                    A one-time fee to issue your official certificate.
                  </span>
                </div>

                <span className="text-lg sm:text-xl font-bold text-[#1C1C1E] shrink-0 ml-3">
                  {certData.issuanceFee}
                </span>
              </div>

              {/* 3. Action Button (Right-aligned) */}
              <div className="flex items-center justify-end pt-2">
                <Button
                  type="button"
                  isLoading={isSubmitting}
                  onClick={handleRequest}
                  className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-8 py-3 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[44px]"
                >
                  Request Certificate
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
