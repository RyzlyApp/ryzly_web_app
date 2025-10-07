"use client";
import { Chip } from "@heroui/react";

interface Transaction {
  id: string;
  type: "Received" | "Topup" | "Payout" | "Debited";
  amount: string;
  description: string;
  date: string;
  status: "Won" | "Received" | "Successful" | "Debited";
}

interface FinancialHistoryTabProps {
  userId: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "Received",
    amount: "$100",
    description: "Winner",
    date: "19 June 2025, 7:32 PM",
    status: "Won",
  },
  {
    id: "2",
    type: "Topup",
    amount: "$10",
    description: "Paid by James",
    date: "19 June 2025, 7:32 PM",
    status: "Received",
  },
  {
    id: "3",
    type: "Payout",
    amount: "$5,000",
    description: "Payout approved",
    date: "19 June 2025, 7:32 PM",
    status: "Successful",
  },
  {
    id: "4",
    type: "Topup",
    amount: "$10",
    description: "Paid by James",
    date: "19 June 2025, 7:32 PM",
    status: "Received",
  },
  {
    id: "5",
    type: "Topup",
    amount: "$10",
    description: "Paid by James",
    date: "19 June 2025, 7:32 PM",
    status: "Received",
  },
  {
    id: "6",
    type: "Debited",
    amount: "$10",
    description: "You joined a challenge",
    date: "19 June 2025, 7:32 PM",
    status: "Debited",
  },
  {
    id: "7",
    type: "Topup",
    amount: "$10",
    description: "Paid by James",
    date: "19 June 2025, 7:32 PM",
    status: "Received",
  },
  {
    id: "8",
    type: "Debited",
    amount: "$10",
    description: "You joined a challenge",
    date: "19 June 2025, 7:32 PM",
    status: "Debited",
  },
];

export default function FinancialHistoryTab({
  userId,
}: FinancialHistoryTabProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Won":
      case "Received":
      case "Successful":
        return "success";
      case "Debited":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Won":
      case "Received":
      case "Successful":
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case "Debited":
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                TYPE
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                AMOUNT
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                DESCRIPTION
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                DATE
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {transaction.type}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {transaction.amount}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {transaction.date}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(transaction.status)}
                    <Chip
                      color={getStatusColor(transaction.status)}
                      size="sm"
                      variant="flat"
                    >
                      {transaction.status}
                    </Chip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
          ← Previous
        </button>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-2 text-sm rounded ${
                page === 2
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
          Next →
        </button>
      </div>
    </div>
  );
}
