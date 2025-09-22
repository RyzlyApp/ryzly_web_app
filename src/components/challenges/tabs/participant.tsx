"use client"
import { CustomButton, CustomSearch } from "@/components/custom";
import { AddParticipantForm } from "@/components/forms";
import { ModalLayout } from "@/components/shared";
import { coachAtom } from "@/helper/atom/coach";
import useOverview from "@/hook/useOverview";
import { useAtom } from "jotai";
import { RiAddLine } from "react-icons/ri";

export default function Participant() {


    const { addParticipantMutate, isOpen, setIsOpen, id } = useOverview()
    const [isCoach] = useAtom(coachAtom);

    const handleSubmit = (item: string) => {
        addParticipantMutate.mutate({
            challengeID: id + "",
            user: item
        })
    }

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            <CustomSearch placeholder="Search participants" />
            {isCoach && (
                <button onClick={() => setIsOpen(true)} className=" flex items-center gap-3 text-neonblue-600 " >
                    <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                        <RiAddLine size={"18px"} />
                    </div>
                    <p className=" text-sm font-medium " >Invite participants</p>
                </button>
            )}
            <div className=" flex flex-col gap-3 " >
                <div className=" w-full h-[60px] flex items-center justify-between " >
                    <div className=" flex items-center gap-2 " >
                        <div className=" w-8 h-8 bg-primary rounded-full " >

                        </div>
                        <p className=" text-sm font-medium " >Adebayo Nwosu</p>
                    </div>
                    <CustomButton height="40px" >Message</CustomButton>
                </div>
            </div>
            <ModalLayout title="Add a coach" isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <AddParticipantForm click={handleSubmit} isLoading={addParticipantMutate?.isPending} />
            </ModalLayout>
        </div>
    )
}