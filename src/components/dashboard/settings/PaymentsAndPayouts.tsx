"use client";

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

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      brand: "visa",
      last4: "1234",
      expiry: "12/24",
    },
    {
      id: "2",
      type: "card",
      brand: "mastercard",
      last4: "5678",
      expiry: "03/25",
    },
  ]);

  const [payoutMethods, setPayoutMethods] = useState<PaymentMethod[]>([
    {
      id: "3",
      type: "bank",
      bankName: "Chase Bank",
      last4: "2468",
      accountType: "Checking",
    },
    {
      id: "4",
      type: "bank",
      bankName: "Bank of America",
      last4: "1357",
      accountType: "Savings",
    },
  ]);

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const handleDeletePayoutMethod = (id: string) => {
    setPayoutMethods(payoutMethods.filter((method) => method.id !== id));
  };

  const handleAddNewCard = () => {
    console.log("Add new card clicked");
  };

  const handleAddNewBankAccount = () => {
    console.log("Add new bank account clicked");
  };

  const renderCardIcon = (brand: string) => {
    switch (brand) {
      case "visa":
        return <SiVisa className="text-blue-600 text-2xl" />;
      case "mastercard":
        return <SiMastercard className="text-red-500 text-2xl" />;
      default:
        return <div className="w-6 h-6 bg-gray-300 rounded"></div>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h4 className="text-sm hidden lg:flex font-bold mb-6">
        Payments & Payouts
      </h4>

      <div className="mb-8">
        <button
          className="flex justify-between items-center w-full text-left"
          onClick={() => setPaymentDropdown(!paymentDropdown)}
        >
          <h4 className="text-xs">Payment Methods</h4>
          {paymentDropdown ? <FaAngleUp /> : <FaAngleDown />}
        </button>

        {paymentDropdown && (
          <div className="mt-4 space-y-2">
            {paymentMethods.length > 0 ? (
              paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center gap-5 p-2">
                  <div className="flex items-center gap-3">
                    {method.type === "card" &&
                      method.brand &&
                      renderCardIcon(method.brand)}
                    <div>
                      <p className="text-xs text-gray-600">
                        {method.type === "card"
                          ? `.... .... .... ${method.last4}`
                          : `${method.bankName} ••••${method.last4}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeletePaymentMethod(method.id)}
                    className="text-gray-400 hover:text-red-500 p-2"
                    aria-label="Delete payment method"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 py-2">
                No payment methods added
              </p>
            )}

            <button
              onClick={handleAddNewCard}
              className="flex items-center gap-2 text-[#5160E7] text-xs font-medium mt-2"
            >
              <FaPlus size={10} />
              Add new card
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <button
          className="flex justify-between items-center w-full text-left"
          onClick={() => setPayoutDropdown(!payoutDropdown)}
        >
          <h4 className="text-xs">Payout Accounts</h4>
          {payoutDropdown ? <FaAngleUp /> : <FaAngleDown />}
        </button>

        {payoutDropdown && (
          <div className="mt-4 space-y-2">
            {payoutMethods.length > 0 ? (
              payoutMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-3"
                >
                  <div>
                    <p className="text-xs font-medium">{method.bankName}</p>
                    <p className="text-xs text-gray-600">**** {method.last4}</p>
                  </div>
                  <button
                    onClick={() => handleDeletePayoutMethod(method.id)}
                    className="text-gray-400 hover:text-red-500 p-2"
                    aria-label="Delete payout method"
                  >
                    <FaTrash size={14} />
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
    </div>
  );
};

export default PaymentsAndPayouts;
