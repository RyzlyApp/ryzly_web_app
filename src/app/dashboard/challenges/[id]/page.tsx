
"use client"
import { AddTasks, ChallengeInfo, ChatLayout, CoachTab, LeaderboardTab, OverviewTab, ParticipantTab, PrizeAndProgress, ResourceTab, TaskTab } from "@/components/challenges";
import { Loader, LoadingLayout } from "@/components/shared";
import { coachAtom } from "@/helper/atom/coach";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { Tabs, Tab } from "@heroui/react";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function ChallengeDetails() {

    const param = useParams();
    const id = param.id;

    const [userState] = useAtom(userAtom);


    const [tab, setTab] = useState("")

    const tablink = [
        {
            label: "Overview",
            key: ""
        },
        {
            label: "Task",
            key: "task"
        },
        {
            label: "Resources",
            key: "resources"
        },
        {
            label: "Reviews",
            key: "reviews"
        },
        {
            label: "Leaderboard",
            key: "leaderboard"
        },
        {
            label: "Participants",
            key: "participants"
        },
        {
            label: "Coaches",
            key: "coaches"
        },
    ]

    const { data: user } = userState

    const { data, isLoading, isRefetching } = useFetchData<IChallenge>({
        endpoint: `/challenge/${id}`, name: "challengedetails", params: {
            userId: user?._id
        }
    })

    const [_, setIsCoach] = useAtom(coachAtom);

    console.log(_);


    useEffect(() => {
        setIsCoach(user?._id === data?.creator?._id)
    }, [user?._id, data?.creator?._id, setIsCoach])

    return (
        <div className=" w-full lg:h-full flex flex-col lg:overflow-hidden " >
            <Loader loading={isLoading} >
                <div className=" w-full flex lg:flex-row overflow-hidden gap-4 flex-col lg:overflow-y-auto " >
                    <div className=" flex flex-1 lg:h-full flex-col gap-4 overflow-x-hidden  " >
                        {data?.tasks && (
                            <>
                                {(data?.tasks?.length === 0 && user?._id === data?.creator?._id) && (
                                    <AddTasks />
                                )}
                            </>
                        )}
                        <ChallengeInfo refetching={isRefetching} isCoach={data?.creator?._id === user?._id} item={data as IChallenge} />
                        <PrizeAndProgress item={data as IChallenge} />
                        <div className="w-full bg-white rounded-2xl challenge-tabs">
                            <div className=" w-full flex overflow-x-auto " >
                                {(data?.joined || data?.creator?._id === user?._id) && (
                                    <Tabs selectedKey={tab ? tab : ""} aria-label="Tabs" variant={"underlined"} >
                                        {tablink?.map((item) => {
                                            return (
                                                <Tab key={item?.key} onClick={() => setTab(item?.key)} title={item?.label} />
                                            )
                                        })}
                                    </Tabs>
                                )}
                            </div>
                            {!tab && (
                                <OverviewTab item={data as IChallenge} />
                            )}
                            {tab === "task" && (
                                <TaskTab item={data as IChallenge} />
                            )}
                            {tab === "resources" && (
                                <ResourceTab item={data as IChallenge} />
                            )}
                            {tab === "Leaderboard" && (
                                <LeaderboardTab />
                            )}
                            {tab === "participants" && (
                                <ParticipantTab item={data as IChallenge} />
                            )}
                            {tab === "coaches" && (
                                <CoachTab item={data as IChallenge} />
                            )}
                        </div>
                    </div>
                    {(data?.joined || data?.creator?._id === user?._id) && (
                        <div className=" w-full lg:w-[400px] h-fit " >
                            <ChatLayout item={data as IChallenge} />
                        </div>
                    )}
                </div>
            </Loader>
        </div>
    )
}