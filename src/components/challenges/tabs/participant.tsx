"use client";
import { CustomSearch } from "@/components/custom";
import { AddParticipantForm } from "@/components/forms";
import { LoadingLayout, ModalLayout } from "@/components/shared";
import UserCard from "@/components/shared/userCard";
import { IChallenge } from "@/helper/model/challenge";
import { useState } from "react";
import EmailBlastBtn from "../addBtn/emailBlast";
// import { WhatsappBlast } from "../addBtn";
// import { RiAddLine } from "react-icons/ri";

export default function Participant({ item }: { item: IChallenge }) {
    const [isOpen, setIsOpen] = useState(false);

    console.log(item.participants);

    return (
        <div className=" w-full flex flex-col p-4 gap-4 ">
            <CustomSearch placeholder="Search participants" />
            {/* {isCoach && (
                <button onClick={() => setIsOpen(true)} className=" flex items-center gap-3 text-neonblue-600 " >
                    <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                        <RiAddLine size={"18px"} />
                    </div>
                    <p className=" text-sm font-medium " >Invite participants</p>
                </button>
            )} */}
            <div className=" flex items-center gap-4 ">
                <EmailBlastBtn />
                {/* <WhatsappBlast /> */}
            </div>
            <LoadingLayout loading={false} lenght={item?.participants?.length}>
                <div className=" flex flex-col gap-3 ">
                    {item?.participants?.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className=" w-full h-[60px] flex items-center justify-between "
                            >
                                <UserCard item={item} showCoach={false} />
                                {/* <CustomButton height="40px" >Message</CustomButton> */}
                            </div>
                        );
                    })}
                </div>
            </LoadingLayout>
            <ModalLayout
                title="Add a participant"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <AddParticipantForm />
            </ModalLayout>
        </div>
    );
}
