import { CustomImage } from "@/components/custom";
import React from "react";

export const Reports = () => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="font-semibold">100 reports</h3>
      <div className="flex items-center gap-2 mt-5">
        <div>
          <CustomImage
            src="/work.jpg"
            alt="avatar"
            width={1000}
            height={1000}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="ms-2">
          <h4 className="text-sm font-semibold">Adebayo</h4>
          <p className="text-xs text-gray-500">The Challenge is confusing</p>
        </div>
        <div className="text-sm text-gray-500 ml-auto">23 July 2025</div>
      </div>
    </div>
  );
};
