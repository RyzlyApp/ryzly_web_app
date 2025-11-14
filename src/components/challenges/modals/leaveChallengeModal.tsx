import { ModalLayout } from "../../shared";
import { CustomButton } from "../../custom"; 
import useChallenge from "@/hook/useChallenge"; 
import { RiLogoutBoxLine } from "react-icons/ri";


export default function LeaveChallengeModal(
    { isOpen, onClose, id }: { isOpen: boolean, onClose: (by: boolean) => void, id: string }
) {

    const { leaveChallengeMutate } = useChallenge()

    const clickHandler = () => {
        leaveChallengeMutate.mutate(id, {
            onSuccess: () => onClose(false),
        });
    };

    return (
        <>
            <ModalLayout size="sm" isOpen={isOpen} onClose={() => onClose(false)} >
                <div className=" flex flex-col gap-4 w-full " >
                    <div className=" w-full flex flex-col gap-2 items-center " >
                        <div className=" w-12 h-12 rounded-full border-8 flex justify-center items-center bg-red-300 border-red-100 " >
                            <RiLogoutBoxLine size={"20px"} className=" text-red-600 " />
                        </div>
                        <p className=" text-lg font-bold " >Leave Challenge</p>
                        <p className=" text-xs font-medium text-center text-violet-300 " >{`Leaving this challenge means you'll lose your spot, and any submitted work will no longer be reviewed. This action can't be undone are you sure you want to exit?`}</p>
                    </div>
                    <div className=" flex w-full flex-col gap-2 " >
                        <CustomButton onClick={clickHandler} isLoading={leaveChallengeMutate?.isPending} variant="customDanger" >Leave Challenge</CustomButton>
                        <CustomButton onClick={() => onClose(false)} variant="outline" >Cancel</CustomButton>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}