"use client"
import { RiArrowLeftLine, RiMore2Fill, RiShare2Line } from "react-icons/ri"; 
import AddTasksBtn from "./addBtn/addTasksBtn";
import { useRouter } from "next/navigation";
import { coachAtom } from "@/helper/atom/coach";
import { useAtom } from "jotai";
import AddResourcesBtn from "./addBtn/addResourcesBtn";

export default function ChallengeNavbar() {

    const router = useRouter()
    const [isCoach] = useAtom(coachAtom);

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
                <button className=" text-violet-500 px-2 " >
                    <RiMore2Fill size={"20px"} />
                </button>
            </div>
        </div>
    )
}