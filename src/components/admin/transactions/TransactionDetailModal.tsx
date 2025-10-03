import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import CustomButton from "@/components/custom/customButton";
import Image from "next/image";

interface Transaction {
  id: string;
  name: string;
  avatar: string;
  amount: number;
  type: string;
  date: string;
  status: string;
}

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-medium text-gray-900">
            Transaction Receipt
          </h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
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
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.name}
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold">
                ${transaction.amount.toFixed(2)}
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <dl className="grid grid-cols-1 gap-y-4">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {transaction.type}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {transaction.date}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Transaction ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {transaction.id}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 sm:mt-0 sm:col-span-2">
                    {transaction.status === "Successful" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="h-2 w-2 mr-1 rounded-full bg-green-400"></span>
                        Successful
                      </span>
                    )}
                    {transaction.status === "Failed" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <span className="h-2 w-2 mr-1 rounded-full bg-red-400"></span>
                        Failed
                      </span>
                    )}
                    {transaction.status === "Won" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <span className="h-2 w-2 mr-1 rounded-full bg-blue-400"></span>
                        Won
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <CustomButton variant="primary" onClick={onClose} fullWidth={true}>
            Close Transaction
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
