"use client"
import AddTasksBtn from "./addTasksBtn";

export default function AddTasks() {

    return (
        <>
            <div className=" w-full flex h-fit lg:flex-row flex-col lg:h-[106px] gap-6 lg:items-center rounded-2xl bg-warning-100 p-4 " >
                <div className=" flex flex-col " >
                    <p className=" text-xl font-semibold " >Add Tasks to Launch Your Challenge</p>
                    <p className=" text-xs font-medium " >You need at least one task to make your challenge live. Add tasks now so participants can join and start engaging with your challenge.</p>
                </div>
                <AddTasksBtn variant="warning" />
            </div>
        </>
    )
}