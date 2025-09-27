"use client";
import { useState } from "react";
import ApprovalsTabs from "@/components/admin/approvals/ApprovalsTabs";
import PayoutRequestsTable from "@/components/admin/approvals/PayoutRequestsTable";
import ApprovalsTablePagination from "@/components/admin/approvals/ApprovalsTablePagination";

interface ApprovalRequest {
  id: string;
  name: string;
  availableBalance: string;
  amountRequested: string;
  date: string;
  status: "Pending" | "Approved";
  avatar: string;
}

const mockPayoutRequests: ApprovalRequest[] = [
  {
    id: "1",
    name: "Albert Flores",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "AF",
  },
  {
    id: "2",
    name: "Eleanor Pena",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "EP",
  },
  {
    id: "3",
    name: "Wade Warren",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "WW",
  },
  {
    id: "4",
    name: "Darrell Steward",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "DS",
  },
  {
    id: "5",
    name: "Floyd Miles",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "FM",
  },
  {
    id: "6",
    name: "Devon Lane",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "DL",
  },
  {
    id: "7",
    name: "Cody Fisher",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "CF",
  },
  {
    id: "8",
    name: "Bessie Cooper",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "BC",
  },
  {
    id: "9",
    name: "Jacob Jones",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "JJ",
  },
  {
    id: "10",
    name: "Arlene McCoy",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Approved",
    avatar: "AM",
  },
];

export default function AdminApprovals() {
  const [activeTab, setActiveTab] = useState("Payout Request");

  const tabs = [
    { id: "Payout Request", label: "Payout Request" },
    { id: "Coach Application", label: "Coach Application" },
    { id: "Challenge Application", label: "Challenge Application" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <ApprovalsTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="p-6">
          {activeTab === "Payout Request" && (
            <div className="space-y-6">
              <PayoutRequestsTable requests={mockPayoutRequests} />
              <ApprovalsTablePagination />
            </div>
          )}

          {activeTab === "Coach Application" && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Coach Application content will be displayed here
              </p>
            </div>
          )}

          {activeTab === "Challenge Application" && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Challenge Application content will be displayed here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
