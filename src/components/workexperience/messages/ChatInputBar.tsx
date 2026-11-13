"use client";

import React, { useState } from "react";
import {
  RiAttachmentLine,
  RiMicLine,
  RiSendPlaneFill,
} from "react-icons/ri";

interface ChatInputBarProps {
  onSendMessage: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ChatInputBar({
  onSendMessage,
  placeholder = "Type a message...",
  className = "",
}: ChatInputBarProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={"flex items-center w-full gap-4"}
    >
      <div className={`w-full border border-gray-200 rounded-2xl px-4 py-2 sm:py-2.5 flex items-center justify-between bg-white shadow-xs focus-within:border-[#5160E7] focus-within:ring-1 focus-within:ring-[#5160E7] transition-all ${className}`}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="text-xs sm:text-sm text-[#101828] placeholder-gray-400 flex-1 outline-none bg-transparent mr-2"
        />
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            className="text-[#5160E7] hover:bg-[#F2F4FF] rounded-full transition-colors cursor-pointer"
            title="Attach file"
            aria-label="Attach file"
          >
            <RiAttachmentLine size={24} />
          </button>

          <button
            type="button"
            className="text-[#5160E7] hover:bg-[#F2F4FF] rounded-full transition-colors cursor-pointer"
            title="Voice message"
            aria-label="Voice message"
          >
            <RiMicLine size={24} />
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={!text.trim()}
        className={`size-11.5 rounded-2xl flex items-center justify-center transition-all ${text.trim()
          ? "bg-[#5160E7] text-white hover:bg-[#5160E7]/90 active:scale-95 shadow-xs cursor-pointer"
          : "bg-[#5160E7]/60 text-white/80 cursor-not-allowed"
          }`}
        title="Send message"
        aria-label="Send message"
      >
        <RiSendPlaneFill size={24} className="" />
      </button>
    </form>
  );
}
