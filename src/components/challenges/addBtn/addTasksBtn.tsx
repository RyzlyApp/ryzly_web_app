"use client"
import useChallenge from "@/hook/useChallenge"
import { CustomButton } from "../../custom"
import { TasksForm } from "../../forms"
import CustomModal from "../../shared/modalLayout"
import { RiAddLine } from "react-icons/ri"
import { useParams, useRouter } from "next/navigation"


export default function AddTasksBtn(
    {
        variant,
        height,
        tab,
        mobile
    }: { variant?: "warning" | "primary", height?: string, tab?: boolean, mobile?: boolean }
) {

    const { formikTask, createTask, isOpen, setIsOpen } = useChallenge()
    const router = useRouter()
    const param = useParams();
    const id = param.id;

    return (
        <>
            {tab && (
                <> 
                    <button onClick={() => setIsOpen(true)} className=" lg:flex hidden items-center gap-3 text-neonblue-600 " >
                        <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                            <RiAddLine size={"18px"} />
                        </div>
                        <p className=" text-sm font-medium " >Add task</p>
                    </button>

                    <button onClick={() => router.push(`/dashboard/challenges/${id}/create-task`)} className=" lg:hidden  flex items-center gap-3 text-neonblue-600 " >
                        <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                            <RiAddLine size={"18px"} />
                        </div>
                        <p className=" text-sm font-medium " >Add task</p>
                    </button>
                </>
            )}
            {(!tab && !mobile) && (
                <>
                    <div className=" w-[111px] lg:block hidden " >
                        <CustomButton onClick={() => setIsOpen(true)} height={height ?? "40px"} variant={variant} >Add Task</CustomButton>
                    </div>
                    <div className=" w-[111px] lg:hidden " >
                        <CustomButton onClick={() => router.push(`/dashboard/challenges/${id}/create-task`)} height={height ?? "40px"} variant={variant} >Add Task</CustomButton>
                    </div>

                </>
            )}
            {mobile && (
                <button onClick={() => router.push(`/dashboard/challenges/${id}/create-task`)} className=" lg:hidden text-blue-900 p-2" >
                    <RiAddLine size={"20px"} />
                </button>
            )}

            <CustomModal title="Add task" isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <TasksForm formik={formikTask} isLoading={createTask.isPending} />
            </CustomModal>
        </>
    )
}