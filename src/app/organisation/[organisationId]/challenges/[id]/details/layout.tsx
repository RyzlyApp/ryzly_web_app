"use client";
import {
    AddTasks,
    ChallengeInfo,
    ChatLayout,
    PrizeAndProgress,
} from "@/components/challenges";
import { Loader } from "@/components/shared";
import { coachAtom } from "@/helper/atom/coach";
import {
    challengeData,
    loadingChallenge,
} from "@/helper/atom/loadingChallenge";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
// import { isDateExpired } from "@/helper/utils/isDateExpired";
import { useFetchData } from "@/hook/useFetchData";
import { Tabs, Tab } from "@heroui/react";
import { useAtom } from "jotai";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, lazy, Suspense, ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: DashboardLayoutProps) {
    const param = useParams();
    const id = param.id;
    const organisationId = param.organisationId;

    const [userState] = useAtom(userAtom);
    const pathname = usePathname();

    const router = useRouter();

    const [tab, setTab] = useState("");

    const tablink = [
        {
            label: "Overview",
            key: "",
        },
        {
            label: "Task",
            key: "task",
        },
        {
            label: "Resources",
            key: "resources",
        },
        {
            label: "Reviews",
            key: "reviews",
        },
        {
            label: "Leaderboard",
            key: "leaderboard",
        },
        {
            label: "Participants",
            key: "participants",
        },
        {
            label: "Coaches",
            key: "coaches",
        },
        {
            label: "Sales",
            key: "sales",
        },
    ];

    const taborganisationlink = [
        {
            label: "Overview",
            key: "",
        },
        {
            label: "Reviews",
            key: "reviews",
        },
        {
            label: "Leaderboard",
            key: "leaderboard",
        },
        {
            label: "Participants",
            key: "participants",
        },
    ];

    const { data: user } = userState;

    const { data, isLoading, isRefetching } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${id}`,
        name: "challengedetails",
        params: {
            userId: user?._id,
        },
    });

    const [isCoach, setIsCoach] = useAtom(coachAtom);

    const [loading, setLoading] = useAtom(loadingChallenge);
    const [_, setChallenge] = useAtom(challengeData);

    useEffect(() => {
        setIsCoach(user?._id === data?.creator?._id);
    }, [user?._id, data?.creator?._id, setIsCoach]);

    useEffect(() => {
        setLoading(isLoading);
        setChallenge(data as IChallenge);
    }, [isLoading, data]);

    const clickHandler = (item: string) => {
        if (!item) {
            router.push(
                organisationId
                    ? `/organisation/${organisationId}/challenges/${id}/details`
                    : `/dashboard/challenges/${id}/details`,
            );
        } else {
            router.push(
                organisationId
                    ? `/organisation/${organisationId}/challenges/${id}/details/${item}`
                    : `/dashboard/challenges/${id}/details/${item}`,
            );
        }
    };

    return (
        <div className=" w-full lg:h-full flex flex-col lg:overflow-hidden ">
            <Loader loading={isLoading || loading}>
                <div className=" w-full flex lg:flex-row overflow-hidden gap-4 flex-col lg:overflow-y-auto ">
                    <div className=" flex flex-1 lg:h-full flex-col gap-4 overflow-x-hidden  ">
                        {data?.tasks && (
                            <>
                                {data?.tasks?.length === 0 &&
                                    user?._id === data?.creator?._id && (
                                        <AddTasks />
                                    )}
                            </>
                        )}
                        <ChallengeInfo
                            refetching={isRefetching}
                            isCoach={data?.creator?._id === user?._id}
                            item={data as IChallenge}
                        />
                        <PrizeAndProgress item={data as IChallenge} />
                        {!organisationId && (
                            <div className="w-full bg-white rounded-2xl challenge-tabs">
                                {isCoach && (
                                    <div className=" w-full flex overflow-x-auto ">
                                        {(data?.joined ||
                                            data?.creator?._id ===
                                                user?._id) && (
                                            <Tabs
                                                selectedKey={
                                                    pathname ===
                                                    "/dashboard/challenges/696a314c26bba4871d7d46d7/details"
                                                        ? ""
                                                        : pathname.replace(
                                                              `/dashboard/challenges/${id}/details/`,
                                                              "",
                                                          )
                                                }
                                                aria-label="Tabs"
                                                variant={"underlined"}
                                            >
                                                {tablink?.map((item) => {
                                                    return (
                                                        <Tab
                                                            key={item?.key}
                                                            onClick={() =>
                                                                clickHandler(
                                                                    item.key,
                                                                )
                                                            }
                                                            title={item?.label}
                                                        />
                                                    );
                                                })}
                                            </Tabs>
                                        )}
                                    </div>
                                )}
                                {!isCoach && (
                                    <div className=" w-full flex overflow-x-auto ">
                                        {(data?.joined ||
                                            data?.creator?._id ===
                                                user?._id) && (
                                            <Tabs
                                                selectedKey={tab ? tab : ""}
                                                aria-label="Tabs"
                                                variant={"underlined"}
                                            >
                                                {tablink
                                                    ?.filter(
                                                        (item) =>
                                                            item.key !==
                                                                "sales" &&
                                                            item?.key !==
                                                                "coupon",
                                                    )
                                                    ?.map((item) => {
                                                        return (
                                                            <Tab
                                                                key={item?.key}
                                                                onClick={() =>
                                                                    clickHandler(
                                                                        item.key,
                                                                    )
                                                                }
                                                                title={
                                                                    item?.label
                                                                }
                                                            />
                                                        );
                                                    })}
                                            </Tabs>
                                        )}
                                    </div>
                                )}
                                <div className="p-4 ">{children}</div>
                            </div>
                        )}
                        {organisationId && (
                            <div className="w-full bg-white rounded-2xl challenge-tabs">
                                <div className=" w-full flex overflow-x-auto ">
                                    <Tabs
                                        selectedKey={
                                            pathname ===
                                            `/organisation/${organisationId}/challenges/${id}/details`
                                                ? ""
                                                : pathname.replace(
                                                      `/organisation/${organisationId}/challenges/${id}/details/`,
                                                      "",
                                                  )
                                        }
                                        aria-label="Tabs"
                                        variant={"underlined"}
                                    >
                                        {taborganisationlink?.map((item) => {
                                            return (
                                                <Tab
                                                    key={item?.key}
                                                    onClick={() =>
                                                        clickHandler(item.key)
                                                    }
                                                    title={item?.label}
                                                />
                                            );
                                        })}
                                    </Tabs>
                                </div>
                                <div className="p-4 ">{children}</div>
                            </div>
                        )}
                    </div>
                    {(data?.joined || data?.creator?._id === user?._id) && (
                        <div className=" w-full lg:w-[400px] h-fit ">
                            <ChatLayout item={data as IChallenge} />
                        </div>
                    )}
                </div>
            </Loader>
        </div>
    );
}
