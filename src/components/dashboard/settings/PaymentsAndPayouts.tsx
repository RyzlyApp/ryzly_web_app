"use client";

import usePaymentWalletHook from "@/modules/payment_wallet_module/hooks/usePaymentWalletHook";
import AddBankModal from "@/modules/payment_wallet_module/ui/Add-Bank-Modal";
import { Spinner } from "@heroui/react";
import React, { useState } from "react";
import { FaAngleUp, FaAngleDown, FaTrash, FaPlus } from "react-icons/fa6";
import { SiVisa, SiMastercard } from "react-icons/si";

interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  brand?: string;
  last4: string;
  expiry?: string;
  bankName?: string;
  accountType?: string;
}

const PaymentsAndPayouts = () => {
  const [paymentDropdown, setPaymentDropdown] = useState(false);
  const [payoutDropdown, setPayoutDropdown] = useState(false);
  const [addBankModalOpen, setAddBankModalOpen] = useState(false);
  const { accounts, getUserAccount, deleteAccount } = usePaymentWalletHook();
  const [loading, setLoading] = React.useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  React.useEffect(() => {
    (async function () {
      setLoading(true);
      const response = await getUserAccount();
      setLoading(false);
    })();
  }, []);

  const handleAddNewBankAccount = () => {
    setAddBankModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (isDeleteLoading) return;
    setIsDeleteLoading(true);
    await deleteAccount(id);
    setIsDeleteLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="pt-2">
        <button
          className="flex justify-between items-center w-full text-left"
          onClick={() => setPayoutDropdown(!payoutDropdown)}
        >
          <h4 className="text-xs">Bank Accounts</h4>
          {payoutDropdown ? <FaAngleUp /> : <FaAngleDown />}
        </button>

        {payoutDropdown && (
          <div className="mt-4 space-y-2">
            {accounts.length > 0 ? (
              accounts.map((method) => (
                <div
                  key={method._id}
                  className="flex items-center justify-between p-3"
                >
                  <div>
                    <p className="text-xs font-medium">{method.bankName}</p>
                    <p className="text-xs text-gray-600">
                      **** {method.accountNumber}
                    </p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-500 p-2"
                    aria-label="Delete payout method"
                  >
                    <FaTrash
                      size={14}
                      onClick={() => handleDelete(method._id)}
                    />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 py-2">
                No payout accounts added
              </p>
            )}

            <button
              onClick={handleAddNewBankAccount}
              className="flex items-center gap-2 text-[#5160E7] text-xs font-medium mt-2"
            >
              <FaPlus size={10} />
              Add new bank account
            </button>
          </div>
        )}
      </div>
      <AddBankModal
        isOpen={addBankModalOpen}
        onClose={() => setAddBankModalOpen(false)}
      />
    </div>
  );
};

export default PaymentsAndPayouts;
