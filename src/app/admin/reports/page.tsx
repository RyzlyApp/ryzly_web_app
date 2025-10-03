"use client";
import { useState } from "react";
import ReportsHeader from "@/components/admin/reports/ReportsHeader";
import ReportsTable, {
  ReportRow,
} from "@/components/admin/reports/ReportsTable";
import ReportsPagination from "@/components/admin/reports/ReportsPagination";

const mockReports: ReportRow[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `${i + 1}`,
  reporterName: [
    "Eleanor Pena",
    "Wade Warren",
    "Darrell Steward",
    "Floyd Miles",
    "Devon Lane",
    "Cody Fisher",
    "Bessie Cooper",
    "Jacob Jones",
    "Arlene McCoy",
  ][i % 9],
  reason: ["Harassment", "Spam", "Inappropriate Content", "Fraud"][i % 4],
  reportedItem: [
    "Ngozi Nnamani",
    "Mobile Banking App UI",
    "Case Study Writers Club",
    "The Design Den",
    "Redesign a Travel Booking App",
  ][i % 5],
  reportId: `WYRUFB${87498943 + i}`,
  dateReported: "25 Aug 2025",
  status: i % 3 === 0 ? "Resolved" : "Pending",
  avatarUrl: "/public/work.jpg".replace("/public", ""),
}));

export default function AdminReportsPage() {
  const [type, setType] = useState("User");
  const [status, setStatus] = useState("Pending");

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm">
        <ReportsHeader
          type={type}
          setType={setType}
          status={status}
          setStatus={setStatus}
        />
        <ReportsTable reports={mockReports} />
        <ReportsPagination />
      </div>
    </div>
  );
}
