
"use client"
import { ChallengeInfo, OverviewTab, PrizeAndProgress } from "@/components/challenges";
import { Loader } from "@/components/shared";
import { coachAtom } from "@/helper/atom/coach";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";


export default function ChallengeDetails() {

    const param = useParams();
    const id = param.id;

    const router  = useRouter()

    // const [userState] = useAtom(userAtom); 

    // const { data: user } = userState

    const { data, isLoading, isRefetching } = useFetchData<IChallenge>({
        endpoint: `/challenge/${id}`, name: "challengedetails"
    })

    // const [_, setIsCoach] = useAtom(coachAtom);

    // console.log(_);


    // useEffect(() => {
    //     setIsCoach(user?._id === data?.creator?._id)
    // }, [user?._id, data?.creator?._id, setIsCoach])

    return (
        <div className=" w-full lg:h-full flex flex-col p-4 lg:overflow-hidden " >
            <Loader loading={isLoading} >
                <div className=" w-full flex overflow-hidden gap-4 flex-col lg:overflow-y-auto " >
                    <button onClick={()=> router.back()} className=" flex items-center gap-4 " >
                        <IoArrowBackOutline />
                        <p className=" font-bold " >Challenge Detail</p>
                    </button>
                    <div className=" flex flex-1 lg:h-full flex-col gap-4 overflow-x-hidden  " >
                        <ChallengeInfo refetching={isRefetching} isCoach={false} item={data as IChallenge} />
                        <PrizeAndProgress item={data as IChallenge} />
                        <div className="w-full bg-white rounded-2xl challenge-tabs">
                            {/* {!tab && ( */}
                            <OverviewTab item={data as IChallenge} />
                            {/* )}  */}
                        </div>
                    </div>
                </div>
            </Loader>
        </div>
    )
}