import { Avatar } from "@heroui/react";
import { CustomButton } from "../custom";

interface PayoutRequest {
  id: string;
  name: string;
  avatar: string;
  availableBalance: string;
  amountRequested: string;
  status: string;
}

const mockPayoutRequests: PayoutRequest[] = [
  {
    id: "1",
    name: "Adebola Ogunde",
    avatar: "AO",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000.00",
    status: "Pending",
  },
  {
    id: "2",
    name: "Adebola Ogunde",
    avatar: "AO",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000.00",
    status: "Pending",
  },
  {
    id: "3",
    name: "Adebola Ogunde",
    avatar: "AO",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000.00",
    status: "Pending",
  },
  {
    id: "4",
    name: "Adebola Ogunde",
    avatar: "AO",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000.00",
    status: "Pending",
  },
  {
    id: "5",
    name: "Adebola Ogunde",
    avatar: "AO",
    availableBalance: "$14,895.00",
    amountRequested: "$5,000.00",
    status: "Pending",
  },
];

export default function PayoutRequestTable() {
  return (
    <div className="bg-white rounded-xl p-6 col-span-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Payout Request</h3>
        <button className="text-blue-600 text-sm font-medium">See all</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-600">
                By
              </th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">
                Available Balance
              </th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">
                Amount Requested
              </th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mockPayoutRequests.map((request) => (
              <tr key={request.id} className="border-b border-gray-100">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      className="w-8 h-8 text-xs"
                      name={request.avatar}
                      color="primary"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {request.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-900">
                  {request.availableBalance}
                </td>
                <td className="py-4 text-sm text-gray-900">
                  {request.amountRequested}
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      {request.status}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <CustomButton>Approve</CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
