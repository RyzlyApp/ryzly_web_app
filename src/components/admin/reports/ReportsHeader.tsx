"use client";
import { RiArrowDownSLine } from "react-icons/ri";

interface ReportsHeaderProps {
  type: string;
  setType: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

export default function ReportsHeader({
  type,
  setType,
  status,
  setStatus,
}: ReportsHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">All Reports</span>
        <div className="relative">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="User">User</option>
            <option value="Challenge">Challenge</option>
            <option value="Community">Community</option>
          </select>
          <RiArrowDownSLine
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Sort by</span>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
          <RiArrowDownSLine
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </div>
    </div>
  );
}
