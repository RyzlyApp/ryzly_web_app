import { useFetchData } from "@/hook/useFetchData"
import { ChallengeCard, LoadingLayout } from "../shared"
import { IChallenge } from "@/helper/model/challenge"

export default function ExploreChallenges() {


    const { data, isLoading } = useFetchData<IChallenge[]>({
        endpoint: `/challenge/status`, name: "challenge", params: {
            // tracks: selected?.length > 0 ? selected[0] : [],
            // q: search
        }
    })

    return ( 
        <div className="  w-full grid gap-4 grid-cols-1 lg:grid-cols-4 " >
            <LoadingLayout loading={isLoading} >
                {data?.map((item, index) => {
                    return (
                        <ChallengeCard explore={true} key={index} data={item} />
                    )
                })}
            </LoadingLayout>
        </div>
    )
}