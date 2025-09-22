"use client"
import { PreviewWork } from "@/components/challenges";
import { GradeChallenge } from "@/components/forms";
import { ISubmissionPreview } from "@/helper/model/application";
import { useFetchData } from "@/hook/useFetchData";
import { useParams } from "next/navigation";

export default function Grading() {


    const param = useParams();
    const slug = param.slug;

    const { data } = useFetchData<Array<ISubmissionPreview>>({
        endpoint: `/submission`, params: {
            // challengeID: id,
            taskID: slug
        }
    })

    return (
        <>
            {data && (
                <div className=" w-full flex lg:flex-row flex-col h-full gap-4 " >
                    <div className=" h-full flex-1 overflow-y-auto rounded-2xl flex flex-col gap-6 bg-white p-4 " >
                        {(data?.length > 0) && (
                            <PreviewWork item={data[0]} />
                        )}
                    </div>
                    <div className=" w-full lg:w-fit " >
                        <GradeChallenge item={data[0]} />
                    </div>
                </div>
            )}
        </>
    )
}