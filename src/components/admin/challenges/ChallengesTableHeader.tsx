"use client";
import { RiArrowDownSLine, RiFilterLine } from "react-icons/ri";

interface ChallengesTableHeaderProps {
  coachFilter: string;
  setCoachFilter: (filter: string) => void;
  statusFilter: string;
}

export default function ChallengesTableHeader({
  coachFilter,
  setCoachFilter,
  statusFilter,
}: ChallengesTableHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900">By Coach</h3>
          <div className="relative">
            <select
              value={coachFilter}
              onChange={(e) => setCoachFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All Coaches">All Coaches</option>
              <option value="Ngozi Nnamani">Ngozi Nnamani</option>
              <option value="Obinna Afolayan">Obinna Afolayan</option>
            </select>
            <RiArrowDownSLine
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RiFilterLine className="text-gray-400" size={16} />
          <span className="text-sm text-gray-600">{statusFilter}</span>
        </div>
      </div>
    </div>
  );
}
