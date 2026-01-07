
"use client"
import { AddTasks, ChallengeInfo, ChatLayout, PrizeAndProgress } from "@/components/challenges";
import { Loader } from "@/components/shared";
import { coachAtom } from "@/helper/atom/coach";
import { challengeData, loadingChallenge } from "@/helper/atom/loadingChallenge";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
// import { isDateExpired } from "@/helper/utils/isDateExpired";
import { useFetchData } from "@/hook/useFetchData";
import { Tabs, Tab } from "@heroui/react";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useState, lazy, Suspense } from "react";

// Lazy load tab components
const OverviewTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.OverviewTab })));
const ReviewTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.ReviewTab })));
const TaskTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.TaskTab })));
const ResourceTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.ResourceTab })));
const LeaderboardTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.LeaderboardTab })));
const ParticipantTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.ParticipantTab })));
const CoachTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.CoachTab })));
const SalesTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.SalesTab })));


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
        {
            label: "Sales",
            key: "sales"
        },
    ]

    const { data: user } = userState

    const { data, isLoading, isRefetching } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${id}`, name: "challengedetails", params: {
            userId: user?._id
        }
    })

    const [isCoach, setIsCoach] = useAtom(coachAtom);

    const [loading, setLoading] = useAtom(loadingChallenge);
    const [_, setChallenge] = useAtom(challengeData);

    // const allGraded = data?.tasks.every(task => task.status !== "Pending");
    // console.log(_);

    useEffect(() => {
        setIsCoach(user?._id === data?.creator?._id)
    }, [user?._id, data?.creator?._id, setIsCoach]) 
    

    useEffect(() => {
        setLoading(isLoading)
        setChallenge(data as IChallenge)
    }, [isLoading, data])

    return (
        <div className=" w-full lg:h-full flex flex-col lg:overflow-hidden " >
            <Loader loading={isLoading || loading} >
                <div className=" w-full flex lg:flex-row overflow-hidden gap-4 flex-col lg:overflow-y-auto " >
                    <div className=" flex flex-1 lg:h-full flex-col gap-4 overflow-x-hidden  " >
                        {data?.tasks && (
                            <>
                                {(data?.tasks?.length === 0 && user?._id === data?.creator?._id) && (
                                    <AddTasks />
                                )}
                            </>
                        )}
                        {/* {(isDateExpired(data?.endDate+"") && data?.joined) && (
                            <CompletedTasks />
                        )} */}
                        <ChallengeInfo refetching={isRefetching} isCoach={data?.creator?._id === user?._id} item={data as IChallenge} />
                        <PrizeAndProgress item={data as IChallenge} />
                        <div className="w-full bg-white rounded-2xl challenge-tabs">
                            {isCoach && (

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
                            )}
                            {!isCoach && ( 
                                <div className=" w-full flex overflow-x-auto " >
                                    {(data?.joined || data?.creator?._id === user?._id) && (
                                        <Tabs selectedKey={tab ? tab : ""} aria-label="Tabs" variant={"underlined"} >
                                            {tablink?.filter((item) => item.key !== "sales")?.map((item) => {
                                                return (
                                                    <Tab key={item?.key} onClick={() => setTab(item?.key)} title={item?.label} />
                                                )
                                            })}
                                        </Tabs>
                                    )}
                                </div>
                            )}
                            {data && (
                                <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
                                    {!tab && (
                                        <OverviewTab item={data as IChallenge} />
                                    )}
                                    {tab === "task" && (
                                        <TaskTab item={data as IChallenge} />
                                    )}
                                    {tab === "resources" && (
                                        <ResourceTab item={data as IChallenge} />
                                    )}
                                    {tab === "reviews" && (
                                        <ReviewTab item={data as IChallenge} />
                                    )}
                                    {tab === "leaderboard" && (
                                        <LeaderboardTab item={data as IChallenge} limit={3} />
                                    )}
                                    {tab === "participants" && (
                                        <ParticipantTab item={data as IChallenge} />
                                    )}
                                    {tab === "coaches" && (
                                        <CoachTab item={data as IChallenge} />
                                    )}
                                    {tab === "sales" && (
                                        <SalesTab item={data as IChallenge} />
                                    )}
                                </Suspense>
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