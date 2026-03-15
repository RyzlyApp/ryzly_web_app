"use client";
import { TaskTab } from "@/components/challenges";
import { LoadingLayout } from "@/components/shared";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";

export default function Task() {
    const param = useParams();
    const id = param.id;

    const [userState] = useAtom(userAtom);

    const { data: user } = userState;

    const { data, isLoading } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${id}`,
        name: "challengedetails",
        params: {
            userId: user?._id,
        },
    });

    return (
        <LoadingLayout loading={isLoading}>
            <TaskTab item={data as IChallenge} />
        </LoadingLayout>
    );
}
