
"use client"
import { ChallengeInfo, OverviewTab, PrizeAndProgress } from "@/components/challenges";
import { Loader } from "@/components/shared"; 
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData"; 
import { useParams, useRouter, useSearchParams } from "next/navigation"; 
import { IoArrowBackOutline } from "react-icons/io5";


export default function ChallengeDetails() {

    const param = useParams();
    const id = param.id;

    const router = useRouter()

    const query = useSearchParams();
    const type = query?.get('share');

    const { data, isLoading, isRefetching } = useFetchData<IChallenge>({
        endpoint: `/challenge/${id}`, name: "challengedetails"
    })
 
    return (
        <div className=" w-full lg:h-full flex flex-col p-4 lg:overflow-hidden " >
            <Loader loading={isLoading} >
                <div className=" w-full flex overflow-hidden gap-4 flex-col lg:overflow-y-auto " >
                    {!type && (
                        <button onClick={() => router.back()} className=" flex items-center gap-4 " >
                            <IoArrowBackOutline />
                            <p className=" font-bold " >Challenge Detail</p>
                        </button>
                    )}
                    <div className=" flex flex-1 lg:h-full flex-col gap-4 overflow-x-hidden  " >
                        <ChallengeInfo refetching={isRefetching} isCoach={false} item={data as IChallenge} />
                        <PrizeAndProgress item={data as IChallenge} />
                        <div className="w-full bg-white rounded-2xl challenge-tabs"> 
                            <OverviewTab item={data as IChallenge} /> 
                        </div>
                    </div>
                </div>
            </Loader>
        </div>
    )
}