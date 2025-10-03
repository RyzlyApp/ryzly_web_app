"use client"
import { SubmissionDetails, TaskDetails } from "@/components/challenges";
import { Loader } from "@/components/shared";
import { coachAtom } from "@/helper/atom/coach";
import { userAtom } from "@/helper/atom/user";
import { ITask } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect } from "react";


export default function TaskPage() {

    const param = useParams();
    const id = param.slug;

    const [userState] = useAtom(userAtom);

    const { data: user } = userState

    const { data, isLoading } = useFetchData<ITask>({
        endpoint: `/task/${id}`, params: {
            userId: user?._id as string
        }
    })
    const [_, setIsCoach] = useAtom(coachAtom);


    console.log(_);

    useEffect(() => {
        setIsCoach(user?._id === data?.creator?._id)
    }, [user?._id, data?.creator?._id, setIsCoach])

    return (
        <Loader loading={isLoading} >
            <div className=" w-full flex lg:flex-row flex-col h-full gap-4 " >
                <div className=" w-full lg:w-fit h-fit bg-white p-4 rounded-2xl " >
                    <TaskDetails isCoach={user?._id === data?.creator?._id} item={data as ITask} />
                </div>
                <SubmissionDetails isCoach={user?._id === data?.creator?._id} item={data as ITask} />
            </div>
        </Loader>
    )
}