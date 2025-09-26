import { ChallengeCard, LoadingLayout } from "@/components/shared";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import React from "react";  

const Challenges: React.FC = () => {

  const { data, isLoading } = useFetchData<IChallenge[]>({ endpoint: "/challenge", name: "challenge" })

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
