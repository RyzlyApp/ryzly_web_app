"use client";
import { FiEdit2 } from "react-icons/fi";

export interface RewardItem {
  id: string;
  title: string;
  imageUrl: string;
  addedAt: string;
}

interface RewardCardProps {
  item: RewardItem;
  onEdit?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function RewardCard({ item, onEdit, onClick }: RewardCardProps) {
  return (
    <div
      className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 cursor-pointer "
      onClick={() => onClick?.(item.id)}
    >
      <div className="flex items-center gap-4">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-12 w-16 object-cover rounded-md border"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
          <p className="text-xs text-gray-500">Added on {item.addedAt}</p>
        </div>
      </div>
      <button
        aria-label="Edit reward"
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.(item.id);
        }}
        className="p-2 text-gray-500 hover:text-blue-500"
      >
        <FiEdit2 size={16} />
      </button>
    </div>
  );
}
