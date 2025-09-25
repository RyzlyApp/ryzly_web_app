"use client"
import { CustomSearch } from "@/components/custom";
import { AddCoachForm } from "@/components/forms"; 
import { ModalLayout } from "@/components/shared";
import { useState } from "react";
import { RiAddLine, RiDeleteBin6Line } from "react-icons/ri";


export default function Coach() {

    const [ isOpen, setIsOpen ] = useState(false)

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            <CustomSearch placeholder="Search coaches" />
            <button onClick={()=> setIsOpen(true)} className=" flex items-center gap-3 text-neonblue-600 " >
                <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                    <RiAddLine size={"18px"} />
                </div>
                <p className=" text-sm font-medium " >Add a coach</p>
            </button>
            <div className=" flex flex-col gap-3 " >
                <div className=" w-full h-[60px] flex items-center justify-between " >
                    <div className=" flex items-center gap-2 " >
                        <div className=" w-8 h-8 bg-primary rounded-full " >

                        </div>
                        <p className=" text-sm font-medium " >Adebayo Nwosu</p>
                    </div>
                    <div className=" cursor-pointer text-red-600 " >
                        <RiDeleteBin6Line size={"16px"} />
                    </div>
                </div>
            </div> 
            <ModalLayout title="Add a coach" isOpen={isOpen} onClose={() => setIsOpen(false)} > 
                <AddCoachForm />
            </ModalLayout>
        </div>
    )
}