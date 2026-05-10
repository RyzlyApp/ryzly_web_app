/* eslint-disable @typescript-eslint/no-explicit-any */
import { IChallenge } from "@/helper/model/challenge";
import { formatNumber } from "@/helper/utils/numberFormat";
import { CustomButton, CustomImage, CustomInput } from "../custom";
import { LoadingLayout, ModalLayout } from "../shared";
import useChallenge from "@/hook/useChallenge";
import { addToast } from "@heroui/toast";
import React, { useEffect, useState } from "react";
import usePaymentWalletHook from "@/modules/payment_wallet_module/hooks/usePaymentWalletHook";
import {
    ICreateOrderDto,
    PAYMENT_FLOW,
    PAYMENT_SOURCE,
    PAYMENT_TYPE,
    WALLET_TYPE,
} from "@/modules/payment_wallet_module/dto/create-payment-dto";
import PaystackButton from "@/modules/payment_wallet_module/ui/PaystackButton";
import { dateFormatHeader } from "@/helper/utils/dateFormat";
import { RiTimeFill } from "react-icons/ri";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useParams, useRouter } from "next/navigation";
import { isDateExpired } from "@/helper/utils/isDateExpired";
import { ChevronLeft } from "lucide-react";
import useAuth from "@/hook/useAuth";
import { FormikProvider } from "formik";
import { tpuserAtom } from "@/helper/atom/tpuser";
import { STORAGE_KEYS } from "@/dal/storage/StorageKeys";
import StorageClass from "@/dal/storage/StorageClass";

