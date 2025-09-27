"use client";
import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

export default function ChallengesOverview() {
  const [timeFilter, setTimeFilter] = useState("All Time");

  return (
    <div className="bg-white rounded-lg p-6 col-span-5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Challenges Overview</h3>
        <div className="relative">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All Time">All Time</option>
            <option value="This Month">This Month</option>
            <option value="This Week">This Week</option>
          </select>
          <RiArrowDownSLine
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-60 h-60">
          <div className="w-full h-full rounded-full border-[25px] border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">1,280</p>
              <p className="text-sm text-gray-600">Total Challenges</p>
            </div>
          </div>
        </div>
        <div className="space-y-6 w-3/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Active</span>
            </div>
            <span className="text-sm font-medium text-gray-900">238</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Pending</span>
            </div>
            <span className="text-sm font-medium text-gray-900">42</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <span className="text-sm font-medium text-gray-900">985</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Banned</span>
            </div>
            <span className="text-sm font-medium text-gray-900">15</span>
          </div>
        </div>
      </div>
    </div>
  );
}
