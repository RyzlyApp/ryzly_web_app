import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const BannedCommunityNotice: React.FC<{ onUnbanClick: () => void }> = ({
  onUnbanClick,
}) => {
  return (
    <div className="bg-[#FEE4E2] p-2 border-none shadow-none rounded-lg flex items-center justify-between">
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-col justify-center text-red-600 font-semibold">
          <div className="flex gap-1">
            <AiOutlineExclamationCircle className="text-xl mr-2" />
            <p className="font-semibold">Community Banned</p>
          </div>
          <p className="text-xs font-normal w-4/5 mt-1">
            Access to this community is no longer available. Posts, discussions,
            and member activities have been restricted due to violations of
            Rhyzly&apos;s guidelines.
          </p>
        </div>
      </div>
      <button
        onClick={onUnbanClick}
        className="ml-4 rounded-full bg-[#7A271A] text-white py-3 px-5 text-sm"
      >
        Unban
      </button>
    </div>
  );
};

export default BannedCommunityNotice;
