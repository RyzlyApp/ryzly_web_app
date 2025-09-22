import { IChallenge } from "@/helper/model/challenge"; 
import { formatNumber } from "@/helper/utils/numberFormat";

export default function PriceAndProgress(
    { item } : { item: IChallenge }
){
    return(
        <div className=" w-full h-fit flex lg:flex-row flex-col gap-4 " >
            <div className=" w-full h-[100px] bg-neonblue-600 text-white rounded-2xl px-4 flex justify-center flex-col " >
                <p className=" text-xs " >Winning Prize</p>
                <p className=" text-xl font-bold " >{formatNumber(item?.winnerPrice)}</p>
            </div>
            <div className=" w-full h-[100px] flex justify-between px-4 items-center rounded-2xl bg-white " >
                <p className=" font-medium text-sm " >Your progress</p>
            </div>
        </div>
    )
}