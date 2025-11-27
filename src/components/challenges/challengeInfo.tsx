/* eslint-disable @typescript-eslint/no-explicit-any */
import { IChallenge } from "@/helper/model/challenge";
import { formatNumber } from "@/helper/utils/numberFormat";
import { CustomButton, CustomImage } from "../custom";
import { LoadingLayout, ModalLayout } from "../shared"; 
import useChallenge from "@/hook/useChallenge";
import { addToast } from "@heroui/react";
import React from "react";
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
import { useRouter } from "next/navigation";
import { isDateExpired } from "@/helper/utils/isDateExpired";

export default function ChallengeInfo({
  item,
  isCoach,
  refetching,
}: {
  item: IChallenge;
  isCoach: boolean;
  refetching: boolean;
}) {

  const [ userState ] = useAtom(userAtom)

  const router = useRouter()

  const [showPaymentTypeSelector, setShowPaymentTypeSelector] =
    React.useState(false);
  const [paymentType, setPaymentType] = React.useState<"PAYSTACK" | "WALLET">(
    "WALLET"
  );
  const [creatingOrderLoading, setCreatingOrderLoading] = React.useState(false);
  const [canPay, setCanPay] = React.useState(false);
  const [reference, setReference] = React.useState<string>("");
  const { wallet, getWallet, createPayment } =
    usePaymentWalletHook();
  const { joinChallenge, isOpen, setIsOpen, endChallenge } = useChallenge(
    item?._id
  );

  React.useEffect(() => {
    (async () => {
      if (!wallet) {
        await getWallet();
      }
    })();
  }, [getWallet, wallet]);

  const handlePayment = async () => {
    if (item?.participationFee === 0) {
      joinChallenge?.mutate({ data: item?._id });
      return;
    }
    console.log(wallet);
    if (paymentType === "WALLET") {
      if ((wallet?.balance as number) < item?.participationFee) {
        addToast({
          title: "Insufficient balance",
          color: "danger",
        });
        return;
      }
      // create payment
      const obj: ICreateOrderDto = {
        amount: item?.participationFee,
        currencyType: WALLET_TYPE.NGN,
        flow: PAYMENT_FLOW.OUTBOUND,
        source: PAYMENT_SOURCE.WALLET,
        type: PAYMENT_TYPE.CHALLENGE,
        typeId: item?._id,
        userId: wallet?.userId as string,
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
            error?.message || "An error occured while creating payment",
          color: "danger",
        });
        setCreatingOrderLoading(false);
      }
    } else {
      // create order
      const obj: ICreateOrderDto = {
        amount: item?.participationFee,
        currencyType: WALLET_TYPE.NGN,
        flow: PAYMENT_FLOW.OUTBOUND,
        source: PAYMENT_SOURCE.PAYSTACK,
        type: PAYMENT_TYPE.CHALLENGE,
        typeId: item?._id,
        userId: wallet?.userId as string,
      };
      try {
        setCreatingOrderLoading(true);
        const res = await createPayment(obj);
        setReference(res?.data?.reference as string);
        setCanPay(true);
        setCreatingOrderLoading(false);
      } catch (error: any) {
        addToast({
          title: "An error occured",
          description:
            error?.message || "An error occured while creating payment",
          color: "danger",
        });
        setCreatingOrderLoading(false);
      }
    }
  };

  const handleClick = () => {
    if(userState?.data?._id) {
      setIsOpen(true)
    } else {
      router.push(`/auth?challenge=${item?._id}`)
    }
  }

  return (
    <div className=" w-full rounded-3xl flex flex-col bg-white ">
      <LoadingLayout loading={refetching}>
        <div className=" w-full h-[244px] relative rounded-t-3xl bg-white p-2 ">
          <div className=" absolute inset-x-0 top-0 z-10 w-full p-5 flex justify-end items-center " > 
            <div className=" rounded-full border px-2 w-fit gap-1 h-[30px] text-white border-white flex justify-center items-center " >
              <RiTimeFill size={"16px"} color="#FDFDFF" />
              {/* <p className=" text-xs font-semibold "  >2-3 Weeks</p>  */}
              <p className=" text-[10px] font-semibold "  >{dateFormatHeader(item?.startDate) + " - " + dateFormatHeader(item?.endDate)}</p>
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
        {(!item?.joined && !isCoach && !isDateExpired(item?.startDate)) && (
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

        {isDateExpired(item?.endDate) && isCoach && !item?.IsEnded && (
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

        <ModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {!showPaymentTypeSelector ? (
            <div className=" w-full flex flex-col items-center pb-6 gap-4 ">
              <p className=" text-5xl font-bold text-center ">
                {item?.participationFee > 0 && (
                  formatNumber(item?.participationFee, "₦")
                )}
                {item?.participationFee === 0 && (
                  "Free"
                )} 
              </p>
              <p className=" font-medium  ">Participation Fee</p>
              <div className=" w-full p-4 bg-warning-50 rounded-2xl border-1 border-warning-400 ">
                <p className=" text-warning-900 font-medium text-xs ">{`The participation fee is a one-time payment set by the challenge host, required before you can join the challenge. Please note that this fee is non-refundable once payment is completed. Be sure you're ready to take on the challenge before proceeding.`}</p>
              </div>
              <p className={` text-lg font-semibold ${item?.participationFee > 0 ? " block " : " hidden "} `}>Payment method</p>
              <div className={` w-full bg-neonblue-50 ${item?.participationFee > 0 ? " flex " : " hidden "} justify-between rounded-2xl p-4 `}>
                <div className=" flex flex-col text-sm ">
                  <p className=" font-semibold ">Prize won</p>
                  <p className=" font-medium text-violet-300 ">
                    {formatNumber(item?.winnerPrice, "₦")}
                  </p>
                </div>
                {/* <Switch /> */}
              </div>
              <div className={` ${item?.participationFee > 0 ? " flex " : " hidden "} w-full  justify-end `}>
                <CustomButton
                  onClick={() => setShowPaymentTypeSelector(true)}
                  isLoading={joinChallenge?.isPending}
                >
                  Select payment method
                </CustomButton>
              </div>

              <div className={` ${item?.participationFee === 0 ? " flex " : " hidden "} w-full  justify-end `}>
                <CustomButton
                  onClick={() => joinChallenge?.mutate({ data: item?._id })}
                  isLoading={joinChallenge?.isPending}
                >
                  Join Challenge
                </CustomButton>
              </div>
            </div>
          ) : (
            <div className=" w-full flex flex-col items-center gap-4 ">
              <p className=" text-lg font-semibold ">Payment method</p>
              {/* Wallet Card */}
              <div
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${paymentType === "WALLET"
                    ? "border-neonblue-500 bg-neonblue-50"
                    : "border-gray-200 bg-white"
                  }`}
                onClick={() => setPaymentType("WALLET")}
              >
                <input
                  type="radio"
                  name="paymentType"
                  checked={paymentType === "WALLET"}
                  onChange={() => setPaymentType("WALLET")}
                  className="w-4 h-4 text-neonblue-600"
                />
                <div className="flex flex-col text-sm">
                  <p className="font-semibold">Wallet</p>
                  <p className="font-medium text-violet-300">
                    {formatNumber(wallet?.balance as number, "₦")}
                  </p>
                </div>
              </div>
              {/* Paystack Card */}
              <div
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${paymentType === "PAYSTACK"
                    ? "border-neonblue-500 bg-neonblue-50"
                    : "border-gray-200 bg-white"
                  }`}
                onClick={() => setPaymentType("PAYSTACK")}
              >
                <input
                  type="radio"
                  name="paymentType"
                  checked={paymentType === "PAYSTACK"}
                  onChange={() => setPaymentType("PAYSTACK")}
                  className="w-4 h-4 text-neonblue-600"
                />
                <div className="flex flex-col text-sm">
                  <p className="font-semibold">Paystack</p>
                </div>
              </div>
              <div className=" w-full flex justify-end ">
                {!canPay && (
                  <CustomButton
                    onClick={() => handlePayment()}
                    isLoading={joinChallenge?.isPending || creatingOrderLoading}
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
                    amount={item?.participationFee}
                    onFailed={() => {
                      setCreatingOrderLoading(false);
                      setCanPay(false);
                    }}
                    onSuccess={() => {
                      setCreatingOrderLoading(false);
                      setCanPay(true);
                      joinChallenge?.mutate({ data: item?._id });
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </ModalLayout>
      </div>
    </div>
  );
}
