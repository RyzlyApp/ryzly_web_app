"use client";
import { useState } from "react";
import { Avatar } from "@heroui/react";
import CustomButton from "@/components/custom/customButton";

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
    avatar: "AF"
  },
  {
    id: "2",
    name: "Eleanor Pena",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "EP"
  },
  {
    id: "3",
    name: "Wade Warren",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "WW"
  },
  {
    id: "4",
    name: "Darrell Steward",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "DS"
  },
  {
    id: "5",
    name: "Floyd Miles",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "FM"
  },
  {
    id: "6",
    name: "Devon Lane",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "DL"
  },
  {
    id: "7",
    name: "Cody Fisher",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "CF"
  },
  {
    id: "8",
    name: "Bessie Cooper",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "BC"
  },
  {
    id: "9",
    name: "Jacob Jones",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Pending",
    avatar: "JJ"
  },
  {
    id: "10",
    name: "Arlene McCoy",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000",
    date: "25 Aug 2025",
    status: "Approved",
    avatar: "AM"
  }
];

export default function AdminApprovals() {
  const [activeTab, setActiveTab] = useState("Payout Request");

  const tabs = [
    { id: "Payout Request", label: "Payout Request" },
    { id: "Coach Application", label: "Coach Application" },
    { id: "Challenge Application", label: "Challenge Application" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "Payout Request" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Payout Request</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Name</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Available Balance</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Amount Requested</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPayoutRequests.map((request) => (
                      <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8 text-xs" name={request.avatar} color="primary" />
                            <span className="text-sm font-medium text-gray-900">{request.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900">{request.availableBalance}</td>
                        <td className="py-4 px-6 text-sm text-gray-900">{request.amountRequested}</td>
                        <td className="py-4 px-6 text-sm text-gray-900">{request.date}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              request.status === 'Pending' ? 'bg-gray-400' : 'bg-green-500'
                            }`}></div>
                            <span className="text-sm text-gray-600">{request.status}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {request.status === 'Pending' ? (
                            <CustomButton
                              variant="primary"
                              size="sm"
                              height="32px"
                              fontSize="12px"
                            >
                              Approve
                            </CustomButton>
                          ) : (
                            <span className="text-sm text-green-600 font-medium">Approved</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">← Previous</button>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((page) => (
                      <button
                        key={page}
                        className={`px-3 py-1 text-sm rounded ${
                          page === 2 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Next →</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Coach Application" && (
            <div className="text-center py-12">
              <p className="text-gray-500">Coach Application content will be displayed here</p>
            </div>
          )}

          {activeTab === "Challenge Application" && (
            <div className="text-center py-12">
              <p className="text-gray-500">Challenge Application content will be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
