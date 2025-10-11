import { ChallengeCard, LoadingLayout } from "@/components/shared";
import { IChallenge } from "@/helper/model/challenge";
import { IUser } from "@/helper/model/user";
import { useFetchData } from "@/hook/useFetchData";
import React from "react";

function Challenges(
  { user } : { user: IUser }
){

  const { data, isLoading } = useFetchData<IChallenge[]>({
    endpoint: "/challenge/status", name: "challenge", params: {
        userId: user?._id as string,
        asCoach: "coach" 
    }
  })


  return (
    <div className=" w-full flex justify-center " >
      <LoadingLayout loading={isLoading} >
        <div className="grid lg:grid-cols-3 gap-5">
          {data?.map((item, index) => {
            return (
              <ChallengeCard data={item} key={index} />
            )
          })}
        </div>
      </LoadingLayout>
    </div>
  );
};

export default Challenges;
