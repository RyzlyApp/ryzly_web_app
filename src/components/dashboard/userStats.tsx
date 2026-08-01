"use client";
import { userAtom } from "@/helper/atom/user";
import httpService from "@/helper/services/httpService";
import { organisationstats, userstats } from "@/helper/utils/databank";
import { Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

interface IUserStats {
    totalChallengesCreated: number;
    totalChallengesJoined: number;
    totalCompletedChallenges: number;
}

export default function UserStats() {
    const [userState] = useAtom(userAtom);

    const [userStats, setUserStats] = React.useState<null | IUserStats>(null);
    const [organisationStats, setOrganisationStats] = React.useState<number>(0);
    const [organisationApproved, setOrganisationApproved] = React.useState<number>(0);

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

    const { data: organizationData, isPending: isLoading } = useQuery({
        queryKey: ["organizationStats"],
        queryFn: () =>
            httpService.get(
                "/analytics/organization-challenges/participants-count"
            ),
        enabled: data?.userType === "organization",
    });

    useEffect(() => {
        if (!isPending && userStatsData?.data) {
            if (!organisationId) {
                setUserStats(userStatsData?.data?.data || {});
            } else {
                setUserStats(userStatsData?.data || {});
            }
        }
    }, [userStatsData, isPending]);

    useEffect(() => {
        if (!isLoading) {
            setOrganisationStats(organizationData?.data?.data?.totalUniqueParticipants)
            setOrganisationApproved(organizationData?.data?.data?.totalApprovedTalents)
        }
    }, [organizationData, isLoading]) 
    

    return (
        <div className=" w-full flex lg:flex-row flex-col gap-4 ">
            {data?.userType === "organization" && (
                <>
                    {organisationstats.map((item) => {
                        return (
                            <div
                                key={item.label}
                                className=" w-full flex items-center gap-3 bg-white rounded-2xl px-4  h-[96px] "
                            >
                                <div
                                    style={{
                                        backgroundColor: item?.bgcolor,
                                    }}
                                    className=" w-12 h-12 rounded-full flex justify-center items-center "
                                >
                                    <item.icon
                                        size={"24px"}
                                        color={item?.color}
                                    />
                                </div>
                                <div className=" flex flex-col ">
                                    {(isPending || isLoading) && (
                                        <Skeleton className="rounded-lg w-16 h-6" />
                                    )}
                                    {(!isPending && !isLoading) && (
                                        <>
                                            <p className=" font-semibold text-lg ">
                                                {item?.label ===
                                                "Total Talents"
                                                    ? organisationStats
                                                    :item?.label ===
                                                    "Total Approved Talents"
                                                        ? organisationApproved
                                                        :item?.label ===
                                                "Challenges Joined"
                                                    ? userStats?.totalChallengesJoined
                                                    : item?.label ===
                                                            "Challenges Created" &&
                                                        organisationId
                                                      ? organisationStats
                                                      : item?.label ===
                                                              "Points Earned" &&
                                                          organisationId
                                                        ? 0
                                                        : item?.label ===
                                                                "Challenges Completed" &&
                                                            !organisationId
                                                          ? userStats?.totalCompletedChallenges
                                                          : userStats?.totalChallengesCreated}
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
                </>
            )}
            {data?.userType !== "organization" && (
                <>
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
                                        style={{
                                            backgroundColor: item?.bgcolor,
                                        }}
                                        className=" w-12 h-12 rounded-full flex justify-center items-center "
                                    >
                                        <item.icon
                                            size={"24px"}
                                            color={item?.color}
                                        />
                                    </div>
                                    <div className=" flex flex-col ">
                                        {isPending && (
                                            <Skeleton className="rounded-lg w-16 h-6" />
                                        )}
                                        {!isPending && (
                                            <>
                                                <p className=" font-semibold text-lg ">
                                                    {item?.label ===
                                                    "Challenges Joined"
                                                        ? userStats?.totalChallengesJoined
                                                        : item?.label ===
                                                                "Challenges Created" &&
                                                            organisationId
                                                          ? organisationStats
                                                          : item?.label ===
                                                                  "Points Earned" &&
                                                              organisationId
                                                            ? 0
                                                            : item?.label ===
                                                                    "Challenges Completed" &&
                                                                !organisationId
                                                              ? userStats?.totalCompletedChallenges
                                                              : userStats?.totalChallengesCreated}
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
                </>
            )}
        </div>
    );
}