export default function ChallengeInfo({
    item,
    isCoach,
    refetching,
    noauth,
}: {
    item: IChallenge;
    isCoach: boolean;
    refetching: boolean;
    noauth?: boolean;
}) {
    const [userState] = useAtom(userAtom);
    const [tpuserState] = useAtom(tpuserAtom);
    const param = useParams();
    const organisationId = param.organisationId;

    const router = useRouter();

    const email = StorageClass.getValue(STORAGE_KEYS.USER_EMAIL, {
        isJSON: false,
    });
    const tptoken = StorageClass.getValue(STORAGE_KEYS.TP_TOKEN, {
        isJSON: false,
    });

    const userId = StorageClass.getValue(STORAGE_KEYS.USERID, {
        isJSON: false,
    });

    const {
        formikTpLogin,
        isLoading,
        setIsShow,
        isShow,
        checkChallenge,
        hasPaid,
    } = useAuth();

    const [couponCode, setCouponCode] = useState("");
    const [show, setShow] = useState(false);

    const [showPaymentTypeSelector, setShowPaymentTypeSelector] =
        React.useState(false);
    const [paymentType, setPaymentType] = React.useState<"PAYSTACK" | "WALLET">(
        "WALLET",
    );
    const [creatingOrderLoading, setCreatingOrderLoading] =
        React.useState(false);
    const [canPay, setCanPay] = React.useState(false);
    const [fee, setFee] = React.useState(0);
    const [reference, setReference] = React.useState<string>("");
    // const [amount, setAmount] = React.useState(0);
    const { wallet, getWallet, createPayment } = usePaymentWalletHook();
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

    React.useEffect(() => {
        (async () => {
            if (!wallet && !noauth) {
                await getWallet();
            }
        })();
    }, [getWallet, wallet]);

    useEffect(() => {
        if (discountData?.discount) {
            let discount =
                (discountData?.discount / 100) * item?.participationFee;

            setFee(item?.participationFee - discount);
        } else {
            setFee(item?.participationFee);
        }
    }, [discountData, item?.participationFee]);

    useEffect(() => {
        if (tptoken) {
            checkChallenge.mutate(item?._id);
        }
    }, [item?._id, tptoken]);

    const handlePayment = async () => {
        if (fee === 0) {
            joinChallenge?.mutate({ data: item?._id });
            return;
        }
        console.log(wallet);
        if (paymentType === "WALLET") {
            if ((wallet?.balance as number) < fee) {
                addToast({
                    title: "Insufficient balance",
                    color: "danger",
                });
                return;
            }
            // create payment
            const obj: ICreateOrderDto = {
                amount: fee,
                currencyType: WALLET_TYPE.NGN,
                flow: PAYMENT_FLOW.OUTBOUND,
                source: PAYMENT_SOURCE.WALLET,
                type: PAYMENT_TYPE.CHALLENGE,
                creatorType: "USER",
                organizationId: "",
                typeId: item?._id,
                userId: userState.data?._id
                    ? userState.data?._id + ""
                    : tpuserState.data?._id + "",
            };
            try {
                setCreatingOrderLoading(true);
                const res = await createPayment(obj);
                joinChallenge?.mutate({ data: item?._id });
                setCreatingOrderLoading(false);
            } catch (error: any) {
                addToast({
                    title: "An error occured",
                    description:
                        error?.message ||
                        "An error occured while creating payment",
                    color: "danger",
                });
                setCreatingOrderLoading(false);
            }
        } else {
            // create order
            const obj: ICreateOrderDto = {
                amount: fee,
                currencyType: WALLET_TYPE.NGN,
                flow: PAYMENT_FLOW.OUTBOUND,
                source: PAYMENT_SOURCE.PAYSTACK,
                type: PAYMENT_TYPE.CHALLENGE,
                creatorType: "USER",
                organizationId: "",
                typeId: item?._id,
                userId: userId as string,
            };
            try {
                setCreatingOrderLoading(true);
                const res = await createPayment(obj);
                setReference(res?.data?.reference as string);
                // setAmount(res?.data?.amount);
                setCanPay(true);
                setCreatingOrderLoading(false);
            } catch (error: any) {
                addToast({
                    title: "An error occured",
                    description:
                        error?.message ||
                        "An error occured while creating payment",
                    color: "danger",
                });
                setCreatingOrderLoading(false);
            }
        }
    };

    const handleClick = () => {
        // if (isDateExpired(item?.startDate)) {
        //   addToast({
        //     title: "Warning",
        //     description: "this challenge is no longer accepting participants",
        //     color: "warning",
        //   });
        // } else
        if (userState?.data?._id) {
            setShow(false);
            setTab(0);
            setIsOpen(true);
            setShowPaymentTypeSelector(false);
            setDiscountData(null);
        } else if (tpuserState.data?._id) {
            setShow(true);
            setTab(0);
            setIsOpen(true);
            setShowPaymentTypeSelector(false);
            setDiscountData(null);
        } else {
            setShow(true);
            setIsShow(true);
            setTab(0);
            setIsOpen(true);
            setShowPaymentTypeSelector(false);
            setDiscountData(null);
        }
    };

    return (
        <div className=" w-full rounded-3xl flex flex-col bg-white ">
            <LoadingLayout loading={refetching}>
                <div className=" w-full h-[244px] relative rounded-t-3xl bg-white p-2 ">
                    <div className=" absolute inset-x-0 top-0 z-10 w-full p-5 flex justify-end items-center ">
                        <div className=" rounded-full border px-2 w-fit gap-1 h-[30px] text-white border-white flex justify-center items-center ">
                            <RiTimeFill size={"16px"} color="#FDFDFF" />
                            {/* <p className=" text-xs font-semibold "  >2-3 Weeks</p>  */}
                            <p className=" text-[10px] font-semibold ">
                                {dateFormatHeader(item?.startDate) +
                                    " - " +
                                    dateFormatHeader(item?.endDate)}
                            </p>
                        </div>
                    </div>
                    {item?.url?.includes("http") && (
                        <CustomImage
                            src={item?.url}
                            alt="blue"
                            fillContainer
                            style={{ borderRadius: "8px" }}
                        />
                    )}
                </div>
            </LoadingLayout>
            <div className=" w-full flex lg:flex-row flex-col gap-4 pb-4 items-center ">
                <div className=" w-full flex p-4 pb-0 flex-col gap-3 ">
                    <div className=" flex flex-col gap-2 ">
                        <div className=" w-full flex flex-wrap gap-3 ">
                            <div className=" w-fit px-2 text-xs font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100 ">
                                {item?.industry?.name}
                            </div>
                            <div className=" w-fit px-2 text-xs font-medium text-neonblue-900 rounded-3xl flex justify-center items-center h-[22px] bg-neonblue-100 ">
                                {item?.level?.name}
                            </div>
                            <div className=" w-fit px-2 text-xs font-medium text-pear-900 rounded-3xl flex justify-center items-center h-[22px] bg-pear-100 ">
                                {item?.tracks[0]?.name}
                            </div>
                        </div>
                        <div className=" flex flex-wrap gap-2 ">
                            {item?.tags?.map((item) => {
                                return (
                                    <div
                                        key={item}
                                        className=" w-fit px-2 text-xs font-medium bg-violet-500 rounded-3xl flex justify-center items-center h-[22px] text-violet-100 "
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <p className=" text-3xl font-bold ">{item?.title}</p>
                    <div
                        className=" text-xs font-medium text-violet-300 "
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                    />
                    {/* <p className=" text-violet-300 text-sm font-medium " >{item?.description}</p> */}
                    <p className=" text-violet-300 text-xs font-medium ">
                        Participation Fee:{" "}
                        <span className=" font-bold ">
                            {formatNumber(item?.participationFee)}
                        </span>
                    </p>
                </div>
                {!item?.joined && !isCoach && !organisationId && (
                    <div className=" w-full lg:w-fit px-4 ">
                        <CustomButton
                            onClick={handleClick}
                            isLoading={joinChallenge?.isPending}
                            fullWidth
                        >
                            Join Challenge
                        </CustomButton>
                    </div>
                )}
                {isDateExpired(item?.endDate) && isCoach && (
                    <div className=" w-full lg:w-fit px-4 ">
                        <CustomButton
                            onClick={() => endChallenge.mutate()}
                            isLoading={endChallenge?.isPending}
                            fullWidth
                        >
                            End Challenge
                        </CustomButton>
                    </div>
                )}

                <ModalLayout
                    isOpen={isOpen}
                    size={isShow ? "sm" : tab === 1 ? "sm" : "md"}
                    onClose={() => setIsOpen(false)}
                >
                    {isShow && (
                        <FormikProvider value={formikTpLogin}>
                            <form
                                onSubmit={formikTpLogin.handleSubmit}
                                className=" w-full gap-4 pb-5 flex flex-col "
                            >
                                <p className=" text-success-900 text-2xl font-bold ">
                                    Enter Your Email
                                </p>

                                {/* Email + password fields */}
                                <div className="w-full flex flex-col gap-4">
                                    <CustomInput
                                        name="firstName"
                                        label="FirstName"
                                        placeholder="Enter your FirstName"
                                        type="text"
                                    />
                                    <CustomInput
                                        name="lastName"
                                        label="LastName"
                                        placeholder="Enter your LastName"
                                        type="text"
                                    />
                                    <CustomInput
                                        name="email"
                                        label="Email"
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                </div>

                                {/* Submit button */}
                                <CustomButton
                                    isLoading={isLoading}
                                    variant="primary"
                                    fullWidth
                                    size="lg"
                                    type="submit"
                                >
                                    Continue
                                </CustomButton>
                            </form>
                        </FormikProvider>
                    )}
                    {!isShow && (
                        <>
                            {tab === 0 && (
                                <>
                                    {!showPaymentTypeSelector ? (
                                        <div className=" w-full flex flex-col items-center pb-6 gap-4 ">
                                            {item?.participationFee > 0 && (
                                                <>
                                                    {discountData?.discount ? (
                                                        <div className=" w-full p-4 bg-success-50 border text-center border-success-400 rounded-2xl ">
                                                            <p className=" text-success-900 text-2xl font-bold ">
                                                                Coupon applied
                                                                🎉
                                                            </p>
                                                            <p className=" font-semibold mt-2 text-center ">
                                                                Original fee:{" "}
                                                                <span className=" line-through ">
                                                                    {formatNumber(
                                                                        item?.participationFee,
                                                                        "₦",
                                                                    )}
                                                                </span>
                                                            </p>
                                                            <p className=" font-semibold text-center ">
                                                                New fee:{" "}
                                                                {formatNumber(
                                                                    fee,
                                                                    "₦",
                                                                )}
                                                            </p>
                                                            <p className=" mt-2 text-sm ">
                                                                {
                                                                    discountData?.discount
                                                                }
                                                                % discount
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <p className=" text-5xl font-bold text-center ">
                                                            {formatNumber(
                                                                item?.participationFee,
                                                                "₦",
                                                            )}
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                            <p className=" text-5xl font-bold text-center ">
                                                {item?.participationFee === 0 &&
                                                    "Free"}
                                            </p>
                                            {show && email + ""}
                                            <p className=" font-medium  ">
                                                Participation Fee
                                            </p>
                                            <div className=" w-full flex flex-col gap-1 p-4 bg-warning-50 rounded-2xl border-1 border-warning-400 ">
                                                <p className=" text-warning-900 font-medium text-xs ">{`The participation fee is a one-time payment set by the challenge host, required before you can join the challenge. Please note that this fee is non-refundable once payment is completed. Be sure you're ready to take on the challenge before proceeding.`}</p>
                                                <p className=" text-warning-900 font-medium text-xs ">{`For challenges with free participation, no payment is required. You can join immediately and start participating once you meet the challenge requirements.`}</p>
                                            </div>

                                            <LoadingLayout
                                                loading={
                                                    checkChallenge?.isPending
                                                }
                                            >
                                                {hasPaid ? (
                                                    <div className=" w-full flex flex-col items-center gap-4 ">
                                                        <p className=" leading-tight text-center font-semibold ">
                                                            You have already
                                                            Joined for this
                                                            challenge
                                                        </p>
                                                        <CustomButton
                                                            onClick={() =>
                                                                router.push(
                                                                    `/auth`,
                                                                )
                                                            }
                                                        >
                                                            Login to continue
                                                        </CustomButton>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={` ${item?.participationFee === 0 ? " flex " : " hidden "} w-full  justify-end `}
                                                    >
                                                        <CustomButton
                                                            onClick={() =>
                                                                joinChallenge?.mutate(
                                                                    {
                                                                        data: item?._id,
                                                                    },
                                                                )
                                                            }
                                                            isLoading={
                                                                joinChallenge?.isPending
                                                            }
                                                        >
                                                            Join Challenge
                                                        </CustomButton>
                                                    </div>
                                                )}
                                            </LoadingLayout>
                                            <div
                                                className={` ${item?.participationFee > 0 ? " flex " : " hidden "} w-full lg:flex-row flex-col justify-between gap-4 `}
                                            >
                                                {/* <div className=" w-full lg:w-fit " >
{!discountData?.discount && (
<CustomButton
  onClick={() => setTab(1)}
  variant="outline"
>
  Use Coupon
</CustomButton>
)}
</div> */}
                                                <LoadingLayout
                                                    loading={
                                                        checkChallenge?.isPending
                                                    }
                                                >
                                                    {hasPaid ? (
                                                        <div className=" w-full flex flex-col items-center gap-4 ">
                                                            <p className=" leading-tight text-center font-semibold ">
                                                                You have already
                                                                Joined for this
                                                                challenge
                                                            </p>
                                                            <CustomButton
                                                                onClick={() =>
                                                                    router.push(
                                                                        `/auth`,
                                                                    )
                                                                }
                                                            >
                                                                Login to
                                                                continue
                                                            </CustomButton>
                                                        </div>
                                                    ) : (
                                                        <CustomButton
                                                            onClick={() =>
                                                                setShowPaymentTypeSelector(
                                                                    true,
                                                                )
                                                            }
                                                            isLoading={
                                                                joinChallenge?.isPending
                                                            }
                                                        >
                                                            Select payment
                                                            method
                                                        </CustomButton>
                                                    )}
                                                </LoadingLayout>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className=" w-full flex flex-col items-center gap-4 ">
                                            <p className=" text-lg font-semibold ">
                                                Payment method
                                            </p>
                                            {/* Wallet Card */}
                                            {userState.data?._id && (
                                                <div
                                                    className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${
                                                        paymentType === "WALLET"
                                                            ? "border-neonblue-500 bg-neonblue-50"
                                                            : "border-gray-200 bg-white"
                                                    }`}
                                                    onClick={() =>
                                                        setPaymentType("WALLET")
                                                    }
                                                >
                                                    <input
                                                        type="radio"
                                                        name="paymentType"
                                                        checked={
                                                            paymentType ===
                                                            "WALLET"
                                                        }
                                                        onChange={() =>
                                                            setPaymentType(
                                                                "WALLET",
                                                            )
                                                        }
                                                        className="w-4 h-4 text-neonblue-600"
                                                    />
                                                    <div className="flex flex-col text-sm">
                                                        <p className="font-semibold">
                                                            Wallet
                                                        </p>
                                                        <p className="font-medium text-violet-300">
                                                            {formatNumber(
                                                                wallet?.balance as number,
                                                                "₦",
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Paystack Card */}
                                            <div
                                                className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${
                                                    paymentType === "PAYSTACK"
                                                        ? "border-neonblue-500 bg-neonblue-50"
                                                        : "border-gray-200 bg-white"
                                                }`}
                                                onClick={() =>
                                                    setPaymentType("PAYSTACK")
                                                }
                                            >
                                                <input
                                                    type="radio"
                                                    name="paymentType"
                                                    checked={
                                                        paymentType ===
                                                        "PAYSTACK"
                                                    }
                                                    onChange={() =>
                                                        setPaymentType(
                                                            "PAYSTACK",
                                                        )
                                                    }
                                                    className="w-4 h-4 text-neonblue-600"
                                                />
                                                <div className="flex flex-col text-sm">
                                                    <p className="font-semibold">
                                                        Paystack
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" w-full flex justify-end ">
                                                {!canPay && (
                                                    <CustomButton
                                                        onClick={() =>
                                                            handlePayment()
                                                        }
                                                        isLoading={
                                                            joinChallenge?.isPending ||
                                                            creatingOrderLoading
                                                        }
                                                    >
                                                        Pay
                                                    </CustomButton>
                                                )}
                                                {canPay && (
                                                    <PaystackButton
                                                        text="Make Payment"
                                                        height="40px"
                                                        width="auto"
                                                        reference={reference}
                                                        amount={fee}
                                                        onFailed={() => {
                                                            setCreatingOrderLoading(
                                                                false,
                                                            );
                                                            setCanPay(false);
                                                        }}
                                                        onSuccess={() => {
                                                            setCreatingOrderLoading(
                                                                false,
                                                            );
                                                            setCanPay(true);
                                                            joinChallenge?.mutate(
                                                                {
                                                                    data: item?._id,
                                                                },
                                                            );
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            {tab === 1 && (
                                <div className=" w-full flex flex-col gap-3 pb-4 ">
                                    <div className=" mb-3 flex items-center relative gap-4 justify-center  ">
                                        <button
                                            onClick={() => setTab(0)}
                                            className=" absolute left-0 "
                                        >
                                            <ChevronLeft size={"25px"} />
                                        </button>
                                        <p className=" text-center font-bold text-xl ">
                                            Redeem Coupon
                                        </p>
                                    </div>
                                    <CustomInput
                                        name="code"
                                        notform
                                        setLocalValue={setCouponCode}
                                        localValue={couponCode}
                                        placeholder="00000"
                                        label="Enter Coupon Code"
                                    />
                                    <CustomButton
                                        isLoading={redeemCouponCode.isPending}
                                        onClick={() =>
                                            redeemCouponCode.mutate({
                                                data: couponCode,
                                            })
                                        }
                                        height="50px"
                                        isDisabled={couponCode ? false : true}
                                    >
                                        Confirm
                                    </CustomButton>
                                </div>
                            )}
                        </>
                    )}
                </ModalLayout>
            </div>
        </div>
    );
}
