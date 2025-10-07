"use client";

import React, { useState } from "react";
import { TransactionTable } from "@/components/admin/transactions/TransactionTable";
import { TransactionDetailModal } from "@/components/admin/transactions/TransactionDetailModal";
import { DateRangePicker } from "@/components/custom/DateRangePicker";
import CustomSelect from "@/components/custom/customSelect";
import { Formik, Form } from "formik";

// Define Transaction type
interface Transaction {
  id: string;
  name: string;
  avatar: string;
  amount: number;
  type: string;
  date: string;
  status: string;
}

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: "WYRUF687498643",
    name: "Albert Flores",
    avatar: "/images/avatar1.png",
    amount: 576.28,
    type: "Deposit",
    date: "25 Aug 2023",
    status: "Failed",
  },
  {
    id: "WYRUF687498643",
    name: "Eleanor Pena",
    avatar: "/images/avatar2.png",
    amount: 787.5,
    type: "Payout",
    date: "25 Aug 2023",
    status: "Successful",
  },
  {
    id: "WYRUF687498643",
    name: "Wade Warren",
    avatar: "/images/avatar3.png",
    amount: 782.71,
    type: "Prize Won",
    date: "25 Aug 2023",
    status: "Won",
  },
  {
    id: "WYRUF687498643",
    name: "Darrell Steward",
    avatar: "/images/avatar4.png",
    amount: 105.55,
    type: "Payout",
    date: "25 Aug 2023",
    status: "Successful",
  },
  {
    id: "WYRUF687498643",
    name: "Floyd Miles",
    avatar: "/images/avatar5.png",
    amount: 169.43,
    type: "Prize Won",
    date: "25 Aug 2023",
    status: "Won",
  },
  {
    id: "WYRUF687498643",
    name: "Devon Lane",
    avatar: "/images/avatar6.png",
    amount: 202.87,
    type: "Payout",
    date: "25 Aug 2023",
    status: "Won",
  },
  {
    id: "WYRUF687498643",
    name: "Cody Fisher",
    avatar: "/images/avatar7.png",
    amount: 233.01,
    type: "Prize Won",
    date: "25 Aug 2023",
    status: "Won",
  },
  {
    id: "WYRUF687498643",
    name: "Bessie Cooper",
    avatar: "/images/avatar8.png",
    amount: 630.44,
    type: "Payout",
    date: "25 Aug 2023",
    status: "Successful",
  },
  {
    id: "WYRUF687498643",
    name: "Jacob Jones",
    avatar: "/images/avatar9.png",
    amount: 295.84,
    type: "Prize Won",
    date: "25 Aug 2023",
    status: "Won",
  },
  {
    id: "WYRUF687498643",
    name: "Arlene McCoy",
    avatar: "/images/avatar10.png",
    amount: 450.54,
    type: "Deposit",
    date: "25 Aug 2023",
    status: "Successful",
  },
  {
    id: "WYRUF687498643",
    name: "Arlene McCoy",
    avatar: "/images/avatar10.png",
    amount: 275.43,
    type: "Deposit",
    date: "25 Aug 2023",
    status: "Successful",
  },
];

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionType, setTransactionType] = useState("All Transactions");

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockTransactions.length / itemsPerPage);

  const paginatedTransactions = mockTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="w-48">
          <Formik
            initialValues={{ transactionType: transactionType }}
            onSubmit={() => {}}
          >
            {({ values, setFieldValue }) => {
              // Remove useEffect from here
              if (values.transactionType !== transactionType) {
                setTransactionType(values.transactionType);
              }

              return (
                <Form>
                  <CustomSelect
                    name="transactionType"
                    options={[
                      { value: "All Transactions", label: "All Transactions" },
                      { value: "Deposit", label: "Deposit" },
                      { value: "Payout", label: "Payout" },
                      { value: "Prize Won", label: "Prize Won" },
                    ]}
                    placeholder="Select transaction type"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>

        <div className="flex items-center">
          <DateRangePicker
            startDate={new Date("2025-01-06")}
            endDate={new Date("2025-01-13")}
            onChange={() => {}}
          />
        </div>
      </div>

      <TransactionTable
        transactions={paginatedTransactions}
        onTransactionClick={handleTransactionClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedTransaction && (
        <TransactionDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
}
