import { CustomImage } from "@/components/custom";
import { ISubmissionPreview } from "@/helper/model/application";
import { textLimit } from "@/helper/utils/textlimit";
import { useFetchData } from "@/hook/useFetchData";
import { Avatar } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";

export default function ListWork() {

    const param = useParams();
    const id = param.id;
    const slug = param.slug;

    const router = useRouter()

    const { data } = useFetchData<Array<ISubmissionPreview>>({
        endpoint: `/submission`, params: {
            taskID: slug
        }
    })

    const WorkCard = ({ item }: { item: ISubmissionPreview }) => {
        return (
            <div onClick={() => router.push(`/dashboard/challenges/${id}/tasks/${slug}/grading?userId=${item?.userId?._id}`)} className=" cursor-pointer w-full flex flex-col gap-3 " >
                <div className=" relative  w-full h-[160px] bg-gray-300 rounded-2xl  " >
                    <div className=" h-[22px] px-2 rounded-full absolute w-fit z-20 flex items-center justify-center top-2 left-2 bg-black " >
                        <p className=" text-xs font-medium text-white " >Reviewed</p>
                    </div>
                    {item?.url && (
                        <CustomImage
                            src={item?.url}
                            alt="blue"
                            fillContainer
                            style={{ borderRadius: "8px" }}
                        />
                    )}
                </div>
                <div className=" flex items-center gap-2 " >
                    <div className=" w-fit " >
                        <Avatar src={item?.userId?.profilePicture} name={item?.userId?.fullName} />
                    </div>
                    <div className=" flex flex-col " >
                        <p className=" font-medium text-sm " >{textLimit(item?.userId?.fullName, 15)}</p>
                        <p className=" text-xs " >{textLimit(item?.userId?.email, 15)}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className=" w-full grid-cols-2 lg:grid-cols-3 grid gap-4 " >
            {data?.map((item, index) => {
                return (
                    <WorkCard item={item} key={index} />
                )
            })}
        </div>
    )
}