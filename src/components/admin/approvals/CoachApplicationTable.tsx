import { useState } from "react";
import CustomButton from "@/components/custom/customButton";

export interface CoachApplication {
  id: string;
  name: string;
  expertise: string;
  yearsOfExp: number;
  portfolio: string;
  focusArea: string;
  status: "Pending" | "Approved";
  avatar: string;
}

interface CoachApplicationTableProps {
  applications: CoachApplication[];
  onApprove: (id: string) => void;
}

export default function CoachApplicationTable({
  applications,
  onApprove,
}: CoachApplicationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Expertise
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Years of Exp
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Portfolio
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Focus Area
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Status
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {applications.map((application) => (
            <tr key={application.id}>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                    {application.avatar}
                  </div>
                  <span className="text-sm font-medium">
                    {application.name}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4 text-sm">{application.expertise}</td>
              <td className="py-4 px-4 text-sm">{application.yearsOfExp}</td>
              <td className="py-4 px-4 text-sm">
                <a
                  href={application.portfolio}
                  className="text-blue-600 hover:underline"
                >
                  {application.portfolio}
                </a>
              </td>
              <td className="py-4 px-4 text-sm">{application.focusArea}</td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E8E7ED] text-black">
                  {application.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <CustomButton
                  variant="primary"
                  size="sm"
                  onClick={() => onApprove(application.id)}
                >
                  Approve
                </CustomButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
