import { RiLogoutBoxRLine } from "react-icons/ri";
import { ModalLayout } from "../shared";


export default function LeaveChallenge(
    { isOpen, onClose } : { isOpen: boolean, onClose: (by: boolean)=> void }
) {
    return(
        <>
            <ModalLayout size="sm" isOpen={isOpen} onClose={()=> onClose(false)} >
                <div className=" w-full flex flex-col gap-3 items-center " >
                    <RiLogoutBoxRLine size={"40px"} />
                    <p className=" text-lg font-bold " >Leave Challenge</p>
                    <p className=" text-xs font-medium text-violet-300 " >{`Leaving this challenge means you'll lose your spot, and any submitted work will no longer be reviewed. This action can't be undone are you sure you want to exit?`}</p>
                </div>
            </ModalLayout>
        </>
    )
}