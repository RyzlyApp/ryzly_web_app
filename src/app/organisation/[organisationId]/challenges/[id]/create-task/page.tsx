"use client"
import { TasksForm } from "@/components/forms"
import useChallenge from "@/hook/useChallenge"

export default function CreateTask() {

    const { formikTask, createTask } = useChallenge("", false, true)

    return (
        <div className=" w-full h-full flex flex-col gap-5 bg-white p-4 rounded-2xl items-center " > 
            <p className=" font-bold " >Create Task</p>
            <TasksForm formik={formikTask} isLoading={createTask.isPending} />
        </div>
    )
}