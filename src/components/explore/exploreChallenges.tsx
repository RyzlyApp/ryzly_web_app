import { useFetchData, useUnsecureFetchData } from "@/hook/useFetchData"
import { ChallengeCard, LoadingLayout } from "../shared"
import { IChallenge } from "@/helper/model/challenge"
import { filtersAtom } from "@/helper/atom/filter";
import { useAtom } from "jotai";
import { searchAtom } from "@/helper/atom/search";

export default function ExploreChallenges() {

    const [filters] = useAtom(filtersAtom);
    const [search] = useAtom(searchAtom);


    const params = new URLSearchParams();
    params.append('tracks', filters.tracks[0] ?? "");
    params.append('q', search);
    params.append('tags', filters.tags[0] ?? "");
    params.append('type', filters.type ?? "");
    params.append('participationFee', filters.participationFee?.toString() ?? "");
    params.append('winningPrice', filters.winningPrice?.toString() ?? "");
    params.append('Level', filters.level ?? "");
    params.append('Industry', filters.industry ?? "");

    const { data, isLoading } = useUnsecureFetchData<IChallenge[]>({
        endpoint: `/challenge?${params.toString()}`, name: "challenge", params: {
            isApproved: "true"
        }
    })

    return (
        <LoadingLayout loading={isLoading} >
            <div className="  w-full grid gap-4 grid-cols-1 lg:grid-cols-4 " >
                {data?.map((item, index) => {
                    return (
                        <ChallengeCard explore={true} key={index} data={item} />
                    )
                })}
            </div>
        </LoadingLayout>
    )
}