import React from "react";
import { Avatar } from "@heroui/react";
import CustomButton from "@/components/custom/customButton";

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  location: string;
  joinedOn: string;
  status: "Active" | "Banned";
  avatar: string;
  isCoach?: boolean;
}

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Email
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Location
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Joined On
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Status
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <Avatar
                    className="w-8 h-8 text-xs"
                    name={user.avatar}
                    color="primary"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {user.name}
                      </span>
                      {user.isCoach && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Coach
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{user.role}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">{user.email}</td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {user.location}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {user.joinedOn}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      user.status === "Active" ? "bg-blue-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600">{user.status}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                {user.status === "Active" ? (
                  <CustomButton
                    variant="customDanger"
                    size="sm"
                    height="32px"
                    fontSize="12px"
                  >
                    Suspend
                  </CustomButton>
                ) : (
                  <CustomButton
                    variant="primary"
                    size="sm"
                    height="32px"
                    fontSize="12px"
                  >
                    Unsuspend
                  </CustomButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
