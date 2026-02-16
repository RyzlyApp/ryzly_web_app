"use client"
import useChallenge from "@/hook/useChallenge" 
import CustomModal from "../../shared/modalLayout"
import { RiAddLine } from "react-icons/ri" 
import { WhatsappBlastForm } from "@/components/forms"


export default function WhatsappBlastBtn() {

    const { whatsappBlast, isOpen, setIsOpen, formikWhatsappBlast } = useChallenge()

    return (
        <>
            <button onClick={() => setIsOpen(true)} className=" flex items-center gap-3 text-neonblue-600 " >
                <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                    <RiAddLine size={"18px"} />
                </div>
                <p className=" text-sm font-medium " >Send Whatsapp Messages</p>
            </button>
            <CustomModal title="Email Blast" isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <div className="w-full flex flex-col gap-4 items-center">  
                    <WhatsappBlastForm formik={formikWhatsappBlast} isLoading={whatsappBlast?.isPending} />
                </div>
            </CustomModal>
        </>
    )
}