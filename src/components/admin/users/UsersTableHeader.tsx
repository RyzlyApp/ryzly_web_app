import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";

interface UsersTableHeaderProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const UsersTableHeader: React.FC<UsersTableHeaderProps> = ({
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Users</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Recent">Recent</option>
              <option value="Participants">Participants</option>
              <option value="Creators">Creators</option>
              <option value="Active">Active</option>
              <option value="Banned">Banned</option>
            </select>
            <RiArrowDownSLine
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTableHeader;
