"use client";
import { PreviewWork } from "@/components/challenges";
import { GradeChallenge } from "@/components/forms";
import { LoadingLayout } from "@/components/shared";
import { ISubmissionPreview } from "@/helper/model/application";
import { ITask } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { RiArrowLeftLine } from "react-icons/ri";

export default function Grading() {
    const router = useRouter();
    const param = useParams();
    const slug = param.slug as string;

    const query = useSearchParams();
    const userId = query?.get("userId");

    const { data, isLoading } = useFetchData<Array<ISubmissionPreview>>({
        endpoint: `/submission`,
        params: {
            taskID: slug,
            userId: userId,
        },
    });

    const { data: taskData } = useFetchData<ITask>({
        endpoint: `/task/${slug}`,
    });

    return (
        <div className="w-full flex flex-col gap-4 pb-8">

            <LoadingLayout loading={isLoading}>
                {data && data.length > 0 && (
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Section: Submission details */}
                        <div className="lg:col-span-8 w-full bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                            <PreviewWork item={data[0]} showHeader />
                        </div>

                        {/* Right Section: Review & Task details */}
                        <div className="lg:col-span-4 w-full">
                            <GradeChallenge
                                item={data[0]}
                                task={
                                    taskData ||
                                    (data[0]?.taskID as unknown as ITask)
                                }
                            />
                        </div>
                    </div>
                )}
            </LoadingLayout>
        </div>
    );
}
