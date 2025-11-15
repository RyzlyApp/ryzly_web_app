"use client"
import { userAtom } from "@/helper/atom/user";
import httpService from "@/helper/services/httpService";
import { userstats } from "@/helper/utils/databank";
import { Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React from "react";

interface IUserStats {
        totalChallengesCreated: 0,
        totalChallengesJoined: 0,
        totalCompletedChallenges: 0,
}

export default function UserStats() {

    const [userState] = useAtom(userAtom);
    const [userStats, setUserStats] = React.useState<null| IUserStats>(null);

    const { data } = userState

    const { data: userStatsData, isPending } = useQuery({
        queryKey: ['userStats'],
        queryFn: () => httpService.get('/analytics/user/challenge-stats'),
        enabled: data?._id !== undefined
    });

    React.useEffect(() => {
        if (!isPending && userStatsData?.data) { 
            console.log(userStatsData)        
            setUserStats(userStatsData?.data?.data || {});
        }
    }, [userStatsData, data, userState, isPending, userStats])

    return (
        <div className=" w-full flex lg:flex-row flex-col gap-4 " >
            {userstats?.map((item,) => {
                return ( 
                    <div key={item.label} className=" w-full flex items-center gap-3 bg-white rounded-2xl px-4  h-[96px] " >
                        <div style={{ backgroundColor: item?.bgcolor }} className=" w-12 h-12 rounded-full flex justify-center items-center " >
                            <item.icon size={"24px"} color={item?.color} />
                        </div>
                        <div className=" flex flex-col " >
                            {isPending && (
                                <Skeleton className="rounded-lg w-16 h-6" />
                            )}
                            {!isPending && (
                                <>
                                    <p className=" font-semibold text-lg " >
                                        {item?.key === 1 && userStats?.totalChallengesJoined }
                                        {item?.key === 2 && userState?.data?.ryzlyPoints }
                                        {item?.key === 3 && userStats?.totalCompletedChallenges }
                                    </p>
                                    <p className=" text-xs text-violet-300 " >{item?.label}</p>
                                </>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}