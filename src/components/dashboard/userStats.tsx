"use client";
import { userAtom } from "@/helper/atom/user";
import httpService from "@/helper/services/httpService";
import { userstats } from "@/helper/utils/databank";
import { Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

interface IUserStats {
    totalChallengesCreated: 0;
    totalChallengesJoined: 0;
    totalCompletedChallenges: 0;
}

export default function UserStats() {
    const [userState] = useAtom(userAtom);
    const [userStats, setUserStats] = React.useState<null | IUserStats>(null);
    const [organisationStats, setOrganisationStats] = React.useState<number>(0);

    const param = useParams();
    const organisationId = param.organisationId;

    const { data } = userState;

    const { data: userStatsData, isPending } = useQuery({
        queryKey: ["userStats"],
        queryFn: () =>
            httpService.get(
                organisationId
                    ? `/organization/${organisationId}/challenges/total`
                    : "/analytics/user/challenge-stats",
            ),
        enabled: data?._id !== undefined,
    });

    console.log(userStatsData?.data);

    useEffect(() => {
        if (!isPending && userStatsData?.data) {
            if (!organisationId) {
                setUserStats(userStatsData?.data?.data || {});
            } else {
                setUserStats(userStatsData?.data || {});
            }
        }
    }, [userStatsData, isPending]);

    return (
        <div className=" w-full flex lg:flex-row flex-col gap-4 ">
            {userstats
                ?.filter((item) =>
                    organisationId
                        ? item.label !== "Challenges Joined" &&
                          item.label !== "Challenges Completed"
                        : item.label !== "Challenges Created",
                )
                ?.map((item) => {
                    return (
                        <div
                            key={item.label}
                            className=" w-full flex items-center gap-3 bg-white rounded-2xl px-4  h-[96px] "
                        >
                            <div
                                style={{ backgroundColor: item?.bgcolor }}
                                className=" w-12 h-12 rounded-full flex justify-center items-center "
                            >
                                <item.icon size={"24px"} color={item?.color} />
                            </div>
                            <div className=" flex flex-col ">
                                {isPending && (
                                    <Skeleton className="rounded-lg w-16 h-6" />
                                )}
                                {!isPending && (
                                    <>
                                        <p className=" font-semibold text-lg ">
                                            {item?.key === 1 &&
                                                userStats?.totalChallengesJoined}
                                            {item?.key === 4 && organisationStats}
                                            {item?.key === 2 &&
                                                organisationId ? 0 : userState?.data?.ryzlyPoints}
                                            {item?.key === 3 &&
                                                userStats?.totalCompletedChallenges}
                                        </p>
                                        <p className=" text-xs text-violet-300 ">
                                            {item?.label}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
