"use client";

import { IChallenge } from "@/helper/model/challenge";
import useChallenge from "@/hook/useChallenge";
import useAuth from "@/hook/useAuth";
import React, { useEffect, useMemo, useState } from "react";
import { addToast } from "@heroui/toast";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { tpuserAtom } from "@/helper/atom/tpuser";
import { useRouter, useSearchParams } from "next/navigation";
import { isDateExpired } from "@/helper/utils/isDateExpired";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import StorageClass from "@/dal/storage/StorageClass";

import useChallengePayment from "./useChallengePayment";
import ChallengeBanner from "./ChallengeBanner";
import ChallengeDetails from "./ChallengeDetails";
import ChallengeCTAButton from "./ChallengeCTAButton";
import ChallengeJoinModal from "./ChallengeJoinModal";

interface ChallengeInfoProps {
    item: IChallenge;
    isCoach: boolean;
    refetching: boolean;
    noauth?: boolean;
}

export default function ChallengeInfo({
    item,
    isCoach,
    refetching,
    noauth,
}: ChallengeInfoProps) {
    const [userState] = useAtom(userAtom);
    const [tpuserState] = useAtom(tpuserAtom);
    const searchParams = useSearchParams();
    const share = searchParams.get("share");
    const router = useRouter();

    const userId: string | null = StorageClass.getValue(STORAGE_KEYS.USERID, {
        isJSON: false,
    });

    const { formikTpLogin, isLoading, setIsShow, isShow, checkChallenge, hasPaid } =
        useAuth();

    const isParticipant = useMemo(() => {
        return !!item?.participants?.find((p: any) => p?.userId === userId);
    }, [item?.participants, userId]);

    const [couponCode, setCouponCode] = useState("");

    const {
        joinChallenge,
        isOpen,
        setIsOpen,
        endChallenge,
        redeemCouponCode,
        tab,
        setTab,
        discountData,
        setDiscountData,
    } = useChallenge(item?._id);

    const handleJoin = () => joinChallenge?.mutate({ data: item?._id });

    // Wallet payments originally used userState/tpuserState, Paystack orders
    // used the id from storage. Both should normally resolve to the same
    // person, so this consolidates them into one value for the hook.
    const resolvedUserId =
        (userState.data?._id && userState.data._id + "") ||
        (tpuserState.data?._id && tpuserState.data._id + "") ||
        (userId as string);

    const payment = useChallengePayment({
        item,
        noauth,
        discount: discountData?.discount,
        userId: resolvedUserId,
        onJoin: handleJoin,
    });

    useEffect(() => {
        const tptoken = StorageClass.getValue(STORAGE_KEYS.TP_TOKEN, {
            isJSON: false,
        });
        if (tptoken) {
            checkChallenge.mutate(item?._id);
        }
    }, [item?._id]);

    const openModal = () => {
        setTab(0);
        setIsOpen(true);
        payment.resetPaymentState();
        setDiscountData(null);
    };

    const handleJoinClick = () => {
        if (isDateExpired(item?.endDate)) {
            addToast({
                title: "Error",
                description: "The Challenge has ended",
                color: "danger",
            });
            return;
        }

        if (userState?.data?._id) {
            openModal();
        } else if (tpuserState.data?._id) {
            openModal();
        } else {
            setIsShow(true);
            openModal();
        }
    };

    const isOrganization = userState.data?.userType === "organization";

    return (
        <div className=" w-full rounded-3xl flex flex-col bg-white ">
            <ChallengeBanner
                url={item?.url}
                startDate={item?.startDate}
                endDate={item?.endDate}
                loading={refetching}
            />

            <div className=" w-full flex lg:flex-row flex-col gap-4 pb-4 items-center ">
                <ChallengeDetails item={item} />

                <ChallengeCTAButton
                    item={item}
                    isCoach={isCoach}
                    isOrganization={isOrganization}
                    onJoinClick={handleJoinClick}
                    onEndClick={() => endChallenge.mutate()}
                    isJoinLoading={joinChallenge?.isPending}
                    isEndLoading={endChallenge?.isPending}
                />

                <ChallengeJoinModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    isShow={isShow}
                    tab={tab}
                    setTab={setTab}
                    formikTpLogin={formikTpLogin}
                    isLoading={isLoading}
                    item={item}
                    share={share}
                    hasPaid={hasPaid}
                    isParticipant={isParticipant}
                    isCheckingChallenge={checkChallenge?.isPending}
                    discount={discountData?.discount}
                    payment={payment}
                    isUserLoggedIn={!!userState.data?._id}
                    isJoinPending={joinChallenge?.isPending}
                    onJoin={handleJoin}
                    onLogin={() => router.push("/auth")}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    isRedeemingCoupon={redeemCouponCode.isPending}
                    onRedeemCoupon={() =>
                        redeemCouponCode.mutate({ data: couponCode })
                    }
                />
            </div>
        </div>
    );
}
