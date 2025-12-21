"use client"
import { userAtom } from "@/helper/atom/user";
import { useAtom } from "jotai";
import { useFetchData } from "@/hook/useFetchData";
import { PreviewWork } from "..";
import ListWork from "../submission/listWork";
import { ITaskDetail } from "@/helper/model/challenge";
import { useParams, useRouter } from "next/navigation";
import { CustomButton } from "@/components/custom";
import { ISubmissionPreview } from "@/helper/model/application"; 


export default function Submission(
    { isCoach }: { isCoach?: boolean, item: ITaskDetail }
) {

    const param = useParams();
    const slug = param.slug;
    const id = param.id;
    const [userState] = useAtom(userAtom)

    const { data: user } = userState

    const { data } = useFetchData<Array<ISubmissionPreview>>({
        endpoint: `/submission`, params: {
            // challengeID: id,
            taskID: slug,
            userId: user?._id
        },
        enable: isCoach ? false : true
    })

    const router = useRouter()  
    

    return (
        <div className=" h-full flex-1 lg:overflow-y-auto rounded-2xl flex flex-col gap-6 bg-white p-4 " >
            {!isCoach && (
                <p className=" font-bold " >Your submission</p>
            )} 
            {(data?.length === 0 && !isCoach) && (
                <div className=" w-full h-full flex justify-center gap-3 items-center flex-col " >
                    <p className=" max-w-[260px] text-sm text-violet-300 font-medium text-center " >Share your work to get feedback and move closer to completing the challenge.</p>
                    <CustomButton onClick={() => router.push(`/dashboard/challenges/${id}/tasks/${slug}/submission`)} height="40px" >Submit your work</CustomButton>
                </div>
            )}
            {data && (
                <>
                    {(data?.length > 0 && !isCoach) && (
                        <PreviewWork item={data[0]} />
                    )}
                </>
            )}
            {isCoach && (
                <ListWork />
            )}
        </div>
    )
}