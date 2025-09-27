"use client";
import { useState } from "react";
import { Avatar } from "@heroui/react";
import CustomImage from "@/components/custom/customImage";
import { RiArrowDownSLine } from "react-icons/ri";

export default function BestPerformingChallenge() {
  const [weekFilter, setWeekFilter] = useState("This Week");

  return (
    <div className="bg-white rounded-lg p-6 col-span-3">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          Best Performing Challenge
        </h3>
        <div className="relative">
          <select
            value={weekFilter}
            onChange={(e) => setWeekFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="All Time">All Time</option>
          </select>
          <RiArrowDownSLine
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
          <CustomImage
            src="/images/weather-widget.jpg"
            alt="Weather Widget"
            width={120}
            height={80}
            className="rounded-lg"
            fallbackSrc="/images/fallback.png"
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900">
            Weather Forecast Widget
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            Create a beautiful, responsive weather widget with animations and
            location-based
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Participants</p>
            <p className="text-lg font-semibold text-gray-900">1,573</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Generated</p>
            <p className="text-lg font-semibold text-gray-900">$8,500</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Hosted By:</span>
          <Avatar className="w-6 h-6 text-xs" name="NN" color="primary" />
          <span className="text-sm font-medium text-gray-900">
            Ngozi Nnamani
          </span>
        </div>
      </div>
    </div>
  );
}
