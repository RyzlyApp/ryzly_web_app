"use client";
import { useState } from "react";
import ApprovalsTabs from "@/components/admin/approvals/ApprovalsTabs";
import PayoutRequestsTable from "@/components/admin/approvals/PayoutRequestsTable";
import ApprovalsTablePagination from "@/components/admin/approvals/ApprovalsTablePagination";
import CoachApplicationTable, {
  CoachApplication,
} from "@/components/admin/approvals/CoachApplicationTable";
import ChallengeApplicationTable, {
  ChallengeApplication,
} from "@/components/admin/approvals/ChallengeApplicationTable";

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

const mockCoachApplications: CoachApplication[] = [
  {
    id: "1",
    name: "Albert Flores",
    expertise: "Product Design",
    yearsOfExp: 8,
    portfolio: "albertflores.com",
    focusArea: "UI/UX Design",
    status: "Pending",
    avatar: "AF",
  },
  {
    id: "2",
    name: "Eleanor Pena",
    expertise: "Frontend Development",
    yearsOfExp: 5,
    portfolio: "eleanorpena.com",
    status: "Pending",
    focusArea: "React Development",
    avatar: "EP",
  },
  // Add more mock data as needed
];

const mockChallengeApplications: ChallengeApplication[] = [
  {
    id: "1",
    title: "Redesign a Travel Booking App",
    host: "Ngozi Nnamani",
    hostAvatar: "NN",
    date: "01 Aug - 25 Aug 2025",
    status: "Pending",
    thumbnail: "/images/challenge-thumbnail.jpg", // Add your image path
  },
  {
    id: "2",
    title: "Redesign a Travel Booking App",
    host: "Ngozi Nnamani",
    hostAvatar: "NN",
    date: "01 Aug - 25 Aug 2025",
    status: "Pending",
    thumbnail: "/images/challenge-thumbnail.jpg", // Add your image path
  },
  // Add more mock data as needed
];

export default function AdminApprovals() {
  const [activeTab, setActiveTab] = useState("Payout Request");

  const tabs = [
    { id: "Payout Request", label: "Payout Request" },
    { id: "Coach Application", label: "Coach Application" },
    { id: "Challenge Application", label: "Challenge Application" },
  ];

  const handleApproveCoach = (id: string) => {
    console.log("Approving coach with id:", id);
    // Add your approval logic here
  };

  const handleApproveChallenge = (id: string) => {
    console.log("Approving challenge with id:", id);
    // Add your approval logic here
  };

  const handleRejectChallenge = (id: string) => {
    console.log("Rejecting challenge with id:", id);
    // Add your rejection logic here
  };

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
            <div className="space-y-6">
              <CoachApplicationTable
                applications={mockCoachApplications}
                onApprove={handleApproveCoach}
              />
              <ApprovalsTablePagination />
            </div>
          )}

          {activeTab === "Challenge Application" && (
            <div className="space-y-6">
              <ChallengeApplicationTable
                applications={mockChallengeApplications}
                onApprove={handleApproveChallenge}
                onReject={handleRejectChallenge}
              />
              <ApprovalsTablePagination />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
