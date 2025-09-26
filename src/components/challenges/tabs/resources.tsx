import { AddResourceForm } from "@/components/forms";
import { ModalLayout, ResourceCard } from "@/components/shared";
import { coachAtom } from "@/helper/atom/coach";
import useOverview from "@/hook/useOverview";
import { useAtom } from "jotai";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";


export default function Resources() {

    const [isCoach] = useAtom(coachAtom);
    const [ isOpen, setIsOpen ] = useState(false)
    const { formikResource, addResourceMutate } = useOverview()

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            {isCoach && (
                <button onClick={()=> setIsOpen(true)} className=" flex items-center gap-3 text-neonblue-600 " >
                    <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                        <RiAddLine size={"18px"} />
                    </div>
                    <p className=" text-sm font-medium " >Add resources</p>
                </button>
            )}
            <div className=" w-full flex flex-col gap-3 shadow p-4 rounded-2xl " >
                <ResourceCard withImg={true} />
            </div>
            <ModalLayout title="Add a participant" isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <AddResourceForm isLoading={addResourceMutate.isPending} formik={formikResource} />
            </ModalLayout>
        </div>
    )
}