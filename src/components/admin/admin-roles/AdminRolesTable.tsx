"use client";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export interface AdminRow {
  id: string;
  name: string;
  role: string;
  email: string;
  access: string;
  avatarUrl: string;
}

interface AdminRolesTableProps {
  admins: AdminRow[];
  onEditAccess: (row: AdminRow) => void;
  onRemove: (row: AdminRow) => void;
}

export default function AdminRolesTable({
  admins,
  onEditAccess,
  onRemove,
}: AdminRolesTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Access
            </th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {admins.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <img
                    src={row.avatarUrl}
                    alt={row.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-900">{row.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{row.role}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{row.email}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{row.access}</td>
              <td className="px-6 py-4 text-right relative">
                <button
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={() =>
                    setOpenMenu(openMenu === row.id ? null : row.id)
                  }
                  aria-label="Actions"
                >
                  <HiOutlineDotsHorizontal />
                </button>
                {openMenu === row.id && (
                  <div className="absolute right-4 mt-2 w-40 bg-white rounded-md border shadow-md z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={() => {
                        setOpenMenu(null);
                        onEditAccess(row);
                      }}
                    >
                      Edit access
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setOpenMenu(null);
                        onRemove(row);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
