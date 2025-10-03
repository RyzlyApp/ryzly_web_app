"use client";

import CustomButton from "@/components/custom/customButton";

export interface ReportRow {
  id: string;
  reporterName: string;
  reason: string;
  reportedItem: string;
  reportId: string;
  dateReported: string;
  status: "Pending" | "Resolved";
  avatarUrl: string;
}

interface ReportsTableProps {
  reports: ReportRow[];
}

export default function ReportsTable({ reports }: ReportsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reporter
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reason
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reported Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Report ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Reported
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reports.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <img
                    src={row.avatarUrl}
                    alt={row.reporterName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-900">
                    {row.reporterName}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{row.reason}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {row.reportedItem}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {row.reportId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {row.dateReported}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                    row.status === "Pending"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
