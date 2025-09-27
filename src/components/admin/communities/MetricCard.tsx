import { ReactNode } from "react";

export interface MetricCardProps {
  icon: ReactNode;
  iconBgColor: string;
  iconTextColor: string;
  value: string;
  label: string;
}

export default function MetricCard({
  icon,
  iconBgColor,
  iconTextColor,
  value,
  label,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className={`p-3 rounded-full ${iconBgColor}`}>
          <div className={`text-2xl ${iconTextColor}`}>{icon}</div>
        </div>
        <div className="">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );
}
