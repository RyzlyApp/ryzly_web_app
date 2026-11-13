"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import { RiDeleteBinLine } from "react-icons/ri";

interface StandupRecordModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveVoiceNote: (durationFormatted: string) => void;
}

export default function StandupRecordModal({
  isOpen,
  onOpenChange,
  onSaveVoiceNote,
}: StandupRecordModalProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Realistic heights for the 11 waveform bars matching the design reference
  const waveformHeights = [18, 28, 16, 24, 38, 28, 22, 26, 24, 18, 12];

  // Start timer on open, clear on close
  useEffect(() => {
    if (isOpen) {
      setIsPaused(false);
      setSeconds(0);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  // Handle active counting when not paused
  useEffect(() => {
    if (isOpen && !isPaused) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPaused]);

  // Format seconds into mm:ss (e.g. 00:40)
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleContinue = () => {
    setIsPaused(false);
  };

  const handleDiscard = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSeconds(0);
    setIsPaused(false);
    onOpenChange(false);
  };

  const handleSave = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    // If recorded less than a second, default to at least 00:05 or actual duration
    const finalDuration = seconds > 0 ? formatTimer(seconds) : "00:40";
    onSaveVoiceNote(finalDuration);
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      size="xl"
      classNames={{
        base: "bg-white rounded-3xl border border-gray-100 shadow-xl font-inter",
        closeButton: "top-5 right-5 text-gray-400 hover:text-gray-700 cursor-pointer",
      }}
    >
      <ModalContent>
        {() => (
          <>
            {/* Header: Title */}
            <ModalHeader className="pb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D1348] tracking-tight">
                Recording
              </h2>
            </ModalHeader>

            {/* Body: Waveform & Timer & Actions */}
            <ModalBody className="py-4 flex flex-col items-center">
              {/* Waveform Visualizer */}
              <div className="flex items-center justify-center gap-1.5 h-12 w-full my-2">
                {waveformHeights.map((height, idx) => (
                  <span
                    key={idx}
                    style={{
                      height: `${height}px`,
                      animationDelay: `${idx * 0.1}s`,
                    }}
                    className={`w-1 sm:w-1.5 rounded-full bg-[#5160E7] transition-all duration-300 ${
                      !isPaused
                        ? idx % 2 === 0
                          ? "animate-pulse"
                          : "opacity-80"
                        : "opacity-90"
                    }`}
                  />
                ))}
              </div>

              {/* Timer Display */}
              <div className="text-2xl sm:text-3xl font-bold text-[#5160E7] mb-8 tracking-wide">
                {formatTimer(seconds)}
              </div>

              {/* Bottom Control Actions */}
              <div className="w-full flex items-center gap-3 pt-2">
                {isPaused ? (
                  /* ================= PAUSED STATE (Image 1) ================= */
                  <>
                    {/* Discard / Delete Red Trash Icon */}
                    <button
                      type="button"
                      onClick={handleDiscard}
                      className="p-2.5 text-[#F04438] hover:bg-red-50 rounded-full transition-colors cursor-pointer shrink-0"
                      title="Discard recording"
                      aria-label="Discard recording"
                    >
                      <RiDeleteBinLine size={22} />
                    </button>

                    <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
                      {/* Continue Recording Button */}
                      <Button
                        type="button"
                        variant="bordered"
                        onPress={handleContinue}
                        className="border-[#ECEBF0] text-[#1D1348] hover:bg-gray-50 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[40px]"
                      >
                        Continue Recording
                      </Button>

                      {/* Save and Attach Voice Note Button */}
                      <Button
                        type="button"
                        onPress={handleSave}
                        className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[40px]"
                      >
                        Save and Attach Voice Note
                      </Button>
                    </div>
                  </>
                ) : (
                  /* ================= ACTIVE RECORDING STATE (Image 2) ================= */
                  <div className="w-full flex items-center justify-center gap-2.5 sm:gap-3">
                    {/* Pause Recording Button */}
                    <Button
                      type="button"
                      variant="bordered"
                      onPress={handlePause}
                      className="border-[#ECEBF0] text-[#1D1348] hover:bg-gray-50 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[40px]"
                    >
                      Pause Recording
                    </Button>

                    {/* Save and Attach Voice Note Button */}
                    <Button
                      type="button"
                      onPress={handleSave}
                      className="bg-[#5160E7] hover:bg-[#5160E7]/90 text-white rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-xs h-auto min-h-[40px]"
                    >
                      Save and Attach Voice Note
                    </Button>
                  </div>
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
