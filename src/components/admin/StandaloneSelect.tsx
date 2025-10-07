"use client";
import { Select, SelectItem } from "@heroui/react";

interface StandaloneSelectProps {
  name?: string;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  height?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function StandaloneSelect({
  name,
  label,
  placeholder,
  options,
  height,
  value,
  onChange,
}: StandaloneSelectProps) {
  return (
    <div className="w-full flex flex-col gap-0.5">
      {label && <p className="text-sm text-gray-900 font-medium">{label}</p>}
      <Select
        placeholder={placeholder}
        selectedKeys={value ? [value] : []}
        style={{
          height: height ?? "45px",
          backgroundColor: "white",
          borderWidth: "",
          borderColor: "",
          color: "#101828",
        }}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((opt) => (
          <SelectItem key={opt.value} id={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
