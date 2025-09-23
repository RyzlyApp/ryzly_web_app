"use client"
import { RiAccountCircleFill, RiHeart3Line, RiTimeFill } from "react-icons/ri";
import { CustomButton, CustomImage } from "../custom";
import { IChallenge } from "@/helper/model/challenge";
import { formatNumberWithK } from "@/helper/utils/formatNumberWithK";
import { textLimit } from "@/helper/utils/textlimit";
import { dateFormatHeader } from "@/helper/utils/dateFormat";
import { useRouter } from "next/navigation";
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";
import useChallenge from "@/hook/useChallenge";
import { ModalLayout, RenderParticipant } from ".";
import { useState } from "react";
import { Switch } from "@heroui/react"; 

interface IProp {
    scrollable?: boolean,
    data: IChallenge
}

export default function ChallengeCard({
    scrollable,
    data
}: IProp) {

    const router = useRouter()
    const [userState] = useAtom(userAtom);

    const [isOpen, setIsOpen] = useState(false)

    const { data: user } = userState

    const { joinChallenge } = useChallenge(data?._id) 

    return (
        <div style={{ width: scrollable ? "350px" : "100%" }} className=" cursor-pointer bg-white rounded-3xl p-4 shadow h-full flex flex-col gap-5 " >
            <div onClick={() => router.push(`/dashboard/challenges/${data?._id}`)} className=" w-full h-[140px] rounded-lg relative bg-gray-200 text-white " >
                <div className=" absolute inset-x-0 top-0 z-10 w-full p-3 flex justify-between items-center " >
                    <div className=" rounded-full border w-[30px] h-[30px] border-white flex justify-center items-center " >
                        <RiHeart3Line size={"16px"} color="#FDFDFF" />
                    </div>
                    <div className=" rounded-full border px-2 w-fit gap-1 h-[30px] border-white flex justify-center items-center " >
                        <RiTimeFill size={"16px"} color="#FDFDFF" />
                        {/* <p className=" text-xs font-semibold "  >2-3 Weeks</p>  */}
                        <p className=" text-[10px] font-semibold "  >{dateFormatHeader(data?.startDate) + " - " + dateFormatHeader(data?.endDate)}</p>
                    </div>
                </div>
                {data?.url?.includes("http") && (
                    <CustomImage
                        src={data?.url}
                        alt="blue"
                        fillContainer
                        style={{ borderRadius: "8px" }}
                    />
                )}
            </div>
            <div onClick={() => router.push(`/dashboard/challenges/${data?._id}`)} className=" w-full flex flex-wrap gap-3 " >
                {/* {data?.tags?.map((item, index) => {
                    return (
                        <div key={index} className=" w-fit px-2 text-xs font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100 " >
                            {item}
                        </div>
                    )
                })} */}

                <div className=" w-fit px-2 text-xs font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100 " >
                    {data?.industry}
                </div>
                <div className=" w-fit px-2 text-xs font-medium text-neonblue-900 rounded-3xl flex justify-center items-center h-[22px] bg-neonblue-100 " >
                    {data?.level}
                </div>
                <div className=" w-fit px-2 text-xs font-medium text-pear-900 rounded-3xl flex justify-center items-center h-[22px] bg-pear-100 " >
                    {data?.tags[0]}
                </div>
            </div>
            <div onClick={() => router.push(`/dashboard/challenges/${data?._id}`)} className=" w-full flex flex-col gap-2 " >
                <p className=" text-lg font-bold " >{data?.title}</p>
                <p className=" text-xs text-violet-300 " >{textLimit(data?.description, 70)}</p>
            </div>
            <div onClick={() => router.push(`/dashboard/challenges/${data?._id}`)} className=" w-full grid grid-cols-2 gap-4 " >
                <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Winning Price</p>
                    <p className=" font-semibold " >{formatNumberWithK(data?.winnerPrice, true)}</p>
                </div>
                <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Participation Fee</p>
                    <p className=" font-semibold " >{formatNumberWithK(data?.participationFee, true)}</p>
                </div>
                <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Participants</p>
                    <RenderParticipant maxDisplay={4} participants={data.participants} />
                </div>
                <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Hosted By</p>
                    <div className=" flex gap-2 items-center " >
                        <RiAccountCircleFill />
                        <p className=" font-semibold " >{textLimit(data?.creator?.fullName, 10)}</p>
                    </div>
                </div>
            </div>
            {(user?._id !== data?.creator?._id && data?.participants.every((item) => item._id !== user?._id)) && (
                <div className=" mt-auto w-full " >
                    <CustomButton onClick={() => setIsOpen(true)} isLoading={joinChallenge?.isPending} fullWidth >
                        Join Challenge
                    </CustomButton>
                </div>
            )}

            <ModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <div className=" w-full flex flex-col items-center gap-4 " >
                    <p className=" text-5xl font-bold text-center " >{formatNumberWithK(data?.participationFee)}</p>
                    <p className=" font-medium  " >Participation Fee</p>
                    <div className=" w-full p-4 bg-warning-50 rounded-2xl border-1 border-warning-400 " >
                        <p className=" text-warning-900 font-medium text-xs " >{`The participation fee is a one-time payment set by the challenge host, required before you can join the challenge. Please note that this fee is non-refundable once payment is completed. Be sure you're ready to take on the challenge before proceeding.`}</p>
                    </div>
                    <p className=" text-lg font-semibold " >Payment method</p>
                    <div className=" w-full flex bg-neonblue-50 justify-between rounded-2xl p-4 " >
                        <div className=" flex flex-col text-sm " >
                            <p className=" font-semibold " >Prize won</p>
                            <p className=" font-medium text-violet-300 " >$0.00</p>
                        </div>
                        <Switch />
                    </div>
                    <div className=" w-full flex justify-end " >
                        <CustomButton onClick={() => joinChallenge?.mutate({ data: data?._id })} isLoading={joinChallenge?.isPending} >
                            Pay
                        </CustomButton>
                    </div>
                </div>
            </ModalLayout>

        </div>
    )
}