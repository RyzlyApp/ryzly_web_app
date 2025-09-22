"use client"
import { CustomMarker, CustomStatus } from "@/components/custom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import AddTasksBtn from "../addTasksBtn";
import { IChallenge } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { useParams, useRouter } from "next/navigation";
import { coachAtom } from "@/helper/atom/coach";
import { useAtom } from "jotai";

export default function Task(
    { item }: { item: IChallenge }
) {

    const param = useParams();
    const id = param.id;
    const router = useRouter()
    const [ isCoach ] = useAtom(coachAtom);

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            {isCoach && (
                <AddTasksBtn tab={true} />
            )}
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Task</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Due Date</TableColumn>
                </TableHeader>
                <TableBody>
                    {item?.tasks?.map((item, index) => {
                        return (
                            <TableRow onClick={()=> router.push(`/dashboard/challenges/${id}/tasks/${item?._id}`)} className=" cursor-pointer " key={index} >
                                <TableCell>
                                    <CustomMarker>
                                        {item?.title}
                                    </CustomMarker>
                                </TableCell>
                                <TableCell>
                                    <CustomStatus status={item?.status} />
                                </TableCell>
                                <TableCell>
                                    <p className=" text-violet-300 font-medium text-xs " >{dateFormat(item?.endDate)}</p>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}