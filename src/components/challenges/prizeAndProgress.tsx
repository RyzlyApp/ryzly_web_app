import { userAtom } from "@/helper/atom/user";
import { IChallenge, ITask } from "@/helper/model/challenge";
import { formatNumber } from "@/helper/utils/numberFormat";
import { useFetchData } from "@/hook/useFetchData";
import { CircularProgress } from "@heroui/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { LoadingLayout } from "../shared";

export default function PriceAndProgress(
    { item }: { item: IChallenge }
) {

    const [userState] = useAtom(userAtom);

    const [daysLeft, setDaysLeft] = useState(0)
    const [daysTotal, setDaysTotal] = useState(0)

    const { data: user } = userState

    const { data = [], isLoading } = useFetchData<ITask[]>({
        endpoint: "/task", name: "tasks", params: {
            userId: user?._id as string,
            challengeID: item?._id
        }
    })

    const gradedCount = data.filter(item => item.status === "Graded").length;

    useEffect(() => {
        if (data?.length > 0) {
            const end = new Date(item?.endDate);
            const now = new Date();
            const msPerDay = 1000 * 60 * 60 * 24;
            const daysLeft = Math.ceil((Number(end) - Number(now)) / msPerDay);

            const totalDays = daysBetween(
                item?.startDate,
                item?.endDate
            );

            setDaysLeft(daysLeft)
            setDaysTotal(totalDays)
        }
    }, [data])

    function daysBetween(start: string, end: string) {
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.floor(
            (new Date(end).getTime() - new Date(start).getTime()) / msPerDay
        );
    }

    return (
        <LoadingLayout loading={isLoading} >

            <div className=" w-full h-fit flex lg:flex-row flex-col gap-4 " >
                <div className=" w-full h-[100px] bg-neonblue-600 text-white rounded-2xl px-4 flex justify-center flex-col " >
                    <p className=" text-xs " >Winning Prize</p>
                    <p className=" text-xl font-bold " >{formatNumber(item?.winnerPrice)}</p>
                </div>
                <div className=" w-full h-[100px] flex justify-between px-4 items-center rounded-2xl bg-white " >
                    <p className=" font-medium text-sm " >Your progress</p>
                    <div className=" flex gap-2 " >

                        {/* {(user?._id === item?.creator?._id || item?.joined) && */}
                            <div className=" flex flex-col justify-center items-center " >
                                <CircularProgress
                                    color="secondary"
                                    label={``}
                                    showValueLabel={true}
                                    size="lg"
                                    value={Number(((((daysTotal - daysLeft) > daysTotal ? daysTotal : (daysTotal - daysLeft)) / daysTotal) * 100).toFixed(1)) ?? 0}
                                />
                                <p className=" text-[10px] font-semibold " >{(daysTotal - daysLeft) > daysTotal ? daysTotal : (daysTotal - daysLeft)}/{daysTotal} Days</p>
                            </div>
                        {/* } */}
                        {(user?._id !== item?.creator?._id && item?.joined) && (
                            <div className=" flex flex-col justify-center items-center " >
                                <CircularProgress
                                    color="success"
                                    label={``}
                                    showValueLabel={true}
                                    size="lg"
                                    value={(gradedCount / data?.length) * 100}
                                />
                                <p className=" text-[10px] font-semibold " >{gradedCount}/{data?.length} Tasks</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </LoadingLayout>
    )
}