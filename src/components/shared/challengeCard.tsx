"use client"
import { RiHeart3Line, RiTimeFill } from "react-icons/ri";
import { CustomButton, CustomImage } from "../custom";
import { IChallenge } from "@/helper/model/challenge";
import { formatNumberWithK } from "@/helper/utils/formatNumberWithK";
import { textLimit } from "@/helper/utils/textlimit";
import { dateFormatHeader } from "@/helper/utils/dateFormat";
import { useRouter } from "next/navigation"; 
import { RenderParticipant } from "."; 
import { capitalizeFLetter } from "@/helper/utils/capitalLetter";
import { Avatar } from "@heroui/react";

interface IProp {
    scrollable?: boolean,
    data: IChallenge,
    explore?: boolean,
    joined?: boolean
}

export default function ChallengeCard({
    scrollable,
    data,
    explore,
    joined
}: IProp) {

    const router = useRouter()

    return (
        <div style={{ width: scrollable ? "350px" : "100%" }} className=" bg-white rounded-3xl p-4 shadow h-full flex flex-col gap-5 " >
            <div className=" w-full h-[140px] rounded-lg relative bg-white text-white " >
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
                <div className=" absolute inset-0 bg-black opacity-40 rounded-lg " />
            </div>
            <div className=" w-full flex flex-wrap gap-3 " >
                <div className=" w-fit px-2 text-xs font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100 " >
                    {data?.industry?.name}
                </div>
                <div className=" w-fit px-2 text-xs font-medium text-neonblue-900 rounded-3xl flex justify-center items-center h-[22px] bg-neonblue-100 " >
                    {data?.level?.name}
                </div>
                <div className=" w-fit px-2 text-xs font-medium text-pear-900 rounded-3xl flex justify-center items-center h-[22px] bg-pear-100 " >
                    {data?.tracks[0]?.name}
                </div>
            </div>
            <div className=" w-full flex flex-col gap-2 " >
                <p className=" text-lg font-bold " >{capitalizeFLetter(data?.title)}</p>
                <div className=" text-xs font-medium text-violet-300 h-10 " dangerouslySetInnerHTML={{ __html: textLimit(data?.description, 70) }} />
            </div>
            <div className=" w-full grid grid-cols-2 gap-4 " >
                <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Winning Price</p>
                    <p className=" font-semibold " >{formatNumberWithK(data?.winnerPrice, true)}</p>
                </div>
                <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Participation Fee</p>
                    <p className=" font-semibold " >{formatNumberWithK(data?.participationFee, true)}</p>
                </div>
                <div className=" flex flex-col gap-1 " >
                    <p className=" text-xs text-violet-300 font-medium " >Participants</p>
                    <RenderParticipant maxDisplay={4} participants={data.participants} />
                </div>
                <div className=" flex flex-col gap-1 " >
                    <p className=" text-xs text-violet-300 font-medium " >Hosted By</p>
                    <div className=" flex gap-2 items-center " >
                        <Avatar src={data?.creator?.profilePicture} size="sm" name={data?.creator?.fullName} />
                        <p className=" font-semibold " >{textLimit(data?.creator?.fullName, 10)}</p>
                    </div>
                </div>
            </div>
            <div className=" mt-auto w-full " >
                <CustomButton onClick={() => router.push(explore ? `/challenges/${data?._id}` : `/dashboard/challenges/${data?._id}`)} fullWidth >
                    {explore ? "See More" : (data?.joined || joined) ? "Continue Challenge" : "View Challenge"}
                </CustomButton>
            </div>
        </div>
    )
}