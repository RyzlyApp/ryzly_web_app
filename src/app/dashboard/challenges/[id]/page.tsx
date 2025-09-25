
"use client"
import { AddTasks, ChallengeInfo, CoachTab, LeaderboardTab, OverviewTab, ParticipantTab, PrizeAndProgress, ResourceTab, TaskTab } from "@/components/challenges";
import { Loader } from "@/components/shared";
import { coachAtom } from "@/helper/atom/coach";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { Tabs, Tab } from "@heroui/react";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect } from "react";


export default function ChallengeDetails() {

    const param = useParams();
    const id = param.id;

    const [userState] = useAtom(userAtom);

    const { data: user } = userState

    const { data, isLoading } = useFetchData<IChallenge>({
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
        <Loader loading={isLoading} >
            <div className=" w-full flex lg:flex-row overflow-x-hidden flex-col " >
                <div className=" flex flex-1 flex-col gap-4 overflow-x-hidden  " >
                    {data?.tasks && (
                        <>
                            {data?.tasks?.length === 0 && (
                                <AddTasks />
                            )}
                        </>
                    )}
                    <ChallengeInfo isCoach={data?.creator?._id === user?._id} item={data as IChallenge} />
                    <PrizeAndProgress item={data as IChallenge} />
                    <div className=" w-full bg-white rounded-2xl " >
                        <Tabs aria-label="Tabs variants" color="primary" variant={"underlined"}>
                            <Tab key="Overview" title="Overview" >
                                <OverviewTab item={data as IChallenge} />
                            </Tab>
                            {data?.joined && (
                                <Tab key="Task" title="Task" >
                                    <TaskTab item={data as IChallenge} />
                                </Tab>
                            )}
                            <Tab key="Resources" title="Resources" >
                                <ResourceTab />
                            </Tab>
                            <Tab key="Reviews" title="Reviews" />
                            <Tab key="Leaderboard" title="Leaderboard" >
                                <LeaderboardTab />
                            </Tab>
                            <Tab key="Participants" title="Participants" >
                                <ParticipantTab />
                            </Tab>
                            <Tab key="Coaches" title="Coaches" >
                                <CoachTab />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className=" w-[400px] " >

                </div>
            </div>
        </Loader>
    )
}