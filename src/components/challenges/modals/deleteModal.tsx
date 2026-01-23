import { ModalLayout } from "../../shared";
import { CustomButton } from "../../custom";
import { IoAlertCircleOutline } from "react-icons/io5";
import useChallenge from "@/hook/useChallenge";
import { capitalizeFLetter } from "@/helper/utils/capitalLetter";


export default function DeleteModal(
    { isOpen, onClose, type, id }: { isOpen: boolean, onClose: (by: boolean) => void, type: "task" | "challenge" | "resource" | "coupon", id: string }
) {

    const { deleteChallengeMutate, deleteTaskMutate, deleteResourceMutate, deleteCouponMutate } = useChallenge()

    const clickHandler = () => {
        if (type === "challenge") {
            deleteChallengeMutate.mutate(id, {
                onSuccess: () => onClose(false),
            });
        } else if (type === "task") {
            deleteTaskMutate.mutate(id, {
                onSuccess: () => onClose(false),
            });
        } else if (type === "resource") {
            deleteResourceMutate.mutate(id, {
                onSuccess: () => onClose(false),
            });
        } else if (type === "coupon") {
            deleteCouponMutate.mutate(id, {
                onSuccess: () => onClose(false),
            });
        }
    };

    return (
        <>
            <ModalLayout size="sm" isOpen={isOpen} onClose={() => onClose(false)} >
                <div className=" flex flex-col gap-4 w-full " >
                    <div className=" w-full flex flex-col gap-2 items-center " >
                        <div className=" w-12 h-12 rounded-full border-8 flex justify-center items-center bg-red-300 border-red-100 " >
                            <IoAlertCircleOutline size={"20px"} className=" text-red-600 " />
                        </div>
                        <p className=" text-lg font-bold " >Delete {capitalizeFLetter(type)}</p>
                        <p className=" text-xs font-medium text-center text-violet-300 " >{type === "coupon" ? "Deleting this coupon will render the code invalid" : `Deleting this challenge will permanently remove all its tasks, resources, and participant progress. This action cannot be undone, so make sure you're certain before proceeding.`}</p>
                    </div>
                    <div className=" flex w-full flex-col gap-2 " >
                        <CustomButton onClick={clickHandler} isLoading={deleteChallengeMutate?.isPending || deleteTaskMutate?.isPending || deleteCouponMutate?.isPending} variant="customDanger" >Delete {capitalizeFLetter(type)} </CustomButton>
                        <CustomButton onClick={() => onClose(false)} variant="outline" >Cancel</CustomButton>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}