import React, { ReactNode } from "react";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";

export interface StatCardProps {
  icon: ReactNode;
  iconBgColor: string;
  iconTextColor: string;
  value: string;
  label: string;
  trend: string;
  trendDirection: "up" | "down";
  trendColor: string;
  footerText: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBgColor,
  iconTextColor,
  value,
  label,
  trend,
  trendDirection,
  trendColor,
  footerText,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          <div className={`text-2xl ${iconTextColor}`}>{icon}</div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
      <div className="flex items-center border-t border-gray-300 pt-3 mt-auto">
        <div className={`flex items-center ${trendColor}`}>
          <p className="text-sm font-medium flex gap-1">
            {trendDirection === "up" ? <BiTrendingUp /> : <BiTrendingDown />}{" "}
            {trend}
          </p>
        </div>
        <span className="text-sm text-gray-500 ml-2">{footerText}</span>
      </div>
    </div>
  );
};

export default StatCard;
