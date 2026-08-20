import { IChallenge } from "@/helper/model/challenge";
import { formatNumber } from "@/helper/utils/numberFormat";
import { CustomButton } from "@/components/custom";
import { LoadingLayout } from "@/components/shared";

interface JoinStepProps {
    item: IChallenge;
    /** value of the ?share= query param, if present */
    share: string | null;
    hasPaid: boolean;
    isParticipant: boolean;
    isCheckingChallenge: boolean;
    discount?: number | null;
    fee: number;
    isJoining: boolean;
    onJoin: () => void;
    onLogin: () => void;
    onUseCoupon: () => void;
    onSelectPaymentMethod: () => void;
}

function AlreadyJoinedNotice({ onLogin }: { onLogin: () => void }) {
    return (
        <div className=" w-full flex flex-col items-center gap-4 ">
            <p className=" leading-tight text-center font-semibold ">
                You have already Joined for this challenge
            </p>
            <CustomButton onClick={onLogin}>Login to continue</CustomButton>
        </div>
    );
}

/**
 * NOTE: the original component had three separate near-identical "Join
 * Challenge" button blocks (one for ?share=, one for participants, one for
 * non-participants) that all called the exact same mutation. They've been
 * merged into a single block below — only the alignment class differs
 * between the original variants, so nothing behavioural changes.
 */
export default function JoinStep({
    item,
    share,
    hasPaid,
    isParticipant,
    isCheckingChallenge,
    discount,
    fee,
    isJoining,
    onJoin,
    onLogin,
    onUseCoupon,
    onSelectPaymentMethod,
}: JoinStepProps) {
    const isOrganization = item?.creator?.userType === "organization";
    const isFree = item?.participationFee === 0;

    console.log(hasPaid, "test");
    

    return (
        <div className=" w-full flex flex-col items-center pb-6 gap-4 ">
            {item?.participationFee > 0 &&
                (discount ? (
                    <div className=" w-full p-4 bg-success-50 border text-center border-success-400 rounded-2xl ">
                        <p className=" text-success-900 text-2xl font-bold ">
                            Coupon applied 🎉
                        </p>
                        <p className=" font-semibold mt-2 text-center ">
                            Original fee:{" "}
                            <span className=" line-through ">
                                {formatNumber(item?.participationFee, "₦")}
                            </span>
                        </p>
                        <p className=" font-semibold text-center ">
                            New fee: {formatNumber(fee, "₦")}
                        </p>
                        <p className=" mt-2 text-base ">{discount}% discount</p>
                    </div>
                ) : (
                    <p className=" text-5xl font-bold text-center ">
                        {formatNumber(item?.participationFee, "₦")}
                    </p>
                ))}

            {!isOrganization && (
                <p className=" text-5xl font-bold text-center ">
                    {isFree && "Free"}
                </p>
            )}

            {!isOrganization ? (
                <div className=" w-full flex flex-col gap-1 p-4 bg-warning-50 rounded-2xl border-1 border-warning-400 ">
                    <p className=" text-warning-900 font-medium text-sm ">{`The participation fee is a one-time payment set by the challenge host, required before you can join the challenge. Please note that this fee is non-refundable once payment is completed. Be sure you're ready to take on the challenge before proceeding.`}</p>
                    <p className=" text-warning-900 font-medium text-sm ">{`For challenges with free participation, no payment is required. You can join immediately and start participating once you meet the challenge requirements.`}</p>
                    <p className=" text-warning-900 font-medium text-sm ">{`Note: Transaction Fees Apply!`}</p>
                </div>
            ) : (
                <div className=" w-full flex flex-col gap-1 p-4 bg-warning-50 rounded-2xl border-1 border-warning-400 ">
                    <p className=" text-warning-900 font-medium text-sm ">{`Kindly ensure you're fit for and have the necessary skills required for this challenge`}</p>
                </div>
            )}

            {/* Free-challenge join action */}
            <div
                className={` ${isFree ? " flex " : " hidden "} w-full lg:flex-row flex-col justify-between gap-4 `}
            >
                <LoadingLayout loading={isCheckingChallenge}>
                    {hasPaid ? (
                        <AlreadyJoinedNotice onLogin={onLogin} />
                    ) : (
                        <div
                            className={`w-full flex ${
                                share || isParticipant
                                    ? "justify-end"
                                    : "flex-col items-center"
                            }`}
                        >
                            <CustomButton onClick={onJoin} isLoading={isJoining}>
                                Join Challenge
                            </CustomButton>
                        </div>
                    )}
                </LoadingLayout>
            </div>

            {/* Paid-challenge actions */}
            <div
                className={` ${!isFree? " flex " : " hidden "} w-full lg:flex-row flex-col justify-between gap-4 `}
            >
                {!hasPaid && !discount && (
                    <div className=" w-full lg:w-fit ">
                        <CustomButton onClick={onUseCoupon} variant="outline">
                            Use Coupon
                        </CustomButton>
                    </div>
                )}
                <LoadingLayout loading={isCheckingChallenge}>
                    {hasPaid ? (
                        <AlreadyJoinedNotice onLogin={onLogin} /> 
                    ) : (
                        <CustomButton
                            onClick={onSelectPaymentMethod}
                            isLoading={isJoining}
                        >
                            Select payment method
                        </CustomButton>
                    )}
                </LoadingLayout>
            </div>
        </div>
    );
}
