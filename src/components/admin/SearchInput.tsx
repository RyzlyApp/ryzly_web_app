"use client";
import { Input } from "@heroui/input";
import React from "react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export default function SearchInput({
  placeholder,
  value = "",
  onChange,
  disabled,
}: SearchInputProps) {
  return (
    <div className="w-full flex flex-col gap-0.5">
      <Input
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onValueChange={onChange}
        startContent={
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
        classNames={{
          inputWrapper: "border border-gray-300 rounded-full h-[45px]",
          input: "text-gray-900",
        }}
      />
    </div>
  );
}
