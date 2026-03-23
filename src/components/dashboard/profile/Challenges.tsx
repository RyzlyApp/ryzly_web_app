import { ChallengeCard, LoadingLayout } from "@/components/shared";
import { IChallenge } from "@/helper/model/challenge";
import { IUser } from "@/helper/model/user";
import { useFetchData } from "@/hook/useFetchData";
import { useParams } from "next/navigation";
import React from "react";

function Challenges({ user }: { user: IUser }) {
    const param = useParams(); 
    const organisationId = param.organisationId;

    const { data, isLoading } = useFetchData<IChallenge[]>({
        endpoint: organisationId ? `/challenge/organization/${organisationId}` : "/challenge/status",
        name: "challenge",
        params: organisationId ? {} : {
            userId: user?._id as string,
            asCoach: "coach",
            isApproved: "true",
        },
    });

    console.log(data);
    

    return (
        <div className=" w-full flex justify-center ">
            <LoadingLayout loading={isLoading} lenght={data?.length}>
                <div className="grid lg:grid-cols-3 gap-5">
                    {data?.map((item, index) => {
                        return <ChallengeCard data={item} key={index} />;
                    })}
                </div>
            </LoadingLayout>
        </div>
    );
}

export default Challenges;
