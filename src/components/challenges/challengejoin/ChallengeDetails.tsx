import { IChallenge } from "@/helper/model/challenge";
import { formatNumber } from "@/helper/utils/numberFormat";

interface ChallengeDetailsProps {
    item: IChallenge;
}

export default function ChallengeDetails({ item }: ChallengeDetailsProps) {
    const isOrganization = item?.creator?.userType === "organization";

    return (
        <div className=" w-full flex p-4 pb-0 flex-col gap-3 ">
            <div className=" flex flex-col gap-2 ">
                <div className=" w-full flex flex-wrap gap-3 ">
                    <div className=" w-fit px-2 text-sm font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100 ">
                        {item?.industry?.name}
                    </div>
                    <div className=" w-fit px-2 text-sm font-medium text-neonblue-900 rounded-3xl flex justify-center items-center h-[22px] bg-neonblue-100 ">
                        {item?.level?.name}
                    </div>
                    <div className=" w-fit px-2 text-sm font-medium text-pear-900 rounded-3xl flex justify-center items-center h-[22px] bg-pear-100 ">
                        {item?.tracks?.[0]?.name}
                    </div>
                </div>
                <div className=" flex flex-wrap gap-2 ">
                    {item?.tags?.map((tag) => (
                        <div
                            key={tag}
                            className=" w-fit px-2 text-sm font-medium bg-violet-500 rounded-3xl flex justify-center items-center h-[22px] text-violet-100 "
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <p className=" text-3xl font-bold ">{item?.title}</p>
            <div
                className=" text-sm font-medium text-violet-300 "
                dangerouslySetInnerHTML={{ __html: item?.description }}
            />
            {!isOrganization && (
                <p className=" text-violet-300 text-sm font-medium ">
                    Participation Fee:{" "}
                    <span className=" font-bold ">
                        {formatNumber(item?.participationFee)}
                    </span>
                </p>
            )}
        </div>
    );
}
