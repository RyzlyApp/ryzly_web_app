import { coachAtom } from "@/helper/atom/coach";
import { useAtom } from "jotai";
import { RiAddLine } from "react-icons/ri"; 
import useOverview from "@/hook/useOverview";
import { ModalLayout } from "@/components/shared";
import { AddResourceForm } from "@/components/forms";
import { CustomButton } from "@/components/custom";


export default function AddResourcesBtn(
    { 
        tab, 
    }: { variant?: "warning" | "primary", height?: string, tab?: boolean, mobile?: boolean }
) {

    const [isCoach] = useAtom(coachAtom);
    const { formikResource, addResourceMutate, isOpen, setIsOpen } = useOverview()

    return (
        <>

            {(isCoach && tab) && (
                <button onClick={() => setIsOpen(true)} className=" flex items-center gap-3 text-neonblue-600 " >
                    <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                        <RiAddLine size={"18px"} />
                    </div>
                    <p className=" text-sm font-medium " >Add resources</p>
                </button>
            )}

            {(isCoach && !tab) && ( 
                <CustomButton onClick={() => setIsOpen(true)} variant="auth" height="36px" >Share a Resource</CustomButton>
            )}
            <ModalLayout title="Add a resource" isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <AddResourceForm isLoading={addResourceMutate.isPending} formik={formikResource} />
            </ModalLayout>
        </>
    )
}