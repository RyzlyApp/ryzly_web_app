import { CustomStatus } from "@/components/custom"; 
import { ITask } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat"; 

export default function TasksDetails(
    { item, isCoach }: { item: ITask, isCoach?: boolean }
) {

    // const param = useParams();
    // const slug = param.slug;
    // const [userState] = useAtom(userAtom);

    // const { data: user } = userState

    // const { data, isLoading } = useFetchData<Array<IUsergrade>>({
    //     endpoint: `/grade`, params: {
    //         taskID: slug,
    //         userId: user?._id
    //     }
    // }) 

    return (
        <div className="  lg:w-[400px] w-full h-fit flex flex-col gap-6 " >
            <p className=" text-xl font-bold " >{item?.title}</p>
            <div className=" text-xs font-medium text-violet-300 " dangerouslySetInnerHTML={{ __html: item?.description }} />
            <div className=" w-full flex flex-col gap-3 " >
                {!isCoach && (
                    <div className=" flex justify-between w-full items-center " >
                        <p className=" text-xs font-medium text-violet-300 " >Your score</p>
                        <p className=" text-xs font-medium " >{item?.grade}%</p>
                    </div>
                )}
                <div className=" flex justify-between w-full items-center " >
                    <p className=" text-xs font-medium text-violet-300 " >Status</p>
                    <CustomStatus status={item?.status} />
                </div>
                <div className=" flex justify-between w-full items-center " >
                    <p className=" text-xs font-medium text-violet-300 " >Due date</p>
                    <p className=" text-xs font-medium " >{dateFormat(item?.endDate)}</p>
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
    )
}