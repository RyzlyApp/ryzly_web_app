"use client"
import { CustomSearch } from "@/components/custom";
import { AddCoachForm } from "@/components/forms";
import { LoadingLayout, ModalLayout } from "@/components/shared";
import UserCard from "@/components/shared/userCard";
import { coachAtom } from "@/helper/atom/coach";
import { IChallenge } from "@/helper/model/challenge";
import { useAtom } from "jotai";
import { useState } from "react";
import { RiAddLine, RiDeleteBin6Line } from "react-icons/ri";


export default function Coach(
    { item }: { item: IChallenge }
) {

    const [isOpen, setIsOpen] = useState(false)
    const [isCoach] = useAtom(coachAtom);

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            <CustomSearch placeholder="Search coaches" />
            {isCoach && (
                <button onClick={() => setIsOpen(true)} className=" flex items-center gap-3 text-neonblue-600 " >
                    <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                        <RiAddLine size={"18px"} />
                    </div>
                    <p className=" text-sm font-medium " >Add a coach</p>
                </button>
            )}
            <LoadingLayout loading={false} >
                <div className=" flex flex-col gap-3 " >
                    <div className=" w-full h-[60px] flex items-center justify-between " >
                        <UserCard item={item?.creator} />
                    </div>
                    {item?.coaches?.map((item, index) => {
                        return (
                            <div key={index} className=" w-full h-[60px] flex items-center justify-between " >
                                <UserCard item={item} />
                                <div className=" cursor-pointer text-red-600 " >
                                    <RiDeleteBin6Line size={"16px"} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </LoadingLayout>
            <AddCoachForm isOpen={isOpen}  setIsCoach={setIsOpen}/>
        </div>
    )
}