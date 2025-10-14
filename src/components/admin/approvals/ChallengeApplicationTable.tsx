"use client";
import Image from "next/image";
import CustomButton from "@/components/custom/customButton";
import CustomImage from "@/components/custom/customImage";

export interface ChallengeApplication {
  id: string;
  title: string;
  host: string;
  hostAvatar: string;
  date: string;
  status: "Pending" | "Approved";
  thumbnail: string;
}

interface ChallengeApplicationTableProps {
  applications: ChallengeApplication[];
  onApprove: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function ChallengeApplicationTable({
  applications,
  onApprove,
  onReject,
}: ChallengeApplicationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Title
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Host
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Date
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
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                    <CustomImage
                      src={application.thumbnail}
                      alt={application.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {application.title}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                    {application.hostAvatar}
                  </div>
                  <span className="text-sm">{application.host}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-sm">{application.date}</td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E8E7ED] text-black">
                  {application.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <CustomButton
                    variant="primary"
                    size="sm"
                    onClick={() => onApprove(application.id)}
                  >
                    Approve
                  </CustomButton>
                  {onReject && (
                    <button
                      onClick={() => onReject(application.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
