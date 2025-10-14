import { Avatar } from "@heroui/react";
import CustomButton from "@/components/custom/customButton";
import CustomImage from "@/components/custom/customImage";

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  createdBy: string;
  createdAt: string;
  status: "Active" | "Pending" | "Banned";
  thumbnail: string;
}

interface CommunitiesTableProps {
  communities: Community[];
  onCommunityClick: (community: Community) => void; // Add this prop
}

export default function CommunitiesTable({
  communities,
  onCommunityClick,
}: CommunitiesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Admin
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Status
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Date Created
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Members
            </th>
          </tr>
        </thead>
        <tbody>
          {communities.map((community) => (
            <tr
              key={community.id}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              onClick={() => onCommunityClick(community)}
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
                    <CustomImage
                      src={community.thumbnail}
                      alt={community.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover rounded-lg"
                      fallbackSrc="/images/fallback.png"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {community.name}
                    </h4>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <Avatar
                    className="w-6 h-6 text-xs"
                    name={community.createdBy
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                    color="primary"
                  />
                  <span className="text-sm text-gray-900">
                    {community.createdBy}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      community.status === "Active"
                        ? "bg-green-500"
                        : community.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {community.status}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {community.createdAt}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {community.members.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
