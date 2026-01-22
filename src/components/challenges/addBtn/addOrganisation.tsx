"use client"
import CustomModal from "../../shared/modalLayout"
import { RiAddLine } from "react-icons/ri"
import useOrganisation from "@/hook/useOrganisation"
import { OrganisationForm } from "@/components/forms"


export default function AddOrganisation() {

    const { isOpen, setIsOpen, formik, image, setImage, isLoading } = useOrganisation()


    return (
        <>
            <button onClick={() => setIsOpen(true)} className=" lg:flex hidden items-center gap-3 text-neonblue-600 " >
                <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                    <RiAddLine size={"18px"} />
                </div>
                <p className=" font-medium text-violet-300 " >Add an organization</p>
            </button>

            <button className=" lg:hidden flex items-center gap-3 text-neonblue-600 " >
                <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                    <RiAddLine size={"18px"} />
                </div>
                <p className=" font-medium text-violet-300 " >Add an organization</p>
            </button>

            <CustomModal title="Coupon Creation" isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <div className="w-full flex flex-col gap-4 items-center">
                    <OrganisationForm formik={formik} isLoading={isLoading} image={image} setImage={setImage} />
                </div>
            </CustomModal>
        </>
    )
}