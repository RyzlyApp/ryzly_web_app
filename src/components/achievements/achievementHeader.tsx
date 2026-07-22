"use client";
import { Spinner } from "@heroui/react";
import { CustomButton } from "../custom";
import usePaymentWalletHook from "@/modules/payment_wallet_module/hooks/usePaymentWalletHook";
import React, { useState } from "react";
import AddMoneyModal from "@/modules/payment_wallet_module/ui/Add-Money-Modal";
import { useRouter } from "next/navigation";
import RequestPayoutModal from "@/modules/payment_wallet_module/ui/RequestPayoutModal";
import { Lock, Wallet3 } from "iconsax-reactjs";
import { formatNumber } from "@/helper/utils/numberFormat";
import { LoadingLayout, ModalLayout, RenderParticipant } from "../shared";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";

export default function AchievementHeader() {
    const [loading, setLoading] = React.useState(false);
    const [loadingEscrow, setLoadingEscrow] = React.useState(false);
    const [open, setOpen] = useState(false);

    const [showModal, setShowModal] = React.useState(false);
    const { getWallet, wallet, getEscrow, escrow } = usePaymentWalletHook();
    const [showPayoutModal, setShowPayoutModal] = React.useState(false);

    const [user] = useAtom(userAtom);

    React.useEffect(() => {
        setLoading(true);
        setLoadingEscrow(true);
        (async function () {
            await getWallet();
            setLoading(false);
        })();
        (async function () {
            await getEscrow();
            setLoadingEscrow(false);
        })();
    }, []);

    const router = useRouter();

    const { data, isLoading } = useFetchData<{ challengeId: IChallenge }[]>({
        endpoint: `/wallet/escrow`,
        name: "escrow",
    });

    return (
        <div className=" w-full h-fit lg:h-[300px] p-5 rounded-2xl bg-white flex flex-col gap-4 ">
            <div className=" w-full flex justify-between items-center ">
                <p className=" font-semibold ">Finance</p>
                {/* <button
                    onClick={() =>
                        router.push(
                            organisationId
                                ? `/organisation/${organisationId}/history`
                                : "/dashboard/history",
                        )
                    }
                    className=" text-neonblue-600 text-xs "
                >
                    See History
                </button> */}
            </div>
            <div className=" w-full flex lg:flex-row flex-col gap-4 ">
                <div className=" w-full border border-gray-200 px-4 py-4 h-[200px] rounded-2xl flex flex-col gap-6 justify-center ">
                    <div className=" w-fit flex gap-8 ">
                        <div className=" flex flex-col gap-1 ">
                            <div className=" flex items-center gap-3 ">
                                <Wallet3 size={"20"} variant="Bold" />
                                <p className=" text-sm font-semibld text-violet-300 ">
                                    Available Wallet Balance
                                </p>
                            </div>
                            {loading && <Spinner />}
                            {!loading && wallet && (
                                <p className=" text-2xl lg:text-4xl font-bold ">
                                    {formatNumber(wallet?.balance ?? 0)}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className=" w-full flex lg:flex-row mt-auto flex-col gap-3 lg:gap-6 ">
                        <div className=" w-full lg:w-[140px] ">
                            <CustomButton
                                fullWidth
                                variant="outline"
                                onClick={() => setShowPayoutModal(true)}
                            >
                                Request Payout
                            </CustomButton>
                        </div>
                        <div className=" w-full lg:w-[140px] ">
                            <CustomButton
                                fullWidth
                                onClick={() => setShowModal(true)}
                            >
                                Add Money
                            </CustomButton>
                        </div>
                    </div>
                </div>
                {(data?.length ?? 0) > 0 && (
                    <div className=" w-full ">
                        <div className=" w-full bg-[#74748014] border border-[#74748014] px-4 py-4 h-[200px] rounded-2xl flex flex-col gap-6 justify-center ">
                            <div className=" w-fit flex gap-8 ">
                                <div className=" flex flex-col gap-1 ">
                                    <div className=" flex items-center gap-3 ">
                                        <Lock size={"20"} variant="Bold" />
                                        <p className=" text-sm font-semibld text-violet-300 ">
                                            Total in Escrow
                                        </p>
                                    </div>
                                    {loadingEscrow && <Spinner />}
                                    {!loadingEscrow && (
                                        <p className=" text-2xl lg:text-4xl font-bold ">
                                            {formatNumber(escrow ?? 0)}
                                        </p>
                                    )}
                                    <p className=" text-xs text-[#161925] ">
                                        Funds tied to {data?.length} active
                                        challenges.
                                    </p>
                                </div>
                            </div>

                            <div className=" mt-auto ">
                                {data && (
                                    <>
                                        {data?.length > 0 && (
                                            <button
                                                onClick={() => setOpen(true)}
                                                className=" font-medium text-primary text-sm "
                                            >
                                                View Challenges
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ModalLayout
                title="Active Challenges"
                size="2xl"
                onClose={() => setOpen(false)}
                isOpen={open}
            >
                <LoadingLayout loading={isLoading}>
                    <div className=" w-full flex flex-col gap-3 pb-4 ">
                        {data?.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className=" flex flex-col gap-3 p-4 rounded-2xl border border-[#7676801F] w-full "
                                >
                                    <p className=" font-semibold ">
                                        {item?.challengeId?.title}
                                    </p>
                                    <div className=" w-full grid gap-2 grid-cols-2 lg:grid-cols-4 ">
                                        <div className=" flex flex-col gap-2 ">
                                            <p className=" text-xs text-violet-300 font-medium ">
                                                Winning Price
                                            </p>
                                            <p className=" font-semibold ">
                                                {formatNumber(
                                                    item?.challengeId
                                                        ?.winnerPrice ?? 0,
                                                )}
                                            </p>
                                        </div>
                                        <div className=" flex flex-col gap-2 ">
                                            <p className=" text-xs text-violet-300 font-medium ">
                                                Participation Fee
                                            </p>
                                            <p className=" font-semibold ">
                                                {item?.challengeId
                                                    ?.participationFee === 0
                                                    ? "Free"
                                                    : formatNumber(
                                                          item?.challengeId
                                                              ?.participationFee,
                                                      )}
                                            </p>
                                        </div>
                                        <div className=" flex flex-col gap-2 ">
                                            <p className=" text-xs text-violet-300 font-medium ">
                                                No. of Winners
                                            </p>
                                            <p className=" font-semibold ">
                                                {formatNumber(
                                                    Number(
                                                        item?.challengeId
                                                            ?.numberOfWinners ??
                                                            0,
                                                    ),
                                                    "",
                                                )}
                                            </p>
                                        </div>
                                        <div className=" flex flex-col gap-2 ">
                                            <p className=" text-xs text-violet-300 font-medium ">
                                                Participants
                                            </p>

                                            <RenderParticipant
                                                maxDisplay={4}
                                                participants={
                                                    item?.challengeId
                                                        ?.participants
                                                }
                                                totalParticipants={
                                                    item?.challengeId
                                                        ?.totalParticipants as number
                                                }
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/dashboard/challenges/${item?.challengeId?._id}/details/overview`,
                                            )
                                        }
                                        className=" font-medium text-primary text-sm w-fit ml-auto "
                                    >
                                        View Challenges
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </LoadingLayout>
            </ModalLayout>
            <AddMoneyModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <RequestPayoutModal
                isOpen={showPayoutModal}
                onClose={() => setShowPayoutModal(false)}
            />
        </div>
    );
}
