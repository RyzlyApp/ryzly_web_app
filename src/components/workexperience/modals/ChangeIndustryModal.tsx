"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Chip,
} from "@heroui/react";
import {
  RiArrowLeftLine,
  RiInformationLine,
  RiCheckLine,
} from "react-icons/ri";

export interface IndustryOption {
  id: string;
  name: string;
  isCurrent?: boolean;
}

const DEFAULT_INDUSTRIES: IndustryOption[] = [
  { id: "technology", name: "Technology", isCurrent: true },
  { id: "healthcare", name: "Healthcare" },
  { id: "finance", name: "Finance" },
  { id: "education", name: "Education" },
  { id: "agriculture", name: "Agriculture" },
  { id: "ecommerce", name: "E-commerce" },
];

interface ChangeIndustryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workExperienceName?: string;
  currentIndustryId?: string;
  accessFeeText?: string;
  onPaymentSuccess?: (industryName: string) => void;
}

export default function ChangeIndustryModal({
  isOpen,
  onOpenChange,
  workExperienceName = "Product Design",
  currentIndustryId = "technology",
  accessFeeText = "₦25,000",
  onPaymentSuccess,
}: ChangeIndustryModalProps) {
  const [step, setStep] = useState<"select" | "confirm">("select");
  const [selectedIndustryId, setSelectedIndustryId] =
    useState<string>("healthcare");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedIndustry =
    DEFAULT_INDUSTRIES.find((i) => i.id === selectedIndustryId) ||
    DEFAULT_INDUSTRIES[1];

  const handleContinue = () => {
    // If user clicked continue on current industry, close or prompt
    if (selectedIndustry.isCurrent || selectedIndustry.id === currentIndustryId) {
      onOpenChange(false);
      return;
    }
    setStep("confirm");
  };

  const handleBackToSelect = () => {
    setStep("select");
  };

  const handleContinuePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMessage(
        `Successfully switched to ${workExperienceName} in ${selectedIndustry.name}!`
      );
      if (onPaymentSuccess) {
        onPaymentSuccess(selectedIndustry.name);
      }
      setTimeout(() => {
        setSuccessMessage(null);
        setStep("select");
        onOpenChange(false);
      }, 1500);
    }, 1200);
  };

  const handleClose = () => {
    setStep("select");
    setSuccessMessage(null);
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      placement="center"
      backdrop="blur"
      size="md"
      classNames={{
        base: "bg-white rounded-3xl p-0 pb-3 border border-gray-100 shadow-xl max-w-md font-inter",
        closeButton: "right-8 text-gray-400 hover:text-gray-700 cursor-pointer",
      }}
    >
      <ModalContent>
        {() => (
          <>
            {step === "select" ? (
              /* ================= STEP 1: SELECT INDUSTRY (Image 2) ================= */
              <>
                <ModalHeader className="flex flex-col gap-1 pb-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1D1348] tracking-tight">
                    Change Industry
                  </h2>
                  <p className="text-xs sm:text-sm text-[#3A3A3C] font-normal leading-relaxed">
                    Choose the industry you&apos;d like to gain {workExperienceName}{" "}
                    experience in.
                  </p>
                </ModalHeader>

                <ModalBody className="py-2 flex flex-col gap-4">
                  {/* Industry Options List */}
                  <div className="flex flex-col gap-2.5">
                    {DEFAULT_INDUSTRIES.map((industry) => {
                      const isCurrent =
                        industry.isCurrent || industry.id === currentIndustryId;
                      const isSelected = selectedIndustryId === industry.id;

                      return (
                        <div
                          key={industry.id}
                          onClick={() => setSelectedIndustryId(industry.id)}
                          className={`rounded-2xl border p-3.5 sm:p-4 flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#5160E7] bg-[#F2F4FF]/40 shadow-xs"
                              : "border-gray-100 bg-white hover:bg-gray-50/80"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs sm:text-sm font-semibold text-[#1C1C1E]">
                              {industry.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            {isCurrent && (
                              <Chip
                                variant="flat"
                                size="sm"
                                classNames={{
                                  base: "bg-[#E8FAF0] text-[#10B981] h-6 px-2.5 rounded-full border-none",
                                  content: "font-semibold text-[11px] p-0 leading-none",
                                }}
                              >
                                Your current industry
                              </Chip>
                            )}

                            {/* Radio Circle Indicator */}
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "border-[#5160E7] bg-white"
                                  : "border-gray-300 bg-white"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#5160E7]" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Continue Button */}
                  <div className="pt-2">
                    <Button
                      type="button"
                      onClick={handleContinue}
                      className="w-full bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full py-3.5 text-xs sm:text-sm font-semibold shadow-xs transition-colors h-auto min-h-[46px]"
                    >
                      Continue
                    </Button>
                  </div>
                </ModalBody>
              </>
            ) : (
              /* ================= STEP 2: PAYMENT & CONFIRMATION (Image 1) ================= */
              <>
                <ModalHeader className="flex items-center justify-between pb-1 pt-2 px-3">
                  <button
                    type="button"
                    onClick={handleBackToSelect}
                    className="p-1 rounded-full text-[#1C1C1E] hover:bg-gray-100 transition-colors cursor-pointer"
                    aria-label="Back to industry selection"
                  >
                    <RiArrowLeftLine size={20} />
                  </button>
                </ModalHeader>

                <ModalBody className="py-2 flex flex-col gap-4 text-center">
                  {/* Title & Subtitle */}
                  <div className="flex flex-col items-center gap-1.5 px-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1D1348] tracking-tight">
                      Start {workExperienceName} in {selectedIndustry.name}?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed max-w-sm">
                      This will be a separate work experience with its own workplace,
                      team, tasks and progress.
                    </p>
                  </div>

                  {/* Success notification if payment completed */}
                  {successMessage && (
                    <div className="p-3 bg-[#E8FAF0] border border-[#A6F4C5] rounded-xl text-xs font-semibold text-[#10B981] flex items-center justify-center gap-2">
                      <RiCheckLine size={16} />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  {/* Summary Card */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col gap-3 shadow-xs text-left divide-y divide-gray-100">
                    <div className="flex items-center justify-between text-xs sm:text-sm pt-1 first:pt-0">
                      <span className="text-[#3A3A3C]">Work Experience</span>
                      <span className="font-bold text-[#1C1C1E]">
                        {workExperienceName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm pt-3">
                      <span className="text-[#3A3A3C]">Industry</span>
                      <span className="font-bold text-[#1C1C1E]">
                        {selectedIndustry.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm pt-3">
                      <span className="text-[#3A3A3C]">Access Fee</span>
                      <span className="font-bold text-[#1C1C1E]">
                        {accessFeeText}
                      </span>
                    </div>
                  </div>

                  {/* Action CTA: Continue to Payment */}
                  <div className="pt-1">
                    <Button
                      type="button"
                      isLoading={isProcessing}
                      onClick={handleContinuePayment}
                      className="w-full bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full py-3.5 text-xs sm:text-sm font-semibold shadow-xs transition-colors h-auto min-h-[46px]"
                    >
                      Continue to Payment
                    </Button>
                  </div>

                  {/* Bottom Info Banner */}
                  <div className="bg-[#F2F4FF] rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 border border-[#EEF0FF] text-left">
                    <RiInformationLine
                      size={20}
                      className="text-[#5160E7] shrink-0"
                    />
                    <span className="text-xs text-[#3A3A3C] leading-relaxed">
                      You can keep your current work experience and come back to it
                      anytime.
                    </span>
                  </div>
                </ModalBody>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
