import { useUnsecureFetchData } from "@/hook/useFetchData";
import { ChallengeCard, LoadingLayout } from "../shared";
import { IChallenge } from "@/helper/model/challenge";
import { filtersAtom } from "@/helper/atom/filter";
import { useAtom } from "jotai";
import { searchAtom } from "@/helper/atom/search";

interface IProps {
    lenght?: number;
}

export default function ExploreChallenges({ lenght = 0 }: IProps) {
    const [filters] = useAtom(filtersAtom);
    const [search] = useAtom(searchAtom);

    const params = new URLSearchParams();
    params.append("tracks", filters.tracks[0] ?? "");
    params.append("q", search);
    params.append("tags", filters.tags[0] ?? "");
    params.append("type", filters.type ?? "");
    params.append(
        "participationFee",
        filters.participationFee?.toString() ?? "",
    );
    params.append("winningPrice", filters.winningPrice?.toString() ?? "");
    params.append("Level", filters.level ?? "");
    params.append("Industry", filters.industry ?? "");

    const { data, isLoading } = useUnsecureFetchData<IChallenge[]>({
        endpoint: `/challenge${lenght > 0 ? "" : "?" + params.toString()}`,
        name: "challenge",
        params: {
            isApproved: "true",
            isPublic: "true",
        },
    });

    return (
        <LoadingLayout
            loading={isLoading}
            bgColor={false}
            lenght={data?.length}
        >
            <div
                className={`${lenght > 0 ? "" : " max-w-[90%] mx-auto min-h-[50vh] lg:max-w-[80%] "} w-full grid gap-4 grid-cols-1 lg:grid-cols-3 pb-6 `}
            >
                {lenght === 0 && (
                    <>
                        {data?.map((item, index) => {
                            return (
                                <ChallengeCard
                                    explore={true}
                                    key={index}
                                    data={item}
                                />
                            );
                        })}
                    </>
                )}

                {lenght !== 0 && (
                    <>
                        {data?.slice(0, lenght)?.map((item, index) => {
                            return (
                                <ChallengeCard
                                    explore={true}
                                    key={index}
                                    data={item}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        </LoadingLayout>
    );
}
