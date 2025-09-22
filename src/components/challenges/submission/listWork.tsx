import { CustomImage } from "@/components/custom";
import { ISubmissionPreview } from "@/helper/model/application"; 
import { textLimit } from "@/helper/utils/textlimit";
import { useFetchData } from "@/hook/useFetchData";
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
            <div onClick={()=> router.push(`/dashboard/challenges/${id}/tasks/${slug}/grading`)} className=" cursor-pointer w-full flex flex-col gap-3 " >
                <div className=" relative  w-full h-[160px] bg-amber-300 rounded-2xl  " >
                    <div className=" h-[22px] px-2 rounded-full absolute w-fit flex items-center justify-center top-2 left-2 bg-black " >
                        <p className=" text-xs font-medium text-white " >Reviewed</p>
                    </div>
                    <CustomImage
                        src={item?.file}
                        alt="blue"
                        fillContainer
                    />
                </div>
                <div className=" flex items-center gap-2 " >
                    <div className=" w-fit " >
                        <div className=" w-6 h-6 rounded-full bg-neonblue-600 " >

                        </div>
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
        <div className=" w-full grid-cols-3 grid gap-4 " >
            {data?.map((item, index) => {
                return (
                    <WorkCard item={item} key={index} />
                )
            })}
        </div>
    )
}