"use client";

import React, { useState } from "react";
import { RiPlayFill, RiPauseFill, RiDeleteBinLine } from "react-icons/ri";

interface StandupAudioPlayerProps {
  duration?: string;
  onDelete?: () => void;
  className?: string;
}

export default function StandupAudioPlayer({
  duration = "0:42",
  onDelete,
  className = "",
}: StandupAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Realistic waveform heights matching screenshot
  const waveformHeights = [
    12, 18, 24, 14, 20, 26, 16, 22, 10, 18, 26, 14, 20, 24, 12, 16, 22, 18, 12, 24, 16,
  ];

  return (
    <div
      className={`bg-[#F2F4FF] rounded-2xl p-3 sm:p-3.5 flex items-center justify-between transition-all ${className}`}
    >
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
        {/* Circular Play / Pause Button */}
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#5160E7] text-white flex items-center justify-center shrink-0 hover:bg-[#5160E7]/90 transition-transform active:scale-95 shadow-xs cursor-pointer"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? (
            <RiPauseFill size={18} className="translate-x-0" />
          ) : (
            <RiPlayFill size={18} className="translate-x-0.5" />
          )}
        </button>

        {/* Waveform Bars */}
        <div className="flex items-center gap-1 sm:gap-1.5 h-7 overflow-hidden">
          {waveformHeights.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}px` }}
              className={`w-0.5 sm:w-1 rounded-full transition-all duration-300 ${
                isPlaying
                  ? i % 2 === 0
                    ? "bg-[#5160E7] animate-pulse"
                    : "bg-[#5160E7]/70"
                  : "bg-[#5160E7]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right: Timestamp & Optional Delete Button */}
      <div className="flex items-center gap-3 shrink-0 ml-2">
        <span className="text-xs sm:text-sm font-medium text-[#3A3A3C]">
          {duration}
        </span>

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="p-1 text-[#F04438] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Delete recording"
            aria-label="Delete recording"
          >
            <RiDeleteBinLine size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
