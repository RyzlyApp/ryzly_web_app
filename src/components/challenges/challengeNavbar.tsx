"use client"
import { RiArrowLeftLine, RiDeleteBin6Line, RiEdit2Line, RiEyeOffLine, RiGroupLine, RiMore2Fill, RiShare2Line } from "react-icons/ri";
import AddTasksBtn from "./addBtn/addTasksBtn";
import { useParams, usePathname, useRouter } from "next/navigation";
import { coachAtom } from "@/helper/atom/coach";
import { useAtom } from "jotai";
import AddResourcesBtn from "./addBtn/addResourcesBtn";
import { Dropdown, DropdownItem, DropdownTrigger } from "@heroui/react";
import { DropdownMenu } from "@heroui/react";
import { useState } from "react";
import { AddCoachForm } from "../forms";
import DeleteModal from "./modals/deleteModal";
import EditModal from "./modals/editModal";

export default function ChallengeNavbar() {

    const router = useRouter()
    const [isCoach] = useAtom(coachAtom);

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCoach, setIsOpenCoach] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const pathname = usePathname()

    const param = useParams();
    const id = param.id;

    const shareUrl = `https://ryzly-web.vercel.app/challenges/${id}?share=true`;

    const copyHandler = () => {
        if (navigator.share) {
            navigator.share({
                title: '',
                text: ``,
                url: shareUrl,
            })
                .then(() => console.log('Shared successfully!'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            alert('Sharing not supported on this device.');
        }
    }

    const backHandler = () => {
        if (pathname?.includes("challenges") && !pathname?.includes("task") && !pathname?.includes("grading") && !pathname?.includes("submission")) {
            router.push(`/dashboard/challenges`)
        } else if (pathname?.includes("task") && !pathname?.includes("grading") && !pathname?.includes("submission")) {
            router.push(`/dashboard/challenges/${id}`)
        } else {
            router.back()
        }
    }

    return (
        <div className=" w-full h-[70px] lg:h-[80px] flex justify-between items-center px-5 " >
            <button onClick={backHandler} className=" flex gap-4 items-center " >
                <RiArrowLeftLine size={"20px"} className=" text-violet-500" />
                {pathname?.includes("/dashboard/challenges/create") && (
                    <p className=" font-bold " >{pathname?.includes("edit") ? "Edit" :"Create"} Challenges</p>
                )}
                {pathname?.includes("create-task") && (
                    <p className=" font-bold " >{pathname?.includes("edit") ? "Create Task" : "Edit Task"}</p>
                )}
                {pathname?.includes("portfolio") && (
                    <p className=" font-bold " >Add Portfolio</p>
                )}
            </button> 
            {(!pathname?.includes("/dashboard/challenges/create") && !pathname?.includes("create-task") && !pathname?.includes("portfolio")) && (
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
                    <button onClick={() => copyHandler()} className=" text-blue-900 px-2 " >
                        <RiShare2Line size={"20px"} />
                    </button>
                    {isCoach && (
                        <Dropdown  >
                            <DropdownTrigger>
                                <button className=" text-violet-500 px-2 " >
                                    <RiMore2Fill size={"20px"} />
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem className=" lg:block hidden " onClick={() => setIsOpenEdit(true)} key="edit"
                                    startContent={<RiEdit2Line size={"20px"} />} >
                                    <p className=" text-sm font-medium " >Edit</p>
                                </DropdownItem>
                                <DropdownItem className=" lg:hidden " onClick={() => router.push(`/dashboard/challenges/create/${id}/edit`)} key="edit-mobile"
                                    startContent={<RiEdit2Line size={"20px"} />} >
                                    <p className=" text-sm font-medium " >Edit</p>
                                </DropdownItem>
                                <DropdownItem onClick={() => setIsOpenCoach(true)} key="add"
                                    startContent={<RiGroupLine size={"20px"} />} >
                                    <p className=" text-sm font-medium " >Add coach</p>
                                </DropdownItem>
                                <DropdownItem key="unpublish"
                                    startContent={<RiEyeOffLine size={"20px"} />} >
                                    <p className=" text-sm font-medium " >Unpublish</p>
                                </DropdownItem>
                                <DropdownItem onClick={() => setIsOpen(true)} key="delete"
                                    startContent={<RiDeleteBin6Line size={"20px"} />}>
                                    <p className=" text-sm font-medium " >Delete</p>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
            )}
            <DeleteModal isOpen={isOpen} id={id as string} type="challenge" onClose={setIsOpen} />
            <AddCoachForm isOpen={isOpenCoach} setIsCoach={setIsOpenCoach} />
            <EditModal isOpen={isOpenEdit} id={id as string} type="challenge" onClose={setIsOpenEdit} />
        </div>
    )
}