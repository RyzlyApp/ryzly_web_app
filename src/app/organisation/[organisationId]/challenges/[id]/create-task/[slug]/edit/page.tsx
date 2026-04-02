"use client"
import { TasksForm } from "@/components/forms"
import { LoadingLayout } from "@/components/shared";
import { ITask } from "@/helper/model/challenge";
import useChallenge from "@/hook/useChallenge"
import { useFetchData } from "@/hook/useFetchData";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function EditTask() {

    const param = useParams();
    const id = param.id;
    const slug = param.slug;

    const { data: taskData, isLoading: loadingTask } = useFetchData<ITask>({
        endpoint: `/task/${slug}`,
        enable: slug ? true : false,
    });

    const { formikTask, createTask } = useChallenge("", false, true)

    useEffect(() => {
        if (taskData && !formikTask.values.title) {
            formikTask.setValues({
                ...formikTask.values,
                title: taskData.title,
                description: taskData.description,
                startDate: taskData.startDate,
                endDate: taskData.endDate,
                challengeID: id + "",
            });
        }
    }, [taskData]);

    return (
        <div className=" w-full h-full flex flex-col gap-5 bg-white p-4 rounded-2xl items-center " >
            <LoadingLayout loading={loadingTask} >
                <TasksForm formik={formikTask} isLoading={createTask.isPending} />
            </LoadingLayout>
        </div>
    )
}