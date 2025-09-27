"use client";
import { RiArrowDownSLine, RiFilterLine } from "react-icons/ri";

interface CommunitiesTableHeaderProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
}

export default function CommunitiesTableHeader({
  sortBy,
  setSortBy,
  categoryFilter,
  setCategoryFilter,
}: CommunitiesTableHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Communities</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Recent">Recent</option>
                <option value="Members">Members</option>
                <option value="Name">Name</option>
                <option value="Category">Category</option>
              </select>
              <RiArrowDownSLine
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <RiFilterLine className="text-gray-400" size={16} />
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All Categories">All Categories</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Business">Business</option>
                <option value="Technology">Technology</option>
              </select>
              <RiArrowDownSLine
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
