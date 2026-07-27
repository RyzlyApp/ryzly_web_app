"use client"
// import { CustomSearch } from "@/components/custom";
import { AddCoachForm } from "@/components/forms";
import { LoadingLayout } from "@/components/shared";
import UserCard from "@/components/shared/userCard"; 
import { IChallenge } from "@/helper/model/challenge"; 
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";


export default function Coach(
    { item }: { item: IChallenge }
) {

    const [isOpen, setIsOpen] = useState(false)
    // const [isCoach] = useAtom(coachAtom);

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            {/* <CustomSearch placeholder="Search coaches" />  */}
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