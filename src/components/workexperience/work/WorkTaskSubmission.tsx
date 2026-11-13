"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import {
  RiUploadCloud2Line,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiListUnordered,
  RiListOrdered,
  RiLink,
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiFileTextLine,
  RiDeleteBinLine,
  RiCheckLine,
} from "react-icons/ri";
import { TaskSubmittedModal } from "../modals";

export type SubmissionMode = "draft" | "revise";

interface WorkTaskSubmissionProps {
  workexperienceId: string;
  workId: string;
  isResubmit?: boolean;
  initialMode?: SubmissionMode;
}

const DEFAULT_RATIONALE =
  "I explored two design directions for the product based on the user feedback from the previous task. Option A focuses on a cleaner, more task-focused layout, while Option B introduces a more visual and engaging experience. I recommend Option A because it better supports the core user needs and reduces friction.";

export default function WorkTaskSubmission({
  workexperienceId,
  workId,
  isResubmit = false,
  initialMode,
}: WorkTaskSubmissionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resolved mode: if isResubmit is true, default to "revise"; else if initialMode provided use it, otherwise "draft"
  const defaultMode: SubmissionMode = isResubmit
    ? "revise"
    : initialMode || "draft";

  const [mode, setMode] = useState<SubmissionMode>(defaultMode);
  const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);

  // Files state for revise view
  const [existingFiles, setExistingFiles] = useState<string[]>([
    "doc.pdf",
    "doc.pdf",
  ]);

  const [description, setDescription] = useState(DEFAULT_RATIONALE);
  const [activeAlign, setActiveAlign] = useState<"left" | "center" | "right">("left");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  // Draft file state
  const [newUploadedFiles, setNewUploadedFiles] = useState<
    Array<{ name: string; size: string }>
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setNewUploadedFiles((prev) => [
        ...prev,
        { name: file.name, size: `${sizeMb} MB` },
      ]);
      setStatusMessage(null);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setNewUploadedFiles((prev) => [
        ...prev,
        { name: file.name, size: `${sizeMb} MB` },
      ]);
      setStatusMessage(null);
    }
  };

  const handleRemoveExistingFile = (indexToRemove: number) => {
    setExistingFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveNewFile = (indexToRemove: number) => {
    setNewUploadedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSaveDraft = () => {
    setStatusMessage("Draft saved successfully!");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSubmit = () => {
    setIsSubmittedModalOpen(true);
    setStatusMessage("Task submitted successfully!");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="w-full flex flex-col gap-6 font-inter bg-white px-6 py-6 rounded-3xl border border-gray-100 shadow-xs">
      {/* 1. Top Header Row: Title & Interactive State Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-base sm:text-lg font-bold text-[#1D1348]">
            {mode === "revise" ? "Revise & Resubmit" : "Submit Task"}
          </h3>
          <p className="text-xs sm:text-sm text-[#475467]">
            {mode === "revise"
              ? "Update your submission based on the feedback, then resubmit for review."
              : "You must fill in one or more of the items below"}
          </p>
        </div>

        {/* State Preview Switcher */}
        <div className="inline-flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setMode("draft")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              mode === "draft"
                ? "bg-white text-[#1D1348] shadow-xs font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Submit Task
          </button>
          <button
            type="button"
            onClick={() => setMode("revise")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              mode === "revise"
                ? "bg-white text-[#1D1348] shadow-xs font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Revise &amp; Resubmit
          </button>
        </div>
      </div>

      {/* Status banner */}
      {statusMessage && (
        <div className="p-3 bg-[#E8FAF0] border border-[#A6F4C5] rounded-xl text-xs font-semibold text-[#10B981] flex items-center gap-2 transition-all">
          <RiCheckLine size={16} />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 2. REVISE & RESUBMIT MODE: Amber Revision Instructions Card */}
      {mode === "revise" && (
        <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-3xl p-5 sm:p-6 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-lg font-bold text-[#0F172A]">
              Revision Instructions
            </h4>

            <Button
              as={Link}
              href={`/dashboard/workexperience/${workexperienceId}/work/${workId}/feedback`}
              variant="bordered"
              className="bg-white border-[#ECEBF0] text-[#1D1348] rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors h-auto min-h-[32px]"
            >
              View Full Feedback
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
              Strengthen the rationale for each design direction.
            </p>
            <p className="text-xs sm:text-sm text-[#3A3A3C] leading-relaxed">
              Show how each option addresses the core user need (e.g. with a short comparison).
            </p>
          </div>
        </div>
      )}

      {/* 3. UPLOADED FILES SECTION (in Revise Mode) */}
      {mode === "revise" && existingFiles.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span className="text-xs sm:text-sm font-semibold text-[#1C1C1E]">
            Uploaded Files
          </span>

          <div className="flex flex-col gap-2.5">
            {existingFiles.map((file, idx) => (
              <div
                key={idx}
                className="bg-[#F2F4FF] border border-[#EEF0FF] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <RiFileTextLine size={24} className="text-[#5160E7]" />
                  <span className="text-xs sm:text-sm font-semibold text-[#1D1348]">
                    {file}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveExistingFile(idx)}
                  className="text-[#F04438] hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Delete file"
                >
                  <RiDeleteBinLine size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 4. DROPZONE / FILE UPLOAD */}
      <div className="flex flex-col gap-2">
        <span className="text-xs sm:text-sm font-semibold text-[#1C1C1E]">
          {mode === "revise" ? "Upload New Files" : "Upload Files"}
        </span>

        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-white ${
            isDragging
              ? "border-[#5160E7] bg-[#F2F4FF]/50"
              : "border-[#5160E7] hover:bg-[#F2F4FF]/20"
          }`}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center mb-3 transition-transform hover:scale-105">
            <RiUploadCloud2Line size={26} />
          </div>

          <span className="text-sm sm:text-base font-semibold text-[#101828]">
            Click to upload or drag and drop
          </span>
          <span className="text-xs sm:text-sm text-[#475467] mt-1">
            PDF, DOCX (max 50MB)
          </span>
        </div>

        {/* List of newly uploaded files */}
        {newUploadedFiles.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            {newUploadedFiles.map((file, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <RiFileTextLine size={18} className="text-[#5160E7]" />
                  <span className="text-xs sm:text-sm font-medium text-[#101828]">
                    {file.name} ({file.size})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveNewFile(idx)}
                  className="p-1 text-gray-400 hover:text-[#F04438] rounded cursor-pointer"
                >
                  <RiDeleteBinLine size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. DESCRIPTION SECTION WITH FORMATTING TOOLBAR */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="submission-description"
          className="text-xs sm:text-sm font-semibold text-[#1D1348]"
        >
          Description
        </label>

        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white focus-within:border-[#5160E7] focus-within:ring-1 focus-within:ring-[#5160E7] transition-all">
          {/* Formatting Toolbar */}
          <div className="border-b border-gray-100 p-2 sm:p-2.5 flex items-center flex-wrap gap-1 sm:gap-2 text-[#64748B] bg-white">
            <button
              type="button"
              onClick={() => setActiveAlign("left")}
              className={`p-1.5 rounded-lg hover:text-[#1D1348] hover:bg-gray-100 transition-colors cursor-pointer ${
                activeAlign === "left" ? "text-[#5160E7] bg-[#F2F4FF]" : ""
              }`}
              title="Align Left"
            >
              <RiAlignLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => setActiveAlign("center")}
              className={`p-1.5 rounded-lg hover:text-[#1D1348] hover:bg-gray-100 transition-colors cursor-pointer ${
                activeAlign === "center" ? "text-[#5160E7] bg-[#F2F4FF]" : ""
              }`}
              title="Align Center"
            >
              <RiAlignCenter size={16} />
            </button>
            <button
              type="button"
              onClick={() => setActiveAlign("right")}
              className={`p-1.5 rounded-lg hover:text-[#1D1348] hover:bg-gray-100 transition-colors cursor-pointer ${
                activeAlign === "right" ? "text-[#5160E7] bg-[#F2F4FF]" : ""
              }`}
              title="Align Right"
            >
              <RiAlignRight size={16} />
            </button>

            <div className="w-px h-4 bg-gray-200 mx-1" />

            <button
              type="button"
              className="p-1.5 rounded-lg hover:text-[#1D1348] hover:bg-gray-100 transition-colors cursor-pointer"
              title="Bullet List"
            >
              <RiListUnordered size={16} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-lg hover:text-[#1D1348] hover:bg-gray-100 transition-colors cursor-pointer"
              title="Numbered List"
            >
              <RiListOrdered size={16} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-lg hover:text-[#1D1348] hover:bg-gray-100 transition-colors cursor-pointer"
              title="Insert Link"
            >
              <RiLink size={16} />
            </button>

            <div className="w-px h-4 bg-gray-200 mx-1" />

            <button
              type="button"
              onClick={() => setIsBold(!isBold)}
              className={`p-1.5 rounded-lg hover:text-[#1D1348] hover:bg-gray-100 transition-colors cursor-pointer ${
                isBold ? "text-[#5160E7] bg-[#F2F4FF]" : ""
              }`}
              title="Bold"
            >
              <RiBold size={16} />
            </button>
            <button
              type="button"
              onClick={() => setIsItalic(!isItalic)}
              className={`p-1.5 rounded-lg hover:text-[#1D1348] hover:bg-gray-100 transition-colors cursor-pointer ${
                isItalic ? "text-[#5160E7] bg-[#F2F4FF]" : ""
              }`}
              title="Italic"
            >
              <RiItalic size={16} />
            </button>
            <button
              type="button"
              onClick={() => setIsUnderline(!isUnderline)}
              className={`p-1.5 rounded-lg hover:text-[#1D1348] hover:bg-gray-100 transition-colors cursor-pointer ${
                isUnderline ? "text-[#5160E7] bg-[#F2F4FF]" : ""
              }`}
              title="Underline"
            >
              <RiUnderline size={16} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-lg hover:text-[#1D1348] hover:bg-gray-100 transition-colors cursor-pointer"
              title="Strikethrough"
            >
              <RiStrikethrough size={16} />
            </button>
          </div>

          {/* Textarea */}
          <textarea
            id="submission-description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your task submission description..."
            className={`w-full p-4 text-xs sm:text-sm text-[#101828] placeholder-gray-400 focus:outline-none resize-y ${
              activeAlign === "center"
                ? "text-center"
                : activeAlign === "right"
                ? "text-right"
                : "text-left"
            } ${isBold ? "font-bold" : "font-normal"} ${
              isItalic ? "italic" : ""
            } ${isUnderline ? "underline" : ""}`}
          />
        </div>
      </div>

      {/* 6. BOTTOM ACTIONS */}
      {mode === "revise" ? (
        /* Revise Mode: Centered Resubmit Task button */
        <div className="flex items-center justify-center pt-2 ml-auto">
          <Button
            type="button"
            onPress={handleSubmit}
            className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-10 py-3 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[44px]"
          >
            Resubmit Task
          </Button>
        </div>
      ) : (
        /* Draft Mode: Save Draft (left) + Submit Task (right) */
        <div className="flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="bordered"
            onPress={handleSaveDraft}
            className="border-[#ECEBF0] text-[#1D1348] hover:bg-gray-50 rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[40px]"
          >
            Save Draft
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-8 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[40px]"
          >
            Submit Task
          </Button>
        </div>
      )}

      {/* 7. Task Submitted Modal (Image 2) */}
      <TaskSubmittedModal
        isOpen={isSubmittedModalOpen}
        onOpenChange={setIsSubmittedModalOpen}
        workexperienceId={workexperienceId}
      />
    </div>
  );
}
