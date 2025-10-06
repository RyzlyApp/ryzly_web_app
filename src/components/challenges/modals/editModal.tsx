import { ChallengeForm, TasksForm } from "@/components/forms"
import { LoadingLayout, ModalLayout } from "@/components/shared"
import { IChallenge, ITask } from "@/helper/model/challenge"
import useChallenge from "@/hook/useChallenge"
import { useFetchData } from "@/hook/useFetchData"
import { DropdownItem } from "@heroui/react"
import { useEffect } from "react"
import { RiEdit2Line } from "react-icons/ri"

export default function EditModal(
    { isOpen: open, onClose, id, type, taskID }: { isOpen: boolean, onClose: (by: boolean) => void, type: "task" | "challenge", id: string, taskID?: string }
) {

    const { formikChallenge, editChallenge, uploadImage, formikTask, editTask, isOpen, setIsOpen } = useChallenge(type === "task" ? taskID : id, true)

    const { data, isLoading } = useFetchData<IChallenge>({
        endpoint: `/challenge/${id}`, name: "challengedetails", enable: type === "challenge"
    }) 

    const { data: taskData, isLoading: loadingTask } = useFetchData<ITask>({
        endpoint: `/task/${taskID}`, enable: type === "task"
    })

    useEffect(() => {
        setIsOpen(open)
    }, [open])

    useEffect(() => {
        onClose(isOpen)
    }, [isOpen])

    useEffect(() => {


        if (!formikChallenge?.values?.title && type === "challenge") {

            const clonetrack: string[] = []

            data?.tracks?.map((item, index) => {
                clonetrack[index] = item?._id
            })

            formikChallenge.setFieldValue("isPublic", data?.isPublic)
            formikChallenge.setFieldValue("title", data?.title)
            formikChallenge.setFieldValue("description", data?.description)
            formikChallenge.setFieldValue("winnerPrice", data?.winnerPrice)
            formikChallenge.setFieldValue("participationFee", data?.participationFee)
            formikChallenge.setFieldValue("category", data?.category)
            formikChallenge.setFieldValue("tags", data?.tags)
            formikChallenge.setFieldValue("level", data?.level)
            formikChallenge.setFieldValue("startDate", data?.startDate)
            formikChallenge.setFieldValue("endDate", data?.endDate)
            formikChallenge.setFieldValue("industry", data?.industry)
            formikChallenge.setFieldValue("tracks", clonetrack)
        } else if (!formikTask?.values?.title && type === "task") {
            formikTask.setFieldValue("endDate", taskData?.endDate)
            formikTask.setFieldValue("title", taskData?.title)
            formikTask.setFieldValue("description", taskData?.description)
            formikTask.setFieldValue("startDate", taskData?.startDate)
            formikTask.setFieldValue("challengeID", id)
        }

    }, [data, taskData])

    return (
        <>
            <DropdownItem onClick={() => setIsOpen(true)} key="edit"
                startContent={<RiEdit2Line size={"20px"} />} >
                <p className=" text-sm font-medium " >Edit</p>
            </DropdownItem>
            <ModalLayout size={type === "task"? "md" : "2xl"} isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <LoadingLayout loading={isLoading || loadingTask} >
                    {type === "challenge" && (
                        <ChallengeForm isLoading={editChallenge.isPending || uploadImage?.isPending} formik={formikChallenge} preview={data?.url} />
                    )}
                    {type === "task" && (
                        <TasksForm formik={formikTask} isLoading={editTask.isPending} edit={true} />
                    )}
                </LoadingLayout>
            </ModalLayout>
        </>
    )
}