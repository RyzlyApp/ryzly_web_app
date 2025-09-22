import { CustomStatus } from "@/components/custom";
import { userAtom } from "@/helper/atom/user";
import { ITaskDetail, IUsergrade } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";


export default function TasksDetails(
    { item, isCoach }: { item: ITaskDetail, isCoach?: boolean }
) {

    const param = useParams();
    const slug = param.slug;
    const [userState] = useAtom(userAtom);

    const { data: user } = userState

    const { data, isLoading } = useFetchData<Array<IUsergrade>>({
        endpoint: `/grade`, params: {
            taskID: slug,
            userId: user?._id
        }
    }) 

    return (
        <>
            {!isLoading && (
                <div className="  lg:w-[400px] w-full h-fit flex flex-col gap-6 " >
                    <p className=" text-xl font-bold " >{item?.title}</p>
                    <p className=" text-xs font-medium text-violet-300 " >{item?.description}</p>
                    <div className=" w-full flex flex-col gap-3 " >
                        {!isCoach && (
                            <div className=" flex justify-between w-full items-center " >
                                <p className=" text-xs font-medium text-violet-300 " >Your score</p>
                                {data && (
                                    <>
                                        <p className=" text-xs font-medium " >{data[0]?.score}%</p>
                                    </>
                                )}
                            </div>
                        )}
                        <div className=" flex justify-between w-full items-center " >
                            <p className=" text-xs font-medium text-violet-300 " >Status</p>
                            {data && (
                                <>
                                    <CustomStatus status={data[0]?.score ? "Complete" : item?.status} />
                                </>
                            )}
                        </div>
                        <div className=" flex justify-between w-full items-center " >
                            <p className=" text-xs font-medium text-violet-300 " >Due date</p>
                            <p className=" text-xs font-medium " >01 Aug 2025</p>
                        </div>
                    </div>
                    {/* <div className=" w-full h-[140px] rounded-2xl bg-amber-300 flex justify-center items-center " >
            <div className=" w-[62px] h-[62px] rounded-full bg-[#FFFFFF66] flex justify-center items-center " >
                <RiPlayLargeLine size={"24px"} className=" text-white " />
            </div>
        </div>
        <div className=" w-full flex flex-col gap-4 " >
            <p className=" font-semibold " >Attachments</p>
            <div className=" w-full flex gap-4 " >
                <div className=" w-full flex gap-2 flex-col " >
                    <div className=" w-full h-[140px] rounded-lg bg-amber-300 " >

                    </div>
                    <p className=" text-xs font-medium " >How to build mobile app</p>
                </div>
                <div className=" w-full flex gap-2 flex-col " >
                    <div className=" w-full h-[140px] rounded-lg bg-amber-300 " >

                    </div>
                    <p className=" text-xs font-medium " >Beginners guide to prototyping</p>
                </div>
            </div>
        </div> */}
                </div>
            )}
        </>
    )
}