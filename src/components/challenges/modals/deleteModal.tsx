import { ModalLayout } from "../../shared";
import { CustomButton } from "../../custom";
import { IoAlertCircleOutline } from "react-icons/io5";
import useChallenge from "@/hook/useChallenge";
import { capitalizeFLetter } from "@/helper/utils/capitalLetter";
import { useEffect } from "react";


export default function DeleteModal(
    { isOpen: open, onClose, type, id }: { isOpen: boolean, onClose: (by: boolean) => void, type: "task" | "challenge", id: string }
) {

    const { deleteChallengeMutate, deleteTaskMutate, setIsOpen, isOpen } = useChallenge()


    useEffect(() => {
        setIsOpen(open)
    }, [open])

    useEffect(() => {
        onClose(isOpen)
    }, [isOpen])

    const clickHandler = () => {
        if (type === "challenge") {
            deleteChallengeMutate.mutate(id)
        } else if (type === "task") {
            deleteTaskMutate.mutate(id)
        }
    }

    return (
        <>
            <ModalLayout size="sm" isOpen={isOpen} onClose={() => onClose(false)} >
                <div className=" flex flex-col gap-4 w-full " >
                    <div className=" w-full flex flex-col gap-2 items-center " >
                        <div className=" w-12 h-12 rounded-full border-8 flex justify-center items-center bg-red-300 border-red-100 " >
                            <IoAlertCircleOutline size={"20px"} className=" text-red-600 " />
                        </div>
                        <p className=" text-lg font-bold " >Delete {capitalizeFLetter(type)}</p>
                        <p className=" text-xs font-medium text-center text-violet-300 " >{`Deleting this challenge will permanently remove all its tasks, resources, and participant progress. This action cannot be undone, so make sure you're certain before proceeding.`}</p>
                    </div>
                    <div className=" flex w-full flex-col gap-2 " >
                        <CustomButton onClick={clickHandler} isLoading={deleteChallengeMutate?.isPending || deleteTaskMutate?.isPending} variant="customDanger" >Delete {capitalizeFLetter(type)} </CustomButton>
                        <CustomButton onClick={()=> onClose(false)} variant="outline" >Cancel</CustomButton>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}