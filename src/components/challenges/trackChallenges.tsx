"use client"
import { CustomButton } from "@/components/custom";
import { ChallengeCard, Loader } from "@/components/shared";
import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { ITrack } from "@/helper/model/interest";
import { useFetchData } from "@/hook/useFetchData";
import { useAtom } from "jotai";
import { useState } from "react";

export default function TrackChallenges() {


    const [userState] = useAtom(userAtom);

    const { data: user } = userState
    const [ selected, setSelected ] = useState<string[]>([])

    const { data, isLoading } = useFetchData<IChallenge[]>({
        endpoint: "/challenge", name: "challenge"+selected[0], params: {
            userId: user?._id as string,
            tracks: selected?.length > 0 ? [...selected] : []
        }
    })

    const { data: track } = useFetchData<ITrack[]>({ endpoint: "/track/tracks", name: "tracks" })

    return (
        <div className="w-full rounded-2xl bg-white overflow-hidden flex flex-col gap-4 p-4">

            {/* Tabs */}
            <div className="relative overflow-x-auto scroll-smooth w-full ">
                <div
                    className="flex gap-4 w-fit pb-2"
                >
                    <CustomButton onClick={()=> setSelected([])}  variant={selected?.length > 0  ? "outline" : "primary"} height="35px" fontSize="12px">
                        All
                    </CustomButton>
                    {track?.map((item, index) => {
                        return (
                            <CustomButton key={index} onClick={()=> setSelected([item._id])} variant={item?._id === selected[0] ? "primary" : "outline"} height="35px" fontSize="12px">
                                {item?.name}
                            </CustomButton>
                        )
                    })}
                </div>
            </div>
            <div className=" w-full grid gap-4 grid-cols-1 lg:grid-cols-3 " >
                <Loader loading={isLoading} >
                    {data?.map((item, index) => {
                        return (
                            <ChallengeCard key={index} data={item} />
                        )
                    })}
                </Loader>
            </div>
        </div>
    )
}