import { IGradeDetail } from "@/helper/model/challenge";
import UserCard from "./userCard";

export default function CoachesReview(
    { data }: { data: IGradeDetail }
) {
    return (
        <div className="  w-full flex flex-col gap-4 " > 
            <UserCard item={data?.owner} />
            <p>{data?.feedBack}</p>
            <div className=" w-full flex justify-between items-center border-t border-t-violet-100 pt-2 " >
                <p className=" text-sm font-medium " >Score</p>
                <p className=" text-sm font-medium " >{data?.score + "%"}</p>
            </div>
        </div>
    )
}