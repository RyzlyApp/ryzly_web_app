import { IGradeDetail } from "@/helper/model/challenge";
import UserCard from "./userCard";

export default function CoachesReview({ data }: { data: IGradeDetail }) {
    console.log(data);

    return (
        <div className="  w-full flex flex-col gap-4 ">
            <UserCard item={data?.owner} />
            <p>{data?.feedBack}</p>
            {data?.markedBy?.userType  !== "organization" && (
                <div className=" w-full flex justify-between items-center border-t border-t-violet-100 pt-2 ">
                    <p className=" text-sm font-medium ">Score</p>
                    <p className=" text-sm font-medium ">{data?.score + "%"}</p>
                </div>
            )}
            {data?.markedBy?.userType === "organization" && (
                <>
                    {data?.score === 100 ? (
                        <div>
                            <div className=" max-w-[200px] w-full px-3 h-[45px] rounded-full bg-green-500 text-white font-semibold text-sm flex justify-center items-center ">
                                <p>Approved</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className=" max-w-[200px] w-full px-3 h-[45px] rounded-full bg-red-600 text-white font-semibold text-sm flex justify-center items-center ">
                                <p>Rejected</p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
