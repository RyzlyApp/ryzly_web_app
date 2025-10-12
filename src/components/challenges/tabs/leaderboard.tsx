import { LoadingLayout } from "@/components/shared";
import { IChallenge, ILeadboard, IOverview } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { Avatar } from "@heroui/react";
import { RiVipDiamondLine } from "react-icons/ri";


export default function Leaderboard(
    { item }: { item: IChallenge }
) {


    const { data = [], isLoading } = useFetchData<ILeadboard[]>({
        endpoint: `/leaderboard/getPerChallengeStats/${item?._id}?page=1&limit=20`, name: "leaderboard"
    });

    return (
        <LoadingLayout loading={isLoading} lenght={data?.length} > 
            <div className=" w-full flex flex-col gap-4 p-4 " >
                <div className=" w-full relative flex  h-[303px] p-8 bg-neonblue-50 rounded-lg " >
                    <div className=" w-full flex flex-col items-center " >
                        <div className="relative w-[75px] mt-auto h-[67px]">
                            <Avatar
                                // src="https://i.pravatar.cc/300"
                                name={data[1]?.userFullname}
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
                            <p className=" font-semibold text-sm " >{data[1]?.userFullname}</p>
                            <p className=" text-xs text-violet-300 font-medium " >80% total score</p>
                            <div className=" flex gap-1 items-center " >
                                <RiVipDiamondLine size={"12px"} className=" text-neonblue-600 " />
                                <p className=" font-medium text-xs flex gap-1 items-center " >{data[1]?.normalizedScore}</p>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full flex flex-col items-center  " >
                        <div className="relative w-[166px] h-[130px]">
                            <Avatar
                                // src="https://i.pravatar.cc/300"
                                name={data[0]?.userFullname}
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
                            <p className=" font-semibold text-sm " >{data[0]?.userFullname}</p>
                            <p className=" text-xs text-violet-300 font-medium " >80% total score</p>
                            <div className=" flex gap-1 items-center " >
                                <RiVipDiamondLine size={"12px"} className=" text-neonblue-600 " />
                                <p className=" font-medium text-xs flex gap-1 items-center " >{data[0]?.normalizedScore}</p>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full flex flex-col items-center  " >
                        <div className="relative w-[75px] mt-auto h-[67px]">
                            <Avatar
                                // src="https://i.pravatar.cc/300"
                                name={data[2]?.userFullname}
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
                                2
                            </div>
                            <p className=" font-semibold text-sm " >{data[2]?.userFullname}</p>
                            <p className=" text-xs text-violet-300 font-medium " >80% total score</p>
                            <div className=" flex gap-1 items-center " >
                                <RiVipDiamondLine size={"12px"} className=" text-neonblue-600 " />
                                <p className=" font-medium text-xs flex gap-1 items-center " >{data[2]?.normalizedScore}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {data?.map((item, index) => {
                    if (index > 2) {
                        return (
                            <div key={index} className=" w-full flex flex-col gap-3 " >
                                <div className=" flex items-center h-[74px] justify-between w-full " >
                                    <div className=" flex items-center gap-4 " >
                                        <p className=" text-violet-300 font-medium " >{index + 1}</p>
                                        <div className=" flex gap-2 items-center " >
                                            <div className=" w-9 h-9 rounded-full bg-neonblue-600 " >
                                                <Avatar
                                                    // src="https://i.pravatar.cc/300"
                                                    alt="User Avatar"
                                                    name={item?.userFullname}
                                                    className="w-full h-full object-cover"
                                                    classNames={{
                                                        img: "object-cover",
                                                    }}
                                                />
                                            </div>
                                            <div className=" flex flex-col " >
                                                <p className=" text-sm font-semibold " >{item?.userFullname}</p>
                                                <p className=" text-xs text-violet-300 font-medium " >{item?.normalizedScore}% total score</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex flex-col text-right " >
                                        <p className=" font-medium " >{item?.tasksCompleted}</p>
                                        <p className=" text-xs text-violet-300 " >Task done</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </LoadingLayout>
    )
}