"use client"
import { RiArrowLeftLine, RiFlagLine, RiLogoutBoxLine, RiMore2Fill, RiShare2Line } from "react-icons/ri";
import AddTasksBtn from "./addBtn/addTasksBtn";
import { useRouter } from "next/navigation";
import { coachAtom } from "@/helper/atom/coach";
import { useAtom } from "jotai";
import AddResourcesBtn from "./addBtn/addResourcesBtn";
import { Dropdown, DropdownItem, DropdownTrigger } from "@heroui/react";
import { DropdownMenu } from "@heroui/react";
import LeaveChallenge from "./leaveChallenge";
import { useState } from "react";

export default function ChallengeNavbar() {

    const router = useRouter()
    const [isCoach] = useAtom(coachAtom);

    const [ isOpen, setIsOpen ] = useState(false)

    return (
        <div className=" w-full h-[70px] lg:h-[80px] flex justify-between items-center px-5 " >
            <button onClick={() => router.back()} >
                <RiArrowLeftLine size={"20px"} className=" text-violet-500" />
            </button>
            <div className=" flex gap-3 items-center " >
                {isCoach && (
                    <div className=" lg:flex hidden gap-3 " >
                        <AddResourcesBtn />
                        <AddTasksBtn height="36px" variant="primary" />
                    </div>
                )}
                {isCoach && (
                    <AddTasksBtn mobile={true} />
                )}
                <button className=" text-blue-900 px-2 " >
                    <RiShare2Line size={"20px"} />
                </button>
                {!isCoach && (
                    <Dropdown  >
                        <DropdownTrigger>
                            <button className=" text-violet-500 px-2 " >
                                <RiMore2Fill size={"20px"} />
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem onClick={()=> setIsOpen(true)} key="new"
                                startContent={<RiFlagLine size={"20px"} />} >
                                <p className=" text-sm font-medium " >Report</p>
                            </DropdownItem>
                            <DropdownItem key="copy"
                                startContent={<RiLogoutBoxLine size={"20px"} />}>
                                <p className=" text-sm font-medium " >Leave</p>
                            </DropdownItem> 
                        </DropdownMenu>
                    </Dropdown>
                )}
            </div>
            <LeaveChallenge isOpen={isOpen} onClose={setIsOpen} />
        </div>
    )
}