import { RiAccountCircleFill, RiHeart3Line, RiTimeFill } from "react-icons/ri";
import { CustomButton, CustomImage } from "../custom";
import { IChallenge } from "@/helper/model/challenge";
import { formatNumberWithK } from "@/helper/utils/formatNumberWithK";
import { textLimit } from "@/helper/utils/textlimit";
import { dateFormat } from "@/helper/utils/dateFormat";

interface IProp {
    scrollable?: boolean,
    data: IChallenge
}

export default function ChallengeCard({
    scrollable,
    data
}: IProp) {
    return (
        <div style={{ width: scrollable ? "350px" : "100%" }} className=" h-fit bg-white rounded-3xl p-4 shadow h-full flex flex-col gap-5 " >
            <div className=" w-full h-[140px] rounded-lg relative bg-red-500 text-white " >
                <div className=" w-full p-3 flex justify-between items-center " >
                    <div className=" rounded-full border w-[30px] h-[30px] border-white flex justify-center items-center " >
                        <RiHeart3Line size={"16px"} color="#FDFDFF" />
                    </div>
                    <div className=" rounded-full border px-2 w-fit gap-2 h-[30px] border-white flex justify-center items-center " >
                        <RiTimeFill size={"16px"} color="#FDFDFF" />
                        {/* <p className=" text-xs font-semibold "  >2-3 Weeks</p>  */}
                        <p className=" text-[10px] font-semibold "  >{dateFormat(data?.createdAt)}</p>
                    </div>
                </div>
                <CustomImage
                    src={data?.thumbnail}
                    alt="blue"
                    fillContainer
                />
            </div>
            <div className=" w-full flex flex-wrap gap-3 " >
                {data?.tags?.map((item, index) => {
                    return (
                        <div key={index} className=" w-fit px-2 text-xs font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100 " >
                            {item}
                        </div>
                    )
                })}
                {/* 
                        <div className=" w-fit px-2 text-xs font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100 " >
                            React
                        </div>
                        <div className=" w-fit px-2 text-xs font-medium text-neonblue-900 rounded-3xl flex justify-center items-center h-[22px] bg-neonblue-100 " >
                    Node.js
                </div>
                <div className=" w-fit px-2 text-xs font-medium text-pear-900 rounded-3xl flex justify-center items-center h-[22px] bg-pear-100 " >
                    PostgreSQL
                </div> */}
            </div>
            <div className=" w-full flex flex-col gap-2 " >
                <p className=" text-lg font-bold " >{data?.title}</p>
                <p className=" text-xs text-violet-300 " >{data?.description}</p>
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
                <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Participants</p>
                    {/* <p className=" font-semibold " >$200</p> */}
                </div>
                <div className=" flex flex-col " >
                    <p className=" text-xs text-violet-300 font-medium " >Hosted By</p>
                    <div className=" flex gap-2 items-center " >
                        <RiAccountCircleFill />
                        <p className=" font-semibold " >{textLimit(data?.creator?.fullName, 10)}</p>
                    </div>
                </div>
            </div>
            <div className=" mt-auto w-full " >
                <CustomButton fullWidth >
                    Join Challenge
                </CustomButton>
            </div>
        </div>
    )
}