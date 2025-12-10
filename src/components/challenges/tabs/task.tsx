"use client"
import { CustomMarker, CustomStatus } from "@/components/custom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

import { addToast } from "@heroui/toast";
import AddTasksBtn from "../addBtn/addTasksBtn";
import { IChallenge, ITask } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { useParams, useRouter } from "next/navigation";
import { coachAtom } from "@/helper/atom/coach";
import { useAtom } from "jotai";
import { useFetchData } from "@/hook/useFetchData";
import { userAtom } from "@/helper/atom/user";
import { LoadingLayout } from "@/components/shared";
import DeleteModal from "../modals/deleteModal";
import { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line, RiLockLine } from "react-icons/ri";
import EditModal from "../modals/editModal";
import SubmitPortifoilo from "@/components/forms/submitportfolio";
import { isDateExpired } from "@/helper/utils/isDateExpired";

export default function Task(
    { item }: { item: IChallenge }
) {

    const param = useParams();
    const id = param.id;
    const router = useRouter()
    const [isCoach] = useAtom(coachAtom);

    const [selectedTaskId, setSelectedTaskId] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [userState] = useAtom(userAtom)

    const { data: user } = userState

    const { data = [], isLoading } = useFetchData<ITask[]>({
        endpoint: "/task", name: "tasks", params: {
            userId: user?._id as string,
            challengeID: item?._id
        }
    })

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>, taskID: string, type: "edit" | "delete") => {
        e.stopPropagation()
        setSelectedTaskId(taskID)
        if (type === "edit") {
            setIsOpenEdit(true)
        } else {
            setIsOpen(true)
        }
    }

    const allGraded = data.every(task => task.status === "Graded");

    const handleClick = (item: ITask, check: boolean) => { 
        if(check) {
            addToast({
                title: "Warning",
                description: "Tasks Haven't started yet",
                color: "warning",
            })
            console.log("test");
            
        } else {
            router.push(`/dashboard/challenges/${id}/tasks/${item?._id}`) 
        }
    }


    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            {isCoach && (
                <AddTasksBtn tab={true} />
            )}
            <LoadingLayout loading={isLoading} >
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Task</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Due Date</TableColumn>
                        <TableColumn>{isCoach ? "Action" : "Score"}</TableColumn>
                    </TableHeader>
                    <TableBody>{data?.map((item, index) => {
                        const now = new Date();
                        const start = new Date(item?.startDate);
                        const end = new Date(item?.endDate);

                        const isFirst = index === 0;

                        // 🔐 FIRST ITEM LOCK CONDITION
                        const isFirstLocked = !isCoach || isFirst || !isDateExpired(end) || isDateExpired(start) 

                        // 🔐 OTHER ITEMS LOCK CONDITION
                        const isOtherLocked = !isCoach && index >= 1 || (
                            data[index - 1]?.status === "Pending" || !isDateExpired(end) || isDateExpired(start)
                        ); 

                        const shouldLock = index === 0 ? isFirstLocked : isOtherLocked;

                        return (
                            <TableRow onClick={() => handleClick(item, shouldLock)} key={index} className=" cursor-pointer "  >
                                <TableCell>
                                    <CustomMarker>
                                        {item?.title}
                                    </CustomMarker>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2 items-center">
                                        {shouldLock && <RiLockLine />}
                                        <CustomStatus status={item?.status} />
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <p className="text-violet-300 font-medium text-xs">
                                        {dateFormat(item?.endDate)}
                                    </p>
                                </TableCell>

                                <TableCell>
                                    {!isCoach && (
                                        <p className="text-violet-300 font-medium text-xs">
                                            {item?.grade + "%"}
                                        </p>
                                    )}

                                    {isCoach && (
                                        <div className="flex gap-3">
                                            <button onClick={(e) => clickHandler(e, item?._id, "delete")}>
                                                <RiDeleteBin6Line className="text-red-600" size="20px" />
                                            </button>
                                            <button onClick={(e) => clickHandler(e, item?._id, "edit")}>
                                                <RiEdit2Line className="text-neonblue-600" size="20px" />
                                            </button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        )
                    })}

                    </TableBody>
                </Table>
            </LoadingLayout>
            <SubmitPortifoilo item={item} allGraded={allGraded && data?.length > 0} />
            <DeleteModal type="task" isOpen={isOpen} onClose={setIsOpen} id={selectedTaskId} />
            <EditModal type="task" isOpen={isOpenEdit} onClose={setIsOpenEdit} id={item?._id as string} taskID={selectedTaskId} />
        </div>
    )
}