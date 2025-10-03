"use client";
import CustomButton from "@/components/custom/customButton";

interface RewardsHeaderProps {
  onAdd: () => void;
}

export default function RewardsHeader({ onAdd }: RewardsHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6">
      <CustomButton variant="primary" onClick={onAdd}>
        Add Reward
      </CustomButton>
    </div>
  );
}
