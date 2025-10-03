"use client";

import { CustomButton } from "@/components/custom";

interface TabItem {
  id: string;
  label: string;
}

interface RewardsTabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  onAdd: () => void;
}

export default function RewardsTabs({
  tabs,
  active,
  onChange,
  onAdd,
}: RewardsTabsProps) {
  return (
    <div className="flex items-center justify-between px-6 py-2">
      <nav className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              active === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <CustomButton variant="primary" onClick={onAdd}>
        Add Reward
      </CustomButton>
    </div>
  );
}
