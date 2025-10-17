import { LoadingLayout } from "@/components/shared";
import UserCard from "@/components/shared/userCard";
import { IChallenge, IRatingDetail } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { useFetchData } from "@/hook/useFetchData";
import { RiStarFill, RiThumbUpLine } from "react-icons/ri";


export default function Review(
    { item }: { item: IChallenge }
) {

    const { data = [], isLoading } = useFetchData<IRatingDetail[]>({
        endpoint: `/challenge/getRating`, name: "getRating", params: {
            id: item?._id
        }
    }) 

    return (
        <LoadingLayout loading={isLoading} lenght={data?.length} >
            <div className=" w-full flex flex-col p-4 gap-4" >
                {data?.map((item, index) => {
                    return (
                        <div key={index} className=" py-4 w-full border-b border-gray-200 flex flex-col gap-3 " >
                            <UserCard item={item?.user} showCoach={true} />
                            <div className=" flex items-center gap-2 " >
                                <div className=" flex items-center gap-1 " >
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <RiStarFill
                                            key={index}
                                            size="12px"
                                            color={index < (item?.rating || 0) ? "#FFBC0A" : "#E0E0E0"}
                                        />
                                    ))}
                                    <p className=" text-xs font-medium text-violet-300 " >{(item?.rating).toFixed(1)}</p>
                                </div>
                                <div className=" pl-2 border-l border-grey-400 text-xs font-medium text-violet-300 " >
                                    {dateFormat(item?.createdAt)}
                                </div>
                            </div>
                            <p className=" text-xs font-medium text-violet-300 " >{item?.comment}</p>
                            <div className=" flex gap-1 items-center " >
                                <RiThumbUpLine size={"12px"} />
                                <p className=" text-xs  " >Helpful</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </LoadingLayout>
    )
}