import { CustomButton, CustomImage } from "@/components/custom";
// import { ResourceCard } from "@/components/shared";
import { ISubmissionPreview } from "@/helper/model/application";
import { dateFormat } from "@/helper/utils/dateFormat";

export default function PreviewWork(
    { item } : { item: ISubmissionPreview }
) {
    return (
        <div className=" w-full flex flex-col gap-4 " >
            <div className=" w-full h-[580px] rounded-2xl bg-amber-300 " > 
            <CustomImage
                    src={item?.file}
                    alt="blue"
                    fillContainer
                />
            </div>
            <p className=" text-xs font-medium text-violet-300 " >Posted on {dateFormat(item?.createdAt)}</p>
            <div className=" flex flex-col w-full gap-2 pb-4 border-b border-violet-50 " >
                <p className=" font-bold " >{item?.title}</p>
                <p className=" text-xs font-medium text-violet-300 " >{item?.description}</p>
            </div>
            <div className=" pb-4 flex justify-between items-center border-b border-violet-50 " >
                <p className=" text-xs font-medium text-violet-300 " >Attached link</p>
                <a target="_blank" href={item?.link} >
                <CustomButton  height="36px" >Link to Project</CustomButton>
                </a>
            </div>
            <div className=" pb-4 flex gap-2 flex-col border-b border-violet-50 " >
                <p className=" text-xs font-medium text-violet-300 " >Tools used</p>
                <p className=" text-sm font-medium " >{item?.tools}</p>
            </div>
            {/* <div className=" pb-4 flex gap-4 flex-col" >
                <p className=" text-xs font-medium text-violet-300 " >Coach feedback</p>
                <ResourceCard />
            </div> */}
        </div>
    )
}