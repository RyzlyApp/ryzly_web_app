import { CustomButton, CustomImage } from "@/components/custom";
import { CoachesReview } from "@/components/shared";
// import { ResourceCard } from "@/components/shared";
import { ISubmissionPreview } from "@/helper/model/application";
import { IGradeDetail } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { useFetchData } from "@/hook/useFetchData";

export default function PreviewWork(
    { item }: { item: ISubmissionPreview }
) {

    const { data = [] } = useFetchData<IGradeDetail[]>({
        endpoint: `/grade`, params: {
            // challengeID: item?.challengeID?._id,
            taskID: item?.taskID?._id,
            userId: item?.userId?._id
        }
    })


    return (
        <div className=" w-full flex flex-col gap-4 " >
            <div className=" w-full h-[200px] lg:h-[580px] rounded-2xl bg-white " >
                <CustomImage
                    src={item?.url}
                    alt="blue"
                    fillContainer
                    style={{ borderRadius: "16px" }}
                />
            </div>
            <p className=" text-xs font-medium text-violet-300 " >Posted on {dateFormat(item?.createdAt)}</p>
            <div className=" flex flex-col w-full gap-2 pb-4 border-b border-violet-50 " >
                <p className=" font-bold " >{item?.title}</p>
                <p className=" text-xs font-medium text-violet-300 " >{item?.description}</p>
            </div>
            <div className=" pb-4 flex justify-between items-center border-b border-violet-50 " >
                <p className=" text-xs font-medium text-violet-300 " >Attached link</p>
                <a target="_blank" href={item?.link?.includes("http") ? item?.link : "https://"+item.link} >
                    <CustomButton height="36px" >Link to Project</CustomButton>
                </a>
            </div>
            <div className=" pb-4 flex gap-2 flex-col border-b border-violet-50 " >
                <p className=" text-xs font-medium text-violet-300 " >Tools used</p>
                <p className=" text-sm font-medium " >{item?.tools}</p>
            </div>
            {data?.length > 0 && (
                <div className=" pb-4 flex gap-4 flex-col" >
                    <p className=" text-xs font-medium text-violet-300 " >Coach feedback</p>
                    <CoachesReview data={data[0]} />
                </div>
            )}
        </div>
    )
}