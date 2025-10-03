"use client";
import CustomButton from "@/components/custom/customButton";

interface AdminRolesHeaderProps {
  onAdd: () => void;
}

export default function AdminRolesHeader({ onAdd }: AdminRolesHeaderProps) {
  return (
    <div className="flex items-center justify-end p-6">
      <CustomButton variant="primary" onClick={onAdd}>
        Add Administrator
      </CustomButton>
    </div>
  );
}
