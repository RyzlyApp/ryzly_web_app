"use client"
import { LoadingLayout } from "@/components/shared";
import { IChallenge, ILeadboard } from "@/helper/model/challenge";
import { formatNumberWithK } from "@/helper/utils/formatNumberWithK";
import { useFetchData } from "@/hook/useFetchData";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import { RiVipDiamondLine } from "react-icons/ri";


export default function Leaderboard(
    { item, systemWide }: { item?: IChallenge, systemWide?: boolean }
) {

    const router = useRouter()

    const { data = [], isLoading } = useFetchData<ILeadboard[]>({
        endpoint: systemWide ? `/leaderboard/getGlobalPoints` : `/leaderboard/getPerChallengeStats/${item?._id}?page=1&limit=10`, name: "leaderboard"
    });

    return (
        <LoadingLayout loading={isLoading} lenght={data?.length} >
            <div className={` w-full flex flex-col gap-4 ${systemWide ? " " : " p-4"}  `} >
                <div className={` w-full relative flex  lg:h-[303px] ${systemWide ? " py-4 px-4 " : " p-8 "}  bg-neonblue-50 rounded-lg `} >
                    <div className=" w-full hidden lg:flex flex-col items-center " >
                        {(data[1]?.firstName) && (
                            <>
                                <div onClick={() => router.push(`/dashboard/profile/${data[1]?._id}`)} className="relative cursor-pointer w-[75px] mt-auto h-[67px]">
                                    <Avatar
                                        src={data[1]?.profilePicture}
                                        name={data[1]?.firstName+" "+data[1]?.lastName}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                        classNames={{
                                            base: "mask-hexagon overflow-hidden",
                                            img: "object-cover",
                                        }}
                                    />
                                </div>
                                <div className=" flex flex-col items-center -mt-3 z-10 " >
                                    <div className=" w-6 h-6 rounded-full border border-white bg-[#1D1348] text-xs font-medium text-[#FCFCFD] flex justify-center items-center " >
                                        2
                                    </div>
                                    <p className={` text-center ${systemWide ? " text-xs " : " font-semibold text-sm "} `} >{data[1]?.firstName+" "+data[1]?.lastName}</p>
                                    {systemWide ?
                                        <div className=" max-w-[70px] flex flex-col items-center mt-1 " >
                                            <RiVipDiamondLine size={"12px"} />
                                            <p className=" text-center text-xs text-violet-300 font-medium " >{formatNumberWithK(Number(data[1]?.ryzlyPoints))} ryzly point</p>
                                        </div> :
                                        <p className=" text-center text-xs text-violet-300 font-medium " >{data[1]?.normalizedScore}% total score</p>
                                    }
                                </div>
                            </>
                        )}
                    </div>
                    <div className=" w-full flex flex-col items-center  " >
                        <div onClick={() => router.push(`/dashboard/profile/${data[0]?._id}`)} className="relative cursor-pointer w-[166px] h-[130px]">
                            <Avatar
                                src={data[0]?.profilePicture}
                                name={data[0]?.firstName+" "+data[0]?.lastName}
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                                classNames={{
                                    base: "mask-hexagon overflow-hidden",
                                    img: "object-cover",
                                }}
                            />
                        </div>
                        <div className=" flex flex-col items-center -mt-7 z-10 " >
                            <div className=" w-10 h-10 rounded-full border border-white bg-neonblue-500 font-medium text-[#FCFCFD] flex justify-center items-center " >
                                1
                            </div>
                            <p className={` text-center ${systemWide ? " text-xs " : " font-semibold text-sm "} `} >{data[0]?.fullName}</p>
                            {systemWide ?
                                <div className=" max-w-[70px] flex flex-col items-center mt-1 " >
                                    <RiVipDiamondLine size={"12px"} />
                                    <p className=" text-center text-xs text-violet-300 font-medium " >{formatNumberWithK(Number(data[0]?.ryzlyPoints))} ryzly point</p>
                                </div> :
                                <p className=" text-center text-xs text-violet-300 font-medium " >{data[0]?.normalizedScore}% total score</p>
                            }
                            {/* <div className=" flex gap-1 items-center " >
                                <RiVipDiamondLine size={"12px"} className=" text-neonblue-600 " />
                                <p className=" font-medium text-xs flex gap-1 items-center " >{data[0]?.normalizedScore}</p>
                            </div> */}
                        </div>
                    </div>
                    <div className=" w-full hidden lg:flex flex-col items-center  " >
                        {(data[2]?.firstName) && (
                            <>
                                <div onClick={() => router.push(`/dashboard/profile/${data[2]?._id}`)} className="relative cursor-pointer w-[75px] mt-auto h-[67px]">
                                    <Avatar
                                        src={data[2]?.profilePicture}
                                        name={data[2]?.firstName+" "+data[2]?.lastName}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                        classNames={{
                                            base: "mask-hexagon overflow-hidden",
                                            img: "object-cover",
                                        }}
                                    />
                                </div>
                                <div className=" flex flex-col items-center -mt-3 z-10 " >
                                    <div className=" w-6 h-6 rounded-full border border-white bg-[#E56C4C] text-xs font-medium text-[#FCFCFD] flex justify-center items-center " >
                                        3
                                    </div>
                                    <p className={` text-center ${systemWide ? " text-xs " : " font-semibold text-sm "} `} >{data[2]?.firstName+" "+data[2]?.lastName}</p>
                                    {systemWide ?
                                        <div className=" max-w-[70px] flex flex-col items-center mt-1 " >
                                            <RiVipDiamondLine size={"12px"} />
                                            <p className=" text-center text-xs text-violet-300 font-medium " >{formatNumberWithK(Number(data[2]?.ryzlyPoints))} ryzly point</p>
                                        </div> :
                                        <p className=" text-center text-xs text-violet-300 font-medium " >{data[2]?.normalizedScore}% total score</p>
                                    }
                                    {/* <div className=" flex gap-1 items-center " >
                                <RiVipDiamondLine size={"12px"} className=" text-neonblue-600 " />
                                <p className=" font-medium text-xs flex gap-1 items-center " >{data[2]?.normalizedScore}</p>
                            </div> */}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className=" w-full lg:hidden flex flex-col  " >
                    {data?.map((item, index) => {
                        if (index > 0 && index <= 9) {
                            return (
                                <div key={index} className=" w-full flex flex-col gap-1 " >
                                    <div className=" flex items-center py-1 justify-between w-full " >
                                        <div className=" flex items-center gap-4 " >
                                            <p className=" text-violet-300 font-medium " >{index + 1}</p>
                                            <div onClick={() => router.push(`/dashboard/profile/${item?._id}`)} className=" cursor-pointer flex gap-2 items-center " >
                                                <div className=" w-9 h-9 rounded-full bg-neonblue-600 " >
                                                    <Avatar
                                                        src={item?.profilePicture}
                                                        alt="User Avatar"
                                                        name={item?.firstName}
                                                        className="w-full h-full object-cover"
                                                        classNames={{
                                                            img: "object-cover",
                                                        }}
                                                    />
                                                </div>
                                                <div className=" flex flex-col " >
                                                    <p className=" text-sm font-semibold " >{item?.firstName+" "+item?.lastName}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex flex-col text-right " >
                                            {/* <p className=" font-medium " >{item?.tasksCompleted}</p>
                                        <p className=" text-xs text-violet-300 " >Task done</p> */}
                                            {systemWide ?
                                                <div className=" max-w-[70px] flex flex-col items-center " >
                                                    <RiVipDiamondLine size={"12px"} />
                                                    <p className=" text-center text-xs text-violet-300 font-medium " >{item?.ryzlyPoints} ryzly point</p>
                                                </div> :
                                                <p className=" text-center text-xs text-violet-300 font-medium " >{item?.normalizedScore}% total score</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className=" w-full hidden lg:flex flex-col  " >
                    {data?.map((item, index) => {
                        if (index > 2 && index <= 9) {
                            return (
                                <div key={index} className=" w-full flex flex-col gap-1 " >
                                    <div className=" flex items-center py-1 justify-between w-full " >
                                        <div className=" flex items-center gap-4 " >
                                            <p className=" text-violet-300 font-medium " >{index + 1}</p>
                                            <div onClick={() => router.push(`/dashboard/profile/${item?._id}`)} className=" cursor-pointer flex gap-2 items-center " >
                                                <div className=" w-9 h-9 rounded-full bg-neonblue-600 " >
                                                    <Avatar
                                                        src={item?.profilePicture}
                                                        alt="User Avatar"
                                                        name={item?.firstName}
                                                        className="w-full h-full object-cover"
                                                        classNames={{
                                                            img: "object-cover",
                                                        }}
                                                    />
                                                </div>
                                                <div className=" flex flex-col " >
                                                    <p className=" text-sm font-semibold " >{item?.firstName+" "+item?.lastName}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex flex-col text-right " >
                                            {/* <p className=" font-medium " >{item?.tasksCompleted}</p>
                                        <p className=" text-xs text-violet-300 " >Task done</p> */}
                                            {systemWide ?
                                                <div className=" max-w-[70px] flex flex-col items-center " >
                                                    <RiVipDiamondLine size={"12px"} />
                                                    <p className=" text-center text-xs text-violet-300 font-medium " >{item?.ryzlyPoints} ryzly point</p>
                                                </div> :
                                                <p className=" text-center text-xs text-violet-300 font-medium " >{item?.normalizedScore}% total score</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </LoadingLayout>
    )
}