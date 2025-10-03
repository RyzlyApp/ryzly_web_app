"use client"
import { CustomMarker, CustomStatus } from "@/components/custom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import AddTasksBtn from "../addBtn/addTasksBtn";
import { IChallenge, ITask } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { useParams, useRouter } from "next/navigation";
import { coachAtom } from "@/helper/atom/coach";
import { useAtom } from "jotai";
import { useFetchData } from "@/hook/useFetchData";
import { userAtom } from "@/helper/atom/user";
import { LoadingLayout } from "@/components/shared";

export default function Task(
    { item }: { item: IChallenge }
) {

    const param = useParams();
    const id = param.id;
    const router = useRouter()
    const [isCoach] = useAtom(coachAtom);

    const [userState] = useAtom(userAtom)

    const { data: user } = userState

    const { data = [], isLoading } = useFetchData<ITask[]>({
        endpoint: "/task", name: "tasks", params: {
            userId: user?._id as string,
            challengeID: item?._id
        }
    })
 
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
                        <TableColumn>Score</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item, index) => {
                            return (
                                <TableRow onClick={() => router.push(`/dashboard/challenges/${id}/tasks/${item?._id}`)} className=" cursor-pointer " key={index} >
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
                                    <TableCell>
                                        <p className=" text-violet-300 font-medium text-xs " >{item?.grade+"%"}</p>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </LoadingLayout>
        </div>
    )
}