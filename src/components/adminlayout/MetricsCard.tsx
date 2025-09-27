import { ReactNode } from "react";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";

interface MetricsCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  change: string;
  isPositive: boolean;
  iconColor: string;
  iconBg: string;
}

export default function MetricsCard({
  icon,
  value,
  label,
  change,
  isPositive,
  iconColor,
  iconBg,
}: MetricsCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-full ${iconBg}`}>
          <div className={`text-2xl ${iconColor}`}>{icon}</div>
        </div>
        <div className="">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center border-t border-gray-300 pt-3">
        <div
          className={`flex items-center ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          <p className="text-sm font-medium flex items-center gap-1">
            {isPositive ? <BiTrendingUp /> : <BiTrendingDown />} {change}
          </p>
        </div>
        <span className="text-sm text-gray-500 ml-2">From last month</span>
      </div>
    </div>
  );
}
