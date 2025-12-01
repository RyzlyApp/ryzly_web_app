"use client"
import { IChallenge } from "@/helper/model/challenge";  
import { IoArrowBackOutline } from "react-icons/io5";
import { OverviewTab } from ".";
import ChallengeInfo from "./challengeInfo";
import PrizeAndProgress from "./prizeAndProgress";
import { useFetchData } from "@/hook/useFetchData";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Loader } from "../shared";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useEffect } from "react";

export default function ChallengeDetailsPage () {


    const param = useParams();
    const id = param.id;

    const [ userState ] = useAtom(userAtom)



    const router = useRouter()

    const query = useSearchParams();
    const type = query?.get('share');

    const { data, isLoading, isRefetching } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${id}`, name: "challengedetails"
    })

    useEffect(()=> {
        if(userState?.data?._id) {
            router.push(`/dashboard/challenges/${id}`)
        }
    }, [userState?.data?._id])

    return( 
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
                        <PrizeAndProgress item={data as IChallenge} task={false} />
                        <div className="w-full bg-white rounded-2xl challenge-tabs"> 
                            <OverviewTab item={data as IChallenge} /> 
                        </div>
                    </div>
                </div>
            </Loader>
        </div>
    )
}