"use client";

import { AchievementHeader } from "@/components/achievements";
import { userAtom } from "@/helper/atom/user";
import usePaymentWalletHook from "@/modules/payment_wallet_module/hooks/usePaymentWalletHook";
import { IPayout } from "@/modules/payment_wallet_module/models/Payout-Model";
import AddBankModal from "@/modules/payment_wallet_module/ui/Add-Bank-Modal";
import RequestPayoutModal from "@/modules/payment_wallet_module/ui/RequestPayoutModal";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { FaAngleUp, FaAngleDown, FaTrash, FaPlus } from "react-icons/fa6";

const PaymentsAndPayouts = () => {
  const [paymentDropdown, setPaymentDropdown] = useState(false);
  const [payoutDropdown, setPayoutDropdown] = useState(false);
  const [bankDropdown, setBankDropdown] = useState(false);
  const [addBankModalOpen, setAddBankModalOpen] = useState(false);
  const { accounts, getUserAccount, deleteAccount, getPayouts } = usePaymentWalletHook();
  const [loading, setLoading] = React.useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [payout, setPayout] = useState<IPayout[]>([]);
  const user = useAtomValue(userAtom);

  React.useEffect(() => {
    (async function () {
      setLoading(true);
      await getUserAccount();
      const response2 = await getPayouts({ page: 1, limit: 50, userId: user?.data?._id as string });
      console.log(response2.data);
      setPayout(response2.data?.items);
      setLoading(false);
    })();
  }, [getPayouts, getUserAccount, user?.data?._id]);

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
    <div className=" w-full flex flex-col gap-4 " >
      <AchievementHeader />
      <div className="bg-white rounded-lg shadow p-5">
        <div className="pt-2">
          <div className="w-full h-auto">
            <button
              className="flex justify-between items-center w-full text-left h-[50px]"
              onClick={() => setBankDropdown(!bankDropdown)}
            >
              <h4 className="text-md font-medium text-primary">Bank Accounts</h4>
              {bankDropdown ? <FaAngleUp /> : <FaAngleDown />}
            </button>

            {bankDropdown && (
              <div className="mt-4 space-y-2">
                {accounts.length > 0 ? (
                  accounts.map((method) => (
                    <div
                      key={method._id}
                      className="flex items-center justify-between p-3"
                    >
                      <div>
                        <p className="text-xs font-medium">{method?.accountName}</p>
                        <p className="text-xs font-medium">{method?.bankName}</p>
                        <p className="text-xs text-gray-600">
                          **** {method?.accountNumber?.slice(5, method?.accountNumber?.length + 1)}
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

          <div className="w-full h-aut">
            <button
              className="flex justify-between items-center w-full text-left h-[50px]"
              onClick={() => setPayoutDropdown(!payoutDropdown)}
            >
              <h4 className="text-md font-medium text-primary">Payouts</h4>
              {payoutDropdown ? <FaAngleUp /> : <FaAngleDown />}
            </button>

            {payoutDropdown && (
              <div className="mt-4 space-y-2 w-full">
                {payout.length > 0 ? (
                  payout.map((method) => (
                    <div
                      key={method._id}
                      className="flex items-center justify-between p-3 w-full border-b border-b-gray-200"
                    >
                      <div className="w-full">
                        <div className="flex justify-between  w-full">
                          <p className="text-md font-medium text-primary">NGN{method.amount}</p>
                          <p className="text-sm font-medium my-1">{method.status.toUpperCase()}</p>
                        </div>
                   
                        <p className="text-xs text-gray-600">
                          {new Date(method.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                    </div>
                  ))
                ) : (
                  <p className="text-md font-medium text-gray-500 py-2">
                    You have&apos;t requested any payout yet!
                  </p>
                )}

          
              </div>
            )}
          </div>

          <AddBankModal 
            isOpen={addBankModalOpen}
            onClose={() => setAddBankModalOpen(false)}
            />

        </div>

      </div>
    </div>
  );
};

export default PaymentsAndPayouts;
