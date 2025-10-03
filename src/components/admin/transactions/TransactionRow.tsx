import React from 'react';
import Image from 'next/image';

interface Transaction {
  id: string;
  name: string;
  avatar: string;
  amount: number;
  type: string;
  date: string;
  status: string;
}

interface TransactionRowProps {
  transaction: Transaction;
  onClick: () => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onClick }) => {
  // Status badge styling based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'successful':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="h-2 w-2 mr-1 rounded-full bg-green-400"></span>
            Successful
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <span className="h-2 w-2 mr-1 rounded-full bg-red-400"></span>
            Failed
          </span>
        );
      case 'won':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <span className="h-2 w-2 mr-1 rounded-full bg-blue-400"></span>
            Won
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <span className="h-2 w-2 mr-1 rounded-full bg-gray-400"></span>
            {status}
          </span>
        );
    }
  };

  return (
    <tr 
      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
      onClick={onClick}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 relative">
            <Image
              className="h-10 w-10 rounded-full"
              src={transaction.avatar}
              alt={transaction.name}
              width={40}
              height={40}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">${transaction.amount.toFixed(2)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{transaction.type}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{transaction.id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{transaction.date}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(transaction.status)}
      </td>
    </tr>
  );
};