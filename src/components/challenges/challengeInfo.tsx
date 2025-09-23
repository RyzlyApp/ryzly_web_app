import { IChallenge } from "@/helper/model/challenge";
import { formatNumber } from "@/helper/utils/numberFormat";
import { CustomImage } from "../custom";

export default function ChallengeInfo(
    { item }: { item: IChallenge }
) {
    return (
        <div className=" w-full rounded-3xl flex flex-col bg-white " >
            <div className=" w-full h-[244px] rounded-t-3xl bg-gray-300 " >
                {item.url?.includes("http") && (
                    <CustomImage
                        src={item?.url}
                        alt="blue"
                        fillContainer
                        style={{ borderRadius: "8px" }}
                    />
                )}
            </div>
            <div className=" w-full flex p-4 flex-col gap-3 " >
                <div className="  " >

                </div>
                <p className=" text-3xl font-bold " >{item?.title}</p>
                {/* <p className=" text-violet-300 text-sm font-medium " >{item?.description}</p> */}
                <p className=" text-violet-300 text-xs font-medium " >Participation Fee: <span className=" font-bold " >{formatNumber(item?.participationFee)}</span></p>
            </div>
        </div>
    )
}