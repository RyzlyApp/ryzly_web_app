"use client";
import { Avatar, Chip } from "@heroui/react";
import CustomButton from "@/components/custom/customButton";

interface PayoutRequest {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  availableBalance: string;
  amountRequested: string;
  status: "Pending" | "Approved";
  date: string;
}

interface PayoutRequestTabProps {
  userId: string;
}

const mockPayoutRequests: PayoutRequest[] = [
  {
    id: "1",
    user: {
      name: "Ngozi Nnamani",
      avatar: "/work.jpg",
    },
    availableBalance: "$14,895.00",
    amountRequested: "$5,000.00",
    status: "Pending",
    date: "29 Jul 2025",
  },
  {
    id: "2",
    user: {
      name: "Ngozi Nnamani",
      avatar: "/work.jpg",
    },
    availableBalance: "$14,895.00",
    amountRequested: "$3,000.00",
    status: "Approved",
    date: "28 Jul 2025",
  },
  {
    id: "3",
    user: {
      name: "Ngozi Nnamani",
      avatar: "/work.jpg",
    },
    availableBalance: "$14,895.00",
    amountRequested: "$2,500.00",
    status: "Approved",
    date: "27 Jul 2025",
  },
];

export default function PayoutRequestTab({ userId }: PayoutRequestTabProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Approved":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      case "Approved":
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
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
                By
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Available Balance
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Amount Requested
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
            {mockPayoutRequests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={request.user.avatar}
                      alt={request.user.name}
                      className="w-8 h-8"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {request.user.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {request.availableBalance}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {request.amountRequested}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    <Chip
                      color={getStatusColor(request.status)}
                      size="sm"
                      variant="flat"
                    >
                      {request.status}
                    </Chip>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <CustomButton
                    variant={
                      request.status === "Pending" ? "primary" : "outline"
                    }
                    size="sm"
                    // disabled={request.status === "Approved"}
                  >
                    Approve
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
