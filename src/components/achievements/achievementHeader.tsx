"use client";
import { Spinner } from "@heroui/react";
import { CustomButton } from "../custom"; 
import usePaymentWalletHook from "@/modules/payment_wallet_module/hooks/usePaymentWalletHook";
import React from "react";
import AddMoneyModal from "@/modules/payment_wallet_module/ui/Add-Money-Modal";
import { useRouter } from "next/navigation";
import RequestPayoutModal from "@/modules/payment_wallet_module/ui/RequestPayoutModal";

export default function AchievementHeader() {
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const { getWallet, wallet } = usePaymentWalletHook();
    const [showPayoutModal, setShowPayoutModal] = React.useState(false);



  React.useEffect(() => {
    setLoading(true);
    (async function () {
      await getWallet();
      setLoading(false);
    })();
  }, []);

  const router = useRouter()

  return (
    <div className=" w-full h-[300px] p-4 rounded-2xl bg-white flex flex-col gap-4 ">
      <div className=" w-full flex justify-between items-center ">
        <p className=" font-semibold ">Wallet</p>
        <button onClick={()=> router.push("/dashboard/history")} className=" text-neonblue-600 text-xs ">See History</button>
      </div>
      <div className=" w-full h-full border border-gray-200 rounded-2xl flex flex-col gap-6 justify-center items-center ">
        <div className=" w-fit flex gap-8 ">
          <div className=" flex flex-col items-center gap-1 ">
            <p className=" text-xs font-medium text-violet-300 ">
              Total earnings
            </p>
            <p className=" text-2xl font-semibold ">₦0.00</p>
          </div>
          <div className=" flex flex-col items-center gap-1 ">
            <p className=" text-xs font-medium text-violet-300 ">
              Total prizes won
            </p>
            <p className=" text-2xl font-semibold ">₦0.00</p>
          </div>
          <div className=" flex flex-col items-center gap-1 ">
            <p className=" text-xs font-medium text-violet-300 ">
              Available balance
            </p>
            {loading && <Spinner />}
            {!loading && wallet && (
              <p className=" text-2xl font-semibold ">
                ₦
                {Number(wallet?.balance || 0).toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
          </div>
        </div>
        <div className=" flex gap-6 ">
          <div className=" w-[140px] ">
            <CustomButton fullWidth variant="outline" onClick={() => setShowPayoutModal(true)}>
              Request Payout
            </CustomButton>
          </div>
          <div className=" w-[140px] ">
            <CustomButton fullWidth onClick={() => setShowModal(true)}>
              Add Money
            </CustomButton>
          </div>
        </div>
      </div>
      <AddMoneyModal isOpen={showModal} onClose={() => setShowModal(false)} />
          <RequestPayoutModal
          isOpen={showPayoutModal}
          onClose={() => setShowPayoutModal(false)}
        />
    </div>
  );
}
